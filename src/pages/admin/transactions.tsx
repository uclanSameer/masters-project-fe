import { Transaction } from '@/model/response';
import ApiRequests from '@/utils/api-requests';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';

const Transactions = (
    props: {
        transactions: Array<Transaction>
    }
) => {
    return (
        <div>
            Transactions
            {
                // table for transactions

                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">User Email</th>
                            <th className="px-4 py-2">Business Email</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Fee</th>
                            <th className="px-4 py-2">Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.transactions.map((transaction, index) => {


                                return (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{index}</td>
                                        <td className="border px-4 py-2">{transaction.transactionDate}</td>
                                        <td className="border px-4 py-2">{transaction.fromUser.email}</td>
                                        <td className="border px-4 py-2">{transaction.toBusiness.email}</td>
                                        <td className="border px-4 py-2">{currency() + ' ' + transaction.amount}</td>
                                        <td className="border px-4 py-2">
                                            {
                                                transaction.transactionFee
                                            }
                                        </td>
                                        <td className="border px-4 py-2">{transaction.transactionMethod}</td>
                                    </tr>
                                )

                                function currency() {
                                    return transaction.transactionCurrency === 'GBP' ? '£' : '$';
                                }
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req, res } = ctx;

    const cookies = parse(req.headers.cookie || '');

    const token = cookies.token;

    if (!token) {
        res.writeHead(302, {
            Location: '/login'
        });
        res.end();
    }

    const transactions = (await ApiRequests.getAllTransactions(token)).data;


    return {
        props: {
            transactions
        }
    }
}

export default Transactions