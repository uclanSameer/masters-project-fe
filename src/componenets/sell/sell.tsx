import {Fragment, MutableRefObject, useRef, useState} from "react";
import Image from "next/image";
import {toast} from "react-toastify";
import {MenuItem} from "@/model/menu";

export default function SellComponent(props: {
    onAddMenu: (menu: MenuItem) => void
}) {

    const foodNameRef = useRef<HTMLInputElement>()
    const nutritionRef = useRef<HTMLInputElement>()
    const foodDescriptionRef = useRef<HTMLTextAreaElement>()
    const foodPriceRef = useRef<HTMLInputElement>()
    const foodImageRef = useRef<HTMLInputElement>()
    const cuisineRef = useRef<HTMLInputElement>()

    const [isFeatured, setIsFeatured] = useState(false)
    const [isVeg, setIsVeg] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)
    const [instantDelivery, setInstantDelivery] = useState(false)
    const [bookingRequired, setBookingRequired] = useState(false)


    const [imageAsBase64, setImageAsBase64] = useState('');

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        // check all the fields are filled
        const price = () => {
            if (foodPriceRef.current?.value === undefined) return 0;
            return Number(foodPriceRef.current?.value);
        };

        const menu: MenuItem = {
            id: 0,
            name: foodNameRef.current?.value || '',
            cuisine: cuisineRef.current?.value || '',
            description: foodDescriptionRef.current?.value || '',
            price: price(),
            image: imageAsBase64,
            nutritionalInfo: nutritionRef.current?.value || '',
            isFeatured: isFeatured,
            isVeg: isVeg,
            isAvailable: isAvailable,
            instantDelivery: instantDelivery,
            bookingRequired: bookingRequired
        }
        props.onAddMenu(menu);
    };

    const handleImageAsFile = (e: React.ChangeEvent) => {
        e.preventDefault();
        const currentImage = foodImageRef.current;
        if (currentImage === null || currentImage === undefined) return;
        if (currentImage.files === null) return;
        const file = currentImage.files[0];
        if (file === undefined) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result !== 'string') return;
            setImageAsBase64(reader.result.split(',')[1]);
        };

        if (atob(imageAsBase64).length > 256000) {
            toast.error("Image size is too large", {
                position: "bottom-right",
            });
            return;
        }
    };

    return (
        <Fragment>
            <div className="bg-gray-200">

                <h1 className="text-center text-2xl font-sans font-light">Fill the details of the food you wish to
                    sell</h1>
                <form className="flex flex-col space-y-4 bg-gray-700 p-10 m-5 ml-20 mr-20 rounded">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="foodName" className="text-white">Food Name</label>
                        <input type="text" id="foodName" name="foodName" placeholder="Food Name"
                               ref={foodNameRef as MutableRefObject<HTMLInputElement>}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="foodDescription" className="text-white">Food Description</label>
                        <textarea id="foodDescription" name="foodDescription" placeholder="Food Description"
                                  ref={foodDescriptionRef as MutableRefObject<HTMLTextAreaElement>}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="nutritionInfo" className="text-white">Nutrition</label>
                        <input type="text" id="nutritionInfo" name="nutritionInfo" placeholder="Nutrition Info"
                               ref={nutritionRef as MutableRefObject<HTMLInputElement>}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="foodPrice" className="text-white">Food Price</label>
                        <input type="number" id="foodPrice" name="foodPrice" placeholder="Food Price"
                               ref={foodPriceRef as MutableRefObject<HTMLInputElement>}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="cuisine" className="text-white">Cuisine</label>
                        <input type="text" id="cuisine" name="cuisine" placeholder="Cuisine"
                               ref={cuisineRef as MutableRefObject<HTMLInputElement>}/>
                    </div>

                    <div className="flex space-y-2 text-white">
                        <label htmlFor="veg" className="text-white">Is it a veg item</label>
                        <input type="radio" id="vegYes" name="veg" value="Yes" onClick={
                            () => {
                                setIsVeg(true)
                            }
                        }/>
                        <label htmlFor="vegYes">Yes</label><br/>
                        <input type="radio" id="vegNo" name="veg" value="No" onClick={
                            () => {
                                setIsVeg(false)
                            }
                        }/>
                        <label htmlFor="vegNo">No</label><br/>
                    </div>

                    <div className="flex space-y-2 text-white">
                        <label htmlFor="featured" className="">Is it a featured item</label>
                        <input type="radio" id="featuredYes" name="featured" value="Yes" onClick={
                            () => {
                                setIsFeatured(true)
                            }
                        }/>
                        <label htmlFor="featuredYes">Yes</label><br/>
                        <input type="radio" id="featuredNo" name="featured" value="No" onClick={
                            () => {
                                setIsFeatured(false)
                            }
                        }/>
                        <label htmlFor="featuredNo">No</label><br/>
                    </div>

                    <div className="flex space-y-2 text-white">
                        <label htmlFor="available" className="text-white">Is it available</label>
                        <input type="radio" id="availableYes" name="available" value="Yes" onClick={
                            () => {
                                setIsAvailable(true)
                            }
                        }/>
                        <label htmlFor="availableYes">Yes</label><br/>
                        <input type="radio" id="availableNo" name="available" value="No" onClick={
                            () => {
                                setIsAvailable(false)
                            }
                        }/>
                        <label htmlFor="availableNo">No</label><br/>
                    </div>

                    <div className="flex space-y-2 text-white">
                        <label htmlFor="instantDelivery" className="text-white">Is it available for instant
                            delivery</label>
                        <input type="radio" id="Yes" name="instantDelivery" value="Yes" onClick={
                            () => {
                                setInstantDelivery(true)
                            }
                        }/>
                        <label htmlFor="Yes">Yes</label><br/>
                        <input type="radio" id="No" name="instantDelivery" value="No" onClick={
                            () => {
                                setInstantDelivery(false)
                            }
                        }/>
                        <label htmlFor="No">No</label><br/>

                    </div>

                    <div className="flex space-y-2 text-white">
                        <label htmlFor="bookingRequired" className="text-white">Is booking required</label>
                        <input type="radio" id="Yes" name="bookingRequired" value="Yes" onClick={
                            () => {
                                setBookingRequired(true)
                            }
                        }/>
                        <label htmlFor="Yes">Yes</label><br/>
                        <input type="radio" id="No" name="bookingRequired" value="No" onClick={
                            () => {
                                setBookingRequired(false)
                            }
                        }/>
                        <label htmlFor="No">No</label><br/>
                    </div>


                    <div className="flex flex-col space-y-2">

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                               htmlFor="file_input">Upload file</label>
                        <input
                            onChange={handleImageAsFile}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help" id="file_input" type="file"
                            ref={foodImageRef as MutableRefObject<HTMLInputElement>}>
                        </input>
                        {imageAsBase64 && (
                            <Image
                                className={"rounded-lg mt-2 object-center"}
                                src={`data:image/jpeg;base64,${imageAsBase64}`} width={200} height={200}
                                alt="Uploaded Image"/>
                        )}
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG
                            or GIF (MAX. 800x400px).</p>

                    </div>

                    <button onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit
                    </button>
                </form>
            </div>
        </Fragment>
    );


}