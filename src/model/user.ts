export interface User {
    token:    string;
    type:     string;
    email:    string;
    userRole: string;
    userId:   number;
    address:  Address;
}

export interface Address {
    countryName:     string;
    state:           string;
    province:        string;
    postalCode:      string;
    city:            string;
    district:        string;
    subdistrict:     string;
    street:          string;
    houseNumber:     number;
    apartmentNumber: string;
    appartmentName:  string;
    position:        Position;
}

export interface Position {
    latitude:  number;
    longitude: number;
}

export interface UserProfile {
    email:    string;
    password?: string;
    userDetail: SignUpUserDetail;
}

export interface SignUpUserDetail {
    name:     string;
    phoneNumber: string;
    address:  Address;
    imageUrls: string
    imageUrl?: string;
    position: Position;
    latitude?: number;
    longitude?: number;
}
