import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum update_for_all_op_types {
    add_for_all = "add_for_all",
    remove_for_all = "remove_for_all"
}
export abstract class update_for_all_op extends att.Enum<update_for_all_op_types> {
}
export class add_for_all extends update_for_all_op {
    constructor() {
        super(update_for_all_op_types.add_for_all);
    }
    to_mich() { return new att.Nat(0).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class remove_for_all extends update_for_all_op {
    constructor() {
        super(update_for_all_op_types.remove_for_all);
    }
    to_mich() { return new att.Nat(1).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export const mich_to_update_for_all_op = (m: any): update_for_all_op => {
    const v = (new att.Nat(m)).to_big_number().toNumber();
    switch (v) {
        case 0: return new add_for_all();
        case 1: return new remove_for_all();
        default: throw new Error("mich_to_asset_type : invalid value " + v);
    }
};
export class transfer_destination implements att.ArchetypeType {
    constructor(public to_dest: att.Address, public token_id_dest: att.Nat, public token_amount_dest: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.to_dest.to_mich(), att.pair_to_mich([this.token_id_dest.to_mich(), this.token_amount_dest.to_mich()])]);
    }
    equals(v: transfer_destination): boolean {
        return (this.to_dest.equals(v.to_dest) && this.to_dest.equals(v.to_dest) && this.token_id_dest.equals(v.token_id_dest) && this.token_amount_dest.equals(v.token_amount_dest));
    }
}
export class transfer_param implements att.ArchetypeType {
    constructor(public tp_from: att.Address, public tp_txs: Array<transfer_destination>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.tp_from.to_mich(), att.list_to_mich(this.tp_txs, x => {
                return x.to_mich();
            })]);
    }
    equals(v: transfer_param): boolean {
        return (this.tp_from.equals(v.tp_from) && this.tp_from.equals(v.tp_from) && JSON.stringify(this.tp_txs) == JSON.stringify(v.tp_txs));
    }
}
export class mint_param implements att.ArchetypeType {
    constructor(public mint_dest: att.Address, public mint_amount: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.mint_dest.to_mich(), this.mint_amount.to_mich()]);
    }
    equals(v: mint_param): boolean {
        return (this.mint_dest.equals(v.mint_dest) && this.mint_dest.equals(v.mint_dest) && this.mint_amount.equals(v.mint_amount));
    }
}
export class operator_param implements att.ArchetypeType {
    constructor(public opp_owner: att.Address, public opp_operator: att.Address, public opp_token_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.opp_owner.to_mich(), att.pair_to_mich([this.opp_operator.to_mich(), this.opp_token_id.to_mich()])]);
    }
    equals(v: operator_param): boolean {
        return (this.opp_owner.equals(v.opp_owner) && this.opp_owner.equals(v.opp_owner) && this.opp_operator.equals(v.opp_operator) && this.opp_token_id.equals(v.opp_token_id));
    }
}
export class update_for_all_param implements att.ArchetypeType {
    constructor(public upfa_op_type: update_for_all_op, public upfa_op: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.upfa_op_type.to_mich(), this.upfa_op.to_mich()]);
    }
    equals(v: update_for_all_param): boolean {
        return (this.upfa_op_type == v.upfa_op_type && this.upfa_op_type == v.upfa_op_type && this.upfa_op.equals(v.upfa_op));
    }
}
export class transfer_gasless_param implements att.ArchetypeType {
    constructor(public transfer_params: Array<transfer_param>, public user_pk: att.Key, public user_sig: att.Signature) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.list_to_mich(this.transfer_params, x => {
                return x.to_mich();
            }), att.pair_to_mich([this.user_pk.to_mich(), this.user_sig.to_mich()])]);
    }
    equals(v: transfer_gasless_param): boolean {
        return (JSON.stringify(this.transfer_params) == JSON.stringify(v.transfer_params) && JSON.stringify(this.transfer_params) == JSON.stringify(v.transfer_params) && this.user_pk.equals(v.user_pk) && this.user_sig.equals(v.user_sig));
    }
}
export class burn_gasless_param implements att.ArchetypeType {
    constructor(public burn_token_id: att.Nat, public burn_amount: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.burn_token_id.to_mich(), this.burn_amount.to_mich()]);
    }
    equals(v: burn_gasless_param): boolean {
        return (this.burn_token_id.equals(v.burn_token_id) && this.burn_token_id.equals(v.burn_token_id) && this.burn_amount.equals(v.burn_amount));
    }
}
export class balance_of_request implements att.ArchetypeType {
    constructor(public bo_owner: att.Address, public btoken_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.bo_owner.to_mich(), this.btoken_id.to_mich()]);
    }
    equals(v: balance_of_request): boolean {
        return (this.bo_owner.equals(v.bo_owner) && this.bo_owner.equals(v.bo_owner) && this.btoken_id.equals(v.btoken_id));
    }
}
export class balance_of_response implements att.ArchetypeType {
    constructor(public request: balance_of_request, public balance_: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.request.to_mich(), this.balance_.to_mich()]);
    }
    equals(v: balance_of_response): boolean {
        return (this.request == v.request && this.request == v.request && this.balance_.equals(v.balance_));
    }
}
export const transfer_destination_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%to_"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%token_id"]),
        att.prim_annot_to_mich_type("nat", ["%amount"])
    ], [])
], []);
export const transfer_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%from_"]),
    att.list_annot_to_mich_type(att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%to_"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("nat", ["%token_id"]),
            att.prim_annot_to_mich_type("nat", ["%amount"])
        ], [])
    ], []), ["%txs"])
], []);
export const mint_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%mint_dest"]),
    att.prim_annot_to_mich_type("nat", ["%mint_amount"])
], []);
export const operator_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%owner"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%operator"]),
        att.prim_annot_to_mich_type("nat", ["%token_id"])
    ], [])
], []);
export const update_for_all_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%upfa_op_type"]),
    att.prim_annot_to_mich_type("address", ["%upfa_op"])
], []);
export const transfer_gasless_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.list_annot_to_mich_type(att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%from_"]),
        att.list_annot_to_mich_type(att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%to_"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%token_id"]),
                att.prim_annot_to_mich_type("nat", ["%amount"])
            ], [])
        ], []), ["%txs"])
    ], []), ["%transfer_params"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("key", ["%user_pk"]),
        att.prim_annot_to_mich_type("signature", ["%user_sig"])
    ], [])
], []);
export const burn_gasless_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%burn_token_id"]),
    att.prim_annot_to_mich_type("nat", ["%burn_amount"])
], []);
export const balance_of_request_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%owner"]),
    att.prim_annot_to_mich_type("nat", ["%token_id"])
], []);
export const balance_of_response_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("address", ["%owner"]),
        att.prim_annot_to_mich_type("nat", ["%token_id"])
    ], ["%request"]),
    att.prim_annot_to_mich_type("nat", ["%balance"])
], []);
export const mich_to_transfer_destination = (v: att.Micheline, collapsed: boolean = false): transfer_destination => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, transfer_destination_mich_type);
    }
    return new transfer_destination(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]), att.mich_to_nat(fields[2]));
};
export const mich_to_transfer_param = (v: att.Micheline, collapsed: boolean = false): transfer_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, transfer_param_mich_type);
    }
    return new transfer_param(att.mich_to_address(fields[0]), att.mich_to_list(fields[1], x => { return mich_to_transfer_destination(x, collapsed); }));
};
export const mich_to_mint_param = (v: att.Micheline, collapsed: boolean = false): mint_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, mint_param_mich_type);
    }
    return new mint_param(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]));
};
export const mich_to_operator_param = (v: att.Micheline, collapsed: boolean = false): operator_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, operator_param_mich_type);
    }
    return new operator_param(att.mich_to_address(fields[0]), att.mich_to_address(fields[1]), att.mich_to_nat(fields[2]));
};
export const mich_to_update_for_all_param = (v: att.Micheline, collapsed: boolean = false): update_for_all_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, update_for_all_param_mich_type);
    }
    return new update_for_all_param(mich_to_update_for_all_op(fields[0]), att.mich_to_address(fields[1]));
};
export const mich_to_transfer_gasless_param = (v: att.Micheline, collapsed: boolean = false): transfer_gasless_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, transfer_gasless_param_mich_type);
    }
    return new transfer_gasless_param(att.mich_to_list(fields[0], x => { return mich_to_transfer_param(x, collapsed); }), att.mich_to_key(fields[1]), att.mich_to_signature(fields[2]));
};
export const mich_to_burn_gasless_param = (v: att.Micheline, collapsed: boolean = false): burn_gasless_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, burn_gasless_param_mich_type);
    }
    return new burn_gasless_param(att.mich_to_nat(fields[0]), att.mich_to_nat(fields[1]));
};
export const mich_to_balance_of_request = (v: att.Micheline, collapsed: boolean = false): balance_of_request => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, balance_of_request_mich_type);
    }
    return new balance_of_request(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]));
};
export const mich_to_balance_of_response = (v: att.Micheline, collapsed: boolean = false): balance_of_response => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, balance_of_response_mich_type);
    }
    return new balance_of_response(mich_to_balance_of_request(fields[0], collapsed), att.mich_to_nat(fields[1]));
};
export type token_metadata_key = att.Nat;
export type minter_key = att.Address;
export class ledger_key implements att.ArchetypeType {
    constructor(public ledger_token_owner: att.Address, public ledger_token_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.ledger_token_owner.to_mich(), this.ledger_token_id.to_mich()]);
    }
    equals(v: ledger_key): boolean {
        return (this.ledger_token_owner.equals(v.ledger_token_owner) && this.ledger_token_owner.equals(v.ledger_token_owner) && this.ledger_token_id.equals(v.ledger_token_id));
    }
}
export class operator_key implements att.ArchetypeType {
    constructor(public operator_addr: att.Address, public operator_token_id: att.Nat, public operator_token_onwer: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.operator_addr.to_mich(), att.pair_to_mich([this.operator_token_id.to_mich(), this.operator_token_onwer.to_mich()])]);
    }
    equals(v: operator_key): boolean {
        return (this.operator_addr.equals(v.operator_addr) && this.operator_addr.equals(v.operator_addr) && this.operator_token_id.equals(v.operator_token_id) && this.operator_token_onwer.equals(v.operator_token_onwer));
    }
}
export class operator_for_all_key implements att.ArchetypeType {
    constructor(public operator_fa_addr: att.Address, public operator_fa_token_onwer: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.operator_fa_addr.to_mich(), this.operator_fa_token_onwer.to_mich()]);
    }
    equals(v: operator_for_all_key): boolean {
        return (this.operator_fa_addr.equals(v.operator_fa_addr) && this.operator_fa_addr.equals(v.operator_fa_addr) && this.operator_fa_token_onwer.equals(v.operator_fa_token_onwer));
    }
}
export const token_metadata_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const minter_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export const ledger_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%ledger_token_owner"]),
    att.prim_annot_to_mich_type("nat", ["%ledger_token_id"])
], []);
export const operator_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%operator_addr"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%operator_token_id"]),
        att.prim_annot_to_mich_type("address", ["%operator_token_onwer"])
    ], [])
], []);
export const operator_for_all_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%operator_fa_addr"]),
    att.prim_annot_to_mich_type("address", ["%operator_fa_token_onwer"])
], []);
export class token_metadata_value implements att.ArchetypeType {
    constructor(public token_id: att.Nat, public token_info: Array<[
        string,
        att.Bytes
    ]>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.token_id.to_mich(), att.list_to_mich(this.token_info, x => {
                const x_key = x[0];
                const x_value = x[1];
                return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
            })]);
    }
    equals(v: token_metadata_value): boolean {
        return (this.token_id.equals(v.token_id) && this.token_id.equals(v.token_id) && JSON.stringify(this.token_info) == JSON.stringify(v.token_info));
    }
}
export type ledger_value = att.Nat;
export class operator_value implements att.ArchetypeType {
    constructor() { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.unit_to_mich();
    }
    equals(v: operator_value): boolean {
        return true;
    }
}
export class operator_for_all_value implements att.ArchetypeType {
    constructor() { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.unit_to_mich();
    }
    equals(v: operator_for_all_value): boolean {
        return true;
    }
}
export const token_metadata_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%token_id"]),
    att.pair_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", []))
], []);
export const ledger_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const operator_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("unit", []);
export const operator_for_all_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("unit", []);
export const mich_to_token_metadata_value = (v: att.Micheline, collapsed: boolean = false): token_metadata_value => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, token_metadata_value_mich_type);
    }
    return new token_metadata_value(att.mich_to_nat(fields[0]), att.mich_to_map(fields[1], (x, y) => [att.mich_to_string(x), att.mich_to_bytes(y)]));
};
export const mich_to_ledger_value = (v: att.Micheline, collapsed: boolean = false): ledger_value => {
    return att.mich_to_nat(v);
};
export const mich_to_operator_value = (v: att.Micheline, collapsed: boolean = false): operator_value => {
    throw new Error("mich_to_operator_value should not be called");
};
export const mich_to_operator_for_all_value = (v: att.Micheline, collapsed: boolean = false): operator_for_all_value => {
    throw new Error("mich_to_operator_for_all_value should not be called");
};
export type token_metadata_container = Array<[
    token_metadata_key,
    token_metadata_value
]>;
export type minter_container = Array<minter_key>;
export type ledger_container = Array<[
    ledger_key,
    ledger_value
]>;
export type operator_container = Array<[
    operator_key,
    operator_value
]>;
export type operator_for_all_container = Array<[
    operator_for_all_key,
    operator_for_all_value
]>;
export const token_metadata_container_mich_type: att.MichelineType = att.pair_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%token_id"]),
    att.pair_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", []))
], []));
export const minter_container_mich_type: att.MichelineType = att.list_annot_to_mich_type(att.prim_annot_to_mich_type("address", []), []);
export const ledger_container_mich_type: att.MichelineType = att.pair_to_mich_type("big_map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%ledger_token_owner"]),
    att.prim_annot_to_mich_type("nat", ["%ledger_token_id"])
], []), att.prim_annot_to_mich_type("nat", []));
export const operator_container_mich_type: att.MichelineType = att.pair_to_mich_type("big_map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%operator_addr"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%operator_token_id"]),
        att.prim_annot_to_mich_type("address", ["%operator_token_onwer"])
    ], [])
], []), att.prim_annot_to_mich_type("unit", []));
export const operator_for_all_container_mich_type: att.MichelineType = att.pair_to_mich_type("big_map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%operator_fa_addr"]),
    att.prim_annot_to_mich_type("address", ["%operator_fa_token_onwer"])
], []), att.prim_annot_to_mich_type("unit", []));
const declare_ownership_arg_to_mich = (candidate: att.Address): att.Micheline => {
    return candidate.to_mich();
}
const claim_ownership_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const pause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const unpause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const set_marketplace_arg_to_mich = (sm_marketplace: att.Address): att.Micheline => {
    return sm_marketplace.to_mich();
}
const set_metadata_arg_to_mich = (sm_meta_key: string, sm_meta_value: att.Option<att.Bytes>): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(sm_meta_key),
        sm_meta_value.to_mich()
    ]);
}
const set_token_metadata_arg_to_mich = (stm_token_id: att.Nat, stm_token_metadata: Array<[
    string,
    att.Bytes
]>): att.Micheline => {
    return att.pair_to_mich([
        stm_token_id.to_mich(),
        att.list_to_mich(stm_token_metadata, x => {
            const x_key = x[0];
            const x_value = x[1];
            return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
        })
    ]);
}
const set_permits_arg_to_mich = (sp_permit: att.Address): att.Micheline => {
    return sp_permit.to_mich();
}
const add_minter_arg_to_mich = (am_minter: att.Address): att.Micheline => {
    return am_minter.to_mich();
}
const rm_minter_arg_to_mich = (rm_minter: att.Address): att.Micheline => {
    return rm_minter.to_mich();
}
const update_operators_arg_to_mich = (uo_operators: Array<att.Or<operator_param, operator_param>>): att.Micheline => {
    return att.list_to_mich(uo_operators, x => {
        return x.to_mich();
    });
}
const update_operators_for_all_arg_to_mich = (upfa_operators: Array<update_for_all_param>): att.Micheline => {
    return att.list_to_mich(upfa_operators, x => {
        return x.to_mich();
    });
}
const update_operator_for_all_gasless_arg_to_mich = (upfa_operator: update_for_all_param, upfa_pubk: att.Key, upfa_sig: att.Signature): att.Micheline => {
    return att.pair_to_mich([
        upfa_operator.to_mich(),
        upfa_pubk.to_mich(),
        upfa_sig.to_mich()
    ]);
}
const transfer_gasless_arg_to_mich = (batch: Array<transfer_gasless_param>): att.Micheline => {
    return att.list_to_mich(batch, x => {
        return x.to_mich();
    });
}
const transfer_arg_to_mich = (transfers: Array<transfer_param>): att.Micheline => {
    return att.list_to_mich(transfers, x => {
        return x.to_mich();
    });
}
const mint_arg_to_mich = (mints: Array<mint_param>, tdata: Array<[
    string,
    att.Bytes
]>): att.Micheline => {
    return att.pair_to_mich([
        att.list_to_mich(mints, x => {
            return x.to_mich();
        }),
        att.list_to_mich(tdata, x => {
            const x_key = x[0];
            const x_value = x[1];
            return att.elt_to_mich(att.string_to_mich(x_key), x_value.to_mich());
        })
    ]);
}
const burn_arg_to_mich = (tid: att.Nat, nbt: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        tid.to_mich(),
        nbt.to_mich()
    ]);
}
const burn_gasless_arg_to_mich = (b_params: burn_gasless_param, owner_pubk: att.Key, owner_sig: att.Signature): att.Micheline => {
    return att.pair_to_mich([
        b_params.to_mich(),
        owner_pubk.to_mich(),
        owner_sig.to_mich()
    ]);
}
const balance_of_arg_to_mich = (requests: Array<balance_of_request>): att.Micheline => {
    return att.list_to_mich(requests, x => {
        return x.to_mich();
    });
}
const view_get_balance_arg_to_mich = (gb_request: balance_of_request): att.Micheline => {
    return gb_request.to_mich();
}
export const deploy_balance_of_callback = async (): Promise<string> => {
    return await ex.deploy_callback("balance_of", att.list_annot_to_mich_type(att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%owner"]),
            att.prim_annot_to_mich_type("nat", ["%token_id"])
        ], ["%request"]),
        att.prim_annot_to_mich_type("nat", ["%balance"])
    ], []), []));
};
export class Nft {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    balance_of_callback_address: string | undefined;
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: att.Address, permits: att.Address, whitelist: att.Address, marketplace: att.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/nft.arl", {
            owner: owner.to_mich(),
            permits: permits.to_mich(),
            whitelist: whitelist.to_mich(),
            marketplace: marketplace.to_mich()
        }, params);
        this.address = address;
        this.balance_of_callback_address = await deploy_balance_of_callback();
    }
    async declare_ownership(candidate: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "declare_ownership", declare_ownership_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async claim_ownership(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "claim_ownership", claim_ownership_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async pause(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "pause", pause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async unpause(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "unpause", unpause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_marketplace(sm_marketplace: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_marketplace", set_marketplace_arg_to_mich(sm_marketplace), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_metadata(sm_meta_key: string, sm_meta_value: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_metadata", set_metadata_arg_to_mich(sm_meta_key, sm_meta_value), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_token_metadata(stm_token_id: att.Nat, stm_token_metadata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_token_metadata", set_token_metadata_arg_to_mich(stm_token_id, stm_token_metadata), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_permits(sp_permit: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_permits", set_permits_arg_to_mich(sp_permit), params);
        }
        throw new Error("Contract not initialised");
    }
    async add_minter(am_minter: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_minter", add_minter_arg_to_mich(am_minter), params);
        }
        throw new Error("Contract not initialised");
    }
    async rm_minter(rm_minter: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "rm_minter", rm_minter_arg_to_mich(rm_minter), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_operators(uo_operators: Array<att.Or<operator_param, operator_param>>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_operators", update_operators_arg_to_mich(uo_operators), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_operators_for_all(upfa_operators: Array<update_for_all_param>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_operators_for_all", update_operators_for_all_arg_to_mich(upfa_operators), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_operator_for_all_gasless(upfa_operator: update_for_all_param, upfa_pubk: att.Key, upfa_sig: att.Signature, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_operator_for_all_gasless", update_operator_for_all_gasless_arg_to_mich(upfa_operator, upfa_pubk, upfa_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async transfer_gasless(batch: Array<transfer_gasless_param>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "transfer_gasless", transfer_gasless_arg_to_mich(batch), params);
        }
        throw new Error("Contract not initialised");
    }
    async transfer(transfers: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "transfer", transfer_arg_to_mich(transfers), params);
        }
        throw new Error("Contract not initialised");
    }
    async mint(mints: Array<mint_param>, tdata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "mint", mint_arg_to_mich(mints, tdata), params);
        }
        throw new Error("Contract not initialised");
    }
    async burn(tid: att.Nat, nbt: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "burn", burn_arg_to_mich(tid, nbt), params);
        }
        throw new Error("Contract not initialised");
    }
    async burn_gasless(b_params: burn_gasless_param, owner_pubk: att.Key, owner_sig: att.Signature, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "burn_gasless", burn_gasless_arg_to_mich(b_params, owner_pubk, owner_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_declare_ownership_param(candidate: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "declare_ownership", declare_ownership_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_claim_ownership_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "claim_ownership", claim_ownership_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_pause_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "pause", pause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_unpause_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "unpause", unpause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_marketplace_param(sm_marketplace: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_marketplace", set_marketplace_arg_to_mich(sm_marketplace), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_metadata_param(sm_meta_key: string, sm_meta_value: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_metadata", set_metadata_arg_to_mich(sm_meta_key, sm_meta_value), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_token_metadata_param(stm_token_id: att.Nat, stm_token_metadata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_token_metadata", set_token_metadata_arg_to_mich(stm_token_id, stm_token_metadata), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_permits_param(sp_permit: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_permits", set_permits_arg_to_mich(sp_permit), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_minter_param(am_minter: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_minter", add_minter_arg_to_mich(am_minter), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_rm_minter_param(rm_minter: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "rm_minter", rm_minter_arg_to_mich(rm_minter), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_operators_param(uo_operators: Array<att.Or<operator_param, operator_param>>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_operators", update_operators_arg_to_mich(uo_operators), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_operators_for_all_param(upfa_operators: Array<update_for_all_param>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_operators_for_all", update_operators_for_all_arg_to_mich(upfa_operators), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_operator_for_all_gasless_param(upfa_operator: update_for_all_param, upfa_pubk: att.Key, upfa_sig: att.Signature, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_operator_for_all_gasless", update_operator_for_all_gasless_arg_to_mich(upfa_operator, upfa_pubk, upfa_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_transfer_gasless_param(batch: Array<transfer_gasless_param>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "transfer_gasless", transfer_gasless_arg_to_mich(batch), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_transfer_param(transfers: Array<transfer_param>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "transfer", transfer_arg_to_mich(transfers), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_mint_param(mints: Array<mint_param>, tdata: Array<[
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "mint", mint_arg_to_mich(mints, tdata), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_burn_param(tid: att.Nat, nbt: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "burn", burn_arg_to_mich(tid, nbt), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_burn_gasless_param(b_params: burn_gasless_param, owner_pubk: att.Key, owner_sig: att.Signature, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "burn_gasless", burn_gasless_arg_to_mich(b_params, owner_pubk, owner_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async balance_of(requests: Array<balance_of_request>, params: Partial<ex.Parameters>): Promise<Array<balance_of_response>> {
        if (this.address != undefined) {
            if (this.balance_of_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.balance_of_callback_address), "callback");
                await ex.call(this.address, "balance_of", att.getter_args_to_mich(balance_of_arg_to_mich(requests), entrypoint), params);
                return await ex.get_callback_value<Array<balance_of_response>>(this.balance_of_callback_address, x => { const res: Array<balance_of_response> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return new balance_of_response((x => { return new balance_of_request((x => { return new att.Address(x); })(x.owner), (x => { return new att.Nat(x); })(x.token_id)); })(x.request), (x => { return new att.Nat(x); })(x.balance)); })(x[i]));
                } return res; });
            }
        }
        throw new Error("Contract not initialised");
    }
    async view_get_balance(gb_request: balance_of_request, params: Partial<ex.Parameters>): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_balance", view_get_balance_arg_to_mich(gb_request), params);
            return new att.Option<att.Nat>(mich == null ? null : (x => { return new att.Nat(x); })(mich));
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_permits(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.permits);
        }
        throw new Error("Contract not initialised");
    }
    async get_whitelist(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.whitelist);
        }
        throw new Error("Contract not initialised");
    }
    async get_marketplace(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.marketplace);
        }
        throw new Error("Contract not initialised");
    }
    async get_token_id_sequence(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Nat(storage.token_id_sequence);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner_candidate(): Promise<att.Option<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<att.Address>(storage.owner_candidate == null ? null : (x => { return new att.Address(x); })(storage.owner_candidate));
        }
        throw new Error("Contract not initialised");
    }
    async get_paused(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return storage.paused;
        }
        throw new Error("Contract not initialised");
    }
    async get_token_metadata_value(key: token_metadata_key): Promise<token_metadata_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.token_metadata), key.to_mich(), token_metadata_key_mich_type), collapsed = true;
            if (data != undefined) {
                return mich_to_token_metadata_value(data, true);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_token_metadata_value(key: token_metadata_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.token_metadata), key.to_mich(), token_metadata_key_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_minter(): Promise<minter_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<att.Address> = [];
            for (let i = 0; i < storage.minter.length; i++) {
                res.push((x => { return new att.Address(x); })(storage.minter[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_ledger_value(key: ledger_key): Promise<ledger_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.ledger), key.to_mich(), ledger_key_mich_type), collapsed = true;
            if (data != undefined) {
                return mich_to_ledger_value(data, true);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_ledger_value(key: ledger_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.ledger), key.to_mich(), ledger_key_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_operator_value(key: operator_key): Promise<operator_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operator), key.to_mich(), operator_key_mich_type), collapsed = true;
            if (data != undefined) {
                return mich_to_operator_value(data, true);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_operator_value(key: operator_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operator), key.to_mich(), operator_key_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_operator_for_all_value(key: operator_for_all_key): Promise<operator_for_all_value | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operator_for_all), key.to_mich(), operator_for_all_key_mich_type), collapsed = true;
            if (data != undefined) {
                return mich_to_operator_for_all_value(data, true);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_operator_for_all_value(key: operator_for_all_key): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.operator_for_all), key.to_mich(), operator_for_all_key_mich_type), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_metadata_value(key: string): Promise<att.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", [])), collapsed = true;
            if (data != undefined) {
                return att.mich_to_bytes(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_metadata_value(key: string): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", [])), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        fa2_r77: att.string_to_mich("\"FA2_INSUFFICIENT_BALANCE\""),
        fa2_r66: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r66\"")]),
        FA2_INSUFFICIENT_BALANCE: att.string_to_mich("\"FA2_INSUFFICIENT_BALANCE\""),
        fa2_r7: att.string_to_mich("\"FA2_INSUFFICIENT_BALANCE\""),
        fa2_r6: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r6\"")]),
        ASSERT_RECEIVER_FAILED: att.string_to_mich("\"ASSERT_RECEIVER_FAILED\""),
        fa2_r5: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r5\"")]),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        ASSERT_TRANSFER_FAILED: att.string_to_mich("\"ASSERT_TRANSFER_FAILED\""),
        fa2_r4: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r4\"")]),
        SIGNER_NOT_FROM: att.string_to_mich("\"SIGNER_NOT_FROM\""),
        fa2_r3: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r3\"")]),
        fa2_r2b: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r2b\"")]),
        fa2_r2: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r2\"")]),
        CALLER_NOT_OWNER: att.string_to_mich("\"CALLER_NOT_OWNER\""),
        fa2_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"fa2_r1\"")]),
        sp_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"sp_r1\"")]),
        tmd_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"tmd_r1\"")]),
        md_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"md_r1\"")]),
        p_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"p_r1\"")]),
        pausable_r2: att.string_to_mich("\"CONTRACT_NOT_PAUSED\""),
        pausable_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"pausable_r1\"")]),
        ownership_r1: att.string_to_mich("\"INVALID_CALLER\""),
        FA2_NOT_OPERATOR: att.string_to_mich("\"FA2_NOT_OPERATOR\""),
        CONTRACT_PAUSED: att.string_to_mich("\"CONTRACT_PAUSED\"")
    };
}
export const nft = new Nft();
