import { AllDocuments } from '@/app/components/AllDocuments'
import DocumentListItem from '@/app/components/DocumentListItem'
import Header from '@/app/components/Header'
import { dateConverter } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FiFileText, FiTrash2 } from 'react-icons/fi'

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header className="sticky top-0 bg-gray-800 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jorno App</h1>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      <AllDocuments />


    </div>
  )
}

export default Home