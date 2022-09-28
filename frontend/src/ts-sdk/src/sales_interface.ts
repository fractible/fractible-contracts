
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

let sales_code = require('./sales_code.json')


export type set_transfer_manager = functolib.address
export function set_transfer_manager_encode(arg: set_transfer_manager): MichelsonV1Expression { return functolib.address_encode(arg) }
export function set_transfer_manager_decode(m: MichelsonV1Expression): set_transfer_manager { return (functolib.address_decode(m)); }
export let set_transfer_manager_micheline = functolib.address_micheline
export let set_transfer_manager_generator = function(): set_transfer_manager { return functolib.address_generator() }

export async function call_set_transfer_manager(tk: TezosToolkit,
    set_transfer_manager_kt1: string,
    param: set_transfer_manager, amount?: number): Promise<functolib.operation_result> {
    let res = set_transfer_manager_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_transfer_manager_kt1, 'set_transfer_manager', res, amount);
}

export type set_sales_storage_contract = set_transfer_manager

export function set_sales_storage_contract_encode(arg: set_sales_storage_contract): MichelsonV1Expression { return set_transfer_manager_encode(arg) }

export function set_sales_storage_contract_decode(arg: MichelsonV1Expression): set_sales_storage_contract { return set_transfer_manager_decode(arg) }

export let set_sales_storage_contract_micheline = set_transfer_manager_micheline

export let set_sales_storage_contract_generator = function(): set_sales_storage_contract { return set_transfer_manager_generator() }

export async function call_set_sales_storage_contract(tk: TezosToolkit,
    set_sales_storage_contract_kt1: string,
    param: set_sales_storage_contract, amount?: number): Promise<functolib.operation_result> {
    let res = set_sales_storage_contract_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_sales_storage_contract_kt1, 'set_sales_storage_contract', res, amount);
}

export type set_sales_storage = set_transfer_manager

export function set_sales_storage_encode(arg: set_sales_storage): MichelsonV1Expression { return set_transfer_manager_encode(arg) }

export function set_sales_storage_decode(arg: MichelsonV1Expression): set_sales_storage { return set_transfer_manager_decode(arg) }

export let set_sales_storage_micheline = set_transfer_manager_micheline

export let set_sales_storage_generator = function(): set_sales_storage { return set_transfer_manager_generator() }

export async function call_set_sales_storage(tk: TezosToolkit,
    set_sales_storage_kt1: string,
    param: set_sales_storage, amount?: number): Promise<functolib.operation_result> {
    let res = set_sales_storage_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_sales_storage_kt1, 'set_sales_storage', res, amount);
}

export type set_protocol_fee = functolib.nat
export function set_protocol_fee_encode(arg: set_protocol_fee): MichelsonV1Expression { return functolib.nat_encode(arg) }
export function set_protocol_fee_decode(m: MichelsonV1Expression): set_protocol_fee { return (functolib.nat_decode(m)); }
export let set_protocol_fee_micheline = functolib.nat_micheline
export let set_protocol_fee_generator = function(): set_protocol_fee { return functolib.nat_generator() }

export async function call_set_protocol_fee(tk: TezosToolkit,
    set_protocol_fee_kt1: string,
    param: set_protocol_fee, amount?: number): Promise<functolib.operation_result> {
    let res = set_protocol_fee_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_protocol_fee_kt1, 'set_protocol_fee', res, amount);
}

export type set_max_bundle_items = set_protocol_fee

export function set_max_bundle_items_encode(arg: set_max_bundle_items): MichelsonV1Expression { return set_protocol_fee_encode(arg) }

export function set_max_bundle_items_decode(arg: MichelsonV1Expression): set_max_bundle_items { return set_protocol_fee_decode(arg) }

export let set_max_bundle_items_micheline = set_protocol_fee_micheline

export let set_max_bundle_items_generator = function(): set_max_bundle_items { return set_protocol_fee_generator() }

