// Generated by https://quicktype.io

import { MenuItem } from "./menu";

export interface CartInfo {
    total: Total;
    items: Array<CartItem>;
}

export interface CartItem {
    item: MenuItem;
    quantity: number;
}


export interface Total {
    totalCost: number;
    taxes: number;
    deliveryCharges: number;
}
