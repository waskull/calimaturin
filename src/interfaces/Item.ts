export interface Item {
    id: number;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    desc?: string;
    wholesale_price: number;
}

export interface ItemCart {
    items?: Item[];
    pay_code?: string[];
    paymentMethod?: string;
}