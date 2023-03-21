import LandingBody from "@/componenets/landing/body";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {

  const router = useRouter();
  const authContext = useContext(AuthContext);
  authContext.isLoggedIn && router.push('/dashboard')
  return (
    <LandingBody />
  )
}