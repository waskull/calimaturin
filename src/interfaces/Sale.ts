export interface Sale{
    address?: string;
    items: ItemSale[];
    pay_code: string[];
    paymentMethod: string;
}
export interface ItemSale{
    id: number;
    quantity: number;
}