export async function call_set_max_bundle_items(tk: TezosToolkit,
    set_max_bundle_items_kt1: string,
    param: set_max_bundle_items, amount?: number): Promise<functolib.operation_result> {
    let res = set_max_bundle_items_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_max_bundle_items_kt1, 'set_max_bundle_items', res, amount);
}

export type set_fees_limit = set_protocol_fee

export function set_fees_limit_encode(arg: set_fees_limit): MichelsonV1Expression { return set_protocol_fee_encode(arg) }

export function set_fees_limit_decode(arg: MichelsonV1Expression): set_fees_limit { return set_protocol_fee_decode(arg) }

export let set_fees_limit_micheline = set_protocol_fee_micheline

export let set_fees_limit_generator = function(): set_fees_limit { return set_protocol_fee_generator() }

export async function call_set_fees_limit(tk: TezosToolkit,
    set_fees_limit_kt1: string,
    param: set_fees_limit, amount?: number): Promise<functolib.operation_result> {
    let res = set_fees_limit_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, set_fees_limit_kt1, 'set_fees_limit', res, amount);
}

export type sale_end = functolib.timestamp
export function sale_end_encode(arg: sale_end): MichelsonV1Expression { return functolib.timestamp_encode(arg) }
export function sale_end_decode(m: MichelsonV1Expression): sale_end { return (functolib.timestamp_decode(m)); }
export let sale_end_micheline = functolib.timestamp_micheline
export let sale_end_generator = function(): sale_end { return functolib.timestamp_generator() }

export type type0 = { part_value: set_protocol_fee, part_account: set_transfer_manager }
export function type0_encode(arg: type0): MichelsonV1Expression {
    return { prim: 'Pair', args: [(set_transfer_manager_encode(arg.part_account)), (set_protocol_fee_encode(arg.part_value))] }
}
export function type0_decode(arg: MichelsonV1Expression): type0 {
    let before_projection = (functolib.tuple2_decode(set_transfer_manager_decode, set_protocol_fee_decode))(arg);
    return {
        part_account: (before_projection[0]),
        part_value: (before_projection[1])
    }

}
let type0_micheline = { prim: 'Pair', args: [(set_transfer_manager_micheline), (set_protocol_fee_micheline)] }
export function type0_generator(): type0 { return ({ part_value: set_protocol_fee_generator(), part_account: set_transfer_manager_generator() }) }

export type sale_data = functolib.bytes
export function sale_data_encode(arg: sale_data): MichelsonV1Expression { return functolib.bytes_encode(arg) }
export function sale_data_decode(m: MichelsonV1Expression): sale_data { return (functolib.bytes_decode(m)); }
export let sale_data_micheline = functolib.bytes_micheline
export let sale_data_generator = function(): sale_data { return functolib.bytes_generator() }

