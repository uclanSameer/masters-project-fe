import { OrderInfo } from "@/model/order-info";
import OrderLineItem from "./OrderLineItem";

export function CustomerOrders(props: {
    orders: Array<OrderInfo>;
}) {
    return (
        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s
                Orders</p>

            {props.orders.map((orderItem, index) => {
                return <OrderLineItem key={index} orderItem={orderItem} />;
            })}

        </div>);
}