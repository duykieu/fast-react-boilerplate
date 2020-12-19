import axios, { AxiosResponse } from "axios";
import { toCamelCase } from "../utils";
// @ts-ignore
import { TOKEN_KEY } from "../config";

class Model {
    public static route: string;

    public static response: AxiosResponse;

    static initial({ route }: {route: string}) {
        this.route = route;
    }

    static client() {
        const token = localStorage.getItem(TOKEN_KEY);
        axios.defaults.headers.common.Authorization = token ? "Bearer " + token : "";
        return axios;
    }

    static resolve<T>(data: T): T {
        return toCamelCase<T, T>(data);
    }

    static async find<T>(params: any): Promise<T> {
        const { data } = await this.client().get<T>(this.route, { params });
        return this.resolve<T>(data);
    }

    static async findOne<T>(id: string): Promise<T> {
        const { data } = await this.client().get(this.route + id);
        return this.resolve<T>(data);
    }

    static async create<T, P>(payload: P): Promise<T> {
        const { data } = await this.client().post<T>(this.route, payload);
        return this.resolve<T>(data);
    }

    static async update<T, P>(id: string, payload: P): Promise<T> {
        const { data } = await this.client().patch<T>(this.route + id, payload);
        return this.resolve<T>(data);
    }

    static async destroy(id: string | undefined): Promise<void> {
        await this.client().delete(this.route + id);
        return Promise.resolve();
    }
}

export default Model;