export type s_sale = { sale_data: functolib.option<sale_data>, sale_data_type: functolib.option<sale_data>, sale_max_fees_base_boint: set_protocol_fee, sale_end: functolib.option<sale_end>, sale_start: functolib.option<sale_end>, sale_asset_qty: set_protocol_fee, sale_amount: set_protocol_fee, sale_payouts: type0[], sale_origin_fees: type0[] }
export function s_sale_encode(arg: s_sale): MichelsonV1Expression {
    return { prim: 'Pair', args: [(functolib.list_encode(type0_encode)(arg.sale_origin_fees)), { prim: 'Pair', args: [(functolib.list_encode(type0_encode)(arg.sale_payouts)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.sale_amount)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.sale_asset_qty)), { prim: 'Pair', args: [(functolib.option_encode(sale_end_encode)(arg.sale_start)), { prim: 'Pair', args: [(functolib.option_encode(sale_end_encode)(arg.sale_end)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.sale_max_fees_base_boint)), { prim: 'Pair', args: [(functolib.option_encode(sale_data_encode)(arg.sale_data_type)), (functolib.option_encode(sale_data_encode)(arg.sale_data))] }] }] }] }] }] }] }] }
}
export function s_sale_decode(arg: MichelsonV1Expression): s_sale {
    let before_projection = (functolib.tuple2_decode(functolib.list_decode(type0_decode), (functolib.tuple2_decode(functolib.list_decode(type0_decode), (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(functolib.option_decode(sale_end_decode), (functolib.tuple2_decode(functolib.option_decode(sale_end_decode), (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(functolib.option_decode(sale_data_decode), functolib.option_decode(sale_data_decode)))))))))))))))))(arg);
    return {
        sale_origin_fees: (before_projection[0]),
        sale_payouts: (before_projection[1][0]),
        sale_amount: (before_projection[1][1][0]),
        sale_asset_qty: (before_projection[1][1][1][0]),
        sale_start: (before_projection[1][1][1][1][0]),
        sale_end: (before_projection[1][1][1][1][1][0]),
        sale_max_fees_base_boint: (before_projection[1][1][1][1][1][1][0]),
        sale_data_type: (before_projection[1][1][1][1][1][1][1][0]),
        sale_data: (before_projection[1][1][1][1][1][1][1][1])
    }

}
let s_sale_micheline = { prim: 'Pair', args: [((functolib.list_micheline(type0_micheline))), { prim: 'Pair', args: [((functolib.list_micheline(type0_micheline))), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [((functolib.option_micheline(sale_end_micheline))), { prim: 'Pair', args: [((functolib.option_micheline(sale_end_micheline))), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [((functolib.option_micheline(sale_data_micheline))), ((functolib.option_micheline(sale_data_micheline)))] }] }] }] }] }] }] }] }
export function s_sale_generator(): s_sale { return ({ sale_data: (functolib.option_generator(sale_data_generator))(), sale_data_type: (functolib.option_generator(sale_data_generator))(), sale_max_fees_base_boint: set_protocol_fee_generator(), sale_end: (functolib.option_generator(sale_end_generator))(), sale_start: (functolib.option_generator(sale_end_generator))(), sale_asset_qty: set_protocol_fee_generator(), sale_amount: set_protocol_fee_generator(), sale_payouts: (functolib.list_generator(type0_generator))(), sale_origin_fees: (functolib.list_generator(type0_generator))() }) }

export type s_sale_type = functolib.int
export function s_sale_type_encode(arg: s_sale_type): MichelsonV1Expression { return functolib.int_encode(arg) }
export function s_sale_type_decode(m: MichelsonV1Expression): s_sale_type { return (functolib.int_decode(m)); }
export let s_sale_type_micheline = functolib.int_micheline
export let s_sale_type_generator = function(): s_sale_type { return BigInt(functolib.big_int_generator()) }

export type sell = { s_sale: s_sale, s_sale_asset: sale_data, s_sale_type: s_sale_type, s_asset_token_id: set_protocol_fee, s_asset_contract: set_transfer_manager }
export function sell_encode(arg: sell): MichelsonV1Expression {
    return { prim: 'Pair', args: [(set_transfer_manager_encode(arg.s_asset_contract)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.s_asset_token_id)), { prim: 'Pair', args: [(s_sale_type_encode(arg.s_sale_type)), { prim: 'Pair', args: [(sale_data_encode(arg.s_sale_asset)), (s_sale_encode(arg.s_sale))] }] }] }] }
}
export function sell_decode(arg: MichelsonV1Expression): sell {
    let before_projection = (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(s_sale_type_decode, (functolib.tuple2_decode(sale_data_decode, s_sale_decode))))))))(arg);
    return {
        s_asset_contract: (before_projection[0]),
        s_asset_token_id: (before_projection[1][0]),
        s_sale_type: (before_projection[1][1][0]),
        s_sale_asset: (before_projection[1][1][1][0]),
        s_sale: (before_projection[1][1][1][1])
    }

}
let sell_micheline = { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(s_sale_type_micheline), { prim: 'Pair', args: [(sale_data_micheline), (s_sale_micheline)] }] }] }] }
export function sell_generator(): sell { return ({ s_sale: s_sale_generator(), s_sale_asset: sale_data_generator(), s_sale_type: s_sale_type_generator(), s_asset_token_id: set_protocol_fee_generator(), s_asset_contract: set_transfer_manager_generator() }) }

