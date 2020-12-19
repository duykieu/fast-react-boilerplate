import Model from "./core_model";

export interface IPost {
    id?: string;
    title: string;
    body: string;
}

export default class Post extends Model {}

Model.initial({ route: "http://jsonplaceholder.typicode.com/posts" });
