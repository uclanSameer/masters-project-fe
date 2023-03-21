import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CartSideBar from "./side-bar";
import CartCard from "@/componenets/card/cart";
import { DELETE, POST } from "@/utils/requests";
import { CartInfo, CartItem, Total as CartTotal } from "@/model/cart-info";

export default function CartComponent(props: {
    total: CartTotal,
    items: Array<CartItem>,
    checkout: () => void
}) {

    const [incemented, setIncremented] = useState(false);
    const [decremented, setDecrement] = useState(false);

    const [total, setTotal] = useState(props.total);
    const [items, setItems] = useState(props.items);



    useEffect(() => {
        if (incemented || decremented) {
            setIncremented(false);
            setDecrement(false);
            POST<CartInfo>("http://localhost:8080/api/v1/cart/info", {})
                .then(res => {
                    setItems(res.data.items);
                    setTotal(res.data.total);
                })
        }
    }, [incemented, decremented]);

    function removeItemFromCart(id: number, quantity: number) {
        return DELETE("http://localhost:8080/api/v1/cart/remove", {
            menuId: id,
            quantity: quantity
        })
            .then(() => {
                setDecrement(true);
                toast.success("Item removed from cart", {
                    position: "bottom-right",
                });
            })
            .catch((err: Error) => {
                console.log(err);
                toast.error("Error removing item from cart", {
                    position: "bottom-right",
                });
            });
    }

    function incrementQuantity(id: number, quantity: number) {
        return POST("http://localhost:8080/api/v1/cart/add", {
            menuId: id,
            quantity: quantity
        })
            .then(res => {
                setIncremented(true);
                toast.success("Item removed from cart", {
                    position: "bottom-right",
                });
            })
            .catch(err => {
                toast.error("Error adding item to cart", {
                    position: "bottom-right",
                })
            });
    }

    return (
        <>
            <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">

                    <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>

                    <div className="mt-5"></div>

                    {
                        items.map((item, index) => {
                            function removeItem() {
                                removeItemFromCart(item.item.id, item.quantity);
                            }

                            function decrement() {
                                removeItemFromCart(item.item.id, 1);
                            }
                            function increment() {
                                incrementQuantity(item.item.id, 1);
                            }
                            return (
                                <CartCard
                                    key={index}
                                    item={item.item}
                                    quantity={item.quantity}
                                    removeItem={removeItem}
                                    decrementQuantity={decrement}
                                    incrementQuantity={increment}
                                />
                            )
                        })
                    }

                </div>

                <CartSideBar
                    total={total}
                    checkout={props.checkout} />
            </div>
        </>
    );
}