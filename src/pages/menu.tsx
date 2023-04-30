import MenuItems from "@/componenets/menu/menu-items";
import SearchBar from "@/componenets/menu/search-bar";
import { MenuItem } from "@/model/menu";
import { Response } from "@/model/response";
import { POST } from "@/utils/requests";
import { useEffect, useState } from "react";

export default function MenuPage(props: {
    response: Response<Array<MenuItem>>
}) {
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Array<MenuItem>>(props.response.data);
    const allMenu = props.response.data;

    useEffect(() => {
        if (search !== '') {
            POST<Array<MenuItem>>('http://localhost:3001/search/menu', {
                page: 1,
                size: 25,   
                search: search
            })
                .then(data => {
                    setSearchResult(data.data);
                })
        }

    }, [search]);


    function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.currentTarget.value === '') {
            setSearchResult(allMenu);
        }
        if (e.currentTarget.value.includes(' ')) {
            let value = e.currentTarget.value;
            setSearch(value);
        }
    }

    return (
        <div className="p-10 ml-20 mr-20 bg-gray-200">
            {/*tailwind search bar*/}
            <SearchBar search={handleSearch} />
            <div className="mt-3">
                <MenuItems
                    data={searchResult} />
            </div>
        </div>
    )

}

export async function getStaticProps() {
    try {
        const response = await POST<Array<MenuItem>>('http://localhost:3001/search/menu/all', {
            page: 1,
            size: 25,
        })

        return {
            props: {
                response,
                revalidate: 3600
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}
