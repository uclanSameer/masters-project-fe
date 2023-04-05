import { Business } from "@/model/business";

export default function BusinessDetails(
    props: {
        business: Business
    }
) {
    const { business } = props;
    return <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700"> {business.userDetail.name},
        </h1>
        <p className="font-light text-gray-600 mt-3">{address()}</p>

        <p className="mt-8 text-gray-500"> {business.userDetail.phoneNumber}</p>
        <p className="mt-2 text-gray-500">{business.email}</p>
    </div>;

    function address(): string {
        const address = business.userDetail.address;
        return address?.houseNumber + ' ' + address?.street + ', ' + address?.city;
    }
}