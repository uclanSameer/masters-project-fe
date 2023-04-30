import BusinessInformation from '@/componenets/business/information';
import MenuItems from '@/componenets/menu/menu-items';
import { Business } from '@/model/business';
import { MenuItem } from '@/model/menu';
import { ChefFullResponse } from '@/model/response';
import { GET, POST } from '@/utils/requests';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


export default function ChefPage(props: {
    ChefFullResponse: ChefFullResponse
}) {
    const chefFullResponse = props.ChefFullResponse;
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


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const { params } = ctx;
    const slug = params?.slug;
    const id = slug?.[0];
    if (id === undefined) {
        return {
            notFound: true
        }
    }

    const ChefFullResponse = ((await GET<ChefFullResponse>(`http://localhost:3001/search/chef/details?id=${id}`)).data);
    return {
        props: {
            ChefFullResponse
        }
    }
}

export interface ChefDetails {
    business: Business
    menus: Array<MenuItem>
}
