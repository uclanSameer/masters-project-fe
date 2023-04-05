import { Address, Position } from "./user";

export interface Business {
    id?:         string;
    email:      string;
    isFeatured: boolean;
    location:   Location;
    userDetail: UserDetail;
    image:      string;
    rating?:    number;
}

export interface Location {
    lat: number;
    lon: number;
}

export interface UserDetail {
    name:        string;
    phoneNumber: string;
    postalCode?: string;
    imageUrl:    string;
    latitude?:   number;
    longitude?:  number;
    address?:    Address;
    position?:   Position;
}
