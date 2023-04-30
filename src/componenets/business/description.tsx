import { Business } from "@/model/business";

export default function BusinessDescription(
    props: {
        business: Business,
    }
) {
    const { business } = props;
    return <div className="mt-12 flex flex-col justify-center">
        <p className="text-gray-600 text-center font-light lg:px-16">
            Some Random Bio Information</p>
        <button
            className="text-indigo-500 py-2 px-4  font-medium mt-4 collapse"
        >
            Show more
        </button>
    </div>;
}