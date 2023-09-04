import { Delivery } from '@/model/delivery';
import ApiRequests from '@/utils/api-requests';
import { GeneralUtils } from '@/utils/general-utils';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

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
                        Table(props.toDeliver, '/delivery/update-delivery/', 'Update to DELIVERED')
                    }
                </tbody>
            </table>
        </div>
    );
}


export function Table(
    unassigned: Delivery[],
    href = '/admin/assign/',
    label = 'Asign'): React.ReactNode {
    return unassigned.map((delivery, index) => (
        <tr
            className='border-2 border-gray-500 m-4 p-4'
            key={index}>
            <td className='border-2 border-gray-500 m-4 p-4'>{delivery.orderNumber}</td>
            <td className='border-2 border-gray-500 m-4 p-4'>{delivery.address}</td>
            <td className='border-2 border-gray-500 m-4 p-4'>{delivery.deliveryPerson?.userDetail.name || 'Not Assigned'}</td>
                <td className='border-2 border-gray-500 m-4 p-6'>
                    <Link href={`${href}${delivery.orderNumber}`} className='bg-green-400 p-1 rounded' >
                        {label}
                    </Link>
                </td> :
        </tr>
    ));
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