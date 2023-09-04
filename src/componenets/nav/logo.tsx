import AuthContext from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function CompanyLogo() {
    const authContext = useContext(AuthContext);
    return (
        <Link href={
            authContext.isLoggedIn ? "/dashboard" : "/"
        } className="flex flex-shrink-0 items-center">
            <Image
                alt="logo"
                width={20}
                height={10}
                src="/logo.jpg"
                className="w-10 h-10 rounded-full mx-auto" />
        </Link>
    );
}