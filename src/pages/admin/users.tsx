import { UserProfile } from '@/model/user';
import ApiRequests from '@/utils/api-requests';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';

const UsersPage = (
    props: {
        users: Array<UserProfile>
    }
) => {
    return (
        <div>
            All User

            <table className='table-auto'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Email</th>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Phone</th>
                        <th className='px-4 py-2'>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user, index) => {

                            return (
                                <tr key={index}>
                                    <td className='border px-4 py-2'>{index}</td>
                                    <td className='border px-4 py-2'>{user.email}</td>
                                    <td className='border px-4 py-2'>{user.userDetail.name}</td>
                                    <td className='border px-4 py-2'>{user.userDetail.phoneNumber}</td>
                                    <td className='border px-4 py-2'>{address()}</td>
                                </tr>
                            )

                            function address() {
                                return (user.userDetail.address.houseNumber ||
                                    user.userDetail.address.apartmentNumber + ' ' + user.userDetail.address.appartmentName)
                                    + ', ' + user.userDetail.address.street + ', ' + user.userDetail.address.city + ', ' + user.userDetail.address.postalCode;
                            }
                        })

                    }
                </tbody>
            </table>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req, res } = ctx;

    const cookie = parse(req.headers.cookie || '');

    if (!cookie.token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }

    const users = (await ApiRequests.getAllUsers(cookie.token)).data;


    return {
        props: {
            users
        }
    }
}

export default UsersPage