export async function call_sell(tk: TezosToolkit,
    sell_kt1: string,
    param: sell, amount?: number): Promise<functolib.operation_result> {
    let res = sell_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, sell_kt1, 'sell', res, amount);
}

export type _default = functolib.unit
export function _default_encode(arg: _default): MichelsonV1Expression { return functolib.unit_encode(arg) }
export function _default_decode(m: MichelsonV1Expression): _default { return (functolib.unit_decode(m)); }
export let _default_micheline = functolib.unit_micheline
export let _default_generator = function(): _default { return functolib.unit_generator() }

export async function call__default(tk: TezosToolkit,
    _default_kt1: string,
    param: _default, amount?: number): Promise<functolib.operation_result> {
    let res = _default_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, _default_kt1, '_default', res, amount);
}

export type declare_ownership = set_transfer_manager

export function declare_ownership_encode(arg: declare_ownership): MichelsonV1Expression { return set_transfer_manager_encode(arg) }

export function declare_ownership_decode(arg: MichelsonV1Expression): declare_ownership { return set_transfer_manager_decode(arg) }

export let declare_ownership_micheline = set_transfer_manager_micheline

export let declare_ownership_generator = function(): declare_ownership { return set_transfer_manager_generator() }

export async function call_declare_ownership(tk: TezosToolkit,
    declare_ownership_kt1: string,
    param: declare_ownership, amount?: number): Promise<functolib.operation_result> {
    let res = declare_ownership_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, declare_ownership_kt1, 'declare_ownership', res, amount);
}

export type claim_ownership = _default

export function claim_ownership_encode(arg: claim_ownership): MichelsonV1Expression { return _default_encode(arg) }

export function claim_ownership_decode(arg: MichelsonV1Expression): claim_ownership { return _default_decode(arg) }

export let claim_ownership_micheline = _default_micheline

export let claim_ownership_generator = function(): claim_ownership { return _default_generator() }

export async function call_claim_ownership(tk: TezosToolkit,
    claim_ownership_kt1: string,
    param: claim_ownership, amount?: number): Promise<functolib.operation_result> {
    let res = claim_ownership_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, claim_ownership_kt1, 'claim_ownership', res, amount);
}

export type cancel_sale = { cs_sale_asset: sale_data, cs_sale_type: s_sale_type, cs_asset_token_id: set_protocol_fee, cs_asset_contract: set_transfer_manager }
export function cancel_sale_encode(arg: cancel_sale): MichelsonV1Expression {
    return { prim: 'Pair', args: [(set_transfer_manager_encode(arg.cs_asset_contract)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.cs_asset_token_id)), { prim: 'Pair', args: [(s_sale_type_encode(arg.cs_sale_type)), (sale_data_encode(arg.cs_sale_asset))] }] }] }
}
export function cancel_sale_decode(arg: MichelsonV1Expression): cancel_sale {
    let before_projection = (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(s_sale_type_decode, sale_data_decode))))))(arg);
    return {
        cs_asset_contract: (before_projection[0]),
        cs_asset_token_id: (before_projection[1][0]),
        cs_sale_type: (before_projection[1][1][0]),
        cs_sale_asset: (before_projection[1][1][1])
    }

}
let cancel_sale_micheline = { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(s_sale_type_micheline), (sale_data_micheline)] }] }] }
export function cancel_sale_generator(): cancel_sale { return ({ cs_sale_asset: sale_data_generator(), cs_sale_type: s_sale_type_generator(), cs_asset_token_id: set_protocol_fee_generator(), cs_asset_contract: set_transfer_manager_generator() }) }

