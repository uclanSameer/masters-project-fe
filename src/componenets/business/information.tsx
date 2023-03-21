import BusinessHeader from "./business-header";
import BusinessDetails from "./details";
import BusinessDescription from "./description";

export default function BusinessInformation() {

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <BusinessHeader/>
                <BusinessDetails/>
                <BusinessDescription/>
            </div>
        </div>
    )
}