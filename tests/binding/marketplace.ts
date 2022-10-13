import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum authorisation_op_types {
    add = "add",
    remove = "remove"
}
export abstract class authorisation_op extends att.Enum<authorisation_op_types> {
}
export class add extends authorisation_op {
    constructor(private content: att.Address) {
        super(authorisation_op_types.add);
    }
    to_mich() { return att.left_to_mich(this.content.to_mich()); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class remove extends authorisation_op {
    constructor(private content: att.Address) {
        super(authorisation_op_types.remove);
    }
    to_mich() { return att.right_to_mich(att.left_to_mich(this.content.to_mich())); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export const mich_to_authorisation_op = (m: any): authorisation_op => {
    throw new Error("mich_toauthorisation_op : complex enum not supported yet");
};
export class transfer_param implements att.ArchetypeType {
    constructor(public destination_address: att.Address, public token_id: att.Nat, public token_amount: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.destination_address.to_mich(), att.pair_to_mich([this.token_id.to_mich(), this.token_amount.to_mich()])]);
    }
    equals(v: transfer_param): boolean {
        return (this.destination_address.equals(v.destination_address) && this.destination_address.equals(v.destination_address) && this.token_id.equals(v.token_id) && this.token_amount.equals(v.token_amount));
    }
}
export class buy_param implements att.ArchetypeType {
    constructor(public buy_sale_id: att.Nat, public buy_qty: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.buy_sale_id.to_mich(), this.buy_qty.to_mich()]);
    }
    equals(v: buy_param): boolean {
        return (this.buy_sale_id.equals(v.buy_sale_id) && this.buy_sale_id.equals(v.buy_sale_id) && this.buy_qty.equals(v.buy_qty));
    }
}
export class auth_buy_param implements att.ArchetypeType {
    constructor(public auth_b_param: buy_param, public auth_b_sig: att.Signature) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.auth_b_param.to_mich(), this.auth_b_sig.to_mich()]);
    }
    equals(v: auth_buy_param): boolean {
        return (this.auth_b_param == v.auth_b_param && this.auth_b_param == v.auth_b_param && this.auth_b_sig.equals(v.auth_b_sig));
    }
}
export class balance_of_request implements att.ArchetypeType {
    constructor(public bor_owner: att.Address, public bor_token_id: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.bor_owner.to_mich(), this.bor_token_id.to_mich()]);
    }
    equals(v: balance_of_request): boolean {
        return (this.bor_owner.equals(v.bor_owner) && this.bor_owner.equals(v.bor_owner) && this.bor_token_id.equals(v.bor_token_id));
    }
}
export class sale implements att.ArchetypeType {
    constructor(public sale_contract: att.Address, public sale_token_id: att.Nat, public sale_seller: att.Address, public sale_price_per_item: att.Nat, public sale_qty: att.Nat, public sale_start: att.Option<Date>, public sale_end: att.Option<Date>, public sale_version: att.Nat, public sale_data_type: att.Option<att.Bytes>, public sale_data: att.Option<att.Bytes>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.sale_contract.to_mich(), att.pair_to_mich([this.sale_token_id.to_mich(), att.pair_to_mich([this.sale_seller.to_mich(), att.pair_to_mich([this.sale_price_per_item.to_mich(), att.pair_to_mich([this.sale_qty.to_mich(), att.pair_to_mich([this.sale_start.to_mich(), att.pair_to_mich([this.sale_end.to_mich(), att.pair_to_mich([this.sale_version.to_mich(), att.pair_to_mich([this.sale_data_type.to_mich(), this.sale_data.to_mich()])])])])])])])])]);
    }
    equals(v: sale): boolean {
        return (this.sale_contract.equals(v.sale_contract) && this.sale_contract.equals(v.sale_contract) && this.sale_token_id.equals(v.sale_token_id) && this.sale_seller.equals(v.sale_seller) && this.sale_price_per_item.equals(v.sale_price_per_item) && this.sale_qty.equals(v.sale_qty) && this.sale_start.equals(v.sale_start) && this.sale_end.equals(v.sale_end) && this.sale_version.equals(v.sale_version) && this.sale_data_type.equals(v.sale_data_type) && this.sale_data.equals(v.sale_data));
    }
}
export const transfer_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%to"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%token_id"]),
        att.prim_annot_to_mich_type("nat", ["%amount"])
    ], [])
], []);
export const buy_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%buy_sale_id"]),
    att.prim_annot_to_mich_type("nat", ["%buy_qty"])
], []);
export const auth_buy_param_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%buy_sale_id"]),
        att.prim_annot_to_mich_type("nat", ["%buy_qty"])
    ], ["%auth_b_param"]),
    att.prim_annot_to_mich_type("signature", ["%auth_b_sig"])
], []);
export const balance_of_request_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%owner"]),
    att.prim_annot_to_mich_type("nat", ["%token_id"])
], []);
export const sale_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%sale_contract"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%sale_token_id"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%sale_seller"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%sale_price_per_item"]),
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("nat", ["%sale_qty"]),
                    att.pair_array_to_mich_type([
                        att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_start"]),
                        att.pair_array_to_mich_type([
                            att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_end"]),
                            att.pair_array_to_mich_type([
                                att.prim_annot_to_mich_type("nat", ["%sale_version"]),
                                att.pair_array_to_mich_type([
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data_type"]),
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data"])
                                ], [])
                            ], [])
                        ], [])
                    ], [])
                ], [])
            ], [])
        ], [])
    ], [])
], []);
export const mich_to_transfer_param = (v: att.Micheline, collapsed: boolean = false): transfer_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, transfer_param_mich_type);
    }
    return new transfer_param(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]), att.mich_to_nat(fields[2]));
};
export const mich_to_buy_param = (v: att.Micheline, collapsed: boolean = false): buy_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, buy_param_mich_type);
    }
    return new buy_param(att.mich_to_nat(fields[0]), att.mich_to_nat(fields[1]));
};
export const mich_to_auth_buy_param = (v: att.Micheline, collapsed: boolean = false): auth_buy_param => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, auth_buy_param_mich_type);
    }
    return new auth_buy_param(mich_to_buy_param(fields[0], collapsed), att.mich_to_signature(fields[1]));
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
export const mich_to_sale = (v: att.Micheline, collapsed: boolean = false): sale => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, sale_mich_type);
    }
    return new sale(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]), att.mich_to_address(fields[2]), att.mich_to_nat(fields[3]), att.mich_to_nat(fields[4]), att.mich_to_option(fields[5], x => { return att.mich_to_date(x); }), att.mich_to_option(fields[6], x => { return att.mich_to_date(x); }), att.mich_to_nat(fields[7]), att.mich_to_option(fields[8], x => { return att.mich_to_bytes(x); }), att.mich_to_option(fields[9], x => { return att.mich_to_bytes(x); }));
};
export type authorised_key = att.Address;
export type sales_key = att.Nat;
export const authorised_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export const sales_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type sales_value = sale;
export const sales_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%sale_contract"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%sale_token_id"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%sale_seller"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%sale_price_per_item"]),
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("nat", ["%sale_qty"]),
                    att.pair_array_to_mich_type([
                        att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_start"]),
                        att.pair_array_to_mich_type([
                            att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_end"]),
                            att.pair_array_to_mich_type([
                                att.prim_annot_to_mich_type("nat", ["%sale_version"]),
                                att.pair_array_to_mich_type([
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data_type"]),
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data"])
                                ], [])
                            ], [])
                        ], [])
                    ], [])
                ], [])
            ], [])
        ], [])
    ], [])
], []);
export const mich_to_sales_value = (v: att.Micheline, collapsed: boolean = false): sales_value => {
    return mich_to_sale(v, collapsed);
};
export type authorised_container = Array<authorised_key>;
export type sales_container = Array<[
    sales_key,
    sales_value
]>;
export const authorised_container_mich_type: att.MichelineType = att.list_annot_to_mich_type(att.prim_annot_to_mich_type("address", []), []);
export const sales_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%sale_contract"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%sale_token_id"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("address", ["%sale_seller"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%sale_price_per_item"]),
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("nat", ["%sale_qty"]),
                    att.pair_array_to_mich_type([
                        att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_start"]),
                        att.pair_array_to_mich_type([
                            att.option_annot_to_mich_type(att.prim_annot_to_mich_type("timestamp", []), ["%sale_end"]),
                            att.pair_array_to_mich_type([
                                att.prim_annot_to_mich_type("nat", ["%sale_version"]),
                                att.pair_array_to_mich_type([
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data_type"]),
                                    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bytes", []), ["%sale_data"])
                                ], [])
                            ], [])
                        ], [])
                    ], [])
                ], [])
            ], [])
        ], [])
    ], [])
], []));
const declare_ownership_arg_to_mich = (candidate: att.Address): att.Micheline => {
    return candidate.to_mich();
}
const claim_ownership_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const set_permits_arg_to_mich = (sp_contract: att.Address): att.Micheline => {
    return sp_contract.to_mich();
}
const manage_authorisation_arg_to_mich = (op: authorisation_op): att.Micheline => {
    return op.to_mich();
}
const sell_arg_to_mich = (s_sale: sale, s_seller_pubk: att.Key, s_sig: att.Signature): att.Micheline => {
    return att.pair_to_mich([
        s_sale.to_mich(),
        s_seller_pubk.to_mich(),
        s_sig.to_mich()
    ]);
}
const buy_arg_to_mich = (b_param: buy_param, b_buyer_pubk: att.Key, b_sig: att.Signature, b_auth_sig: att.Signature): att.Micheline => {
    return att.pair_to_mich([
        b_param.to_mich(),
        b_buyer_pubk.to_mich(),
        b_sig.to_mich(),
        b_auth_sig.to_mich()
    ]);
}
const cancel_sale_arg_to_mich = (cs_sale_id: att.Nat, cs_seller_pubk: att.Key, cs_sig: att.Signature): att.Micheline => {
    return att.pair_to_mich([
        cs_sale_id.to_mich(),
        cs_seller_pubk.to_mich(),
        cs_sig.to_mich()
    ]);
}
const cancel_matching_orders_arg_to_mich = (cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address): att.Micheline => {
    return att.pair_to_mich([
        cmo_contract.to_mich(),
        cmo_token_id.to_mich(),
        cmo_owner.to_mich()
    ]);
}
const remove_sales_arg_to_mich = (rcs_sale_ids: Array<att.Nat>): att.Micheline => {
    return att.list_to_mich(rcs_sale_ids, x => {
        return x.to_mich();
    });
}
export class Marketplace {
    address: string | undefined;
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
    async deploy(owner: att.Address, permits: att.Address, signer: att.Key, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/marketplace.arl", {
            owner: owner.to_mich(),
            permits: permits.to_mich(),
            signer: signer.to_mich()
        }, params);
        this.address = address;
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
    async set_permits(sp_contract: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_permits", set_permits_arg_to_mich(sp_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async manage_authorisation(op: authorisation_op, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "manage_authorisation", manage_authorisation_arg_to_mich(op), params);
        }
        throw new Error("Contract not initialised");
    }
    async sell(s_sale: sale, s_seller_pubk: att.Key, s_sig: att.Signature, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "sell", sell_arg_to_mich(s_sale, s_seller_pubk, s_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async buy(b_param: buy_param, b_buyer_pubk: att.Key, b_sig: att.Signature, b_auth_sig: att.Signature, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "buy", buy_arg_to_mich(b_param, b_buyer_pubk, b_sig, b_auth_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async cancel_sale(cs_sale_id: att.Nat, cs_seller_pubk: att.Key, cs_sig: att.Signature, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "cancel_sale", cancel_sale_arg_to_mich(cs_sale_id, cs_seller_pubk, cs_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async cancel_matching_orders(cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "cancel_matching_orders", cancel_matching_orders_arg_to_mich(cmo_contract, cmo_token_id, cmo_owner), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_sales(rcs_sale_ids: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_sales", remove_sales_arg_to_mich(rcs_sale_ids), params);
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
    async get_set_permits_param(sp_contract: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_permits", set_permits_arg_to_mich(sp_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_manage_authorisation_param(op: authorisation_op, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "manage_authorisation", manage_authorisation_arg_to_mich(op), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_sell_param(s_sale: sale, s_seller_pubk: att.Key, s_sig: att.Signature, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "sell", sell_arg_to_mich(s_sale, s_seller_pubk, s_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_buy_param(b_param: buy_param, b_buyer_pubk: att.Key, b_sig: att.Signature, b_auth_sig: att.Signature, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "buy", buy_arg_to_mich(b_param, b_buyer_pubk, b_sig, b_auth_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_cancel_sale_param(cs_sale_id: att.Nat, cs_seller_pubk: att.Key, cs_sig: att.Signature, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "cancel_sale", cancel_sale_arg_to_mich(cs_sale_id, cs_seller_pubk, cs_sig), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_cancel_matching_orders_param(cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "cancel_matching_orders", cancel_matching_orders_arg_to_mich(cmo_contract, cmo_token_id, cmo_owner), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_sales_param(rcs_sale_ids: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_sales", remove_sales_arg_to_mich(rcs_sale_ids), params);
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
    async get_signer(): Promise<att.Key> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Key(storage.signer);
        }
        throw new Error("Contract not initialised");
    }
    async get_id_sequence(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Nat(storage.id_sequence);
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
    async get_authorised(): Promise<authorised_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<att.Address> = [];
            for (let i = 0; i < storage.authorised.length; i++) {
                res.push((x => { return new att.Address(x); })(storage.authorised[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_sales(): Promise<sales_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                att.Nat,
                sale
            ]> = [];
            for (let e of storage.sales.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return new sale((x => { return new att.Address(x); })(x.sale_contract), (x => { return new att.Nat(x); })(x.sale_token_id), (x => { return new att.Address(x); })(x.sale_seller), (x => { return new att.Nat(x); })(x.sale_price_per_item), (x => { return new att.Nat(x); })(x.sale_qty), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_start), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_end), (x => { return new att.Nat(x); })(x.sale_version), (x => { return new att.Option<att.Bytes>(x == null ? null : (x => { return new att.Bytes(x); })(x)); })(x.sale_data_type), (x => { return new att.Option<att.Bytes>(x == null ? null : (x => { return new att.Bytes(x); })(x)); })(x.sale_data)); })(e[1])]);
            }
            return res;
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
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        invalid_caller: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"invalid_caller\"")]),
        MISSING_SALE: att.string_to_mich("\"MISSING_SALE\""),
        SALE_NOT_STARTED: att.string_to_mich("\"SALE_NOT_STARTED\""),
        SALE_CLOSED: att.string_to_mich("\"SALE_CLOSED\""),
        buy_incorrect_qty: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"buy_incorrect_qty\"")]),
        SALE_END_BEFORE_START: att.string_to_mich("\"SALE_END_BEFORE_START\""),
        SALE_END_IN_THE_PAST: att.string_to_mich("\"SALE_END_IN_THE_PAST\""),
        insufficient_balance: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"insufficient_balance\"")]),
        inconsistent_seller: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"inconsistent_seller\"")]),
        sell_invalid_qty: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"sell_invalid_qty\"")]),
        sell_invalid_price: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"sell_invalid_price\"")]),
        INSUFFICIENT_BALANCE: att.string_to_mich("\"INSUFFICIENT_BALANCE\""),
        r0: att.string_to_mich("\"INVALID_CALLER\""),
        MISSING_CANDIDATE: att.string_to_mich("\"MISSING_CANDIDATE\"")
    };
}
export const marketplace = new Marketplace();
