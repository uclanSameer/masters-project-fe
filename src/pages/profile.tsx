import Profile from "@/componenets/profile/profile";
import { UserProfile } from "@/model/user";
import { PostWithToken } from "@/utils/requests";
import { parse } from "cookie";
import { GetServerSidePropsContext } from "next";

export default function ProfilePage(props: {
    data: UserProfile
}) {
    return (
        <div className="justify-center bg-amber-100">
            <Profile profile={props.data} />
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;
    const data = await PostWithToken<UserProfile>('http://localhost:8080/api/v1/details/profile', {}, token);

    return {
        props: {
            'data': data.data
        }
    }

}