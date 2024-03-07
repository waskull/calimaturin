import { Item } from "./Item";
import { User } from "./User";

export interface Cart{
    id?: number;
    itemList: Item[];
    subtotal: number;
}

export interface Sale{
    id?: number;
    createdAt?: Date;
    updateAt?: Date;
    sale_items?: SaleItems[];
    status?: string;
    paymentMethod?: string;
    pay_code?: string[];
    total?: number;
    delivery_man?: number;
}
export interface SaleItems{
    id?: number;
    item?: Item;
    quantity?: number;
    sale_id?: number;
}