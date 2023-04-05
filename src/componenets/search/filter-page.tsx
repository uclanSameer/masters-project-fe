import { MutableRefObject, useRef, useState } from "react";
import Map from "../maps/google-map";
import { Address } from "@/model/user";
import { Business } from "@/model/business";
import { Response } from "@/model/response";
import ApiRequests from "@/utils/api-requests";
import { PostCodeResult } from "@/model/post-code";
import { getChefSearchRequest } from "@/pages/chefs";
import { toast } from "react-toastify";
import { GeneralUtils } from "@/utils/general-utils";

export default function FilterPage(props: FilterProps) {
    const { businesses } = props;
    return (
        <div className="bg-white">
            <div>
                <SmallFilterView></SmallFilterView>
                <LargeFilterView
                    businesses={businesses}
                    address={props.address}
                    cuisines={props.cuisines}
                ></LargeFilterView>
            </div>
        </div>

    );
}


function SmallViewCusineCheckBoxs() {
    return (<div className="pt-6" id="filter-section-mobile-1">
        <div className="space-y-6">
            <div className="flex items-center">
                <input id="filter-mobile-category-0" name="category[]" defaultValue="new-arrivals" type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500">English</label>
            </div>
            <div className="flex items-center">
                <input id="filter-mobile-category-1" name="category[]" defaultValue="sale" type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500">Italian</label>
            </div>
            <div className="flex items-center">
                <input id="filter-mobile-category-2" name="category[]" defaultValue="travel" type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500">Chineese</label>
            </div>
            <div className="flex items-center">
                <input id="filter-mobile-category-3" name="category[]" defaultValue="organization" type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500">Indian</label>
            </div>
            <div className="flex items-center">
                <input id="filter-mobile-category-4" name="category[]" defaultValue="accessories" type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500">Nepalese</label>
            </div>
        </div>
    </div>);
}


function SmallCusineButton() {
    return (<button type="button"
        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
        aria-controls="filter-section-mobile-1" aria-expanded="false">
        <span className="font-medium text-gray-900">Cusines</span>
        <span className="ml-6 flex items-center">
            {
                /* Expand icon, show/hide based on section open state. */
            }
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {
                /* Collapse icon, show/hide based on section open state. */
            }
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                    clipRule="evenodd" />
            </svg>
        </span>
    </button>);
}


