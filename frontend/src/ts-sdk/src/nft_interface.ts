
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

let nft_code = require('./nft_code.json')


export type add_for_all = functolib.address
export function add_for_all_encode(arg: add_for_all): MichelsonV1Expression { return functolib.address_encode(arg) }
export function add_for_all_decode(m: MichelsonV1Expression): add_for_all { return (functolib.address_decode(m)); }
export let add_for_all_micheline = functolib.address_micheline
export let add_for_all_generator = function(): add_for_all { return functolib.address_generator() }


type type0_Remove_for_all_constructor_subtype = { kind: "Remove_for_all_constructor"; Remove_for_all_element: add_for_all }
type type0_Add_for_all_constructor_subtype = { kind: "Add_for_all_constructor"; Add_for_all_element: add_for_all }
export type type0 =
    type0_Remove_for_all_constructor_subtype |
    type0_Add_for_all_constructor_subtype

export function type0_encode(arg: type0): MichelsonV1Expression {

    switch (arg.kind) {
        case ("Add_for_all_constructor"):
            return {
                prim: 'Left',
                args: [add_for_all_encode(arg.Add_for_all_element)]
            }

        case ("Remove_for_all_constructor"):
            return {
                prim: 'Right',
                args: [add_for_all_encode(arg.Remove_for_all_element)]
            }

    }
}
export function type0_decode(arg: MichelsonV1Expression): type0 {
    let p = functolib.retrieve_path_from_sumtype_typescript(arg);


    if (functolib.arrayEquals(p[0], [true])) {
        return { kind: "Add_for_all_constructor", Add_for_all_element: (add_for_all_decode(p[1])) }
    }

    if (functolib.arrayEquals(p[0], [false])) {
        return { kind: "Remove_for_all_constructor", Remove_for_all_element: (add_for_all_decode(p[1])) }
    }
    throw "unknown primitive in output_sumtype_decode"
}
let type0_micheline = {
    prim: "or",
    args: [(add_for_all_micheline), (add_for_all_micheline)]
}

export function type0_generator(): type0 {
    return
    functolib.chooseFrom
        ([({ kind: "Add_for_all_constructor", value: (add_for_all_generator()) }), ({ kind: "Remove_for_all_constructor", value: (add_for_all_generator()) })])
}

export type update_operators_for_all = type0[]
export function update_operators_for_all_encode(arg: update_operators_for_all): MichelsonV1Expression { return functolib.list_encode(type0_encode)(arg) }
export function update_operators_for_all_decode(arg: MichelsonV1Expression): update_operators_for_all { return (functolib.list_decode(type0_decode))(arg) }
export let update_operators_for_all_micheline = (functolib.list_micheline(type0_micheline))
export let update_operators_for_all_generator = function(): update_operators_for_all { return (functolib.list_generator(type0_generator))() }

export async function call_update_operators_for_all(tk: TezosToolkit,
    update_operators_for_all_kt1: string,
    param: update_operators_for_all, amount?: number): Promise<functolib.operation_result> {
    let res = update_operators_for_all_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, update_operators_for_all_kt1, 'update_operators_for_all', res, amount);
}

export type token_id = functolib.nat
export function token_id_encode(arg: token_id): MichelsonV1Expression { return functolib.nat_encode(arg) }
export function token_id_decode(m: MichelsonV1Expression): token_id { return (functolib.nat_decode(m)); }
export let token_id_micheline = functolib.nat_micheline
export let token_id_generator = function(): token_id { return functolib.nat_generator() }

