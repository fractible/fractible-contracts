import {
	blake2b,
	exec_batch,
	expect_to_fail,
	get_account, is_mockup, pack,
	set_mockup,
	set_mockup_now,
	set_quiet, sign
} from "@completium/experiment-ts";
import {
	Address,
	Bytes, mich_array_to_mich,
	Nat,
	Option,
	Or, or_to_mich_type,
	pair_array_to_mich_type,
	prim_annot_to_mich_type, string_to_mich,
	Tez
} from "@completium/archetype-ts-types";


const assert = require("assert");

/* Contracts */
import {
	add as add_sales,
	auth_buy_param, auth_buy_param_mich_type,
	buy_param,
	buy_param_mich_type,
	sale,
	sale_mich_type,
	marketplace
} from "./binding/marketplace";
import {whitelist_storage} from "./binding/whitelist_storage";
import {whitelist} from "./binding/whitelist";
import {
	add_for_all,
	mint_param,
	nft,
	update_for_all_param, update_for_all_param_mich_type
} from "./binding/nft";
import {add as add_permit, permits} from "./binding/permits";

/* Accounts ----------------------------------------------------------------- */

const alice = get_account("alice");
const bob = get_account("bob");
const carl = get_account("carl");
const admin = get_account("bootstrap1");
const user2 = get_account("bootstrap2");
const user3 = get_account("bootstrap3");
const user4 = get_account("bootstrap4");

/* Endpoint ---------------------------------------------------------------- */

//set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

const now = new Date(Date.now());
set_mockup_now(now);

/* Constants & Utils ------------------------------------------------------- */
const permit_data_type = pair_array_to_mich_type([
	pair_array_to_mich_type([
		prim_annot_to_mich_type("address", []),
		prim_annot_to_mich_type("chain_id", [])
	]),
	pair_array_to_mich_type([
		prim_annot_to_mich_type("nat", []),
		prim_annot_to_mich_type("bytes", [])
	])
])

const get_permit_data = (ptps: Bytes, contract: Address, permit_counter: Nat | undefined): Bytes => {
	let counter = new Nat(0)
	if (permit_counter != undefined) {
		counter = permit_counter
	}

	//mockup / sandbox
	//const chain_id = is_mockup() ? 'NetXynUjJNZm7wi' : 'NetXq4AxoF7BoxJ';

	//testnet
	const chain_id = "NetXnHfVqm9iesp"
	const permit_data = mich_array_to_mich([
		mich_array_to_mich([contract.to_mich(), string_to_mich(chain_id)]),
		mich_array_to_mich([counter.to_mich(), ptps.to_mich()])
	])
	return pack(permit_data, permit_data_type);
}

/* Scenarios --------------------------------------------------------------- */
describe("Contracts deployment", async () => {
	it("Whitelist storage contract deployment should succeed", async () => {
		await whitelist_storage.deploy(admin.get_address(), {as: admin});
	});
	it("Whitelist contract deployment should succeed", async () => {
		await whitelist.deploy(admin.get_address(), whitelist_storage.get_address(), {as: admin});
	});
	it("Permits contract deployment should succeed", async () => {
		await permits.deploy(admin.get_address(), {as: admin});
	});
	it("Sales contract deployment should succeed", async () => {
		await marketplace.deploy(admin.get_address(),
			permits.get_address(),
			admin.get_public_key(),
			{as: admin});
	});
	it("NFT contract deployment should succeed", async () => {
		await nft.deploy(admin.get_address(),
			permits.get_address(),
			whitelist.get_address(),
			marketplace.get_address(),
			{as: admin});
	});
});

describe("Set up", async () => {
	it("Set up contracts configuration", async () => {
		await exec_batch([
				await whitelist.get_update_transfer_list_param(new Nat(0),
					Option.Some<[boolean, Nat[]]>([true, [new Nat(0)]]),
					{as: admin}),
				await whitelist_storage.get_add_whitelister_param(whitelist.get_address(), {as: admin}),
				await whitelist.get_add_whitelister_param(admin.get_address(), {as: admin}),
				await whitelist.get_add_super_user_param(admin.get_address(), {as: admin}),
				await whitelist.get_update_users_param([
					[alice.get_address(), Option.Some<Nat>(new Nat(0))],
					[bob.get_address(), Option.Some<Nat>(new Nat(0))],
					[carl.get_address(), Option.Some<Nat>(new Nat(0))],
					[admin.get_address(), Option.Some<Nat>(new Nat(0))]
				], {as: admin}),
				await nft.get_set_marketplace_param(marketplace.get_address(), {as: admin}),
				await permits.get_manage_consumer_param(new add_permit(nft.get_address()), {as: admin}),
				await permits.get_manage_consumer_param(new add_permit(marketplace.get_address()), {as: admin})
			],
			{as: admin}
		)
	});

	it("Update operator NFT", async () => {
		const permit = await permits.get_permits_value(alice.get_address())
		const counter = permit?.counter
		const data = new update_for_all_param(new add_for_all(), marketplace.get_address())
		const packed_sales_data = pack(data.to_mich(), update_for_all_param_mich_type)
		const after_permit_data = await get_permit_data(
			packed_sales_data,
			permits.get_address(),
			counter);
		const signature = await alice.sign(after_permit_data)
		await nft.update_operator_for_all_gasless(data, alice.get_public_key(), signature, {as: admin});
	});
});

