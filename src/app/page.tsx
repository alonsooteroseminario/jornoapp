import { ECLEnterpriseForm } from '@/app/components/ECLEnterpriseForm'
import Header from '@/app/components/Header'
import { dateConverter } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'


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
  return (
  <main className="container mx-auto px-4">

      <Header className="left-0 top-0 my-4">
        <div className="flex items-center gap-2 lg:gap-4">
          {<SignedIn>
            <UserButton />
          </SignedIn>}
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>

          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <p className="text-sm font-light text-blue-100">ID: {id}</p>
                    <p className="text-sm font-light text-blue-100">Status: {metadata.status}</p>
                    <p className="text-sm font-light text-blue-100">Updated about {dateConverter(metadata.statusUpdatedAt)}</p>
                    <p className="text-sm font-light text-blue-100">Created by: {metadata.createdBy}</p>
                    <p className="text-sm font-light text-blue-100">Updated about {dateConverter(metadata.updatedAt)}</p>
                    <p className="text-sm font-light text-blue-100">Description: {metadata.description}</p>

                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>

              </li>
            ))}
          </ul>
        </div>
      ): (
        <div className="document-list-empty">
          <h3 className="text-28-semibold">No documents found</h3>
        </div>
      )}

  </main>
  )
}

export default Home