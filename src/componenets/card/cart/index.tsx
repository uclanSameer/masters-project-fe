import { MenuItem } from "@/model/menu";

export default function CartCard(props: {
    item: MenuItem,
    removeItem: () => void,
    quantity: number,
    incrementQuantity: () => void,
    decrementQuantity: () => void,
}) {
    const item = props.item;
    const quantity = props.quantity;

    return (
        <>
            <div className="md:flex items-center py-8 border-t border-b border-gray-200">
                <ItemImage image={item.image}></ItemImage>
                <div className="md:pl-3 md:w-3/4 w-full">
                    {/* <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p> */}
                    <div className="flex justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                        <div className="flex">
                            <DecrementButton decrementQuantity={props.decrementQuantity} />
                            <Quantity quantity={quantity} />
                            <IncrementButton incrementQuantity={props.incrementQuantity} />
                        </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">Cusibe: {item.cuisine}</p>
                    <p className="text-xs leading-3 text-gray-600 py-4">description: {item.description}</p>
                    <p className="w-96 text-xs leading-3 text-gray-600">nutrition: {item.nutritionalInfo}</p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                        <RemoveItemButton removeItem={props.removeItem}></RemoveItemButton>
                        <p className="text-base font-black leading-none text-gray-800">£{item.price}</p>
                    </div>
                </div>
            </div>
        </>
    );
}


function DecrementButton(props: { decrementQuantity: () => void }) {
    return (<button onClick={props.decrementQuantity} className="py-2 px-2 ml-2 border bg-black text-white border-gray-200 focus:outline-none">
        -
    </button>);
}



function IncrementButton(props: { incrementQuantity: () => void }) {
    return (<button onClick={props.incrementQuantity} className="py-2 px-1.5 ml-2 border bg-black text-white border-gray-200 focus:outline-none">
        +
    </button>);
}

function RemoveItemButton(props: { removeItem: () => void }) {
    return (<div className="flex itemms-center">
        <button onClick={props.removeItem} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
    </div>);
}



function Quantity(props: { quantity: number }) {
    return (<p className="py-2 px-1 ml-2 border border-gray-200 focus:outline-none">
        {props.quantity}
    </p>);
}

function ItemImage(props: { image: string }) {
    return (
        <div className="h-full w-1/4">
            <img src={props.image} className="w-full h-full object-center object-cover"  alt='Item Image'/>
        </div>
    );
}