describe("Minting", async () => {
	it("Mint NFT", async () => {
		await exec_batch([
			//Car minting (0,1,2)
			await nft.get_mint_param([
				new mint_param(alice.get_address(), new Nat(3)),
				new mint_param(bob.get_address(), new Nat(4)),
				new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://QmSSLjccM2YVr3VVQpAQXrBfGFtDnRkFLqCA3CPiyJk1Mb")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(4)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://QmfPTb9KgikAQBbDJicAPWqyxmxGDfkUdce4gAk39akacG")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(3)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(4))],
				[["", Bytes.hex_encode("ipfs://QmaTDjd3DUBsH34y7YGxEPUgzqrAgwEW6okorQ56o2SaRn")]], {as: admin}
			),
			//Watch minting (3,4,5)
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(3)),
					new mint_param(bob.get_address(), new Nat(4)),
					new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://QmXe1fY2BnWVpRmJb26afD3R2W1H2PfkM77G2M6RpWLyEw")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(4)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://QmSno3r8aMU3BEfj6UyLaqi8QfmnehjJcPSb6CGAEDkWpm")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(3)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(4))],
				[["", Bytes.hex_encode("ipfs://Qmc6XDj8pGYZqcQZpJwXkB61hceXt5U16n3csWYSdFiJ27")]], {as: admin}
			),
			//Wine minting (6,7,8)
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(3)),
					new mint_param(bob.get_address(), new Nat(4)),
					new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://Qmeod88J1M4rfkpndBk4Y6ARfNPwiWbx5dGVuZrvzQy3LV")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(4)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(3))],
				[["", Bytes.hex_encode("ipfs://Qmb9g7hnGrMERzFaEBBQ37QrRUbTJjDFgZHpJVDUewxUWb")]], {as: admin}
			),
			await nft.get_mint_param([
					new mint_param(alice.get_address(), new Nat(3)),
					new mint_param(bob.get_address(), new Nat(3)),
					new mint_param(carl.get_address(), new Nat(4))],
				[["", Bytes.hex_encode("ipfs://QmTMU5zh3WB6Swc3VFLJwi6po1U92gCxYHRQA6wcJzngwn")]], {as: admin}
			)
		], {as: admin})
	});
});

describe("Marketplace tests", async () => {
	it("Sell NFT for alice as bob (gasless) should succeed", async () => {
		const sale_data = new sale(
			nft.get_address(),
			new Nat(0),
			alice.get_address(),
			new Nat(1000),
			new Nat(1),
			Option.None(),
			Option.None(),
			new Nat(0),
			Option.None(),
			Option.None()
		)
		const permit = await permits.get_permits_value(alice.get_address())
		const counter = permit?.counter
		const packed_sales_data = pack(sale_data.to_mich(), sale_mich_type)
		const after_permit_data = await get_permit_data(
			packed_sales_data,
			permits.get_address(),
			counter);
		const signature = await alice.sign(after_permit_data)
		await marketplace.sell(sale_data, alice.get_public_key(), signature, {as: admin})
	});

	it("Buy NFT as User1 should fail", async () => {
		await expect_to_fail(async () => {

			const buy_data = new buy_param(
				new Nat(0),
				new Nat(1)
			)
			const permit = await permits.get_permits_value(user2.get_address())
			const counter = permit?.counter
			const packed_buy_data = pack(buy_data.to_mich(), buy_param_mich_type)
			const after_permit_data = await get_permit_data(
				packed_buy_data,
				permits.get_address(),
				counter);
			const signature = await user2.sign(after_permit_data)

			const permit_auth = await permits.get_permits_value(admin.get_address())
			const counter_auth = permit_auth?.counter
			const auth_sig_data = new auth_buy_param(buy_data, signature)
			const packed_sig_data = pack(auth_sig_data.to_mich(), auth_buy_param_mich_type)
			const after_permit_sig_data = await get_permit_data(
				packed_sig_data,
				permits.get_address(),
				counter_auth);
			const signature_auth = await admin.sign(after_permit_sig_data)
			await marketplace.buy(buy_data, user2.get_public_key(), signature, signature_auth, {as: admin})
		}, whitelist.errors.TO_RESTRICTED);

	});

	it("Buy NFT as Bob should succeed", async () => {
		const buy_data = new buy_param(
			new Nat(0),
			new Nat(1)
		)
		const permit = await permits.get_permits_value(bob.get_address())
		const counter = permit?.counter
		const packed_buy_data = pack(buy_data.to_mich(), buy_param_mich_type)
		const after_permit_data = await get_permit_data(
			packed_buy_data,
			permits.get_address(),
			counter);
		const signature = await bob.sign(after_permit_data)

		const permit_auth = await permits.get_permits_value(admin.get_address())
		const counter_auth = permit_auth?.counter
		const auth_sig_data = new auth_buy_param(buy_data, signature)
		const packed_sig_data = pack(auth_sig_data.to_mich(), auth_buy_param_mich_type)
		const after_permit_sig_data = await get_permit_data(
			packed_sig_data,
			permits.get_address(),
			counter_auth);
		const signature_auth = await admin.sign(after_permit_sig_data)
		await marketplace.buy(buy_data, bob.get_public_key(), signature, signature_auth, {as: admin})
	});
});