function SmallFilterView() {
    return (
        <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 z-40 flex">
                <div
                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {
                        /* Filters */
                    }
                    <form className="mt-4 border-t border-gray-200">
                        <div className="border-t border-gray-200 px-4 py-6">
                            <h3 className="-mx-2 -my-3 flow-root">
                                <SmallCusineButton></SmallCusineButton>
                            </h3>
                            {
                                /* Filter section, show/hide based on section state. */
                            }
                            <SmallViewCusineCheckBoxs></SmallViewCusineCheckBoxs>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}


function LargeLeftFilter(props: {
    cuisines: Array<string>,
    addCuisine: (cuisine: string) => void,
    removeCuisine: (cuisine: string) => void
}) {
    return (<div className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
            <button type="button"
                className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-1" aria-expanded="false">
                <span className="font-medium text-gray-900">Cusines</span>
                <span className="ml-6 flex items-center">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </button>
        </h3>

        <div className="pt-6" id="filter-section-1">
            <div className="space-y-4">
                {
                    props.cuisines.map((cuisine, index) => {
                        return <>
                            <div className="flex items-center">
                                <input
                                    key={index}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const value = e.target.value;
                                        if (checked) {
                                            props.addCuisine(value);
                                        } else {
                                            props.removeCuisine(value);
                                        }
                                    }}
                                    id="filter-category-0" name="category[]" defaultValue={cuisine} type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="filter-category-0" className="ml-3 text-sm text-gray-600">{cuisine}</label>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    </div>);
}


function LargeFilterView(props: {
    address: Address,
    businesses: Business[],
    cuisines: Array<string>
}) {
    const [cuisines, setCuisines] = useState<string[]>(props.cuisines);
    const [businesses, setBusinesses] = useState<Business[]>(props.businesses);
    const [address, setAddress] = useState<Address>(props.address);
    const [distance, setDistance] = useState(5);

    const [
        addresses, setAddresses] = useState<Array<PostCodeResult>>([]);

    const postalCodeRef = useRef<HTMLInputElement>();

    async function onChangeLocation() {
        const postalCode = postalCodeRef.current?.value.toLocaleUpperCase() || '';
        if (!GeneralUtils.validateUKPostalCode(postalCode)) {
            toast.error('Invalid UK postal code', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }
        const addressInfo: Response<Array<PostCodeResult>> = await ApiRequests.getAddressInfo(postalCode);
        setAddresses(addressInfo.data);

    }

    function addCusine(cuisine: string) {
        if (!cuisines.includes(cuisine)) {
            setCuisines([...cuisines, cuisine]);
        }
    }

    function removeCusine(cuisine: string) {
        if (cuisines.includes(cuisine)) {
            setCuisines(cuisines.filter((c) => c !== cuisine));
        }
    }

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nearby foods</h1>
                <div className="flex items-center">
                    <div className="relative inline-block text-left">
                    </div>
                    <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                        <span className="sr-only">View grid</span>
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                    <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                        <span className="sr-only">Filters</span>
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form className="hidden lg:block">
                        <LargeLeftFilter
                            addCuisine={addCusine}
                            removeCuisine={removeCusine}
                            cuisines={props.cuisines}
                        />

                        <div className="border-b border-gray-200 py-6">
                            <h3 className="-my-3 flow-root">
                                <button type="button"
                                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                    aria-controls="filter-section-1" aria-expanded="false">
                                    <span className="font-medium text-gray-900">Distance (in Km)</span>
                                    <span className="ml-6 flex items-center">
                                    </span>
                                </button>

                                <div>
                                    <input id="typeinp" type="range" min="0" max="20" value={distance} onChange={e => {
                                        setDistance(+e.target.value);
                                    }}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        step="1" />
                                    <p className="text-center text-gray-500">{distance} Km</p>


                                    <button
                                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            const chefSearchRequest = getChefSearchRequest(address, distance);
                                            ApiRequests
                                                .getNearbyBusinesses(chefSearchRequest)
                                                .then((response) => {
                                                    setBusinesses(response.data);
                                                    toast.success("Nearby businesses updated");
                                                });
                                        }} type="button">
                                        Change
                                    </button>

                                </div>
                                {/* styled chage location p  */}
                                <p className="font-medium text-gray-900">Change location</p>
                                <div>
                                    <input
                                        type="search"
                                        maxLength={8}
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="Postal Code"
                                        ref={postalCodeRef as MutableRefObject<HTMLInputElement>}
                                        placeholder="Postal Code" />

                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onChangeLocation()} type="button">
                                        Change
                                    </button>

                                    {
                                        addresses.length > 0 && (
                                            <div
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                            >
                                                <select onChange={
                                                    async (e) => {
                                                        const position: number = +e.target?.value;
                                                        const selectedAddress = addresses[position];
                                                        const address: Address = selectedAddress.address;
                                                        address.position = selectedAddress.referencePosition || address.position;
                                                        const businesses = await ApiRequests.getNearbyBusinesses(getChefSearchRequest(address, distance, cuisines));
                                                        setAddress(address);
                                                        setBusinesses(businesses.data);
                                                    }
                                                }>
                                                    {
                                                        addresses.map((address, index) => {
                                                            return (
                                                                <option key={index} value={index}
                                                                >{address.formattedAddress}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        )
                                    }
                                </div>


                                <div>
                                </div>
                            </h3>
                        </div>
                    </form>
                    {
                        /* Product grid */
                    }
                    <div className="lg:col-span-3">
                        {
                            /* Your content */
                        }
                        <p className="flex w-full items-center justify-between py-3 text-lg hover:text-slate-700">
                            your address
                            is {` ${address.houseNumber} ${address.street} ${address.city} ${address.state}`}
                        </p>

                        <Map businesses={businesses}
                            address={address}
                        />

                    </div>
                </div>
            </section>
        </main>);
}

interface FilterProps {
    businesses: Business[];
    address: Address;
    addresses: Address[];
    cuisines: Array<string>;
}