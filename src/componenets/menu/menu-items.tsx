import { MenuItem } from "@/model/menu";
import { toast } from "react-toastify";
import Card, { CardProps } from "../card/card";
import { POST } from "@/utils/requests";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";

export default function MenuItems(props: {
    data : MenuItem[]
}) {
    const authContext = useContext(AuthContext);
    return (
        <>
            <div className="bg-gray-700 grid flex-wrap gap-6 p-12 content-center rounded grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {
                    props.data
                        .filter((item) => {
                            return item.id !== undefined;
                        })
                        .map((item, index) => {
                            function addItem(): void {

                                addItemsToCart(item);
                            }
                            const cardProps: CardProps = {
                                onClick: {addItem},
                                ...item
                            } 
                            return (
                                <Card
                                    key={index}
                                    {...cardProps}
                                />
                            )
                        })
                }
            </div>
        </>
    );

    function addItemsToCart(item: MenuItem) {
        POST("http://localhost:8080/api/v1/cart/add", {
            "menuId": item.id,
            "quantity": 1
        })
            .then((response) => {
                authContext.incrementCartItemCount();
                toast.success("Item added to cart", {
                    position: "bottom-right",
                });
            }).catch((error) => {
                console.error("Error adding item to cart", error);
                toast.error("Error adding item to cart");
            });
    }
}