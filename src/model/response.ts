import { Business } from "./business";
import { MenuItem } from "./menu";
import { UserProfile } from "./user";

export interface Response<T> {
    timestamp: string;
    success:   boolean;
    message:   string;
    data:      T;
}


export interface ChefFullResponse {
    cheifDetails: Business;
    menuItems: Array<MenuItem>;
    menuItemsCount: number;
    featuredItemsCount: number;
  }

export interface Transaction {
    amount:              number;
    fromUser:            UserProfile;
    toBusiness:          Business;
    transactionMethod:   string;
    transactionStatus:   string;
    transactionDate:     string;
    transactionCurrency: string;
    transactionFee:      number;
}