export type add_operator = { token_id: token_id, operator: add_for_all, owner: add_for_all }
export function add_operator_encode(arg: add_operator): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.owner)), { prim: 'Pair', args: [(add_for_all_encode(arg.operator)), (token_id_encode(arg.token_id))] }] }
}
export function add_operator_decode(arg: MichelsonV1Expression): add_operator {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, (functolib.tuple2_decode(add_for_all_decode, token_id_decode))))(arg);
    return {
        owner: (before_projection[0]),
        operator: (before_projection[1][0]),
        token_id: (before_projection[1][1])
    }

}
let add_operator_micheline = { prim: 'Pair', args: [(add_for_all_micheline), { prim: 'Pair', args: [(add_for_all_micheline), (token_id_micheline)] }] }
export function add_operator_generator(): add_operator { return ({ token_id: token_id_generator(), operator: add_for_all_generator(), owner: add_for_all_generator() }) }


type type1_Remove_operator_constructor_subtype = { kind: "Remove_operator_constructor"; Remove_operator_element: add_operator }
type type1_Add_operator_constructor_subtype = { kind: "Add_operator_constructor"; Add_operator_element: add_operator }
export type type1 =
    type1_Remove_operator_constructor_subtype |
    type1_Add_operator_constructor_subtype

export function type1_encode(arg: type1): MichelsonV1Expression {

    switch (arg.kind) {
        case ("Add_operator_constructor"):
            return {
                prim: 'Left',
                args: [add_operator_encode(arg.Add_operator_element)]
            }

        case ("Remove_operator_constructor"):
            return {
                prim: 'Right',
                args: [add_operator_encode(arg.Remove_operator_element)]
            }

    }
}
export function type1_decode(arg: MichelsonV1Expression): type1 {
    let p = functolib.retrieve_path_from_sumtype_typescript(arg);


    if (functolib.arrayEquals(p[0], [true])) {
        return { kind: "Add_operator_constructor", Add_operator_element: (add_operator_decode(p[1])) }
    }

    if (functolib.arrayEquals(p[0], [false])) {
        return { kind: "Remove_operator_constructor", Remove_operator_element: (add_operator_decode(p[1])) }
    }
    throw "unknown primitive in output_sumtype_decode"
}
let type1_micheline = {
    prim: "or",
    args: [(add_operator_micheline), (add_operator_micheline)]
}

export function type1_generator(): type1 {
    return
    functolib.chooseFrom
        ([({ kind: "Add_operator_constructor", value: (add_operator_generator()) }), ({ kind: "Remove_operator_constructor", value: (add_operator_generator()) })])
}

export type update_operators = type1[]
export function update_operators_encode(arg: update_operators): MichelsonV1Expression { return functolib.list_encode(type1_encode)(arg) }
export function update_operators_decode(arg: MichelsonV1Expression): update_operators { return (functolib.list_decode(type1_decode))(arg) }
export let update_operators_micheline = (functolib.list_micheline(type1_micheline))
export let update_operators_generator = function(): update_operators { return (functolib.list_generator(type1_generator))() }

export async function call_update_operators(tk: TezosToolkit,
    update_operators_kt1: string,
    param: update_operators, amount?: number): Promise<functolib.operation_result> {
    let res = update_operators_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, update_operators_kt1, 'update_operators', res, amount);
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

export type type2 = { amount: token_id, token_id: token_id, to_: add_for_all }
export function type2_encode(arg: type2): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.to_)), { prim: 'Pair', args: [(token_id_encode(arg.token_id)), (token_id_encode(arg.amount))] }] }
}
export function type2_decode(arg: MichelsonV1Expression): type2 {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, (functolib.tuple2_decode(token_id_decode, token_id_decode))))(arg);
    return {
        to_: (before_projection[0]),
        token_id: (before_projection[1][0]),
        amount: (before_projection[1][1])
    }

}
let type2_micheline = { prim: 'Pair', args: [(add_for_all_micheline), { prim: 'Pair', args: [(token_id_micheline), (token_id_micheline)] }] }
export function type2_generator(): type2 { return ({ amount: token_id_generator(), token_id: token_id_generator(), to_: add_for_all_generator() }) }

