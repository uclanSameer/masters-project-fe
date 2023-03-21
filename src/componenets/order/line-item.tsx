import { MenuItem } from "@/model/menu";
import Image from "next/image";

export default function OrderLineItem(props: {
    orderItem: {
        menuItem: MenuItem,
        quantity: number,
        price: number
    }
}) {
    const { orderItem } = props;
    return (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
                <Image width={200} height={200} className="w-full hidden md:block" src={orderItem.menuItem.image} alt="dress" />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{orderItem.menuItem.name}</h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="hidden text-base dark:text-white xl:text-lg leading-6">£36.00 <span className="text-red-300 line-through"> £45.00</span></p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{orderItem.quantity}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${orderItem.price}</p>
                </div>
            </div>
        </div>
    );
}