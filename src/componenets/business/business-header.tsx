import BusinessImage from "./image";
import TopLeftHeader from "./top-left-header";
import TopRightHeader from "./top-right-header";

export default function BusinessHeader(props: {
    featuredMenuItemCount: number,
    totalMenuItemCount: number,
    image?: string
}) {
    return <div className="grid grid-cols-1 md:grid-cols-3">
        <TopLeftHeader
            featuredMenuItemCount={props.featuredMenuItemCount}
            totalMenuItemCount={props.totalMenuItemCount}
        />
        <BusinessImage
            image={props.image} 
        />
        <TopRightHeader />
    </div>;
}