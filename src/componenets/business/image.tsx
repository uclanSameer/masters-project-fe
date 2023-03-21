import {UserIcon} from "@heroicons/react/20/solid";

export default function BusinessImage() {
    return <div className="relative">
        <div
            className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            <UserIcon className="w-24 h-24"/>
        </div>
    </div>;
}