export async function call_cancel_sale(tk: TezosToolkit,
    cancel_sale_kt1: string,
    param: cancel_sale, amount?: number): Promise<functolib.operation_result> {
    let res = cancel_sale_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, cancel_sale_kt1, 'cancel_sale', res, amount);
}

export type buy = { b_payouts: type0[], b_origin_fees: type0[], b_amount: set_protocol_fee, b_sale_asset: sale_data, b_sale_type: s_sale_type, b_seller: set_transfer_manager, b_asset_token_id: set_protocol_fee, b_asset_contract: set_transfer_manager }
export function buy_encode(arg: buy): MichelsonV1Expression {
    return { prim: 'Pair', args: [(set_transfer_manager_encode(arg.b_asset_contract)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.b_asset_token_id)), { prim: 'Pair', args: [(set_transfer_manager_encode(arg.b_seller)), { prim: 'Pair', args: [(s_sale_type_encode(arg.b_sale_type)), { prim: 'Pair', args: [(sale_data_encode(arg.b_sale_asset)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.b_amount)), { prim: 'Pair', args: [(functolib.list_encode(type0_encode)(arg.b_origin_fees)), (functolib.list_encode(type0_encode)(arg.b_payouts))] }] }] }] }] }] }] }
}
export function buy_decode(arg: MichelsonV1Expression): buy {
    let before_projection = (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(s_sale_type_decode, (functolib.tuple2_decode(sale_data_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(functolib.list_decode(type0_decode), functolib.list_decode(type0_decode)))))))))))))))(arg);
    return {
        b_asset_contract: (before_projection[0]),
        b_asset_token_id: (before_projection[1][0]),
        b_seller: (before_projection[1][1][0]),
        b_sale_type: (before_projection[1][1][1][0]),
        b_sale_asset: (before_projection[1][1][1][1][0]),
        b_amount: (before_projection[1][1][1][1][1][0]),
        b_origin_fees: (before_projection[1][1][1][1][1][1][0]),
        b_payouts: (before_projection[1][1][1][1][1][1][1])
    }

}
let buy_micheline = { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(s_sale_type_micheline), { prim: 'Pair', args: [(sale_data_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [((functolib.list_micheline(type0_micheline))), ((functolib.list_micheline(type0_micheline)))] }] }] }] }] }] }] }
export function buy_generator(): buy { return ({ b_payouts: (functolib.list_generator(type0_generator))(), b_origin_fees: (functolib.list_generator(type0_generator))(), b_amount: set_protocol_fee_generator(), b_sale_asset: sale_data_generator(), b_sale_type: s_sale_type_generator(), b_seller: set_transfer_manager_generator(), b_asset_token_id: set_protocol_fee_generator(), b_asset_contract: set_transfer_manager_generator() }) }

export async function call_buy(tk: TezosToolkit,
    buy_kt1: string,
    param: buy, amount?: number): Promise<functolib.operation_result> {
    let res = buy_encode(param);
    //console.log(`res: ${JSONbig.stringify(res,null,2)}`);
    return functolib.send(tk, buy_kt1, 'buy', res, amount);
}

