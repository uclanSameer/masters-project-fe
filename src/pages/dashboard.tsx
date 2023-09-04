import { MenuItem } from "@/model/menu";
import MenuItems from "@/componenets/menu/menu-items";
import { POST } from "@/utils/requests";
import { Response } from "@/model/response";
import { GetServerSidePropsContext } from "next";
import { parse } from "cookie";
import Banner from "@/componenets/banner/home-banner";


export default function Dashboard(props: {
    response: Response<Array<MenuItem>>
}) {
    return (
        <>
            {/*heading for featured foods*/}

            <Banner
                imageUrl="/images/banner2.jpeg"
                title="Welcome to Neighbour"
                subtitle="Discover the best food around your neighbourhood!"
            />

            <h1 className="text-4xl text-center font-bold text-amber-200 bg-gray-700">Featured Foods</h1>
            <MenuItems data={props.response.data} />
        </>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const cookies = parse(context.req.headers.cookie || '');

    const role = cookies['role'];

    const loggedIn = cookies['loggedIn'];

    if (!loggedIn) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    if (role === 'BUSINESS') {
        return {
            redirect: {
                destination: '/business-dashboard',
                permanent: false,
            },
        }
    }

    if (role === 'ADMIN') {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false,
            },
        }
    }
    if (role === 'DELIVERY') {
        return {
            redirect: {
                destination: '/delivery/dashboard',
                permanent: false,
            },
        }
    }



    try {
        const response = await POST<Array<MenuItem>>('http://localhost:3001/search/menu', {
            isFeatured: true
        })

        return {
            props: {
                response
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}


