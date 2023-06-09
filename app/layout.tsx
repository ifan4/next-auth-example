'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from "next/app";
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Test Authentication',
  description: 'Generated by create next app',
}
interface Props{
  children: React.ReactNode;
  session: any
}

export default function RootLayout({children,session}:Props) {
  return (
    <html lang="en">
        <body className={'flex flex-col items-center justify-between p-24'}>
          <SessionProvider session={session}>
            <Header/>
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </SessionProvider>
        </body>
      </html>
  )
}
