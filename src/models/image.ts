import Model from "./core_model";

export interface IImage {
    id: string;
    originalUrl: string;
    largeUrl: string;
    mediumUrl: string;
    smallUrl: string;
}

const ROUTE = "/api/images/";

export default class Image extends Model {}

Image.initial({
    route: ROUTE
});
