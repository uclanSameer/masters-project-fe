import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import AuthContext from "../../context/auth-context";
import DisclosedNavItems from "./disclosed-nav-items";
import MenuItem from "./menu-item";
import NavItems from "./nav-items";
import MenuIcon from "./menu-icon";
import { useRouter } from "next/router";
import Link from 'next/link';
import { parse } from 'cookie';
import CartIcon from '../icon/shoping-cart';

const beforeAuthenticationRoute = ['/login', '/signup', '/'];

const navigationAfterLogIn = [
    { name: 'Home', href: '/dashboard', current: true },
    { name: 'Menu', href: '/menu', current: false },
    { name: 'Nearby Chefs', href: '/chefs', current: false },
]

const navigationBeforeLogIn = [
    { name: 'Menu', href: '/menu', current: false },
]


const menuItems = [
    { name: 'Your Profile', href: '/profile', show: true },
    { name: 'Settings', href: '/settings', show: true },
    { name: 'orders', href: '/orders', show: true },
]

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const authContext = useContext(AuthContext);

    const authLoggedIn = authContext.isLoggedIn;

    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();



    useEffect(() => {
        const cookie = parse(document.cookie);
        const isLoggedIn = cookie.loggedIn === 'true';

        if (isLoggedIn && !authLoggedIn) {
            authContext.onLogin();
        }

        setLoggedIn((loggedIn) => isLoggedIn);
        if (isLoggedIn) {
            if (cookie.role === 'USER') {
                if (beforeAuthenticationRoute.includes(router.pathname)) {
                    router.push('/dashboard');
                }
            }
        } else {
            router.push('/');
        }
        setIsLoading(false);
    }, [authContext.isLoggedIn]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    function logOutHandler() {
        const cookie = parse(document.cookie);
        if (cookie.loggedIn === 'true') {
            setLoggedIn(() => false);
            document.cookie = 'loggedIn=false';
            document.cookie = 'token=';
            document.cookie = 'role=';
            document.cookie = 'email=';
            document.cookie = 'address=';
            authContext.onLogout();
        }
    }

    return (

        <Fragment>
            <Disclosure as="nav" className="bg-black">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <MenuIcon open={open} />
                                <NavItems navigationBeforeLogIn={
                                    loggedIn ? navigationAfterLogIn : navigationBeforeLogIn
                                } />
                                {loggedIn && (
                                    <div
                                        className={"\"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0\""
                                        }>
                                        <button
                                            type="button"
                                            className="collapse rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <Link
                                            href="/cart"
                                            type="button"
                                            className="rounded-full ml-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">view Cart</span>
                                            <div className="h-6 w-6" aria-hidden="true">
                                                <CartIcon itemCount={authContext.cartItemCount} />
                                            </div>
                                            {/* <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" /> */}
                                        </Link>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className={
                                            "ml-3 relative"
                                        }>
                                            <div>
                                                <Menu.Button
                                                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="next.svg"
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {
                                                        menuItems.map((item) => (
                                                            <MenuItem
                                                                key={item.name}
                                                                data={item}
                                                            />
                                                        ))
                                                    }

                                                    <MenuItem
                                                        onMenuItemClick={logOutHandler}
                                                        data={
                                                            { 'name': 'Sign out', 'href': '/login', show: true }}
                                                    />

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                )}
                            </div>
                        </div>

                        <DisclosedNavItems navItems={navigationAfterLogIn} />
                    </>
                )}
            </Disclosure>
        </Fragment>
    )
}
