import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class transfer_list implements att.ArchetypeType {
    constructor(public unrestricted: boolean, public allowed_transfer_lists: Array<att.Nat>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.bool_to_mich(this.unrestricted), att.list_to_mich(this.allowed_transfer_lists, x => {
                return x.to_mich();
            })]);
    }
    equals(v: transfer_list): boolean {
        return (this.unrestricted == v.unrestricted && this.unrestricted == v.unrestricted && JSON.stringify(this.allowed_transfer_lists) == JSON.stringify(v.allowed_transfer_lists));
    }
}
export const transfer_list_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("bool", ["%unrestricted"]),
    att.list_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%allowed_transfer_lists"])
], []);
export const mich_to_transfer_list = (v: att.Micheline, collapsed: boolean = false): transfer_list => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, transfer_list_mich_type);
    }
    return new transfer_list(att.mich_to_bool(fields[0]), att.mich_to_list(fields[1], x => { return att.mich_to_nat(x); }));
};
export type whitelister_key = att.Address;
export const whitelister_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export type whitelister_container = Array<whitelister_key>;
export const whitelister_container_mich_type: att.MichelineType = att.list_annot_to_mich_type(att.prim_annot_to_mich_type("address", []), []);
const declare_admin_arg_to_mich = (candidate: att.Address): att.Micheline => {
    return candidate.to_mich();
}
const claim_admin_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const pause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const unpause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const add_super_user_arg_to_mich = (su: att.Address): att.Micheline => {
    return su.to_mich();
}
const remove_super_user_arg_to_mich = (su: att.Address): att.Micheline => {
    return su.to_mich();
}
const set_users_contract_arg_to_mich = (users_contract: att.Address): att.Micheline => {
    return users_contract.to_mich();
}
const add_whitelister_arg_to_mich = (v: att.Address): att.Micheline => {
    return v.to_mich();
}
const remove_whitelister_arg_to_mich = (v: att.Address): att.Micheline => {
    return v.to_mich();
}
const assert_receivers_arg_to_mich = (addrs: Array<att.Address>): att.Micheline => {
    return att.list_to_mich(addrs, x => {
        return x.to_mich();
    });
}
const assert_transfers_arg_to_mich = (input_list: Array<[
    att.Address,
    Array<att.Address>
]>): att.Micheline => {
    return att.list_to_mich(input_list, x => {
        return att.pair_to_mich([x[0].to_mich(), att.list_to_mich(x[1], x => {
                return x.to_mich();
            })]);
    });
}
const assert_transfer_list_arg_to_mich = (from_transfer_list_id: att.Nat, to_transfer_list_id: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        from_transfer_list_id.to_mich(),
        to_transfer_list_id.to_mich()
    ]);
}
const update_user_arg_to_mich = (user: att.Address, transfer_list_id: att.Option<att.Nat>): att.Micheline => {
    return att.pair_to_mich([
        user.to_mich(),
        transfer_list_id.to_mich()
    ]);
}
const update_users_arg_to_mich = (utl: Array<[
    att.Address,
    att.Option<att.Nat>
]>): att.Micheline => {
    return att.list_to_mich(utl, x => {
        return att.pair_to_mich([x[0].to_mich(), x[1].to_mich()]);
    });
}
const update_transfer_list_arg_to_mich = (transfer_list_id: att.Nat, u: att.Option<[
    boolean,
    Array<att.Nat>
]>): att.Micheline => {
    return att.pair_to_mich([
        transfer_list_id.to_mich(),
        u.to_mich()
    ]);
}
const get_user_arg_to_mich = (user: att.Address): att.Micheline => {
    return user.to_mich();
}
const view_assert_transfer_arg_to_mich = (sender: att.Address, from: att.Address, to: att.Address): att.Micheline => {
    return att.pair_to_mich([
        sender.to_mich(),
        from.to_mich(),
        to.to_mich()
    ]);
}
export const deploy_get_user_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_user", att.option_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), []));
};
export class Whitelist {
    address: string | undefined;
    get_user_callback_address: string | undefined;
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
    async deploy(admin: att.Address, users: att.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/whitelist.arl", {
            admin: admin.to_mich(),
            users: users.to_mich()
        }, params);
        this.address = address;
        this.get_user_callback_address = await deploy_get_user_callback();
    }
    async declare_admin(candidate: att.Address, params: Partial<ex.Parameters>): Promise<any> {
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
    async add_super_user(su: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_super_user", add_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_super_user(su: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_super_user", remove_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_users_contract(users_contract: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_users_contract", set_users_contract_arg_to_mich(users_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async add_whitelister(v: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_whitelister", add_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async remove_whitelister(v: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "remove_whitelister", remove_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_receivers(addrs: Array<att.Address>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_receivers", assert_receivers_arg_to_mich(addrs), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_transfers(input_list: Array<[
        att.Address,
        Array<att.Address>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_transfers", assert_transfers_arg_to_mich(input_list), params);
        }
        throw new Error("Contract not initialised");
    }
    async assert_transfer_list(from_transfer_list_id: att.Nat, to_transfer_list_id: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "assert_transfer_list", assert_transfer_list_arg_to_mich(from_transfer_list_id, to_transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_user(user: att.Address, transfer_list_id: att.Option<att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_user", update_user_arg_to_mich(user, transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_users(utl: Array<[
        att.Address,
        att.Option<att.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_users", update_users_arg_to_mich(utl), params);
        }
        throw new Error("Contract not initialised");
    }
    async update_transfer_list(transfer_list_id: att.Nat, u: att.Option<[
        boolean,
        Array<att.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "update_transfer_list", update_transfer_list_arg_to_mich(transfer_list_id, u), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_declare_admin_param(candidate: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "declare_admin", declare_admin_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_claim_admin_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "claim_admin", claim_admin_arg_to_mich(), params);
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
    async get_add_super_user_param(su: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_super_user", add_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_super_user_param(su: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_super_user", remove_super_user_arg_to_mich(su), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_users_contract_param(users_contract: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_users_contract", set_users_contract_arg_to_mich(users_contract), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_whitelister_param(v: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_whitelister", add_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_remove_whitelister_param(v: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "remove_whitelister", remove_whitelister_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_receivers_param(addrs: Array<att.Address>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_receivers", assert_receivers_arg_to_mich(addrs), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_transfers_param(input_list: Array<[
        att.Address,
        Array<att.Address>
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_transfers", assert_transfers_arg_to_mich(input_list), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_assert_transfer_list_param(from_transfer_list_id: att.Nat, to_transfer_list_id: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "assert_transfer_list", assert_transfer_list_arg_to_mich(from_transfer_list_id, to_transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_user_param(user: att.Address, transfer_list_id: att.Option<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_user", update_user_arg_to_mich(user, transfer_list_id), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_users_param(utl: Array<[
        att.Address,
        att.Option<att.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_users", update_users_arg_to_mich(utl), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_update_transfer_list_param(transfer_list_id: att.Nat, u: att.Option<[
        boolean,
        Array<att.Nat>
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "update_transfer_list", update_transfer_list_arg_to_mich(transfer_list_id, u), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_user(user: att.Address, params: Partial<ex.Parameters>): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            if (this.get_user_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_user_callback_address), "callback");
                await ex.call(this.address, "get_user", att.getter_args_to_mich(get_user_arg_to_mich(user), entrypoint), params);
                return await ex.get_callback_value<att.Option<att.Nat>>(this.get_user_callback_address, x => { return new att.Option<att.Nat>(x == null ? null : (x => { return new att.Nat(x); })(x)); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async view_assert_transfer(sender: att.Address, from: att.Address, to: att.Address, params: Partial<ex.Parameters>): Promise<string> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "assert_transfer", view_assert_transfer_arg_to_mich(sender, from, to), params);
            return mich;
        }
        throw new Error("Contract not initialised");
    }
    async get_admin(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.admin);
        }
        throw new Error("Contract not initialised");
    }
    async get_users(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.users);
        }
        throw new Error("Contract not initialised");
    }
    async get_admin_candidate(): Promise<att.Option<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<att.Address>(storage.admin_candidate == null ? null : (x => { return new att.Address(x); })(storage.admin_candidate));
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
    async get_super_users(): Promise<Array<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<att.Address> = [];
            for (let i = 0; i < storage.super_users.length; i++) {
                res.push((x => { return new att.Address(x); })(storage.super_users[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_whitelister(): Promise<whitelister_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<att.Address> = [];
            for (let i = 0; i < storage.whitelister.length; i++) {
                res.push((x => { return new att.Address(x); })(storage.whitelister[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_transfer_lists_value(key: att.Nat): Promise<transfer_list | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.transfer_lists), key.to_mich(), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
            if (data != undefined) {
                return mich_to_transfer_list(data, collapsed);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_transfer_lists_value(key: att.Nat): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.transfer_lists), key.to_mich(), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
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
        r2: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r2\"")]),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r1\"")]),
        r0: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r0\"")]),
        TO_TRANSFERLIST_NOT_FOUND_IN_FROM: att.string_to_mich("\"TO_TRANSFERLIST_NOT_FOUND_IN_FROM\""),
        TO_INVALID_UNRESTRICTED_STATE: att.string_to_mich("\"TO_INVALID_UNRESTRICTED_STATE\""),
        FROM_INVALID_UNRESTRICTED_STATE: att.string_to_mich("\"FROM_INVALID_UNRESTRICTED_STATE\""),
        TO_TRANSFERLIST_NOT_FOUND: att.string_to_mich("\"TO_TRANSFERLIST_NOT_FOUND\""),
        FROM_TRANSFERLIST_NOT_FOUND: att.string_to_mich("\"FROM_TRANSFERLIST_NOT_FOUND\""),
        ASSERT_TRANSFER_FAILED: att.string_to_mich("\"ASSERT_TRANSFER_FAILED\""),
        USER_RESTRICTED: att.string_to_mich("\"USER_RESTRICTED\""),
        CONTRACT_NOT_PAUSED: att.string_to_mich("\"CONTRACT_NOT_PAUSED\""),
        CONTRACT_PAUSED: att.string_to_mich("\"CONTRACT_PAUSED\""),
        co1: att.string_to_mich("\"INVALID_CALLER\""),
        MISSING_ADMIN_CANDIDATE: att.string_to_mich("\"MISSING_ADMIN_CANDIDATE\""),
        TO_RESTRICTED: att.string_to_mich("\"TO_RESTRICTED\""),
        FROM_RESTRICTED: att.string_to_mich("\"FROM_RESTRICTED\""),
        USER_GETOPT_INTERNAL_ERROR: att.string_to_mich("\"USER_GETOPT_INTERNAL_ERROR\""),
        OPTION_IS_NONE: att.string_to_mich("\"OPTION_IS_NONE\"")
    };
}
export const whitelist = new Whitelist();
