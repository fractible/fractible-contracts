import * as ex from "@completium/experiment-ts";
export type whitelister_key = ex.Address;
export const whitelister_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export type whitelister_container = Array<whitelister_key>;
export const whitelister_container_mich_type: ex.MichelineType = ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("address", []), []);
const set_metadata_uri_arg_to_mich = (idata: ex.Bytes): ex.Micheline => {
    return idata.to_mich();
}
const declare_admin_arg_to_mich = (candidate: ex.Address): ex.Micheline => {
    return candidate.to_mich();
}
const claim_admin_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
const add_whitelister_arg_to_mich = (new_whitelister: ex.Address): ex.Micheline => {
    return new_whitelister.to_mich();
}
const rm_whitelister_arg_to_mich = (old_whitelister: ex.Address): ex.Micheline => {
    return old_whitelister.to_mich();
}
const remove_arg_to_mich = (k: ex.Address): ex.Micheline => {
    return k.to_mich();
}
const put_arg_to_mich = (k: ex.Address, v: ex.Nat): ex.Micheline => {
    return ex.pair_to_mich([
        k.to_mich(),
        v.to_mich()
    ]);
}
const update_arg_to_mich = (k: ex.Address, v: ex.Option<ex.Nat>): ex.Micheline => {
    return ex.pair_to_mich([
        k.to_mich(),
        v.to_mich()
    ]);
}
const view_get_user_id_arg_to_mich = (k: ex.Address): ex.Micheline => {
    return k.to_mich();
}
export class Users_storage {
    address: string | undefined;
    get_address(): ex.Address {
        if (undefined != this.address) {
            return new ex.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<ex.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new ex.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(admin: ex.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/users_storage.arl", {
            admin: admin.to_mich()
        }, params);
        this.address = address;
    }
    async set_metadata_uri(idata: ex.Bytes, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_metadata_uri", set_metadata_uri_arg_to_mich(idata), params);
        }
        throw new Error("Contract not initialised");
    }
    async declare_admin(candidate: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "declare_admin", declare_admin_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async claim_admin(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "claim_admin", claim_admin_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async add_whitelister(new_whitelister: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_whitelister", add_whitelister_arg_to_mich(new_whitelister), params);
        }
        throw new Error("Contract not initialised");
    }
    async rm_whitelister(old_whitelister: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "rm_whitelister", rm_whitelister_arg_to_mich(old_whitelister), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove(k: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove", remove_arg_to_mich(k), params);
        }
        throw new Error("Contract not initialised");
    }
    async put(k: ex.Address, v: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "put", put_arg_to_mich(k, v), params);
        }
        throw new Error("Contract not initialised");
    }
    async update(k: ex.Address, v: ex.Option<ex.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update", update_arg_to_mich(k, v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_metadata_uri_param(idata: ex.Bytes, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_metadata_uri", set_metadata_uri_arg_to_mich(idata), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_declare_admin_param(candidate: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "declare_admin", declare_admin_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_claim_admin_param(params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "claim_admin", claim_admin_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_whitelister_param(new_whitelister: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_whitelister", add_whitelister_arg_to_mich(new_whitelister), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_rm_whitelister_param(old_whitelister: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "rm_whitelister", rm_whitelister_arg_to_mich(old_whitelister), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_param(k: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove", remove_arg_to_mich(k), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_put_param(k: ex.Address, v: ex.Nat, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "put", put_arg_to_mich(k, v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_param(k: ex.Address, v: ex.Option<ex.Nat>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update", update_arg_to_mich(k, v), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_get_user_id(k: ex.Address, params: Partial<ex.Parameters>): Promise<ex.Option<ex.Nat>> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_user_id", view_get_user_id_arg_to_mich(k), params);
            return new ex.Option<ex.Nat>(mich == null ? null : (x => { return new ex.Nat(x); })(mich));
        }
        throw new Error("Contract not initialised");
    }
    async get_admin(): Promise<ex.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Address(storage.admin);
        }
        throw new Error("Contract not initialised");
    }
    async get_admin_candidate(): Promise<ex.Option<ex.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Option<ex.Address>(storage.admin_candidate == null ? null : (x => { return new ex.Address(x); })(storage.admin_candidate));
        }
        throw new Error("Contract not initialised");
    }
    async get_whitelister(): Promise<whitelister_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<ex.Address> = [];
            for (let i = 0; i < storage.whitelister.length; i++) {
                res.push((x => { return new ex.Address(x); })(storage.whitelister[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_users_value(key: ex.Address): Promise<ex.Nat | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.users), key.to_mich(), ex.prim_annot_to_mich_type("address", [])), collapsed = true;
            if (data != undefined) {
                return ex.mich_to_nat(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_users_value(key: ex.Address): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.users), key.to_mich(), ex.prim_annot_to_mich_type("address", [])), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_metadata_value(key: string): Promise<ex.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), ex.string_to_mich(key), ex.prim_annot_to_mich_type("string", [])), collapsed = true;
            if (data != undefined) {
                return ex.mich_to_bytes(data);
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
            const data = await ex.get_big_map_value(BigInt(storage.metadata), ex.string_to_mich(key), ex.prim_annot_to_mich_type("string", [])), collapsed = true;
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
        INVALID_CALLER: ex.string_to_mich("\"INVALID_CALLER\""),
        co1: ex.string_to_mich("\"INVALID_CALLER\""),
        MISSING_ADMIN_CANDIDATE: ex.string_to_mich("\"MISSING_ADMIN_CANDIDATE\"")
    };
}
export const users_storage = new Users_storage();
