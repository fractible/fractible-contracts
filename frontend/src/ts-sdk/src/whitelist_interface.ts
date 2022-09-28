
import {
    TezosToolkit,
    BigMapAbstraction,
    MichelsonMap,
    OriginationOperation,
    OpKind,
    createTransferOperation,
    TransferParams,
    RPCOperation,
    createRevealOperation
} from "@taquito/taquito"
import { MichelsonV1Expression } from "@taquito/rpc"
import { RpcClient } from '@taquito/rpc';
import { encodeOpHash } from '@taquito/utils';
import { Parser } from '@taquito/michel-codec';
import { stringify } from "querystring"
import { JSONbig } from "./functolib"
import * as functolib from "./functolib";

let whitelist_code = require('./whitelist_code.json')


export type update_users = [functolib.address, functolib.option<functolib.nat>][]
export function update_users_encode(arg: update_users): MichelsonV1Expression { return functolib.list_encode(functolib.tuple2_encode(functolib.address_encode, functolib.option_encode(functolib.nat_encode)))(arg) }
export function update_users_decode(arg: MichelsonV1Expression): update_users { return (functolib.list_decode(functolib.tuple2_decode(functolib.address_decode, functolib.option_decode(functolib.nat_decode))))(arg) }
export let update_users_micheline = (functolib.list_micheline(functolib.tuple2_micheline(functolib.address_micheline,
    (functolib.option_micheline(functolib.nat_micheline)))))
export let update_users_generator = function(): update_users {
    return (functolib.list_generator((functolib.tuple2_generator(functolib.address_generator,
        (functolib.option_generator(functolib.nat_generator))))))()
}

export async function call_update_users(tk: TezosToolkit,
    update_users_kt1: string,
    param: update_users, amount?: number): Promise<functolib.operation_result> {
    let res = update_users_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, update_users_kt1, 'update_users', res, amount);
}

export type transfer_list_id = functolib.nat
export function transfer_list_id_encode(arg: transfer_list_id): MichelsonV1Expression { return functolib.nat_encode(arg) }
export function transfer_list_id_decode(m: MichelsonV1Expression): transfer_list_id { return (functolib.nat_decode(m)); }
export let transfer_list_id_micheline = functolib.nat_micheline
export let transfer_list_id_generator = function(): transfer_list_id { return functolib.nat_generator() }

export type user = functolib.address
export function user_encode(arg: user): MichelsonV1Expression { return functolib.address_encode(arg) }
export function user_decode(m: MichelsonV1Expression): user { return (functolib.address_decode(m)); }
export let user_micheline = functolib.address_micheline
export let user_generator = function(): user { return functolib.address_generator() }

export type update_user = { transfer_list_id: functolib.option<transfer_list_id>, user: user }
export function update_user_encode(arg: update_user): MichelsonV1Expression {
    return { prim: 'Pair', args: [(user_encode(arg.user)), (functolib.option_encode(transfer_list_id_encode)(arg.transfer_list_id))] }
}
export function update_user_decode(arg: MichelsonV1Expression): update_user {
    let before_projection = (functolib.tuple2_decode(user_decode, functolib.option_decode(transfer_list_id_decode)))(arg);
    return {
        user: (before_projection[0]),
        transfer_list_id: (before_projection[1])
    }

}
let update_user_micheline = { prim: 'Pair', args: [(user_micheline), ((functolib.option_micheline(transfer_list_id_micheline)))] }
export function update_user_generator(): update_user { return ({ transfer_list_id: (functolib.option_generator(transfer_list_id_generator))(), user: user_generator() }) }

export async function call_update_user(tk: TezosToolkit,
    update_user_kt1: string,
    param: update_user, amount?: number): Promise<functolib.operation_result> {
    let res = update_user_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, update_user_kt1, 'update_user', res, amount);
}

export type u = [functolib.bool, transfer_list_id[]]
let u_encode = functolib.tuple2_encode(functolib.bool_encode, functolib.set_encode(transfer_list_id_encode))
export { u_encode }
export let u_decode = functolib.tuple2_decode(functolib.bool_decode, functolib.set_decode(transfer_list_id_decode))
let u_micheline = functolib.tuple2_micheline(functolib.bool_micheline,
    (functolib.set_micheline(transfer_list_id_micheline)))