export type type3 = { txs: type2[], from_: add_for_all }
export function type3_encode(arg: type3): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.from_)), (functolib.list_encode(type2_encode)(arg.txs))] }
}
export function type3_decode(arg: MichelsonV1Expression): type3 {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, functolib.list_decode(type2_decode)))(arg);
    return {
        from_: (before_projection[0]),
        txs: (before_projection[1])
    }

}
let type3_micheline = { prim: 'Pair', args: [(add_for_all_micheline), ((functolib.list_micheline(type2_micheline)))] }
export function type3_generator(): type3 { return ({ txs: (functolib.list_generator(type2_generator))(), from_: add_for_all_generator() }) }

export type transfer = type3[]
export function transfer_encode(arg: transfer): MichelsonV1Expression { return functolib.list_encode(type3_encode)(arg) }
export function transfer_decode(arg: MichelsonV1Expression): transfer { return (functolib.list_decode(type3_decode))(arg) }
export let transfer_micheline = (functolib.list_micheline(type3_micheline))
export let transfer_generator = function(): transfer { return (functolib.list_generator(type3_generator))() }

export async function call_transfer(tk: TezosToolkit,
    transfer_kt1: string,
    param: transfer, amount?: number): Promise<functolib.operation_result> {
    let res = transfer_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, transfer_kt1, 'transfer', res, amount);
}

export type set_whitelist = add_for_all

export function set_whitelist_encode(arg: set_whitelist): MichelsonV1Expression { return add_for_all_encode(arg) }

export function set_whitelist_decode(arg: MichelsonV1Expression): set_whitelist { return add_for_all_decode(arg) }

export let set_whitelist_micheline = add_for_all_micheline

export let set_whitelist_generator = function(): set_whitelist { return add_for_all_generator() }

export async function call_set_whitelist(tk: TezosToolkit,
    set_whitelist_kt1: string,
    param: set_whitelist, amount?: number): Promise<functolib.operation_result> {
    let res = set_whitelist_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_whitelist_kt1, 'set_whitelist', res, amount);
}

export type set_token_metadata = { tdata: functolib.map<string, functolib.bytes>, tid: token_id }
export function set_token_metadata_encode(arg: set_token_metadata): MichelsonV1Expression {
    return { prim: 'Pair', args: [(token_id_encode(arg.tid)), (functolib.map_encode(functolib.string_encode, functolib.bytes_encode)(arg.tdata))] }
}
export function set_token_metadata_decode(arg: MichelsonV1Expression): set_token_metadata {
    let before_projection = (functolib.tuple2_decode(token_id_decode, functolib.map_decode(functolib.string_decode, functolib.bytes_decode)))(arg);
    return {
        tid: (before_projection[0]),
        tdata: (before_projection[1])
    }

}
let set_token_metadata_micheline = { prim: 'Pair', args: [(token_id_micheline), ((functolib.map_micheline(functolib.string_micheline, functolib.bytes_micheline)))] }
export function set_token_metadata_generator(): set_token_metadata { return ({ tdata: (functolib.map_generator(functolib.string_generator, functolib.bytes_generator))(), tid: token_id_generator() }) }

export async function call_set_token_metadata(tk: TezosToolkit,
    set_token_metadata_kt1: string,
    param: set_token_metadata, amount?: number): Promise<functolib.operation_result> {
    let res = set_token_metadata_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_token_metadata_kt1, 'set_token_metadata', res, amount);
}

export type d = functolib.bytes
export function d_encode(arg: d): MichelsonV1Expression { return functolib.bytes_encode(arg) }
export function d_decode(m: MichelsonV1Expression): d { return (functolib.bytes_decode(m)); }
export let d_micheline = functolib.bytes_micheline
export let d_generator = function(): d { return functolib.bytes_generator() }

export type k = string
export function k_encode(arg: k): MichelsonV1Expression { return functolib.string_encode(arg) }
export function k_decode(m: MichelsonV1Expression): k { return (functolib.string_decode(m)); }
export let k_micheline = functolib.string_micheline
export let k_generator = function(): k { return functolib.string_generator() }

