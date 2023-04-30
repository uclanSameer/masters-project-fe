import { UserProfile } from '@/model/user';
import ApiRequests from '@/utils/api-requests';
import { GeneralUtils } from '@/utils/general-utils';
import { Button } from '@material-tailwind/react';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AssignDeliveryMan = (
    props: {
        deliveries: Array<UserProfile>,
        orderId: string
    }
) => {
    const [deliveyMan, setDeliveryMan] = useState(props.deliveries[0].email);
    return (
        <div>
            select the delivery man
            <div>
                <select
                    onChange={(e) => {
                        const selected = e.target.value;
                        setDeliveryMan(selected);
                    }}
                    name="deliveryMan"
                    id="deliveryMan">
                    {
                        props.deliveries.map((delivery) => {
                            return <option value={delivery.email}> {delivery.userDetail.name + ' ' + delivery.email}</option>
                        })
                    }
                </select>

                <div>
                    <Button
                        onClick={() => assignDeliveryMan(deliveyMan, props.orderId)}
                        className='bg-green-400'
                    >Assign</Button>
                </div>
            </div>
        </div>
    );
}

function assignDeliveryMan(deliveryManEmail: string, orderId: string) {
    //  verify the string is a valid email
    if (!RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(deliveryManEmail)) {
        toast.error('Invalid email', {
            position: 'top-right',
        });
    }

    ApiRequests.updateDeliveryRequest({
        orderNumber: orderId,
        emailOfDeliveryPerson: deliveryManEmail
    }).then((res) => {
        toast.success(
            'Delivery Man updated Successfully', {
            position: 'top-right',
        }
        )
    })

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, res } = ctx;

    const { params } = ctx;
    const slug = params?.slug;
    const orderId = slug?.[0];

    const token = GeneralUtils.invalidateUserSession(req, res, 'ADMIN');

    const deliveries = (await ApiRequests.getAllUsersByRole('DELIVERY', token)).data;

    return {
        props: {
            deliveries,
            orderId
        }
    }
}

export default AssignDeliveryMan