export function u_generator(): u {
    return (functolib.tuple2_generator(functolib.bool_generator,
        (functolib.set_generator(transfer_list_id_generator))))()
}

export type update_transfer_list = { u: functolib.option<u>, transfer_list_id: transfer_list_id }
export function update_transfer_list_encode(arg: update_transfer_list): MichelsonV1Expression {
    return { prim: 'Pair', args: [(transfer_list_id_encode(arg.transfer_list_id)), (functolib.option_encode(u_encode)(arg.u))] }
}
export function update_transfer_list_decode(arg: MichelsonV1Expression): update_transfer_list {
    let before_projection = (functolib.tuple2_decode(transfer_list_id_decode, functolib.option_decode(u_decode)))(arg);
    return {
        transfer_list_id: (before_projection[0]),
        u: (before_projection[1])
    }

}
let update_transfer_list_micheline = { prim: 'Pair', args: [(transfer_list_id_micheline), ((functolib.option_micheline(u_micheline)))] }
export function update_transfer_list_generator(): update_transfer_list { return ({ u: (functolib.option_generator(u_generator))(), transfer_list_id: transfer_list_id_generator() }) }

export async function call_update_transfer_list(tk: TezosToolkit,
    update_transfer_list_kt1: string,
    param: update_transfer_list, amount?: number): Promise<functolib.operation_result> {
    let res = update_transfer_list_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, update_transfer_list_kt1, 'update_transfer_list', res, amount);
}

export type unpause = functolib.unit
export function unpause_encode(arg: unpause): MichelsonV1Expression { return functolib.unit_encode(arg) }
export function unpause_decode(m: MichelsonV1Expression): unpause { return (functolib.unit_decode(m)); }
export let unpause_micheline = functolib.unit_micheline
export let unpause_generator = function(): unpause { return functolib.unit_generator() }

export async function call_unpause(tk: TezosToolkit,
    unpause_kt1: string,
    param: unpause, amount?: number): Promise<functolib.operation_result> {
    let res = unpause_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, unpause_kt1, 'unpause', res, amount);
}

export type set_users_contract = user

export function set_users_contract_encode(arg: set_users_contract): MichelsonV1Expression { return user_encode(arg) }

export function set_users_contract_decode(arg: MichelsonV1Expression): set_users_contract { return user_decode(arg) }

export let set_users_contract_micheline = user_micheline

export let set_users_contract_generator = function(): set_users_contract { return user_generator() }

export async function call_set_users_contract(tk: TezosToolkit,
    set_users_contract_kt1: string,
    param: set_users_contract, amount?: number): Promise<functolib.operation_result> {
    let res = set_users_contract_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_users_contract_kt1, 'set_users_contract', res, amount);
}

export type remove_whitelister = user

export function remove_whitelister_encode(arg: remove_whitelister): MichelsonV1Expression { return user_encode(arg) }

export function remove_whitelister_decode(arg: MichelsonV1Expression): remove_whitelister { return user_decode(arg) }

export let remove_whitelister_micheline = user_micheline

export let remove_whitelister_generator = function(): remove_whitelister { return user_generator() }

export async function call_remove_whitelister(tk: TezosToolkit,
    remove_whitelister_kt1: string,
    param: remove_whitelister, amount?: number): Promise<functolib.operation_result> {
    let res = remove_whitelister_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, remove_whitelister_kt1, 'remove_whitelister', res, amount);
}

export type remove_super_user = user

export function remove_super_user_encode(arg: remove_super_user): MichelsonV1Expression { return user_encode(arg) }

export function remove_super_user_decode(arg: MichelsonV1Expression): remove_super_user { return user_decode(arg) }

export let remove_super_user_micheline = user_micheline

export let remove_super_user_generator = function(): remove_super_user { return user_generator() }

export async function call_remove_super_user(tk: TezosToolkit,
    remove_super_user_kt1: string,
    param: remove_super_user, amount?: number): Promise<functolib.operation_result> {
    let res = remove_super_user_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, remove_super_user_kt1, 'remove_super_user', res, amount);
}

export type pause = unpause

export function pause_encode(arg: pause): MichelsonV1Expression { return unpause_encode(arg) }

export function pause_decode(arg: MichelsonV1Expression): pause { return unpause_decode(arg) }

export let pause_micheline = unpause_micheline

export let pause_generator = function(): pause { return unpause_generator() }

