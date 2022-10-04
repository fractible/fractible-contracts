import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum authorization_op_types {
    add = "add",
    remove = "remove"
}
export abstract class authorization_op extends att.Enum<authorization_op_types> {
}
export class add extends authorization_op {
    constructor(private content: att.Address) {
        super(authorization_op_types.add);
    }
    to_mich() { return att.left_to_mich(this.content.to_mich()); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class remove extends authorization_op {
    constructor(private content: att.Address) {
        super(authorization_op_types.remove);
    }
    to_mich() { return att.right_to_mich(att.left_to_mich(this.content.to_mich())); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export const mich_to_authorization_op = (m: any): authorization_op => {
    throw new Error("mich_toauthorization_op : complex enum not supported yet");
};
export class sale implements att.ArchetypeType {
    constructor(public sale_contract: att.Address, public sale_token_id: att.Nat, public sale_seller: att.Address, public sale_price_per_item: att.Nat, public sale_qty: att.Nat, public sale_start: att.Option<Date>, public sale_end: att.Option<Date>, public sale_version: att.Nat, public sale_data_type: att.Bytes, public sale_data: att.Bytes) { }
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
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data_type"]),
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data"])
                                ], [])
                            ], [])
                        ], [])
                    ], [])
                ], [])
            ], [])
        ], [])
    ], [])
], []);
export const mich_to_sale = (v: att.Micheline, collapsed: boolean = false): sale => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, sale_mich_type);
    }
    return new sale(att.mich_to_address(fields[0]), att.mich_to_nat(fields[1]), att.mich_to_address(fields[2]), att.mich_to_nat(fields[3]), att.mich_to_nat(fields[4]), att.mich_to_option(fields[5], x => { return att.mich_to_date(x); }), att.mich_to_option(fields[6], x => { return att.mich_to_date(x); }), att.mich_to_nat(fields[7]), att.mich_to_bytes(fields[8]), att.mich_to_bytes(fields[9]));
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
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data_type"]),
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data"])
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
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data_type"]),
                                    att.prim_annot_to_mich_type("bytes", ["%sale_data"])
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
const manage_authorization_arg_to_mich = (op: authorization_op): att.Micheline => {
    return op.to_mich();
}
const set_sale_arg_to_mich = (ss_sale: sale): att.Micheline => {
    return ss_sale.to_mich();
}
const update_sale_arg_to_mich = (us_sale_id: att.Nat, us_sale: sale): att.Micheline => {
    return att.pair_to_mich([
        us_sale_id.to_mich(),
        us_sale.to_mich()
    ]);
}
const remove_sale_arg_to_mich = (rs_sale_id: att.Nat): att.Micheline => {
    return rs_sale_id.to_mich();
}
const remove_sales_arg_to_mich = (rcs_sale_ids: Array<att.Nat>): att.Micheline => {
    return att.list_to_mich(rcs_sale_ids, x => {
        return x.to_mich();
    });
}
const cancel_matching_orders_arg_to_mich = (cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address): att.Micheline => {
    return att.pair_to_mich([
        cmo_contract.to_mich(),
        cmo_token_id.to_mich(),
        cmo_owner.to_mich()
    ]);
}
const default_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_sale_exists_arg_to_mich = (se_sale_id: att.Nat): att.Micheline => {
    return se_sale_id.to_mich();
}
const view_get_sale_arg_to_mich = (gs_sale_id: att.Nat): att.Micheline => {
    return gs_sale_id.to_mich();
}
export class Sales_storage {
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
    async deploy(owner: att.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/sales_storage.arl", {
            owner: owner.to_mich()
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
    async manage_authorization(op: authorization_op, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "manage_authorization", manage_authorization_arg_to_mich(op), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_sale(ss_sale: sale, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_sale", set_sale_arg_to_mich(ss_sale), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_sale(us_sale_id: att.Nat, us_sale: sale, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_sale", update_sale_arg_to_mich(us_sale_id, us_sale), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_sale(rs_sale_id: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_sale", remove_sale_arg_to_mich(rs_sale_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_sales(rcs_sale_ids: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_sales", remove_sales_arg_to_mich(rcs_sale_ids), params);
        }
        throw new Error("Contract not initialised");
    }
    async cancel_matching_orders(cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "cancel_matching_orders", cancel_matching_orders_arg_to_mich(cmo_contract, cmo_token_id, cmo_owner), params);
        }
        throw new Error("Contract not initialised");
    }
    async default(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "default", default_arg_to_mich(), params);
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
    async get_manage_authorization_param(op: authorization_op, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "manage_authorization", manage_authorization_arg_to_mich(op), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_sale_param(ss_sale: sale, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_sale", set_sale_arg_to_mich(ss_sale), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_sale_param(us_sale_id: att.Nat, us_sale: sale, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_sale", update_sale_arg_to_mich(us_sale_id, us_sale), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_sale_param(rs_sale_id: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_sale", remove_sale_arg_to_mich(rs_sale_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_sales_param(rcs_sale_ids: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_sales", remove_sales_arg_to_mich(rcs_sale_ids), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_cancel_matching_orders_param(cmo_contract: att.Address, cmo_token_id: att.Nat, cmo_owner: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "cancel_matching_orders", cancel_matching_orders_arg_to_mich(cmo_contract, cmo_token_id, cmo_owner), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_default_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "default", default_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_sale_exists(se_sale_id: att.Nat, params: Partial<ex.Parameters>): Promise<boolean> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "sale_exists", view_sale_exists_arg_to_mich(se_sale_id), params);
            return mich;
        }
        throw new Error("Contract not initialised");
    }
    async view_get_sale(gs_sale_id: att.Nat, params: Partial<ex.Parameters>): Promise<att.Option<sale>> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_sale", view_get_sale_arg_to_mich(gs_sale_id), params);
            return new att.Option<sale>(mich == null ? null : (x => { return new sale((x => { return new att.Address(x); })(x.sale_contract), (x => { return new att.Nat(x); })(x.sale_token_id), (x => { return new att.Address(x); })(x.sale_seller), (x => { return new att.Nat(x); })(x.sale_price_per_item), (x => { return new att.Nat(x); })(x.sale_qty), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_start), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_end), (x => { return new att.Nat(x); })(x.sale_version), (x => { return new att.Bytes(x); })(x.sale_data_type), (x => { return new att.Bytes(x); })(x.sale_data)); })(mich));
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
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return new sale((x => { return new att.Address(x); })(x.sale_contract), (x => { return new att.Nat(x); })(x.sale_token_id), (x => { return new att.Address(x); })(x.sale_seller), (x => { return new att.Nat(x); })(x.sale_price_per_item), (x => { return new att.Nat(x); })(x.sale_qty), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_start), (x => { return new att.Option<Date>(x == null ? null : (x => { return new Date(x); })(x)); })(x.sale_end), (x => { return new att.Nat(x); })(x.sale_version), (x => { return new att.Bytes(x); })(x.sale_data_type), (x => { return new att.Bytes(x); })(x.sale_data)); })(e[1])]);
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
        update_sale_exists: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"update_sale_exists\"")]),
        r_sale_exists: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r_sale_exists\"")]),
        r0: att.string_to_mich("\"INVALID_CALLER\""),
        MISSING_CANDIDATE: att.string_to_mich("\"MISSING_CANDIDATE\"")
    };
}
export const sales_storage = new Sales_storage();
