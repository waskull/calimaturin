export type Icecream = {
    id?: string;
    image?: any;
    name?: string;
    lowstock?: boolean;
    onPress?: any;
    price?: number;
    desc?: string;
    wholesale_price?: number;
}

export interface IIcescream{
    id:        number;
    name:      string;
    price:     number;
    lowstock:  boolean;
    image: string;
    desc: string;
    wholesale_price: number;
}