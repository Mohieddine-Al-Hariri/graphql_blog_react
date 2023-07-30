import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {  

  session: {
    strategy : 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
      GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    CredentialsProvider({
      name: 'Phone Number',
      credentials : {
        countryCode: {
          label: 'Country Code',
          type: 'number',
        },
        phoneNumber: {
          label: 'Phone Number',
          type: 'number',
          placeholder: '1112223'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
        firstName: {
          label: 'First Name',
          type: 'text'
        },
        lastName: {
          label: 'Last Name',
          type: 'text'
        },
      },
      async authorize(credentials, req) {
        if(!credentials || !credentials.phoneNumber || !credentials.password || !credentials.firstName || !credentials.lastName){
          return null
        }
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     phoneNumber: credentials.phoneNumber, 
        //     password: credentials.password,
        //     firstName: credentials.firstName,
        //     lastName: credentials.lastName
        //   })
        // })
        // const data = await res.json()
        // return data

        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  // secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)
  
  