import { blake2b, Bytes, expect_to_fail, get_account, Key, Nat, Option, Or, pair_to_mich, set_mockup, set_mockup_now, set_quiet, Signature, string_to_mich } from '@completium/experiment-ts'
import { fa2, operator_param } from './binding/fa2';


const assert = require('assert');

/* Contracts */

import { royalties } from './binding/royalties';
import { sales } from './binding/sales';
import { sales_storage } from './binding/sales_storage';
import { transfer_manager } from './binding/transfer_manager';
import { users_storage } from './binding/users_storage';
import { whitelist } from './binding/whitelist';

/* Accounts ----------------------------------------------------------------- */

const alice = get_account('alice');
const bob   = get_account('bob');
const carl  = get_account('carl');
const user1 = get_account('bootstrap1');
const user2 = get_account('bootstrap2');
const user3 = get_account('bootstrap3');
const user4 = get_account('bootstrap4');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

const now = new Date(Date.now())
set_mockup_now(now)

/* Constants & Utils ------------------------------------------------------- */




/* Scenarios --------------------------------------------------------------- */
describe('Contracts deployment', async () => {
  it('NFT contract deployment should succeed', async () => {
    await fa2.deploy(alice.get_address(),  { as: alice })
  });
  it('Royalties contract deployment should succeed', async () => {
    await royalties.deploy(alice.get_address(),  { as: alice })
  });
  it('Whitelist storage contract deployment should succeed', async () => {
    await users_storage.deploy(alice.get_address(),  { as: alice })
  });
  it('Sales storage contract deployment should succeed', async () => {
    await sales_storage.deploy(alice.get_address(),  { as: alice })
  });
  it('Transfer Manager contract deployment should succeed', async () => {
    await transfer_manager.deploy(alice.get_address(), royalties.get_address(), alice.get_address(), { as: alice })
  });
  it('Whitelist contract deployment should succeed', async () => {
    await whitelist.deploy(alice.get_address(), users_storage.get_address(), { as: alice })
  });
  it('Sales contract deployment should succeed', async () => {
    await sales.deploy(alice.get_address(), new Nat(0), transfer_manager.get_address(), sales_storage.get_address(),  { as: alice })
  });
});

describe('Set up', async () => {
  it('Add Alice as whitelister should succeed', async () => {
    await users_storage.add_whitelister(whitelist.get_address(), { as: alice })
    await whitelist.add_whitelister(alice.get_address(), { as: alice })
    await whitelist.add_super_user(alice.get_address(), { as: alice })
  });

  it('Add Alice, Bob and Carl to whitelist should succeed', async () => {
    await whitelist.update_users([
      [alice.get_address(), Option.Some<Nat>(new Nat(0))],
      [bob.get_address(), Option.Some<Nat>(new Nat(0))],
      [carl.get_address(), Option.Some<Nat>(new Nat(0))]
    ], { as: alice })
  });

  it('Mint NFT', async () => {
    await fa2.mint(alice.get_address(),new Nat(0), new Nat(3), { as: alice })
  });

  it('Update operator NFT', async () => {
    await fa2.update_operators([
        Or.Left<operator_param, operator_param>(new operator_param(alice.get_address(), transfer_manager.get_address(), new Nat(0)))
      ],
      { as: alice }
    );
  });
});
