import Image from "next/image"
import CredentialsForm from "@/components/CredentialsForm"
import { GoogleSignInButton, FacebookSignInButton } from "@/components/authButton"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { getCsrfToken } from "next-auth/react"
// import getServerSession from "next-auth/react"
// import  authOptions  from "@/pages/api/auth/[...nextauth]"

const signIn = () => {
  // const session = getServerSession(authOptions)
  //TODO: check out the yt vid 11:40 to see how to exclude this file from layout (to remove the head)
  return (
    <div className='flex flex-col justify-center items-center max-sm:fixed max-sm:-top-2 h-screen text-white gap-2 pb-40'>
      <h1>Sign In</h1>
      <CredentialsForm />
    </div>
  )

}

export default signIn

