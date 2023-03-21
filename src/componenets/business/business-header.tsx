import BusinessImage from "./image";
import TopLeftHeader from "./top-left-header";
import TopRightHeader from "./top-right-header";

export default function BusinessHeader() {
    return <div className="grid grid-cols-1 md:grid-cols-3">
        <TopLeftHeader/>
        <BusinessImage/>
        <TopRightHeader/>
    </div>;
}