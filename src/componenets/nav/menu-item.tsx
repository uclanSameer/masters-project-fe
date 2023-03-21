import Link from "next/link";
import { Menu } from "@headlessui/react";
import { classNames } from "./nav";

export default function MenuItem(props: {
    data: {
        name: string,
        href: string,
        show: boolean,
    },
    onMenuItemClick?: () => void
}) {
    const hidden = !props.data.show ? 'hidden' : '';
    return (
        <div className={hidden}>
            <Menu.Item>
                {({ active }) => (
                    <Link
                        onClick={props.onMenuItemClick}
                        href={props.data.href}
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                        {props.data.name}
                    </Link>
                )}
            </Menu.Item>
        </div>
    );
}