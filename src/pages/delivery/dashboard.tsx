import { Delivery } from '@/model/delivery';
import ApiRequests from '@/utils/api-requests';
import { GeneralUtils } from '@/utils/general-utils';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';
import { tableBody } from '../admin/deliveries';

const DeliveryDashboard = (
    props: {
        toDeliver: Array<Delivery>
    }
) => {
    return (
        <div>
            Enter
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Address</th>
                        <th>Assigned delivery</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableBody(props.toDeliver, '/delivery/update-delivery/', 'Update to DELIVERED')
                    }
                </tbody>
            </table>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req, res } = ctx;
    const cookies = parse(req.headers.cookie || '');

    GeneralUtils.invalidateUserSession(req, res, 'DELIVERY');

    const toDeliver = (await ApiRequests.getAllToDeliverItems(cookies['token'])).data;
    return {
        props: {
            toDeliver
        }
    }
}

export default DeliveryDashboard