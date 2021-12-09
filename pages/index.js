import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="">
      <Head>
        
        <link rel="icon" href="/favicon.ico" />
      </Head>


    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div>
   <div>{/* Footer */}</div>
    </div>
  )
}
