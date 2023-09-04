import { MutableRefObject, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ApiRequests from "../../utils/api-requests";
import { UserProfile } from "@/model/user";
import { PostCodeResult } from "@/model/post-code";
import LockImage from "../svg/lock";
import { POST } from "@/utils/requests";
import { GeneralUtils } from "@/utils/general-utils";
import { AlreadyLoggedIn } from "../login/AlreadyLoggedIn";

const buttonClass = "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2";
const signupButton = buttonClass + " bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
const businessSignupButton = buttonClass + " bg-red-600 hover:bg-red-700 focus:ring-red-500";

function PurpleBadge(props: {
    cusine: string;
    onClick: () => void;
}) {
    return (<span id="badge-dismiss-purple" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">
        {props.cusine}
        <button type="button"
            className="inline-flex items-center p-0.5 ml-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300"
            data-dismiss-target="#badge-dismiss-purple"
            onClick={props.onClick}
            aria-label="Remove">
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Remove badge</span>
        </button>
    </span>);
}


export default function SignupComponent(props: {
    isDelivery: boolean;
    showAlreadHaveAccount: boolean;
    buttonLabel?: string;
}) {

    const [cusines, setCusines] = useState<string[]>([]);

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

    const handleImage = (e: React.ChangeEvent) => {
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

    const findAddressEvent = async (e: React.MouseEvent) => {
        e.preventDefault();
        const postalCode = postalCodeRef.current?.value || '';
        if (!GeneralUtils.validateUKPostalCode(postalCode)) {
            toast.error("Invalid UK postal code", {
                position: "bottom-right",
            });
            return;
        }
        ApiRequests.getAddressInfo(postalCode)
            .then((res) => {
                setAddresses(res.data);
                setAddressInfo(res.data[0]);
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


    const buttonLabel = props.buttonLabel || (isBusinsess ? "Sign up as Business" : "Sign up as User");
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center text-blue-600">Sign up</h1>
                        {
                            (!props.isDelivery) &&
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
                        }
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            ref={fullNameRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Full Name" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            ref={emailInputRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Email" />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            ref={passwordRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Password" />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            ref={confirmPasswordRef as MutableRefObject<HTMLInputElement>}
                            name="confirm_password"
                            placeholder="Confirm Password" />

                        <input
                            type="search"
                            maxLength={11}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Phone Number"
                            ref={phoneNumberRef as MutableRefObject<HTMLInputElement>}
                            placeholder="Phone Number" />

                        {
                            isBusinsess && (
                                <input
                                    onChange={handleImage}
                                    type="file"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="image"
                                    ref={imageRef as MutableRefObject<HTMLInputElement>}
                                    placeholder="Business Image" />
                            )
                        }

                        {
                            false && (
                                <input
                                    type="search"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="Cusines"
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            const cusine = (e.target as HTMLInputElement).value;
                                            if (cusine.length > 0) {
                                                setCusines([...cusines, cusine]);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }
                                    }}
                                    ref={phoneNumberRef as MutableRefObject<HTMLInputElement>}
                                    placeholder="Cusines" />
                            )
                        }

                        {
                            (false && cusines.length > 0) && (
                                <div className="flex flex-wrap">
                                    {
                                        cusines.map((cusine, index) => {
                                            function removeCusine() {
                                                const newCusines = [...cusines];
                                                newCusines.splice(index, 1);
                                                setCusines(newCusines);
                                            }
                                            return <PurpleBadge
                                                cusine={cusine}
                                                onClick={removeCusine} />
                                        })
                                    }
                                </div>
                            )
                        }

                        <div className="flex">
                            <input
                                type="search"
                                maxLength={8}
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Postal Code"
                                ref={postalCodeRef as MutableRefObject<HTMLInputElement>}
                                placeholder="Postal Code" />

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

                        <button
                            onClick={signupHandler}
                            type="submit"
                            className={signupButton}>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockImage />
                            </span>
                            {
                                buttonLabel
                            }
                        </button>
                    </div>
                    {
                        props.showAlreadHaveAccount && (

                            <AlreadyLoggedIn />
                        )
                    }
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

        if (!enteredEmail || !enteredEmail.includes('@')) {
            toast.error("Please enter a valid email address", {
                position: "bottom-right"
            });
            return;
        }


        if (!enteredPassword || enteredPassword.length < 8) {
            toast.error("Please enter a valid password (at least 8 characters)", {
                position: "bottom-right"
            });

            return;
        }

        const passwords = enteredPassword.split('');
        if(passwords.filter((char) => char === char.toUpperCase()).length < 1) {
            toast.error("Please enter a valid password (at least 1 uppercase)", {
                position: "bottom-right"
            });

            return;
        }

        if(passwords.filter((char) => char === char.toLowerCase()).length < 1) {
            toast.error("Please enter a valid password (at least 1 lowercase)", {
                position: "bottom-right"
            });

            return;
        }

        // check if password contains a number
        if(passwords.filter((char) => !isNaN(+char)).length < 1) {
            toast.error("Please enter a valid password (at least 1 number)", {
                position: "bottom-right"
            });

            return;
        }




        if (!enteredFullName) {
            toast.error("Please enter your full name", {
                position: "bottom-right"
            });
            return;
        }

        if (!enteredPhoneNumber || enteredPhoneNumber.length !== 11) {
            toast.error("Please enter a valid phone number", {
                position: "bottom-right"
            });
            return;
        }



        if (enteredPassword !== enteredConfirmPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-right"
            });
            return;
        }

        if (!addressInfo.address || !addressInfo.referencePosition) {
            console.error('Address is not selected');
            toast.error("Address is not selected", {
                position: "bottom-right"
            });
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

        user.userDetail.imageUrl = imageAsBase64;

        if (props.isDelivery) {
            ApiRequests.registerDeliveryPerson(user)
                .then((response) => {
                    if (response) {
                        toast.success("Signup successfull", {
                            position: "bottom-right",
                        });
                    } else {
                        toast.error("Something went wrong!!", {
                            position: "bottom-right",
                        });
                    }
                })
                .catch((error) => {
                    toast.error("Something went wrong!!", {
                        position: "bottom-right",
                    });
                    console.error(error);
                });
            return;
        }

        if (isBusinsess) {
            try {
                const business = await registerBusisness(user);
                toast.success("Signup successfull, Check your email for verification", {
                    position: "bottom-right",
                });
                return router.push('/login');
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong!!", {
                    position: "bottom-right",
                });
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
