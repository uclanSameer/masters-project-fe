import { CustomerOrders } from '@/componenets/order/CustomerOrders';
import { OrderInfo } from '@/model/order-info';
import { PostWithToken } from '@/utils/requests';
import { parse } from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Deleveries = (props: {
    orders: Array<OrderInfo>;
}) => {
    return (
        <div>
            <h1>Orders</h1>
            <>
                <CustomerOrders orders={props.orders} />
            </>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const { req } = context;
    const cookies = parse(req.headers.cookie || '');

    const token = cookies['token'];
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    if (cookies['role'] !== 'BUSINESS') {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const orders = (await PostWithToken<Array<OrderInfo>>('http://localhost:8080/api/v1/order/business/all', {}, token)).data;


    return {
        props: {
            orders
        }
    }
}

export default Deleveries