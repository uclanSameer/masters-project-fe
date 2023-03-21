import { MenuItem } from "@/model/menu";
import MenuItems from "@/componenets/menu/menu-items";
import { POST } from "@/utils/requests";
import { Response } from "@/model/response";


export default function Dashboard(props: {
    response: Response<Array<MenuItem>>
}) {
    return (
        <>
            {/*heading for featured foods*/}

            <h1 className="text-4xl text-center font-bold text-amber-200 bg-gray-700">Featured Foods</h1>
            <MenuItems data={props.response.data}/>
        </>
    )
}


export async function getStaticProps() {

    const response = await POST<Array<MenuItem>>('http://localhost:3001/search/menu', {
        isFeatured: true
    })

    return {
        props: {
            response
        },
        revalidate: 3600
    }
}


