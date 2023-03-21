import { UserDetail } from "@/model/business";
import Image from "next/image";

export default function ProfileCard(props: {
    data: {
        userDetail: UserDetail
    }
}) {
    return (
        <>
            <div className="flex items-center">

                <div className="max-w-xs">
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <ChefImage></ChefImage>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{props.data.userDetail.name}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>chef</p>
                            </div>
                            <ChefDetailsTable></ChefDetailsTable>

                            <ViewProfileButton></ViewProfileButton>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}


function ChefDetailsTable() {
    return (<table className="text-xs my-3">
        <tbody>
            <AddressRow></AddressRow>
            <PhoneRow></PhoneRow>
            <EmailRow></EmailRow>
        </tbody>
    </table>);
}

function AddressRow() {
    return (<tr>
        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
        <td className="px-2 py-2">55 Plungington Road, Preston</td>
    </tr>);
}



function PhoneRow() {
    return (<tr>
        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
        <td className="px-2 py-2">07585562487</td>
    </tr>);
}



function EmailRow() {
    return (<tr>
        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
        <td className="px-2 py-2">exmaple@exmaple.com</td>
    </tr>);
}



function ViewProfileButton() {
    return (<div className="text-center my-3">
        <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
    </div>);
}



function ChefImage() {
    return (<div className="photo-wrapper p-2">
        <Image className="w-32 h-32 rounded-full mx-auto" width={20} height={20} src="next.svg" alt="John Doe" />
    </div>);
}