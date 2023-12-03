"use client";
import { Button } from '@mui/material'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-screen">
      

      <div className="font-serif text-3xl">
        Hello World!<br/>
        Are you not yet registered to this cool network?
      <br />
      Click on the button below to join this amazing platform
      <br />
      And become the first ones to get started for a rollercoaster ride
      </div>
      
      <Button href='/login' className="bg-purple-700 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black">
        Login
      </Button>

    </main>
  )
}
