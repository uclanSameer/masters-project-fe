import Link from "next/link";
import CompanyLogo from "./logo";
import { classNames } from "./nav";

export default function NavItems(props: {
    navigationBeforeLogIn: Array<{
        name: string,
        href: string,
        current: boolean
    }>;
}): JSX.Element {
    const { navigationBeforeLogIn } = props;
    return (
        <>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <CompanyLogo />
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        {props.navigationBeforeLogIn.map((item) => (
                            <Link
                                onClick={() => {
                                    navigationBeforeLogIn.forEach((item) => item.current = false);
                                    item.current = true
                                }}
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}