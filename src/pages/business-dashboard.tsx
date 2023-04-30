import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";
import BusinessInformation from "@/componenets/business/information";
import MenuItems from "@/componenets/menu/menu-items";
import { GET, POST } from "@/utils/requests";
import { ChefFullResponse, Response } from "@/model/response";

export default function BusinessDashboardPage(props: {
    chefFullResponse: ChefFullResponse
}) {
    const chefFullResponse = props.chefFullResponse;
    const items = chefFullResponse.menuItems;
    return (
        <>
            <BusinessInformation
                featuredMenuItemCount={chefFullResponse.featuredItemsCount}
                totalMenuItemCount={chefFullResponse.menuItemsCount}
                business={chefFullResponse.cheifDetails}
            />

            {items.length > 0 && <>
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
    const email = cookies['email'];

    const chefFullResponse = ((await GET<ChefFullResponse>(`http://localhost:3001/search/chef/details?email=${email}`)).data);
    return {
        props: {
            chefFullResponse: chefFullResponse,
        }
    }
}