export async function call_pause(tk: TezosToolkit,
    pause_kt1: string,
    param: pause, amount?: number): Promise<functolib.operation_result> {
    let res = pause_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, pause_kt1, 'pause', res, amount);
}

export type get_user = { callback: functolib.contract, user: user }
export function get_user_encode(arg: get_user): MichelsonV1Expression {
    return { prim: 'Pair', args: [(user_encode(arg.user)), (functolib.contract_encode(new Parser().parseJSON({ "prim": "option", "args": [{ "prim": "nat" }] }))(arg.callback))] }
}
export function get_user_decode(arg: MichelsonV1Expression): get_user {
    let before_projection = (functolib.tuple2_decode(user_decode, functolib.contract_decode(new Parser().parseJSON({ "prim": "option", "args": [{ "prim": "nat" }] }))))(arg);
    return {
        user: (before_projection[0]),
        callback: (before_projection[1])
    }

}
let get_user_micheline = { prim: 'Pair', args: [(user_micheline), ((functolib.contract_micheline(new Parser().parseJSON({ "prim": "option", "args": [{ "prim": "nat" }] }))))] }
export function get_user_generator(): get_user { return ({ callback: functolib.contract_generator(), user: user_generator() }) }

export async function call_get_user(tk: TezosToolkit,
    get_user_kt1: string,
    param: get_user, amount?: number): Promise<functolib.operation_result> {
    let res = get_user_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, get_user_kt1, 'get_user', res, amount);
}

export type declare_admin = user

export function declare_admin_encode(arg: declare_admin): MichelsonV1Expression { return user_encode(arg) }

export function declare_admin_decode(arg: MichelsonV1Expression): declare_admin { return user_decode(arg) }

export let declare_admin_micheline = user_micheline

export let declare_admin_generator = function(): declare_admin { return user_generator() }

export async function call_declare_admin(tk: TezosToolkit,
    declare_admin_kt1: string,
    param: declare_admin, amount?: number): Promise<functolib.operation_result> {
    let res = declare_admin_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, declare_admin_kt1, 'declare_admin', res, amount);
}

export type claim_admin = unpause

export function claim_admin_encode(arg: claim_admin): MichelsonV1Expression { return unpause_encode(arg) }

export function claim_admin_decode(arg: MichelsonV1Expression): claim_admin { return unpause_decode(arg) }

export let claim_admin_micheline = unpause_micheline

export let claim_admin_generator = function(): claim_admin { return unpause_generator() }

export async function call_claim_admin(tk: TezosToolkit,
    claim_admin_kt1: string,
    param: claim_admin, amount?: number): Promise<functolib.operation_result> {
    let res = claim_admin_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, claim_admin_kt1, 'claim_admin', res, amount);
}

export type assert_transfers = [user, user[]][]
export function assert_transfers_encode(arg: assert_transfers): MichelsonV1Expression { return functolib.list_encode(functolib.tuple2_encode(user_encode, functolib.list_encode(user_encode)))(arg) }
export function assert_transfers_decode(arg: MichelsonV1Expression): assert_transfers { return (functolib.list_decode(functolib.tuple2_decode(user_decode, functolib.list_decode(user_decode))))(arg) }
export let assert_transfers_micheline = (functolib.list_micheline(functolib.tuple2_micheline(user_micheline,
    (functolib.list_micheline(user_micheline)))))
export let assert_transfers_generator = function(): assert_transfers {
    return (functolib.list_generator((functolib.tuple2_generator(user_generator,
        (functolib.list_generator(user_generator))))))()
}

export async function call_assert_transfers(tk: TezosToolkit,
    assert_transfers_kt1: string,
    param: assert_transfers, amount?: number): Promise<functolib.operation_result> {
    let res = assert_transfers_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, assert_transfers_kt1, 'assert_transfers', res, amount);
}

export type assert_transfer_list = { to_transfer_list_id: transfer_list_id, from_transfer_list_id: transfer_list_id }
export function assert_transfer_list_encode(arg: assert_transfer_list): MichelsonV1Expression {
    return { prim: 'Pair', args: [(transfer_list_id_encode(arg.from_transfer_list_id)), (transfer_list_id_encode(arg.to_transfer_list_id))] }
}
export function assert_transfer_list_decode(arg: MichelsonV1Expression): assert_transfer_list {
    let before_projection = (functolib.tuple2_decode(transfer_list_id_decode, transfer_list_id_decode))(arg);
    return {
        from_transfer_list_id: (before_projection[0]),
        to_transfer_list_id: (before_projection[1])
    }

}
let assert_transfer_list_micheline = { prim: 'Pair', args: [(transfer_list_id_micheline), (transfer_list_id_micheline)] }
export function assert_transfer_list_generator(): assert_transfer_list { return ({ to_transfer_list_id: transfer_list_id_generator(), from_transfer_list_id: transfer_list_id_generator() }) }