export type set_metadata = { d: functolib.option<d>, k: k }
export function set_metadata_encode(arg: set_metadata): MichelsonV1Expression {
    return { prim: 'Pair', args: [(k_encode(arg.k)), (functolib.option_encode(d_encode)(arg.d))] }
}
export function set_metadata_decode(arg: MichelsonV1Expression): set_metadata {
    let before_projection = (functolib.tuple2_decode(k_decode, functolib.option_decode(d_decode)))(arg);
    return {
        k: (before_projection[0]),
        d: (before_projection[1])
    }

}
let set_metadata_micheline = { prim: 'Pair', args: [(k_micheline), ((functolib.option_micheline(d_micheline)))] }
export function set_metadata_generator(): set_metadata { return ({ d: (functolib.option_generator(d_generator))(), k: k_generator() }) }

export async function call_set_metadata(tk: TezosToolkit,
    set_metadata_kt1: string,
    param: set_metadata, amount?: number): Promise<functolib.operation_result> {
    let res = set_metadata_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_metadata_kt1, 'set_metadata', res, amount);
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

export type mint = { nbt: token_id, tid: token_id, tow: add_for_all }
export function mint_encode(arg: mint): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.tow)), { prim: 'Pair', args: [(token_id_encode(arg.tid)), (token_id_encode(arg.nbt))] }] }
}
export function mint_decode(arg: MichelsonV1Expression): mint {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, (functolib.tuple2_decode(token_id_decode, token_id_decode))))(arg);
    return {
        tow: (before_projection[0]),
        tid: (before_projection[1][0]),
        nbt: (before_projection[1][1])
    }

}
let mint_micheline = { prim: 'Pair', args: [(add_for_all_micheline), { prim: 'Pair', args: [(token_id_micheline), (token_id_micheline)] }] }
export function mint_generator(): mint { return ({ nbt: token_id_generator(), tid: token_id_generator(), tow: add_for_all_generator() }) }

export async function call_mint(tk: TezosToolkit,
    mint_kt1: string,
    param: mint, amount?: number): Promise<functolib.operation_result> {
    let res = mint_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, mint_kt1, 'mint', res, amount);
}

export type declare_ownership = add_for_all

export function declare_ownership_encode(arg: declare_ownership): MichelsonV1Expression { return add_for_all_encode(arg) }

export function declare_ownership_decode(arg: MichelsonV1Expression): declare_ownership { return add_for_all_decode(arg) }

export let declare_ownership_micheline = add_for_all_micheline

export let declare_ownership_generator = function(): declare_ownership { return add_for_all_generator() }

export async function call_declare_ownership(tk: TezosToolkit,
    declare_ownership_kt1: string,
    param: declare_ownership, amount?: number): Promise<functolib.operation_result> {
    let res = declare_ownership_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, declare_ownership_kt1, 'declare_ownership', res, amount);
}

export type claim_ownership = unpause

export function claim_ownership_encode(arg: claim_ownership): MichelsonV1Expression { return unpause_encode(arg) }

export function claim_ownership_decode(arg: MichelsonV1Expression): claim_ownership { return unpause_decode(arg) }

export let claim_ownership_micheline = unpause_micheline

export let claim_ownership_generator = function(): claim_ownership { return unpause_generator() }

export async function call_claim_ownership(tk: TezosToolkit,
    claim_ownership_kt1: string,
    param: claim_ownership, amount?: number): Promise<functolib.operation_result> {
    let res = claim_ownership_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, claim_ownership_kt1, 'claim_ownership', res, amount);
}

