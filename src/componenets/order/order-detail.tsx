import {CartInfo} from "@/model/cart-info";
import OrderLineItem from "./line-item";
import OrderSidebar from "./order-sidebar";
import ShippingDetails from "./shipping-details";
import OrderSummary from "./summary";
import {MenuItem} from "@/model/menu";
import {OrderInfo} from "@/model/order-info";


export default function OrderDetails(props: {
    orders: Array<OrderInfo>;
}) {
    const {orders} = props;
    const subtotal = orders
        .map((orderItem) => (orderItem.menuItem.price) * (orderItem.quantity))
        .reduce((a, b) => a + b, 0);
    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order
                    #13432</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{
                    new Date().toLocaleDateString('en-GB', {})
                }</p>
            </div>
            <div
                className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div
                        className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s
                            Orders</p>

                        {
                            orders.map((orderItem, index) => {
                                return <OrderLineItem
                                    key={index}
                                    orderItem={orderItem}/>
                            })
                        }

                    </div>
                    <div
                        className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <OrderSummary subtotal={subtotal}/>
                        <ShippingDetails/>
                    </div>
                </div>
                <OrderSidebar/>
            </div>
        </div>
    );
}