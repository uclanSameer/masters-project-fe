import Link from "next/link";

export default function LandingBody() {
    return (
        <>
            <div className="flex flex-col items-center justify-center py-2">
                <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        Welcome to <a className="text-blue-600" href="https://nextjs.org">Neighbour</a>
                    </h1>

                    <p className="mt-3 text-2xl">
                        Where you can find the best food in your neighbourhood
                    </p>


                </main>

            </div>

            {/*    prompt to log in or sign up now*/}
            <div className="flex flex-col items-center min-h-screen py-2">
                <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
                    <h1 className="text-4xl font-bold">
                        Don't have an account? <Link className="text-blue-600" href="/signup">Sign up</Link>
                    </h1>

                    <p className="mt-3 text-2xl">
                        Or <Link className="text-blue-600" href="/login">log in</Link> to get started
                    </p>

                </main>

            </div>
        </>
    );
}