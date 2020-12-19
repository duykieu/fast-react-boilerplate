import Model from "./core_model";

export interface IUser {
    id?: string;
    fullName?: string;
    username: string;
    password?: string;
}

export interface IUserLoginSuccessPayload {
    token: string;
    user: IUser;
}

export default class User extends Model {
    static async login<T>(payload: {
        username: string;
        password: string;
    }): Promise<T> {
        // const { data } = await this.client().post<IUserLoginSuccessPayload>(
        //     this.route + "/login"
        // );

        // We fake login, in real project, you should use code above

        return Promise.resolve<T>({
            // @ts-ignore
            token: "abc",
            currentUser: {
                id: 1,
                token: "abc",
                username: "myusername",
                password: "abc@123"
            }
        });
    }
}

User.initial({ route: "https://jsonplaceholder.typicode.com/users" });
