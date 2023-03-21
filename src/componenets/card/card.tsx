import { MenuItem } from "@/model/menu";
import Image from "next/image";

export interface CardProps extends MenuItem {
    onClick: {
        addItem: () => void
    };
}

export default function Card(props: CardProps) {
    const buttonLabel = props.instantDelivery ? "Add to cart" : "Pre-order";

    return (
        <>
            <div
                className="relative w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <Image className="rounded-t-lg max-h-52" src={props.image} width={400} height={200} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {props.name}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{
                        props.description
                    }</p>

                </div>
                <div className="flex items-center justify-between p-5">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">£{props.price}</span>
                    <button onClick={props.onClick.addItem}
                        className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {buttonLabel}</button>
                </div>
            </div>

        </>
    );
}