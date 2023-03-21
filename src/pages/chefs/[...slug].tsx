import { GetServerSideProps, GetServerSidePropsContext } from 'next';


export default function ChefPage() {
    return (
        <div>
            <h1>Chef Page</h1>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const { params } = ctx;

    const slug = params?.slug;

    const id = slug?.[0];

    if (id === undefined) {
        return {
            notFound: true
        }
    }


    return {
        props: {

        }
    }
}
