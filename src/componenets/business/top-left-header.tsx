export default function TopLeftHeader(
    props: {
        featuredMenuItemCount: number,
        totalMenuItemCount: number
    }
) {
    return <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
        <div>
            <p className="font-bold text-gray-700 text-xl">{props.totalMenuItemCount}</p>
            <p className="text-gray-400">Menu items</p>
        </div>
        <div>
            <p className="font-bold text-gray-700 text-xl">{props.featuredMenuItemCount}</p>
            <p className="text-gray-400">featured foods</p>
        </div>
        <div className="collapse">
            <p className="font-bold text-gray-700 text-xl">{5}</p>
            <p className="text-gray-400">Rating</p>
        </div>
    </div>;
}