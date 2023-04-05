import BusinessInformation from '@/componenets/business/information';
import MenuItems from '@/componenets/menu/menu-items';
import { Business } from '@/model/business';
import { MenuItem } from '@/model/menu';
import ApiRequests from '@/utils/api-requests';
import { GET, POST } from '@/utils/requests';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


export default function ChefPage(props: ChefDetails) {
    const items = props.menus;
    return (
        <>
            <BusinessInformation
                business={props.business}
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

    const businessDetailResponse = await GET<Array<Business>>(`http://localhost:3001/search/cheif/${id}`);
    const business = businessDetailResponse.data[0];
    const menuResposne = await ApiRequests.getMenuItemsByEmail(business.email);
    return {
        props: {
            business,
            menus: menuResposne.data
        }
    }
}

export interface ChefDetails {
    business: Business
    menus: Array<MenuItem>
}
