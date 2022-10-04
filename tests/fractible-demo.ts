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

import {royalties} from "./binding/royalties";
import {add as add_sales, buy_param, buy_param_mich_type, sale, sale_mich_type, sales} from "./binding/sales";
import {add as add_sales_storage, sales_storage} from "./binding/sales_storage";
import {transfer_manager} from "./binding/transfer_manager";
import {users_storage} from "./binding/users_storage";
import {whitelist} from "./binding/whitelist";
import {
  add_for_all,
  mint_param,
  nft,
  operator_param,
  update_for_all_op,
  update_for_all_op_types,
  update_for_all_param, update_for_all_param_mich_type
} from "./binding/nft";
import {add as add_permit, permits} from "./binding/permits";

/* Accounts ----------------------------------------------------------------- */

const alice = get_account("alice");
const bob = get_account("bob");
const carl = get_account("carl");
const user1 = get_account("bootstrap1");
const user2 = get_account("bootstrap2");
const user3 = get_account("bootstrap3");
const user4 = get_account("bootstrap4");

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

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
  const chain_id = is_mockup() ? 'NetXynUjJNZm7wi' : 'NetXq4AxoF7BoxJ';
  const permit_data = mich_array_to_mich([
    mich_array_to_mich([contract.to_mich(), string_to_mich(chain_id)]),
    mich_array_to_mich([counter.to_mich(), ptps.to_mich()])
  ])
  return pack(permit_data, permit_data_type);
}

/* Scenarios --------------------------------------------------------------- */
describe("Contracts deployment", async () => {
	it("Whitelist storage contract deployment should succeed", async () => {
		await users_storage.deploy(alice.get_address(), {as: alice});
	});
	it("Sales storage contract deployment should succeed", async () => {
		await sales_storage.deploy(alice.get_address(), {as: alice});
	});
	it("Whitelist contract deployment should succeed", async () => {
		await whitelist.deploy(alice.get_address(), users_storage.get_address(), {as: alice});
	});
	it("Permits contract deployment should succeed", async () => {
		await permits.deploy(alice.get_address(), {as: alice});
	});
	it("Sales contract deployment should succeed", async () => {
		await sales.deploy(alice.get_address(),
			sales_storage.get_address(),
			permits.get_address(),
			{as: alice});
	});
	it("NFT contract deployment should succeed", async () => {
		await nft.deploy(alice.get_address(), permits.get_address(), whitelist.get_address(), sales.get_address(), sales_storage.get_address(), {as: alice});
	});
});

describe("Set up", async () => {
	it("Set up contracts configuration", async () => {
		await exec_batch([
				await whitelist.get_update_transfer_list_param(new Nat(0),
					Option.Some<[boolean, Nat[]]>([true, [new Nat(0)]]),
					{as: alice}),
				await users_storage.get_add_whitelister_param(whitelist.get_address(), {as: alice}),
				await whitelist.get_add_whitelister_param(alice.get_address(), {as: alice}),
				await whitelist.get_add_super_user_param(alice.get_address(), {as: alice}),
				await sales.get_manage_authorization_param(new add_sales(alice.get_address()), {as: alice}),
				await sales_storage.get_manage_authorization_param(new add_sales_storage(sales.get_address()), {as: alice}),
				await sales_storage.get_manage_authorization_param(new add_sales_storage(nft.get_address()), {as: alice}),
				await whitelist.get_update_users_param([
					[alice.get_address(), Option.Some<Nat>(new Nat(0))],
					[bob.get_address(), Option.Some<Nat>(new Nat(0))],
					[carl.get_address(), Option.Some<Nat>(new Nat(0))]
				], {as: alice}),
                await nft.get_set_marketplace_param(sales_storage.get_address(), {as: alice}),
				await permits.get_manage_consumer_param(new add_permit(nft.get_address()), {as: alice}),
				await permits.get_manage_consumer_param(new add_permit(sales.get_address()), {as: alice})
			],
			{as: alice}
		)
	});

	it("Update operator NFT", async () => {
      const permit = await permits.get_permits_value(alice.get_address())
      const counter = permit?.counter
      const data = new update_for_all_param(new add_for_all(), sales.get_address())
      const packed_sales_data = pack(data.to_mich(), update_for_all_param_mich_type)
      const after_permit_data = await get_permit_data(
          packed_sales_data,
          permits.get_address(),
          counter);
      const signature = await alice.sign(after_permit_data)
      await nft.update_operator_for_all_gasless(data, alice.get_public_key(), signature, {as: bob});
	});
});
describe("Minting", async () => {
	it("Mint NFT", async () => {
		await nft.mint([new mint_param(alice.get_address(), new Nat(10)), new mint_param(bob.get_address(),
			new Nat(10)), new mint_param(carl.get_address(), new Nat(10))], [], {as: alice});
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
			new Bytes(""),
			new Bytes("")
		)
		const permit = await permits.get_permits_value(alice.get_address())
		const counter = permit?.counter
		const packed_sales_data = pack(sale_data.to_mich(), sale_mich_type)
		const after_permit_data = await get_permit_data(
			packed_sales_data,
			permits.get_address(),
			counter);
		const signature = await alice.sign(after_permit_data)
		await sales.sell(sale_data, alice.get_public_key(), signature, {as: bob})
	});

	// it("Buy NFT as User1 should fail", async () => {
	// 	await sales.buy(nft.get_address(),
	// 		new Nat(0),
	// 		alice.get_address(),
	// 		new XTZ(),
	// 		new Bytes(""),
	// 		new Nat(1),
	// 		[],
	// 		[],
	// 		{as: user1, amount: new Tez(0.1)});
	// });
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
		await sales.buy(buy_data, bob.get_public_key(), signature, {as: alice})
	});
});

