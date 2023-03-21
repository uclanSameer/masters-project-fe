export default function TopLeftHeader() {
    return <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
        <div>
            <p className="font-bold text-gray-700 text-xl">{22}</p>
            <p className="text-gray-400">Menu items</p>
        </div>
        <div>
            <p className="font-bold text-gray-700 text-xl">{10}</p>
            <p className="text-gray-400">featured foods</p>
        </div>
        <div>
            <p className="font-bold text-gray-700 text-xl">{5}</p>
            <p className="text-gray-400">Rating</p>
        </div>
    </div>;
}