export type burn = { nbt: token_id, tid: token_id }
export function burn_encode(arg: burn): MichelsonV1Expression {
    return { prim: 'Pair', args: [(token_id_encode(arg.tid)), (token_id_encode(arg.nbt))] }
}
export function burn_decode(arg: MichelsonV1Expression): burn {
    let before_projection = (functolib.tuple2_decode(token_id_decode, token_id_decode))(arg);
    return {
        tid: (before_projection[0]),
        nbt: (before_projection[1])
    }

}
let burn_micheline = { prim: 'Pair', args: [(token_id_micheline), (token_id_micheline)] }
export function burn_generator(): burn { return ({ nbt: token_id_generator(), tid: token_id_generator() }) }

export async function call_burn(tk: TezosToolkit,
    burn_kt1: string,
    param: burn, amount?: number): Promise<functolib.operation_result> {
    let res = burn_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, burn_kt1, 'burn', res, amount);
}

export type type4 = { token_id: token_id, owner: add_for_all }
export function type4_encode(arg: type4): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.owner)), (token_id_encode(arg.token_id))] }
}
export function type4_decode(arg: MichelsonV1Expression): type4 {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, token_id_decode))(arg);
    return {
        owner: (before_projection[0]),
        token_id: (before_projection[1])
    }

}
let type4_micheline = { prim: 'Pair', args: [(add_for_all_micheline), (token_id_micheline)] }
export function type4_generator(): type4 { return ({ token_id: token_id_generator(), owner: add_for_all_generator() }) }

export type balance_of = { callback: functolib.contract, requests: type4[] }
export function balance_of_encode(arg: balance_of): MichelsonV1Expression {
    return { prim: 'Pair', args: [(functolib.list_encode(type4_encode)(arg.requests)), (functolib.contract_encode(new Parser().parseJSON({ "prim": "list", "args": [{ "prim": "pair", "args": [{ "prim": "pair", "args": [{ "prim": "address", "annots": ["%owner"] }, { "prim": "nat", "annots": ["%token_id"] }], "annots": ["%request"] }, { "prim": "nat", "annots": ["%balance"] }] }] }))(arg.callback))] }
}
export function balance_of_decode(arg: MichelsonV1Expression): balance_of {
    let before_projection = (functolib.tuple2_decode(functolib.list_decode(type4_decode), functolib.contract_decode(new Parser().parseJSON({ "prim": "list", "args": [{ "prim": "pair", "args": [{ "prim": "pair", "args": [{ "prim": "address", "annots": ["%owner"] }, { "prim": "nat", "annots": ["%token_id"] }], "annots": ["%request"] }, { "prim": "nat", "annots": ["%balance"] }] }] }))))(arg);
    return {
        requests: (before_projection[0]),
        callback: (before_projection[1])
    }

}
let balance_of_micheline = { prim: 'Pair', args: [((functolib.list_micheline(type4_micheline))), ((functolib.contract_micheline(new Parser().parseJSON({ "prim": "list", "args": [{ "prim": "pair", "args": [{ "prim": "pair", "args": [{ "prim": "address", "annots": ["%owner"] }, { "prim": "nat", "annots": ["%token_id"] }], "annots": ["%request"] }, { "prim": "nat", "annots": ["%balance"] }] }] }))))] }
export function balance_of_generator(): balance_of { return ({ callback: functolib.contract_generator(), requests: (functolib.list_generator(type4_generator))() }) }

export async function call_balance_of(tk: TezosToolkit,
    balance_of_kt1: string,
    param: balance_of, amount?: number): Promise<functolib.operation_result> {
    let res = balance_of_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, balance_of_kt1, 'balance_of', res, amount);
}

export type type5 = { token_info: functolib.map<k, d>, token_id: token_id }
export function type5_encode(arg: type5): MichelsonV1Expression {
    return { prim: 'Pair', args: [(token_id_encode(arg.token_id)), (functolib.map_encode(k_encode, d_encode)(arg.token_info))] }
}
export function type5_decode(arg: MichelsonV1Expression): type5 {
    let before_projection = (functolib.tuple2_decode(token_id_decode, functolib.map_decode(k_decode, d_decode)))(arg);
    return {
        token_id: (before_projection[0]),
        token_info: (before_projection[1])
    }

}
let type5_micheline = { prim: 'Pair', args: [(token_id_micheline), ((functolib.map_micheline(k_micheline, d_micheline)))] }
export function type5_generator(): type5 { return ({ token_info: (functolib.map_generator(k_generator, d_generator))(), token_id: token_id_generator() }) }

