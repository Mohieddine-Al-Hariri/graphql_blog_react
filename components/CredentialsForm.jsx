import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react"
import { GoogleSignInButton, FacebookSignInButton } from "@/components/authButton"


const CredentialsForm = () => {
	const [error, setError] = useState(null);
	const [countryCode, setCountryCode] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log(data.get("phoneNumber"))

		const signInResponse = await signIn("credentials", {
			redirect: false,
			callbackUrl: "/",
			phoneNumber: data.get("phoneNumber"),
			password: data.get("password"),
			firstName: data.get("firstName"),
			lastName: data.get("lastName"),
		});
		if (signInResponse && !signInResponse.error) {
			console.log("pushed")
			router.push("/");
		}else{
			console.log("Error", signInResponse);
			setError(signInResponse.error);
		}
		console.log("first")
	}

	return (
		<div className="bg-black w-full h-screen flex flex-col items-center justify-center pb-0">
			<div className="flex flex-col gap-8 w-full max-w-lg p-10 bg-gray-200 rounded-lg border border-gray-200 shadow-md">
				<GoogleSignInButton />
				<FacebookSignInButton/>
				<h1 className="text-black text-center">OR</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-lg">
					<input type="text" name="firstName" placeholder="First Name" required className=" w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
					<input type="text" name="lastName" placeholder="Last Name" required className=" w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
					<div className="flex items-end gap-2 ">
						{/* <h1 className="-mr-6 text-black z-10 relative">+</h1> */}
						<div>
							<label htmlFor="countryCode">country Code</label>
							<input type="text" value={`+${countryCode}`} onChange={(e) => setCountryCode(e.target.value.slice(1))} name="countryCode" placeholder="Eg: 961" required className=" w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
						</div>
						<input type="number" name="phoneNumber" placeholder="Eg: 71 654 321" required className=" w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
					</div>
					<input type="password" name="password" placeholder="Password" required className=" w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
					<button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Sign In with Phone Number</button>
					{error && <p className="text-red-500">{error}</p>}
				</form>
				<Link href="/login"><h1 className="text-center text-blue-400 underline -m-2">Already have an account? Login here</h1></Link>
			</div>
		</div>
	)
}

export default CredentialsForm