export type storage = { metadata: functolib.big_map<string, sale_data>, max_fees_limit: set_protocol_fee, max_bundle_items: set_protocol_fee, owner_candidate: functolib.option<set_transfer_manager>, sales_storage: set_transfer_manager, transfer_manager: set_transfer_manager, protocol_fee: set_protocol_fee, owner: set_transfer_manager }
export function storage_encode(arg: storage): MichelsonV1Expression {
    return { prim: 'Pair', args: [(set_transfer_manager_encode(arg.owner)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.protocol_fee)), { prim: 'Pair', args: [(set_transfer_manager_encode(arg.transfer_manager)), { prim: 'Pair', args: [(set_transfer_manager_encode(arg.sales_storage)), { prim: 'Pair', args: [(functolib.option_encode(set_transfer_manager_encode)(arg.owner_candidate)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.max_bundle_items)), { prim: 'Pair', args: [(set_protocol_fee_encode(arg.max_fees_limit)), (functolib.big_map_encode(functolib.string_encode, sale_data_encode)(arg.metadata))] }] }] }] }] }] }] }
}
export function storage_decode(arg: MichelsonV1Expression): storage {
    let before_projection = (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(set_transfer_manager_decode, (functolib.tuple2_decode(functolib.option_decode(set_transfer_manager_decode), (functolib.tuple2_decode(set_protocol_fee_decode, (functolib.tuple2_decode(set_protocol_fee_decode, functolib.big_map_decode(functolib.string_decode, sale_data_decode)))))))))))))))(arg);
    return {
        owner: (before_projection[0]),
        protocol_fee: (before_projection[1][0]),
        transfer_manager: (before_projection[1][1][0]),
        sales_storage: (before_projection[1][1][1][0]),
        owner_candidate: (before_projection[1][1][1][1][0]),
        max_bundle_items: (before_projection[1][1][1][1][1][0]),
        max_fees_limit: (before_projection[1][1][1][1][1][1][0]),
        metadata: (before_projection[1][1][1][1][1][1][1])
    }

}
let storage_micheline = { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [(set_transfer_manager_micheline), { prim: 'Pair', args: [((functolib.option_micheline(set_transfer_manager_micheline))), { prim: 'Pair', args: [(set_protocol_fee_micheline), { prim: 'Pair', args: [(set_protocol_fee_micheline), (functolib.big_map_micheline(functolib.string_micheline, sale_data_micheline))] }] }] }] }] }] }] }
export function storage_generator(): storage { return ({ metadata: (functolib.big_map_generator(functolib.string_generator, sale_data_generator))(), max_fees_limit: set_protocol_fee_generator(), max_bundle_items: set_protocol_fee_generator(), owner_candidate: (functolib.option_generator(set_transfer_manager_generator))(), sales_storage: set_transfer_manager_generator(), transfer_manager: set_transfer_manager_generator(), protocol_fee: set_protocol_fee_generator(), owner: set_transfer_manager_generator() }) }



async function deploy_sales_raw(
    tezosKit: TezosToolkit,
    storage: MichelsonV1Expression,
    config: any,
    debug = false): Promise<string> {
    console.log("[deploy_sales_raw] Deploying new sales smart contract");
    try {
        if (debug) { console.log(`sales initial storage ${JSON.stringify(storage)}`) }
        const client = new RpcClient(config.node_addr);
        var b = await client.getBlock();
        let origination_op = await tezosKit.contract
            .originate({
                code: sales_code,
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


export async function deploy_sales(
    tezosKit: TezosToolkit,
    storage: storage,
    config: any,
    debug = false): Promise<string> {
    let kt1_address = await deploy_sales_raw(tezosKit, storage_encode(storage), config, debug);
    return kt1_address;
}

export type Storage_type = storage
export let Storage_type_encode = storage_encode
export let Storage_type_decode = storage_decode




const p = new Parser();
export let initial_blockchain_storage: storage = {
    owner: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
    protocol_fee: BigInt("0"),
    transfer_manager: "KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz",
    sales_storage: "KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT",
    owner_candidate: null,
    max_bundle_items: BigInt("10"),
    max_fees_limit: BigInt("10000"),
    metadata: { kind: 'abstract', value: BigInt("178555") }
}
/*
 {"prim":"Pair","args":[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"},{"int":"0"},{"string":"KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz"},{"string":"KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT"},{"prim":"None"},{"int":"10"},{"int":"10000"},{"int":"178555"}]}
*/
