import { BusinessTransaction } from '@/model/transactions';
import { GeneralUtils } from '@/utils/general-utils';
import { GET, GetWithToken } from '@/utils/requests';
import { parse } from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const BusinessTransaction = (
    props: {
        transactions: Array<BusinessTransaction>
    }
) => {
    return (
        <div>
            {/* table to populate transactions */}

            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">SN</th>
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Customer Email</th>
                        <th className="px-4 py-2">amount</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.transactions.map((transaction: BusinessTransaction, index) => {
                        return (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{transaction.fromUser.userDetail.name}</td>
                                <td className="border px-4 py-2">{transaction.fromUser.email}</td>
                                <td className="border px-4 py-2">£ {transaction.amount}</td>
                                <td className="border px-4 py-2">{transaction.transactionDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const cookies = parse(req.headers.cookie || '');

    GeneralUtils.invalidateUserSession(req, res, 'BUSINESS');

    const transactions = (await GetWithToken<Array<BusinessTransaction>>(
        "http://localhost:8080/api/v1/transactions/business",
        cookies['token'])).data;

    return {
        props: {
            transactions
        }
    }
}

export default BusinessTransaction