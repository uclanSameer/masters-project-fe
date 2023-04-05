import FilterPage from "@/componenets/search/filter-page";
import { Business } from "@/model/business";
import { Response } from "@/model/response";
import { ChefSearchRequest } from "@/model/search";
import { Address } from "@/model/user";
import ApiRequests from "@/utils/api-requests";
import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";


type Props = {
    data: Array<Business>,
    cuisines: Array<string>,
    address: Address
};

export default function Chefs(props: Props) {
    const [businesses, setBusinesses] = useState<Array<Business>>(props.data);
    const [address, setAddress] = useState<Address>(props.address);
    const [addresses, setAddresses] = useState<Address[]>([]);
    return (
        <FilterPage
            addresses={addresses}
            businesses={businesses}
            address={address}
            cuisines={props.cuisines}
        />
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = parse(context.req.headers.cookie || '');
        const address: Address = JSON.parse(cookies.address);

        const chefSearchRequest: ChefSearchRequest = getChefSearchRequest(address);
        const data: Response<Array<Business>> = await ApiRequests.getNearbyBusinesses(chefSearchRequest);

        const cuisines = (await ApiRequests.getCuisines()).data;

        return {
            props: {
                data: data.data,
                cuisines,
                address: address
            }
        }
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
}


export function getChefSearchRequest(
    address: Address,
    distance?: number,
    cuisines?: Array<string>): ChefSearchRequest {
    if (!address || !address.position) {
        throw new Error('Address must be provided');
    }
    const chefSearchRequest: ChefSearchRequest = {
        page: 1,
        size: 20,
        location: {
            lat: address.position.latitude,
            lon: address.position.longitude
        }
    };
    if (distance) {
        chefSearchRequest.radius = distance;
    }

    if (cuisines && cuisines.length > 0) {
        chefSearchRequest.cuisines = cuisines;
    }

    return chefSearchRequest
}