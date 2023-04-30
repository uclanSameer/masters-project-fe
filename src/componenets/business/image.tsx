import { UserIcon } from "@heroicons/react/20/solid";
import { parse } from "cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BusinessImage(
    props: {
        image?: string
    }
) {
    const [role, setRole] = useState('');

    useEffect(() => {
        const cookie = parse(document.cookie);
        setRole(cookie.role);
    }, []);

    return <div className="relative">
        <Link
            href={role === 'USER' ? '/dashboard' : "/profile"}
            className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            {
                !props.image ?
                    <UserIcon className="w-24 h-24" /> :
                    <Image
                        height={192}
                        width={192}
                        alt="Profile image"
                        src={props.image}
                        className="w-48 h-48 rounded-full" />
            }
        </Link>
    </div>;
}