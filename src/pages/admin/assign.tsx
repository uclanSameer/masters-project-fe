import { GeneralUtils } from '@/utils/general-utils';
import { GetServerSideProps } from 'next';

const AssignPage = () => {
    return (
        <div>
            Enter
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req, res } = ctx;

    const token = GeneralUtils.invalidateUserSession(req, res, 'ADMIN');

    return {
        props:{

        }
    }
}

export default AssignPage