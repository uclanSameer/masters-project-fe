export default function SideBarLayout(props: { children: JSX.Element }) {
    return (
        <div id="Main" className="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col float-left">
            {props.children}
        </div>
    );
}