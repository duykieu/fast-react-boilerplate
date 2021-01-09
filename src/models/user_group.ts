import Model from "./core_model";

export interface IUserGroup {
    id: string;
    name: string;
    permissions: any[];
}

const ROUTE = "/api/groups/";

export default class UserGroup extends Model {}

UserGroup.initial({ route: ROUTE });
