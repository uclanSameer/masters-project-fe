import {useContext} from "react";
import AuthContext from "../context/auth-context";
import {toast} from "react-toastify";
import SellComponent from "@/componenets/sell/sell";
import {MenuItem} from "@/model/menu";
import {POST} from "@/utils/requests";

export default function Sell() {
    return (
        <SellComponent
            onAddMenu={addMenu}
        />
    )

    function addMenu(menu: MenuItem) {
        return POST('http://localhost:8080/api/v1/menu/create',
            menu)
            .then(() => {
                toast.success('Menu added successfully!', {
                    position: "bottom-right",
                });
            })
    }
}