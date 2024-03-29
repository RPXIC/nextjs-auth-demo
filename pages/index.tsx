import Image from 'next/image'
import { AccountMenu, Seo } from 'components'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth/core/types'
import styles from '../styles/Home.module.css'

const Home = (session: Session) => {
  const { name, email, image } = session?.user || {}

  return (
    <div>
      {session ? (
        <>
          <Seo />
          <AccountMenu />
          <h1>Home</h1>
          {name && <p>{name}</p>}
          {email && <p>{email}</p>}
          {image && <Image src={image} width={60} height={60} alt='user_img' />}
          <br />
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...session
    }
  }
}

export default Home
