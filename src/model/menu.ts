import { Address } from "./user";

export interface MenuItem {
    id:              number;
    name:            string;
    description:     string;
    cuisine:         string;
    price:           number;
    nutritionalInfo: string;
    image:           string;
    isFeatured:      boolean;
    sellerId?:       number;
    isAvailable:     boolean;
    isVeg:           boolean;
    instantDelivery: boolean;
    bookingRequired: boolean;
    businessId?:     number;
    businessEmail?:  string;
    businessName?:   string;
    businessLocation?: Address;
}
