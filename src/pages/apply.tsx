import { POST } from "@/utils/requests";
import { Button } from "@material-tailwind/react";
import Head from "next/head";
import { toast } from "react-toastify";

export default function ApplyForBusinessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <Head>
                <title>Apply for business</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Apply for business
                </h1>
            </main>

            <form>
                <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <label className="text-2xl font-bold">
                        Sumbit your application
                    </label>

                    <Button onClick={applyForBusiness}>Click here</Button>
                </div>

            </form>

            <footer className="flex items-center justify-center w-full h-24 border-t">
                <a>
                    Powered by{' '}
                </a>
            </footer>


        </div>
    );
}

const applyForBusiness = () => {
    POST('http://localhost:8080/api/v1/applications/create', {})
        .then((response) => {
            toast.info("Application submitted successfully. Please wait for approval.",{
                position: toast.POSITION.BOTTOM_RIGHT
            });
        })
        .catch((error) => {
            toast.error("Something went wrong. Please try again.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });

};