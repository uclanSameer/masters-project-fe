import { Delivery } from '@/model/delivery';
import ApiRequests from '@/utils/api-requests';
import { GeneralUtils } from '@/utils/general-utils';
import { Button } from '@material-tailwind/react';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';

const Deliveries = (
    props: {
        unassigned: Array<Delivery>,
        notDelivered: Array<Delivery>,
        delivered: Array<Delivery>
    }
) => {
    const { unassigned, notDelivered, delivered } = props;
    const [selected, setSelected] = React.useState('unassigned');
    const deliveries = selected === 'unassigned' ? unassigned : selected === 'notDelivered' ? notDelivered : delivered;
    return (
        <div className='m-5'>
            <Link className='bg-green-600 rounded-md p-4' href='/admin/add-delivery'>Add Delivery User</Link>

            <div className='m-5'>
                <select
                    className='bg-slate-300 border-2 border-gray-500 p-2 rounded-md'
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const selected = e.target.value;
                        setSelected(selected);
                    }}
                    name="deleveryType" id="deleveryType">
                    <option value="unassigned">Unassigned</option>
                    <option value="notDelivered">Not Delivered</option>
                    <option value="delivered">Delivered</option>
                </select>
                {
                    deliveries.length > 0 ?
                        <table className='table-auto'>
                            <TableHead     />
                            <tbody>
                                {
                                    Table(deliveries)
                                }
                            </tbody>
                        </table> :
                        <p className='m-4'>No items </p>
                }
            </div>

        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req, res } = ctx;

    const token = GeneralUtils.invalidateUserSession(req, res, 'ADMIN');

    const deliveries = await Promise.all(
        [
            ApiRequests.getUnassignedDeliveries(token),
            ApiRequests.getNotDelivered(token),
            ApiRequests.getDelivered(token),
        ]
    );
    return {
        props: {
            unassigned: deliveries[0].data,
            notDelivered: deliveries[1].data,
            delivered: deliveries[2].data,
        }
    }
}

export default Deliveries

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
            {!delivery.deliveryPerson ?
                <td className='border-2 border-gray-500 m-4 p-6'>
                    <Link href={`${href}${delivery.orderNumber}`} className='bg-green-400 p-1 rounded' >
                        {label}
                    </Link>
                </td> :

                <td className='border-2 border-gray-500 m-4 p-4'>
                    <p> No Action Needed</p>
                </td>
            }
        </tr>
    ));
}

    function TableHead({}) {
      return (<thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Address</th>
                                    <th>Assigned delivery</th>
                                    <th>Action</th>
                                </tr>
                            </thead>);
    }
  