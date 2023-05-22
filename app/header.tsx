'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

 
 interface ListProps {
  title: string;
  url: string
}
const ListItem = ({title,url}:ListProps)=>{
  const router = useRouter()

  return (
    <button 
    onClick={()=>router.push(url)}
    className='p-2 rounded-md bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
      {title}
    </button>
  )
} 


export default function Header() {
    const {data:session} = useSession()

    useEffect(()=>{
        console.log('ini session data');
        console.log(session);
        console.log('ini AccessToken');
        // console.log(accessToken);
        
    },[session])

    return (
        <nav className="py-4 px-6 text-sm font-medium">
            <ul className='flex space-x-3'>
                <ListItem url='/' title='Home'></ListItem>
                <ListItem url='/authenticatedPage' title='Authenticated Page'></ListItem>
                <ListItem url='/admin' title='Admin'></ListItem>
                <ListItem url='/myData' title='My Data'></ListItem>
                {
                    session 
                    ?   <div className='flex items-center space-x-2'>
                            <div>signIn as {session?.user?.email}</div>
                            <button onClick={()=>signOut()} className='bg-red-600 p-4'>Logout</button> 
                        </div>
                    :   <button onClick={()=>signIn()} className='bg-blue-600 p-4 hover:bg-blue-500'>Login</button> 
                }
            </ul>
      </nav>
    )
}