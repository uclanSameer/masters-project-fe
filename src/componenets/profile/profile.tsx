import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ApiRequests from "../../utils/api-requests";
import { UserProfile } from "@/model/user";
import { parse } from "cookie";

export default function Profile(props: {
    profile: UserProfile
}) {
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const currentImage = imageRef.current;
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
    }

    const handleProfileImageSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (imageAsBase64 === '') {
            toast.info("Please select an image", {
                position: "bottom-right",
            });
            return;
        }
        const cookie = document.cookie;
        const parsedCookie = parse(cookie);
        let token = parsedCookie.token;
        ApiRequests.uploadProfileImage(imageAsBase64, token)
            .then(res => {
                const data = res.data;
                setImage(data);
                toast.success("Image uploaded successfully", {
                    position: "bottom-right",
                });
            });
    }

    const [buttonLabel, setButtonLabel] = useState('Edit Profile');

    const [imageAsBase64, setImageAsBase64] = useState('');
    const imageUrl = props.profile.userDetail?.imageUrl || '';
    const [image, setImage] = useState<string>(imageUrl !== undefined ? imageUrl : '/images/profile.png');

    const [editMode, setEditMode] = useState(false);

    const imageRef = useRef<HTMLInputElement>();

    useEffect(() => { }, [image]);

    const address = props.profile.userDetail.address;
    return (
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
            <div id="profile"
                className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

                <div className="p-4 md:p-12 text-center lg:text-left">
                    <div
                        className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>

                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">{props.profile.userDetail.name}</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                        <EmailIcon />
                        Email: {props.profile.email}
                    </p>
                    <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                        <LocaionIcon />
                        Your Location - {
                            address?.postalCode
                        }
                    </p>
                    {/* <p className="pt-8 text-lg font-normal italic">Cusines:</p>
                    <p className="pt-1 text-sm">Nepalese,..., ...</p> */}

                    <div className="pt-12 pb-8">
                        <button onClick={
                            () => {
                                setEditMode(!editMode);
                                if (!editMode) {
                                    setButtonLabel('Update Profile');
                                } else {
                                    setButtonLabel('Edit Profile');
                                }
                            }
                        } className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                            {buttonLabel}
                        </button>
                    </div>


                </div>
            </div>

            <div className="w-full lg:w-2/5">
                {imageAsBase64 !== '' ? (
                    <Image
                        className={"rounded-lg mt-2 object-center"}
                        src={`data:image/jpeg;base64,${imageAsBase64}`} width={800} height={1000}
                        alt="Uploaded Image" />
                ) :
                    <Image
                        className={"rounded-lg mt-2 object-center"}
                        src={image} width={800} height={1000}
                        alt="Uploaded Image" />

                }

                {
                    editMode &&
                    <div>
                        <input
                            onChange={handleProfileImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help" id="file_input" type="file" ref={imageRef as MutableRefObject<HTMLInputElement>}>
                        </input>
                        {
                            imageAsBase64 &&
                            <button className="bg-center bg-green-300" onClick={handleProfileImageSubmit}>Submit</button>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

function LocaionIcon() {
    return <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path
            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
    </svg>;
}

function EmailIcon() {
    return <svg className="h-4 fill-current text-green-700 pr-4" viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg" stroke="#2fc16e">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"
                fillRule="evenodd"></path>
        </g>
    </svg>;
}
