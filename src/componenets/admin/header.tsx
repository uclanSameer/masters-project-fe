import Image from "next/image";
import Link from "next/link";

const AdminHeadNav = () => {
    return (
        <header className="bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex mt-3">
                        <Link href="/">
                            <Image
                                alt="logo"
                                width={20}
                                height={10}
                                src="/logo.jpg"
                                className="w-10 h-10 rounded-full mx-auto" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeadNav