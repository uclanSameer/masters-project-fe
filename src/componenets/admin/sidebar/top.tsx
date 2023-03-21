import { NextRouter, useRouter } from "next/router";

function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>;
}

function Dashboard(props: {
    role: string;
}) {
    const router: NextRouter = useRouter();
    return <button
        onClick={() => {
            onCLickDashboard(props.role, router)
        }}
        className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded ">
        <HomeIcon />

        <p className="text-base leading-4 ">Dashboard</p>
    </button>;
}

function UserIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>;
}

function Users() {
    return <button
        className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
        <UserIcon />
        <p className="text-base leading-4 ">Users</p>
    </button>;
}

export default function TopSideBar(props: {
    role: string;
}) {
    return (
        <div
            className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
            <Dashboard role={props.role} />
            {
                props.role === "ADMIN" ? <Users /> : null
            }
        </div>
    );
}

const onCLickDashboard = (role: string, router: NextRouter) => {
    if (role === "ADMIN") {
        router.push("/admin/dashboard");
    } else {
        router.push("/business-dashboard");
    }
};