import Image from "next/image";

export default function CompanyLogo() {
    return (
        <div className="flex flex-shrink-0 items-center">
            <Image
                alt="logo"
                width={20}
                height={10}
                src="/logo.jpg"
                className="w-10 h-10 rounded-full mx-auto" />
        </div>
    );
}