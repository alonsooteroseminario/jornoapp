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
  const roomDocuments = {data: [{
    id: 'bbmnbuzENy1880cyVryz-',
    metadata: {
      name: 'Document 1',
      description: 'This is a description for document 1',
      createdBy: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      status: 'Draft',
      statusUpdatedAt: '2022-01-01',
    },
  },{
    id: 'cdRnthzXOp3902bvUstw-',
    metadata: {
      name: 'Document 2',
      description: 'This is a description for document 2',
      createdBy: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      status: 'Draft',
      statusUpdatedAt: '2022-01-01',
    },
  },{
    id: 'efTqjuyCNm4013awZrxv-',
    metadata: {
      name: 'Document 3',
      description: 'This is a description for document 3',
      createdBy: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      status: 'Draft',
      statusUpdatedAt: '2022-01-01',
    },
  },{
    id: 'ghVslwzABo5124cxYqtu-',
    metadata: {
      name: 'Document 4',
      description: 'This is a description for document 4',
      createdBy: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      status: 'Draft',
      statusUpdatedAt: '2022-01-01',
    },
  },{
    id: 'ijXunxzCDp6235dyWsvr-',
    metadata: {
      name: 'Document 5',
      description: 'This is a description for document 5',
      createdBy: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      status: 'Draft',
      statusUpdatedAt: '2022-01-01',
    },
  }

  ]};
  const handleDelete = async (id: string) => {
    'use server';
    // Implement delete logic here
    console.log('Delete document:', id);
  };
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

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All documents</h2>
          <Link href="/documents/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            + Start a blank document
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <span>Table Info</span>
          </div>

          {roomDocuments.data.length > 0 ? (
            <ul className="space-y-4">
              {roomDocuments.data.map(({ id, metadata }: any) => (
                <DocumentListItem
                  key={id}
                  id={id}
                  name={metadata.name}
                  createdAt={dateConverter(metadata.createdAt)}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">No documents found</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home