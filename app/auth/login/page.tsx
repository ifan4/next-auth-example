'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface IProps {
    searchParams?: { [key: string]: string | string[] | undefined };
  }

export default function Login({ searchParams }: IProps) {
    const router = useRouter();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState<null | string>()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const message:any= searchParams?.message
        setErrorMessage(message)
    },[searchParams?.message])

    

    const onSubmitHandler = async (e:any)=>{
        e.preventDefault()
        setLoading(true)
        const result:any = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            callbackUrl: '/'
        })
        setLoading(false)
        
        if (result?.error) {
            if (result.status >= 400 && result.status < 500 ) {
                setErrorMessage('Invalid Email or Password')
            }
            else {
                setErrorMessage('Something Wrong...')
            }
            console.log(result);
          }
        else{
            setErrorMessage('')
            return router.push('/');
        }
    }
    

    return(
        <div className="p-8  bg-amber-500 mt-7">
            <h1 className="text-2xl mb-5">THIS IS LOGIN PAGE</h1>
            {errorMessage && <p className="text-red-700 bg-red-100 p-2 mb-2 px-5 rounded-md">{errorMessage}</p>}
            <form 
            className="flex flex-col space-y-2"
            onSubmit={onSubmitHandler}
            >
                <input
                className="placeholder:italic block p-2  border-amber-400 text-black"
                type="text" 
                name="email" 
                placeholder="email"
                onChange={(e:any)=>setEmail(e.target.value)}
                /> 

                <input 
                 className="placeholder:italic block p-2  border-amber-400 text-black   "
                type="password" 
                name="password" 
                placeholder="password"
                onChange={(e:any)=>setPassword(e.target.value)}
                />

                <button
                className="p-3 bg-purple-500 hover:bg-purple-400"
                >
                    {
                        !loading 
                        ? 'Login'
                        : 'Loading..'
                    }
                    
                </button>
            </form>

      
          
        </div>
    )
}
