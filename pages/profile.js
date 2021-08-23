import { supabase } from '../utils/initSupabase'
import nookies from "nookies";

const Profile = ({user}) => {

  console.log(user)

  return (

    <div className="Profile">

     <h2>{user.email}</h2>

    </div>
  )
}

export default Profile


export async function getServerSideProps(context) {

  const cookies = nookies.get(context);

const { user } = await supabase.auth.api.getUser(cookies.token)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