export async function call_assert_transfer_list(tk: TezosToolkit,
    assert_transfer_list_kt1: string,
    param: assert_transfer_list, amount?: number): Promise<functolib.operation_result> {
    let res = assert_transfer_list_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, assert_transfer_list_kt1, 'assert_transfer_list', res, amount);
}

export type assert_receivers = user[]
export function assert_receivers_encode(arg: assert_receivers): MichelsonV1Expression { return functolib.list_encode(user_encode)(arg) }
export function assert_receivers_decode(arg: MichelsonV1Expression): assert_receivers { return (functolib.list_decode(user_decode))(arg) }
export let assert_receivers_micheline = (functolib.list_micheline(user_micheline))
export let assert_receivers_generator = function(): assert_receivers { return (functolib.list_generator(user_generator))() }

export async function call_assert_receivers(tk: TezosToolkit,
    assert_receivers_kt1: string,
    param: assert_receivers, amount?: number): Promise<functolib.operation_result> {
    let res = assert_receivers_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, assert_receivers_kt1, 'assert_receivers', res, amount);
}

export type add_whitelister = user

export function add_whitelister_encode(arg: add_whitelister): MichelsonV1Expression { return user_encode(arg) }

export function add_whitelister_decode(arg: MichelsonV1Expression): add_whitelister { return user_decode(arg) }

export let add_whitelister_micheline = user_micheline

export let add_whitelister_generator = function(): add_whitelister { return user_generator() }

export async function call_add_whitelister(tk: TezosToolkit,
    add_whitelister_kt1: string,
    param: add_whitelister, amount?: number): Promise<functolib.operation_result> {
    let res = add_whitelister_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, add_whitelister_kt1, 'add_whitelister', res, amount);
}

export type add_super_user = user

export function add_super_user_encode(arg: add_super_user): MichelsonV1Expression { return user_encode(arg) }

export function add_super_user_decode(arg: MichelsonV1Expression): add_super_user { return user_decode(arg) }

export let add_super_user_micheline = user_micheline

export let add_super_user_generator = function(): add_super_user { return user_generator() }

export async function call_add_super_user(tk: TezosToolkit,
    add_super_user_kt1: string,
    param: add_super_user, amount?: number): Promise<functolib.operation_result> {
    let res = add_super_user_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, add_super_user_kt1, 'add_super_user', res, amount);
}

export type unrestricted = functolib.bool
export function unrestricted_encode(arg: unrestricted): MichelsonV1Expression { return functolib.bool_encode(arg) }
export function unrestricted_decode(m: MichelsonV1Expression): unrestricted { return (functolib.bool_decode(m)); }
export let unrestricted_micheline = functolib.bool_micheline
export let unrestricted_generator = function(): unrestricted { return functolib.bool_generator() }

export type type0 = { allowed_transfer_lists: transfer_list_id[], unrestricted: unrestricted }
export function type0_encode(arg: type0): MichelsonV1Expression {
    return { prim: 'Pair', args: [(unrestricted_encode(arg.unrestricted)), (functolib.set_encode(transfer_list_id_encode)(arg.allowed_transfer_lists))] }
}
export function type0_decode(arg: MichelsonV1Expression): type0 {
    let before_projection = (functolib.tuple2_decode(unrestricted_decode, functolib.set_decode(transfer_list_id_decode)))(arg);
    return {
        unrestricted: (before_projection[0]),
        allowed_transfer_lists: (before_projection[1])
    }

}
let type0_micheline = { prim: 'Pair', args: [(unrestricted_micheline), ((functolib.set_micheline(transfer_list_id_micheline)))] }
export function type0_generator(): type0 { return ({ allowed_transfer_lists: (functolib.set_generator(transfer_list_id_generator))(), unrestricted: unrestricted_generator() }) }

