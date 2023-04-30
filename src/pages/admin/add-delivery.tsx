import SignupComponent from '@/componenets/signup';
import { parse } from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

const AddDeliveryPage = () => {
    return (
        <div>
            <SignupComponent
                isDelivery={true}
                showAlreadHaveAccount={false}
                buttonLabel='Add Delivery'
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {

    const { req, res } = ctx;

    const cookie = parse(req.headers.cookie || '');

    if (!cookie.token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }

    return {
        props: {

        }
    }
}

export default AddDeliveryPage