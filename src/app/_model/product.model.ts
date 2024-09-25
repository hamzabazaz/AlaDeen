import { FileHandle } from "./File-handle.model";

export interface Product{

    productId:number | null,
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: FileHandle[]

}