export type paused = functolib.bool
export function paused_encode(arg: paused): MichelsonV1Expression { return functolib.bool_encode(arg) }
export function paused_decode(m: MichelsonV1Expression): paused { return (functolib.bool_decode(m)); }
export let paused_micheline = functolib.bool_micheline
export let paused_generator = function(): paused { return functolib.bool_generator() }

export type storage = { metadata: functolib.big_map<k, d>, operator_for_all: functolib.big_map<[add_for_all, add_for_all], unpause>, operator: functolib.big_map<[add_for_all, [token_id, add_for_all]], unpause>, ledger: functolib.big_map<[add_for_all, token_id], token_id>, token_metadata: functolib.big_map<token_id, type5>, paused: paused, owner_candidate: functolib.option<add_for_all>, whitelist: add_for_all, owner: add_for_all }
export function storage_encode(arg: storage): MichelsonV1Expression {
    return { prim: 'Pair', args: [(add_for_all_encode(arg.owner)), { prim: 'Pair', args: [(add_for_all_encode(arg.whitelist)), { prim: 'Pair', args: [(functolib.option_encode(add_for_all_encode)(arg.owner_candidate)), { prim: 'Pair', args: [(paused_encode(arg.paused)), { prim: 'Pair', args: [(functolib.big_map_encode(token_id_encode, type5_encode)(arg.token_metadata)), { prim: 'Pair', args: [(functolib.big_map_encode(functolib.tuple2_encode(add_for_all_encode, token_id_encode), token_id_encode)(arg.ledger)), { prim: 'Pair', args: [(functolib.big_map_encode(functolib.tuple2_encode(add_for_all_encode, functolib.tuple2_encode(token_id_encode, add_for_all_encode)), unpause_encode)(arg.operator)), { prim: 'Pair', args: [(functolib.big_map_encode(functolib.tuple2_encode(add_for_all_encode, add_for_all_encode), unpause_encode)(arg.operator_for_all)), (functolib.big_map_encode(k_encode, d_encode)(arg.metadata))] }] }] }] }] }] }] }] }
}
export function storage_decode(arg: MichelsonV1Expression): storage {
    let before_projection = (functolib.tuple2_decode(add_for_all_decode, (functolib.tuple2_decode(add_for_all_decode, (functolib.tuple2_decode(functolib.option_decode(add_for_all_decode), (functolib.tuple2_decode(paused_decode, (functolib.tuple2_decode(functolib.big_map_decode(token_id_decode, type5_decode), (functolib.tuple2_decode(functolib.big_map_decode(functolib.tuple2_decode(add_for_all_decode, token_id_decode), token_id_decode), (functolib.tuple2_decode(functolib.big_map_decode(functolib.tuple2_decode(add_for_all_decode, functolib.tuple2_decode(token_id_decode, add_for_all_decode)), unpause_decode), (functolib.tuple2_decode(functolib.big_map_decode(functolib.tuple2_decode(add_for_all_decode, add_for_all_decode), unpause_decode), functolib.big_map_decode(k_decode, d_decode)))))))))))))))))(arg);
    return {
        owner: (before_projection[0]),
        whitelist: (before_projection[1][0]),
        owner_candidate: (before_projection[1][1][0]),
        paused: (before_projection[1][1][1][0]),
        token_metadata: (before_projection[1][1][1][1][0]),
        ledger: (before_projection[1][1][1][1][1][0]),
        operator: (before_projection[1][1][1][1][1][1][0]),
        operator_for_all: (before_projection[1][1][1][1][1][1][1][0]),
        metadata: (before_projection[1][1][1][1][1][1][1][1])
    }

}
let storage_micheline = {
    prim: 'Pair', args: [(add_for_all_micheline), {
        prim: 'Pair', args: [(add_for_all_micheline), {
            prim: 'Pair', args: [((functolib.option_micheline(add_for_all_micheline))), {
                prim: 'Pair', args: [(paused_micheline), {
                    prim: 'Pair', args: [(functolib.big_map_micheline(token_id_micheline, type5_micheline)), {
                        prim: 'Pair', args: [(functolib.big_map_micheline(functolib.tuple2_micheline(add_for_all_micheline,
                            token_id_micheline), token_id_micheline)), {
                                prim: 'Pair', args: [(functolib.big_map_micheline(functolib.tuple2_micheline(add_for_all_micheline,
                                    functolib.tuple2_micheline(token_id_micheline,
                                        add_for_all_micheline)), unpause_micheline)), {
                                            prim: 'Pair', args: [(functolib.big_map_micheline(functolib.tuple2_micheline(add_for_all_micheline,
                                                add_for_all_micheline), unpause_micheline)), (functolib.big_map_micheline(k_micheline, d_micheline))]
                                }]
                        }]
                    }]
                }]
            }]
        }]
    }]
}
export function storage_generator(): storage {
    return ({
        metadata: (functolib.big_map_generator(k_generator, d_generator))(), operator_for_all: (functolib.big_map_generator((functolib.tuple2_generator(add_for_all_generator,
            add_for_all_generator)), unpause_generator))(), operator: (functolib.big_map_generator((functolib.tuple2_generator(add_for_all_generator,
                (functolib.tuple2_generator(token_id_generator,
                    add_for_all_generator)))), unpause_generator))(), ledger: (functolib.big_map_generator((functolib.tuple2_generator(add_for_all_generator,
                        token_id_generator)), token_id_generator))(), token_metadata: (functolib.big_map_generator(token_id_generator, type5_generator))(), paused: paused_generator(), owner_candidate: (functolib.option_generator(add_for_all_generator))(), whitelist: add_for_all_generator(), owner: add_for_all_generator()
    })
}



