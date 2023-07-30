import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { useSession, signIn, signOut } from 'next-auth/react'



const Header = () => {
  const [categories, setCategories] = useState([]);
  const {data: session} = useSession();

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  console.log(session?.user)
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-[#333]">Home</span>
          </Link>
          {session ?
          <button onClick={()=>signOut()} className='bg-blue-500 rounded-lg px-4 py-2 ml-4'>Sign Out</button>
          :<button onClick={()=>signIn()} className='bg-blue-500 rounded-lg px-4 py-2 ml-4'>Sign In</button>
          // :<Link href="/login" className='bg-blue-500 rounded-lg px-4 py-2 ml-4'>Sign In</Link>
          }
        </div>
        <div className="hidden md:float-left md:contents ">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer text-[#333]">{category.name}</span></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
