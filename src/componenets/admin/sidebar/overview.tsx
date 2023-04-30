import Link from "next/link";
import AuthContext from "../../../context/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MessageIcon from "@/componenets/svg/MessageIcon";
import { parse } from "cookie";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/20/solid";

const buttonClass = "flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52";
const pClass = "text-base leading-4";

function Logout(props: { logoutHandler: () => void }) {
    return <button onClick={props.logoutHandler} className={buttonClass}>
        <LogOutIcon />
        <p className="text-base leading-4  ">Log out</p>
    </button>;
}

function AdminOverview(props: {
    logoutHandler: () => void
}) {
    return (
        <div id="menu1" className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 ">
            {/* <button className={buttonClass}>
                <MessageIcon />
                <p className={pClass}>Messages</p>
            </button> */}
            <Link href='/admin/deliveries' className={buttonClass}>
                <SecurityIcon />
                <p className={pClass}>Deliveries</p>
            </Link>
            {/* <button className={buttonClass}>
                <SettingIcon />
                <p className={pClass}>Settings</p>
            </button> */}
            <button className={buttonClass}>
                <ApplicationIcon />
                <Link href="/admin/transactions" className={pClass}>transactions</Link>
            </button>
            <Logout logoutHandler={props.logoutHandler} />
        </div>
    );
}


function PoundSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.121 7.629A3 3 0 009.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 01-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 011.422 0l.655.218a2.25 2.25 0 001.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>;
}

function Documents() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>;
}

function BusinessOverview(props: {
    logoutHandler: () => void
}) {
    return (
        <div id="menu1" className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 ">

            {/* <button className={buttonClass}>
                <SettingIcon />
                <p className={pClass}>Settings</p>
            </button> */}

            <button className={buttonClass}>
                <PlusIcon />
                <Link href="/sell" className={pClass}>Add item</Link>
            </button>
            <button className={buttonClass}>
                <PoundSVG />
                <Link href="/business-transaction" className={pClass}>Transactions</Link>
            </button>

            {/* <Link href="/business/orders" className={buttonClass +}>
                <div className="h-6">
                    <ClipboardDocumentCheckIcon className="h-6" />
                </div>
                <span className={pClass}>Orders</span>
            </Link> */}


            <Logout logoutHandler={props.logoutHandler} />
        </div>
    );
}


export default function Overview(props: { role: string }) {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const role = props.role;

    return (
        <div className="flex flex-col justify-start items-center px-6 border-b h-screen border-gray-600 w-full  ">
            <button
                className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  ">
                <p className="text-sm leading-5  uppercase">Overview</p>
            </button>
            {role === 'ADMIN' && <AdminOverview logoutHandler={logoutHandler} />}
            {role === 'BUSINESS' && <BusinessOverview logoutHandler={logoutHandler} />}
        </div>
    );


    function logoutHandler() {
        const cookie = parse(document.cookie);
        if (cookie.loggedIn === 'true') {
            document.cookie = 'loggedIn=false';
            document.cookie = 'token=';
            document.cookie = 'role=';
            document.cookie = 'email=';
            document.cookie = 'address=';
            authContext.onLogout();
        }
        router.push('/login');
        toast.info('logged out succesfully', {
            position: 'top-right',
        })
    }
}

function LogOutIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
            d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
            d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>;
}

function ApplicationIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
            d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>;
}


function SettingIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
            <path d="M16 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
            <path
                d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
            <path
                d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
            <path d="M19 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
        </svg>);
}

function SecurityIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M10.85 12.15L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round"></path>
        <path d="M18 5L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round"></path>
        <path d="M15 8L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round"></path>
    </svg>;
}

function PlusIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>;
}
