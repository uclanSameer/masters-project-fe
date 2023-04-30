import CartComponent from '@/componenets/cart/cart';
import { CartInfo } from '@/model/cart-info';
import { Response } from '@/model/response';
import { POST, PostWithToken } from '@/utils/requests';
import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { toast } from 'react-toastify';

export default function CartPage(props: {
    response: Response<CartInfo>
}) {
    return (
        <>
            (
            <div>
                <CartComponent
                    items={props.response.data.items}
                    total={props.response.data.total}
                    checkout={checkout}
                />
            </div>
            )
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req } = context;

        const cookies = parse(req.headers.cookie || '');

        const response = await PostWithToken<CartInfo>("http://localhost:8080/api/v1/cart/info", {}, cookies.token);

        return {
            props: {
                response
            },
        };

    } catch (err) {
        console.error('error while sending request', err);
    }
}

function checkout() {
    POST("http://localhost:8080/api/v1/payment/checkout", {})
        .then((res) => {
            (window as any).location.href = res.data;
        })
        .catch(() => {
            toast.error('Error while checking out. Please try again later.', {
                position: "bottom-right",
            })
        });
}