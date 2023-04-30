
import ApiRequests from '@/utils/api-requests';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { toast } from 'react-toastify';

const UpdateDeliveryPage = (
    props: {
        orderId: string
    }
) => {
    return (
        <div>
            Are you sure you want to update this delivery?
            <div>
                <Link href={'/delivery/dashboard'} onClick={
                    () => {
                        ApiRequests.updateDeliveryStatus(props.orderId)
                            .then(() => {
                                toast.success('Delivery updated successfully', {
                                    position: 'top-right'
                                });
                            });
                    }
                }>Yes</Link>
                <Link href={'/delivery/dashboard'}>No</Link>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { params } = ctx;
    const slug = params?.slug;
    const id = slug?.[0];

    return {
        props: {
            orderId: id
        }
    }
}

export default UpdateDeliveryPage