import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";
import { MenuItem } from "@/model/menu";
import BusinessInformation from "@/componenets/business/information";
import MenuItems from "@/componenets/menu/menu-items";
import { POST } from "@/utils/requests";
import ApiRequests from "@/utils/api-requests";
import { Response } from "@/model/response";

export default function BusinessDashboardPage(props: { items: Array<MenuItem> }) {
    const { items } = props;
    return (
        <>
            <BusinessInformation business={
                {} as any
            } />
            {items.length > 0 && <>
                <h1 className="text-4xl text-center font-bold text-amber-200 bg-gray-700">My items</h1>
                <MenuItems data={items} />
            </>}
            {
                items.length === 0 && <div className="text-center text-2xl text-gray-700">No items found</div>
            }
        </>

    )

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const cookies = parse(req.headers.cookie || '');
    if (!cookies['token']) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const myMenue: Response<MenuItem[]> = await ApiRequests.getMenuItemsByEmail(cookies['email']);

    return {
        props: {
            items: myMenue.data
        }
    }
}

