import { blake2b, Bytes, expect_to_fail, get_account, Key, Nat, Option, Or, pair_to_mich, set_mockup, set_mockup_now, set_quiet, Signature, string_to_mich } from '@completium/experiment-ts'
import { fa2 } from './binding/nft-contract';


const assert = require('assert');

/* Contracts */

import { royalties } from './binding/royalties';
import { sales } from './binding/sales';
import { sales_storage } from './binding/sales-storage';
import { transfer_manager } from './binding/transfer-manager';
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
