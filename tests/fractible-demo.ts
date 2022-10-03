import { blake2b, expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from "@completium/experiment-ts";
import { Bytes, Nat, Option, Or, Tez } from "@completium/archetype-ts-types";


const assert = require("assert");

/* Contracts */

import { royalties } from "./binding/royalties";
import { asset_type, FA2, sale, sales, XTZ } from "./binding/sales";
import { sales_storage } from "./binding/sales_storage";
import { transfer_manager } from "./binding/transfer_manager";
import { users_storage } from "./binding/users_storage";
import { whitelist } from "./binding/whitelist";
import { mint_param, nft, operator_param } from "./binding/nft";
import { permits } from "./binding/permits";

/* Accounts ----------------------------------------------------------------- */

const alice = get_account("alice");
const bob = get_account("bob");
const carl = get_account("carl");
const user1 = get_account("bootstrap1");
const user2 = get_account("bootstrap2");
const user3 = get_account("bootstrap3");
const user4 = get_account("bootstrap4");

/* Endpoint ---------------------------------------------------------------- */

//set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(false);

/* Now --------------------------------------------------------------------- */

const now = new Date(Date.now());
set_mockup_now(now);

/* Constants & Utils ------------------------------------------------------- */


/* Scenarios --------------------------------------------------------------- */
describe("Contracts deployment", async () => {

  it("Royalties contract deployment should succeed", async () => {
    await royalties.deploy(alice.get_address(), { as: alice });
  });
  it("Whitelist storage contract deployment should succeed", async () => {
    await users_storage.deploy(alice.get_address(), { as: alice });
  });
  it("Sales storage contract deployment should succeed", async () => {
    await sales_storage.deploy(alice.get_address(), { as: alice });
  });
  it("Transfer Manager contract deployment should succeed", async () => {
    await transfer_manager.deploy(alice.get_address(), royalties.get_address(), alice.get_address(), { as: alice });
  });
  it("Whitelist contract deployment should succeed", async () => {
    await whitelist.deploy(alice.get_address(), users_storage.get_address(), { as: alice });
  });
  it("Permits contract deployment should succeed", async () => {
    await permits.deploy(alice.get_address(), { as: alice });
  });
  it("Sales contract deployment should succeed", async () => {
    await sales.deploy(alice.get_address(),
      new Nat(0),
      transfer_manager.get_address(),
      sales_storage.get_address(),
      { as: alice });
  });
  it("NFT contract deployment should succeed", async () => {
    await nft.deploy(alice.get_address(), permits.get_address(), whitelist.get_address(), { as: alice });
  });
});

describe("Set up", async () => {
  it("Set up whitelist permission should succeed", async () => {
    await whitelist.update_transfer_list(new Nat(0), Option.Some<[boolean, Nat[]]>([true, [new Nat(0)]]), { as: alice });
  });

  it("Set sales contract in sales storage should succeed", async () => {
    await sales_storage.set_sales_contract(sales.get_address(), { as: alice });
  });

  it("Authorize sales contracts in transfer manager should succeed", async () => {
    await transfer_manager.authorize_contract(sales.get_address(), { as: alice });
    await transfer_manager.authorize_contract(sales_storage.get_address(), { as: alice });
  });

  it("Add Alice as whitelister should succeed", async () => {
    await users_storage.add_whitelister(whitelist.get_address(), { as: alice });
    await whitelist.add_whitelister(alice.get_address(), { as: alice });
    await whitelist.add_super_user(alice.get_address(), { as: alice });
  });

  it("Add Alice, Bob and Carl to whitelist should succeed", async () => {
    await whitelist.update_users([
      [alice.get_address(), Option.Some<Nat>(new Nat(0))],
      [bob.get_address(), Option.Some<Nat>(new Nat(0))],
      [carl.get_address(), Option.Some<Nat>(new Nat(0))]
    ], { as: alice });
  });

  it("Mint NFT", async () => {
    await nft.mint([new mint_param(alice.get_address(), new Nat(10)), new mint_param(bob.get_address(),
      new Nat(10)), new mint_param(carl.get_address(), new Nat(10))], [], { as: alice });
  });

  it("Update operator NFT", async () => {
    await nft.update_operators([
        Or.Left<operator_param, operator_param>(new operator_param(alice.get_address(),
          transfer_manager.get_address(),
          new Nat(0)))
      ],
      { as: alice }
    );
  });
});

describe("Sell NFT", async () => {
  it("Sell NFT as Alice should succeed", async () => {
    await sales.sell(nft.get_address(),
      new Nat(0),
      new XTZ(),
      new Bytes(""),
      new sale([],
        [],
        new Nat(100000),
        new Nat(10),
        Option.None(),
        Option.None(),
        new Nat(10000),
        Option.None(),
        Option.None()),
      { as: alice }
    );
  });
});

describe("Buy NFT", async () => {
  it("Buy NFT as User1 should fail", async () => {
    await sales.buy(nft.get_address(),
      new Nat(0),
      alice.get_address(),
      new XTZ(),
      new Bytes(""),
      new Nat(1),
      [],
      [],
      { as: user1, amount: new Tez(0.1) });
  });
  it("Buy NFT as Bob should succeed", async () => {
    await sales.buy(nft.get_address(),
      new Nat(0),
      alice.get_address(),
      new XTZ(),
      new Bytes(""),
      new Nat(1),
      [],
      [],
      { as: bob, amount: new Tez(0.1) });
  });
});
