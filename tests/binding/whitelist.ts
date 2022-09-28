import * as ex from "@completium/experiment-ts";
export class transfer_list implements ex.ArchetypeType {
    constructor(public unrestricted: boolean, public allowed_transfer_lists: Array<ex.Nat>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): ex.Micheline {
        return ex.pair_to_mich([ex.bool_to_mich(this.unrestricted), ex.list_to_mich(this.allowed_transfer_lists, x => {
                return x.to_mich();
            })]);
    }
    equals(v: transfer_list): boolean {
        return (this.unrestricted == v.unrestricted && this.unrestricted == v.unrestricted && JSON.stringify(this.allowed_transfer_lists) == JSON.stringify(v.allowed_transfer_lists));
    }
}
export const transfer_list_mich_type: ex.MichelineType = ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("bool", ["%unrestricted"]),
    ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("nat", []), ["%allowed_transfer_lists"])
], []);
export const mich_to_transfer_list = (v: ex.Micheline, collapsed: boolean = false): transfer_list => {
    let fields: ex.Micheline[] = [];
    if (collapsed) {
        fields = ex.mich_to_pairs(v);
    }
    else {
        fields = ex.annotated_mich_to_array(v, transfer_list_mich_type);
    }
    return new transfer_list(ex.mich_to_bool(fields[0]), ex.mich_to_list(fields[1], x => { return ex.mich_to_nat(x); }));
};
export type whitelister_key = ex.Address;
export const whitelister_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export type whitelister_container = Array<whitelister_key>;
export const whitelister_container_mich_type: ex.MichelineType = ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("address", []), []);
const declare_admin_arg_to_mich = (candidate: ex.Address): ex.Micheline => {
    return candidate.to_mich();
}
const claim_admin_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
const pause_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
const unpause_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
const add_super_user_arg_to_mich = (su: ex.Address): ex.Micheline => {
    return su.to_mich();
}
const remove_super_user_arg_to_mich = (su: ex.Address): ex.Micheline => {
    return su.to_mich();
}
const set_users_contract_arg_to_mich = (users_contract: ex.Address): ex.Micheline => {
    return users_contract.to_mich();
}
const add_whitelister_arg_to_mich = (v: ex.Address): ex.Micheline => {
    return v.to_mich();
}
const remove_whitelister_arg_to_mich = (v: ex.Address): ex.Micheline => {
    return v.to_mich();
}
const assert_receivers_arg_to_mich = (addrs: Array<ex.Address>): ex.Micheline => {
    return ex.list_to_mich(addrs, x => {
        return x.to_mich();
    });
}
const assert_transfers_arg_to_mich = (input_list: Array<[
    ex.Address,
    Array<ex.Address>
]>): ex.Micheline => {
    return ex.list_to_mich(input_list, x => {
        return ex.pair_to_mich([x[0].to_mich(), ex.list_to_mich(x[1], x => {
                return x.to_mich();
            })]);
    });
}
const assert_transfer_list_arg_to_mich = (from_transfer_list_id: ex.Nat, to_transfer_list_id: ex.Nat): ex.Micheline => {
    return ex.pair_to_mich([
        from_transfer_list_id.to_mich(),
        to_transfer_list_id.to_mich()
    ]);
}
const update_user_arg_to_mich = (user: ex.Address, transfer_list_id: ex.Option<ex.Nat>): ex.Micheline => {
    return ex.pair_to_mich([
        user.to_mich(),
        transfer_list_id.to_mich()
    ]);
}
const update_users_arg_to_mich = (utl: Array<[
    ex.Address,
    ex.Option<ex.Nat>
]>): ex.Micheline => {
    return ex.list_to_mich(utl, x => {
        return ex.pair_to_mich([x[0].to_mich(), x[1].to_mich()]);
    });
}
const update_transfer_list_arg_to_mich = (transfer_list_id: ex.Nat, u: ex.Option<[
    boolean,
    Array<ex.Nat>
]>): ex.Micheline => {
    return ex.pair_to_mich([
        transfer_list_id.to_mich(),
        u.to_mich()
    ]);
}
const get_user_arg_to_mich = (user: ex.Address): ex.Micheline => {
    return user.to_mich();
}
const view_assert_transfer_arg_to_mich = (sender: ex.Address, from: ex.Address, to: ex.Address): ex.Micheline => {
    return ex.pair_to_mich([
        sender.to_mich(),
        from.to_mich(),
        to.to_mich()
    ]);
}
export const deploy_get_user_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_user", ex.option_annot_to_mich_type(ex.prim_annot_to_mich_type("nat", []), []));
};
export class Whitelist {
    address: string | undefined;
    get_user_callback_address: string | undefined;
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
    async deploy(admin: ex.Address, users: ex.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/whitelist.arl", {
            admin: admin.to_mich(),
            users: users.to_mich()
        }, params);
        this.address = address;
        this.get_user_callback_address = await deploy_get_user_callback();
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
    async add_super_user(su: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_super_user", add_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_super_user(su: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_super_user", remove_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_users_contract(users_contract: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_users_contract", set_users_contract_arg_to_mich(users_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async add_whitelister(v: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_whitelister", add_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_whitelister(v: ex.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_whitelister", remove_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_receivers(addrs: Array<ex.Address>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_receivers", assert_receivers_arg_to_mich(addrs), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_transfers(input_list: Array<[
        ex.Address,
        Array<ex.Address>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_transfers", assert_transfers_arg_to_mich(input_list), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_transfer_list(from_transfer_list_id: ex.Nat, to_transfer_list_id: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_transfer_list", assert_transfer_list_arg_to_mich(from_transfer_list_id, to_transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_user(user: ex.Address, transfer_list_id: ex.Option<ex.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_user", update_user_arg_to_mich(user, transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_users(utl: Array<[
        ex.Address,
        ex.Option<ex.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_users", update_users_arg_to_mich(utl), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_transfer_list(transfer_list_id: ex.Nat, u: ex.Option<[
        boolean,
        Array<ex.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_transfer_list", update_transfer_list_arg_to_mich(transfer_list_id, u), params);
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
    async get_pause_param(params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "pause", pause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_unpause_param(params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "unpause", unpause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_super_user_param(su: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_super_user", add_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_super_user_param(su: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_super_user", remove_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_users_contract_param(users_contract: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_users_contract", set_users_contract_arg_to_mich(users_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_whitelister_param(v: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_whitelister", add_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_whitelister_param(v: ex.Address, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_whitelister", remove_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_receivers_param(addrs: Array<ex.Address>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_receivers", assert_receivers_arg_to_mich(addrs), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_transfers_param(input_list: Array<[
        ex.Address,
        Array<ex.Address>
    ]>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_transfers", assert_transfers_arg_to_mich(input_list), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_transfer_list_param(from_transfer_list_id: ex.Nat, to_transfer_list_id: ex.Nat, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_transfer_list", assert_transfer_list_arg_to_mich(from_transfer_list_id, to_transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_user_param(user: ex.Address, transfer_list_id: ex.Option<ex.Nat>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_user", update_user_arg_to_mich(user, transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_users_param(utl: Array<[
        ex.Address,
        ex.Option<ex.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_users", update_users_arg_to_mich(utl), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_transfer_list_param(transfer_list_id: ex.Nat, u: ex.Option<[
        boolean,
        Array<ex.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<ex.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_transfer_list", update_transfer_list_arg_to_mich(transfer_list_id, u), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_user(user: ex.Address, params: Partial<ex.Parameters>): Promise<ex.Option<ex.Nat>> {
        if (this.address != undefined) {
            if (this.get_user_callback_address != undefined) {
                const entrypoint = new ex.Entrypoint(new ex.Address(this.get_user_callback_address), "callback");
                await ex.call(this.address, "get_user", ex.getter_args_to_mich(get_user_arg_to_mich(user), entrypoint), params);
                return await ex.get_callback_value<ex.Option<ex.Nat>>(this.get_user_callback_address, x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async view_assert_transfer(sender: ex.Address, from: ex.Address, to: ex.Address, params: Partial<ex.Parameters>): Promise<string> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "assert_transfer", view_assert_transfer_arg_to_mich(sender, from, to), params);
            return mich;
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
    async get_users(): Promise<ex.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Address(storage.users);
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
    async get_paused(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return storage.paused;
        }
        throw new Error("Contract not initialised");
    }
    async get_super_users(): Promise<Array<ex.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<ex.Address> = [];
            for (let i = 0; i < storage.super_users.length; i++) {
                res.push((x => { return new ex.Address(x); })(storage.super_users[i]));
            }
            return res;
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
    async get_transfer_lists_value(key: ex.Nat): Promise<transfer_list | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.transfer_lists), key.to_mich(), ex.prim_annot_to_mich_type("nat", [])), collapsed = true;
            if (data != undefined) {
                return mich_to_transfer_list(data, collapsed);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_transfer_lists_value(key: ex.Nat): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.transfer_lists), key.to_mich(), ex.prim_annot_to_mich_type("nat", [])), collapsed = true;
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
        r2: ex.pair_to_mich([ex.string_to_mich("\"INVALID_CONDITION\""), ex.string_to_mich("\"r2\"")]),
        INVALID_CALLER: ex.string_to_mich("\"INVALID_CALLER\""),
        r1: ex.pair_to_mich([ex.string_to_mich("\"INVALID_CONDITION\""), ex.string_to_mich("\"r1\"")]),
        r0: ex.pair_to_mich([ex.string_to_mich("\"INVALID_CONDITION\""), ex.string_to_mich("\"r0\"")]),
        TO_TRANSFERLIST_NOT_FOUND_IN_FROM: ex.string_to_mich("\"TO_TRANSFERLIST_NOT_FOUND_IN_FROM\""),
        TO_INVALID_UNRESTRICTED_STATE: ex.string_to_mich("\"TO_INVALID_UNRESTRICTED_STATE\""),
        FROM_INVALID_UNRESTRICTED_STATE: ex.string_to_mich("\"FROM_INVALID_UNRESTRICTED_STATE\""),
        TO_TRANSFERLIST_NOT_FOUND: ex.string_to_mich("\"TO_TRANSFERLIST_NOT_FOUND\""),
        FROM_TRANSFERLIST_NOT_FOUND: ex.string_to_mich("\"FROM_TRANSFERLIST_NOT_FOUND\""),
        ASSERT_TRANSFER_FAILED: ex.string_to_mich("\"ASSERT_TRANSFER_FAILED\""),
        USER_RESTRICTED: ex.string_to_mich("\"USER_RESTRICTED\""),
        CONTRACT_NOT_PAUSED: ex.string_to_mich("\"CONTRACT_NOT_PAUSED\""),
        CONTRACT_PAUSED: ex.string_to_mich("\"CONTRACT_PAUSED\""),
        co1: ex.string_to_mich("\"INVALID_CALLER\""),
        MISSING_ADMIN_CANDIDATE: ex.string_to_mich("\"MISSING_ADMIN_CANDIDATE\""),
        TO_RESTRICTED: ex.string_to_mich("\"TO_RESTRICTED\""),
        FROM_RESTRICTED: ex.string_to_mich("\"FROM_RESTRICTED\""),
        USER_GETOPT_INTERNAL_ERROR: ex.string_to_mich("\"USER_GETOPT_INTERNAL_ERROR\""),
        OPTION_IS_NONE: ex.string_to_mich("\"OPTION_IS_NONE\"")
    };
}
export const whitelist = new Whitelist();
