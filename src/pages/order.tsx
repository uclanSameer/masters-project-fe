import OrderDetails from "@/componenets/order/order-detail";
import { OrderInfo } from "@/model/order-info";
import { PostWithToken } from "@/utils/requests";
import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";

export default function OrderPage(props: {
    orders: Array<OrderInfo>;
}) {
    const { orders } = props;
    return (
        <>
            <OrderDetails orders={orders} />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;

    const cookies = parse(req.headers.cookie || '');
    const orderResponse = await PostWithToken<Array<OrderInfo>>('http://localhost:8080/api/v1/order/all', {}, cookies.token);

    const orders = orderResponse.data;
    return {
        props: {
            // props for your component
            orders
        },
    };
}