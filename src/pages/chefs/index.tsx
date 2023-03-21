import FilterPage from "@/componenets/search/filter-page";
import {Business} from "@/model/business";
import {PostCodeResult} from "@/model/post-code";
import {Response} from "@/model/response";
import {ChefSearchRequest} from "@/model/search";
import {Address} from "@/model/user";
import ApiRequests from "@/utils/api-requests";
import {parse} from "cookie";
import {GetServerSidePropsContext} from "next";
import {Dispatch, SetStateAction, useState} from "react";


type Props = {
    data: Array<Business>,
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
        />
    )
}

async function getNewAddress(
    postCode: string,
    setAddresses: Dispatch<SetStateAction<Address[]>>): Promise<void> {
    const postCodeResult: Response<PostCodeResult[]> = await ApiRequests.getAddressInfo(postCode);
    if (postCodeResult.data.length === 0) {
        return;
    }
    const address = postCodeResult.data
        .map((result: PostCodeResult) => {
            return result.address;
        });
    setAddresses(address);
}

function selectedAddress(setAddress: Dispatch<SetStateAction<Address>>, address: Address) {
    setAddress(address);
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parse(context.req.headers.cookie || '');
    const address: Address = JSON.parse(cookies.address);

    const chefSearchRequest: ChefSearchRequest = getChefSearchRequest(address);
    const data: Response<Array<Business>> = await ApiRequests.getNearbyBusinesses(chefSearchRequest);

    return {
        props: {
            data: data.data,
            address: address
        }
    }
}


export function getChefSearchRequest(address: Address): ChefSearchRequest {
    return {
        page: 1,
        size: 20,
        location: {
            lat: address.position.latitude,
            lon: address.position.longitude
        }

    }
}