export default function TopRightHeader() {
    return <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        <button
            className="collapse text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
        >
            Connect
        </button>
        <button
            className="collapse text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
        >
            Manage Menu
        </button>
    </div>;
}