export type storage = { transfer_lists: functolib.big_map<transfer_list_id, type0>, whitelister: user[], super_users: user[], paused: unrestricted, admin_candidate: functolib.option<user>, users: user, admin: user }
export function storage_encode(arg: storage): MichelsonV1Expression {
    return { prim: 'Pair', args: [(user_encode(arg.admin)), { prim: 'Pair', args: [(user_encode(arg.users)), { prim: 'Pair', args: [(functolib.option_encode(user_encode)(arg.admin_candidate)), { prim: 'Pair', args: [(unrestricted_encode(arg.paused)), { prim: 'Pair', args: [(functolib.set_encode(user_encode)(arg.super_users)), { prim: 'Pair', args: [(functolib.set_encode(user_encode)(arg.whitelister)), (functolib.big_map_encode(transfer_list_id_encode, type0_encode)(arg.transfer_lists))] }] }] }] }] }] }
}
export function storage_decode(arg: MichelsonV1Expression): storage {
    let before_projection = (functolib.tuple2_decode(user_decode, (functolib.tuple2_decode(user_decode, (functolib.tuple2_decode(functolib.option_decode(user_decode), (functolib.tuple2_decode(unrestricted_decode, (functolib.tuple2_decode(functolib.set_decode(user_decode), (functolib.tuple2_decode(functolib.set_decode(user_decode), functolib.big_map_decode(transfer_list_id_decode, type0_decode)))))))))))))(arg);
    return {
        admin: (before_projection[0]),
        users: (before_projection[1][0]),
        admin_candidate: (before_projection[1][1][0]),
        paused: (before_projection[1][1][1][0]),
        super_users: (before_projection[1][1][1][1][0]),
        whitelister: (before_projection[1][1][1][1][1][0]),
        transfer_lists: (before_projection[1][1][1][1][1][1])
    }

}
let storage_micheline = { prim: 'Pair', args: [(user_micheline), { prim: 'Pair', args: [(user_micheline), { prim: 'Pair', args: [((functolib.option_micheline(user_micheline))), { prim: 'Pair', args: [(unrestricted_micheline), { prim: 'Pair', args: [((functolib.set_micheline(user_micheline))), { prim: 'Pair', args: [((functolib.set_micheline(user_micheline))), (functolib.big_map_micheline(transfer_list_id_micheline, type0_micheline))] }] }] }] }] }] }
export function storage_generator(): storage { return ({ transfer_lists: (functolib.big_map_generator(transfer_list_id_generator, type0_generator))(), whitelister: (functolib.set_generator(user_generator))(), super_users: (functolib.set_generator(user_generator))(), paused: unrestricted_generator(), admin_candidate: (functolib.option_generator(user_generator))(), users: user_generator(), admin: user_generator() }) }



async function deploy_whitelist_raw(
    tezosKit: TezosToolkit,
    storage: MichelsonV1Expression,
    config: any,
    debug = false): Promise<string> {
    console.log("[deploy_whitelist_raw] Deploying new whitelist smart contract");
    try {
        if (debug) { console.log(`whitelist initial storage ${JSON.stringify(storage)}`) }
        const client = new RpcClient(config.node_addr);
        var b = await client.getBlock();
        let origination_op = await tezosKit.contract
            .originate({
                code: whitelist_code,
                init: storage
            })
        console.log(`Waiting for confirmation of origination for ${origination_op.contractAddress}...`);
        var contract = await origination_op.contract();
        console.log(`Origination completed.`);
        return contract.address

    } catch (error) {
        console.log(`ERROR in deploy storage: ${JSON.stringify(error)}`)
        throw error
    }
}


export async function deploy_whitelist(
    tezosKit: TezosToolkit,
    storage: storage,
    config: any,
    debug = false): Promise<string> {
    let kt1_address = await deploy_whitelist_raw(tezosKit, storage_encode(storage), config, debug);
    return kt1_address;
}

export type Storage_type = storage
export let Storage_type_encode = storage_encode
export let Storage_type_decode = storage_decode




const p = new Parser();
export let initial_blockchain_storage: storage = {
    admin: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
    users: "KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ",
    admin_candidate: null,
    paused: false,
    super_users: ["tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"],
    whitelister: ["tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"],
    transfer_lists: { kind: 'abstract', value: BigInt("178554") }
}
/*
 {"prim":"Pair","args":[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"},{"string":"KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ"},{"prim":"None"},{"prim":"False"},[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"}],[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"}],{"int":"178554"}]}
*/
