// Signup component with email and password
import {MutableRefObject, useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import ApiRequests from "../../utils/api-requests";
import {UserProfile} from "@/model/user";
import {PostCodeResult} from "@/model/post-code";
import LockImage from "../svg/lock";
import {POST} from "@/utils/requests";

const buttonClass = "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2";
const signupButton = buttonClass + " bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
const businessSignupButton = buttonClass + " bg-red-600 hover:bg-red-700 focus:ring-red-500";
export default function SignupComponent() {

    const [isBusinsess, setIsBusinsess] = useState(false);
    const router = useRouter();

    const [addressInfo, setAddressInfo] = useState<PostCodeResult>({
        address: {
            countryName: "",
            state: "",
            province: "",
            postalCode: "",
            city: "",
            district: "",
            subdistrict: "",
            street: "",
            houseNumber: 0,
            apartmentNumber: "",
            appartmentName: "",
            position: {
                latitude: 0,
                longitude: 0
            }
        }

    });

    const [imageAsBase64, setImageAsBase64] = useState('');


    const [
        addresses, setAddresses] = useState<Array<PostCodeResult>>([]);


    const emailInputRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const confirmPasswordRef = useRef<HTMLInputElement>();
    const fullNameRef = useRef<HTMLInputElement>();
    const postalCodeRef = useRef<HTMLInputElement>();
    const phoneNumberRef = useRef<HTMLInputElement>();
    const imageRef = useRef<HTMLInputElement>();

    const handleImage = (e: {
        preventDefault: () => void;
    }) => {
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

        if (atob(imageAsBase64).length > 256000) {
            toast.error("Image size is too large", {
                position: "bottom-right",
            });
            return;
        }
    };

    const findAddressEvent = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        ApiRequests.getAddressInfo(postalCodeRef.current?.value || '')
            .then((res) => {
                setAddresses(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const changeSignUpType = (isUserSignup: boolean) => {
        if (isUserSignup) {
            setIsBusinsess(false);
        } else {
            setIsBusinsess(true);
        }
    };


    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center text-blue-600">Sign up</h1>
                        <div className="flex space-x-1 mb-5">
                            <button className={signupButton} onClick={
                                () => changeSignUpType(true)
                            }>user
                            </button>
                            <button className={businessSignupButton} onClick={
                                () => changeSignUpType(false)
                            }>Business
                            </button>
                        </div>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            ref={fullNameRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Full Name"/>

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            ref={emailInputRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Email"/>

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            ref={passwordRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Password"/>
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            ref={confirmPasswordRef as MutableRefObject<HTMLInputElement>}
                            name="confirm_password"
                            placeholder="Confirm Password"/>

                        <input
                            type="search"
                            maxLength={11}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Phone Number"
                            ref={phoneNumberRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Phone Number"/>

                        {
                            isBusinsess && (
                                <input
                                    onChange={handleImage}
                                    type="file"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="image"
                                    ref={imageRef as MutableRefObject<HTMLInputElement>}
                                    placeholder="Business Image"/>
                            )
                        }

                        <div className="flex">
                            <input
                                type="search"
                                maxLength={8}
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Postal Code"
                                ref={postalCodeRef as MutableRefObject<HTMLInputElement>}
                                placeholder="Postal Code"/>

                            <button
                                onClick={findAddressEvent}
                                className="bg-blue-500 p-5 hover:bg-blue-700 text-white font-bold py-3 mb-4 px-4 rounded"
                                type="submit">
                                Find
                            </button>
                        </div>


                        {
                            addresses.length > 0 && (
                                <div
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                >
                                    <select onChange={
                                        (e) => {
                                            const position: number = +e.target?.value;
                                            const selectedAddress = addresses[position];
                                            setAddressInfo(selectedAddress);
                                        }
                                    }>
                                        {
                                            addresses.map((address, index) => {
                                                return (
                                                    <option key={index} value={index}
                                                    >{address.formattedAddress}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                            )}

                        <input/>

                        <button
                            onClick={signupHandler}
                            type="submit"
                            className={signupButton}>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockImage/>
                            </span>
                            {
                                isBusinsess ? "Sign up as Business" : "Sign up as User"
                            }
                        </button>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link className="border-b border-blue text-blue-600 ml-1" href="/login">
                            Log in
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    );

    async function signupHandler(event: {
        preventDefault: () => void;
    }) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current?.value || '';
        const enteredPassword = passwordRef.current?.value || '';
        const enteredConfirmPassword = confirmPasswordRef.current?.value || '';
        const enteredFullName = fullNameRef.current?.value || '';
        const enteredPhoneNumber = phoneNumberRef.current?.value || '';

        if (enteredPassword !== enteredConfirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        if (!addressInfo.address || !addressInfo.referencePosition) {
            console.error('Address is not selected');
            return;
        }
        const user: UserProfile = {
            email: enteredEmail,
            password: enteredPassword,
            userDetail: {
                name: enteredFullName,
                phoneNumber: enteredPhoneNumber,
                address: {
                    ...addressInfo.address
                },
                imageUrls: '',
                position: addressInfo.referencePosition,
            }
        };

        if (isBusinsess) {
            user.userDetail.imageUrls = imageAsBase64;
            const business = await registerBusisness(user);
            if (business) {
                (window as any).location.href = business.data;
            }

        } else {
            const [response, error] = await signupNormalUser(user);

            if (error) {
                console.error(error);
                return;
            }

            if (response) {
                toast.success("Signup successfull", {
                    position: "bottom-right",
                });
                return router.push('/login');
            } else {
                toast.error("Something went wrong!!", {
                    position: "bottom-right",
                });
            }
        }
    }

    function signupNormalUser(user: UserProfile) {
        return fetch('http://localhost:8080/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (!res.ok) {
                return [null, null]
            }
            return [res.json(), null]
        }).catch(err => {
            return [null, err]
        });
    }


    function registerBusisness(user: UserProfile) {
        return POST('http://localhost:8080/api/v1/user/register/business', user);
    }
}
