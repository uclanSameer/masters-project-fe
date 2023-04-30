import BusinessHeader from "./business-header";
import BusinessDetails from "./details";
import BusinessDescription from "./description";
import { ChefDetails } from "@/pages/chefs/[...slug]";

export default function BusinessInformation(props: {
    business: ChefDetails['business'],
    featuredMenuItemCount: number,
    totalMenuItemCount: number
}) {

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <BusinessHeader
                    image={props.business.image}
                    featuredMenuItemCount={props.featuredMenuItemCount}
                    totalMenuItemCount={props.totalMenuItemCount}
                />
                <BusinessDetails
                    business={props.business}
                />
                <BusinessDescription
                    business={props.business}
                />
            </div>
        </div>
    )
}