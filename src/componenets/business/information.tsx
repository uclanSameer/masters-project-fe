import BusinessHeader from "./business-header";
import BusinessDetails from "./details";
import BusinessDescription from "./description";
import { ChefDetails } from "@/pages/chefs/[...slug]";

export default function BusinessInformation(props: {
    business: ChefDetails['business'],
}) {

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <BusinessHeader/>
                <BusinessDetails
                    business = {props.business}
                 />
                <BusinessDescription
                    business = {props.business}
                />
            </div>
        </div>
    )
}