async function deploy_nft_raw(
    tezosKit: TezosToolkit,
    storage: MichelsonV1Expression,
    config: any,
    debug = false): Promise<string> {
    console.log("[deploy_nft_raw] Deploying new nft smart contract");
    try {
        if (debug) { console.log(`nft initial storage ${JSON.stringify(storage)}`) }
        const client = new RpcClient(config.node_addr);
        var b = await client.getBlock();
        let origination_op = await tezosKit.contract
            .originate({
                code: nft_code,
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


export async function deploy_nft(
    tezosKit: TezosToolkit,
    storage: storage,
    config: any,
    debug = false): Promise<string> {
    let kt1_address = await deploy_nft_raw(tezosKit, storage_encode(storage), config, debug);
    return kt1_address;
}

export type Storage_type = storage
export let Storage_type_encode = storage_encode
export let Storage_type_decode = storage_decode




const p = new Parser();
export let initial_blockchain_storage: storage = {
    owner: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
    whitelist: "KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A",
    owner_candidate: null,
    paused: false,
    token_metadata: { kind: 'abstract', value: BigInt("178556") },
    ledger: { kind: 'abstract', value: BigInt("178557") },
    operator: { kind: 'abstract', value: BigInt("178558") },
    operator_for_all: { kind: 'abstract', value: BigInt("178559") },
    metadata: { kind: 'abstract', value: BigInt("178560") }
}
/*
 {"prim":"Pair","args":[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"},{"string":"KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A"},{"prim":"None"},{"prim":"False"},{"int":"178556"},{"int":"178557"},{"int":"178558"},{"int":"178559"},{"int":"178560"}]}
*/
