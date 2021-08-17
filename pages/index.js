import { supabase } from '../utils/initSupabase'

const Index = ({user}) => {
  
console.log(user)

  return (

    <div >
      
    </div>
  )
}

export default Index

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {  
    // If no user, redirect to index. // redirect: { destination: '/', permanent: false }
    return { props: {},  }
  }
  
  // If there is a user, return it.
  return { props: { user } }
}
