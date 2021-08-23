import { supabase } from '../utils/initSupabase';
import React, { useEffect, useState } from 'react';
import nookies from "nookies";


const Index = ({user}) => {


console.log(user)

  return (
  
    <div className="Index">



    </div>
  )               
}

export default Index

export const getServerSideProps = async (context) => {
  
  const cookies = nookies.get(context);

  const { user } = await supabase.auth.api.getUser(cookies.token)

  console.log(user);

  if (!user) {
    return { props: {} }
  }
  
  // If there is a user, return it.
  return { props: { user } }
}



// Authenticate Users using API Route - index.js. 

// import useSWR from 'swr'

// const fetcher = (url, token) =>
//   fetch(url, {
//     method: 'GET',
//     headers: new Headers({ 'Content-Type': 'application/json', token }),
//     credentials: 'same-origin',
//   }).then((res) => res.json())


// const { data, error } = useSWR(session ? ['/api/getUser', session.access_token] : null, fetcher)

// {error && <div style={{ color: 'red' }}>Failed to fetch user!</div>}
// {data && !error ? (
//   <>
//     <div style={{ color: 'green' }}>
//       User data retrieved server-side (in API route):
//     </div>

//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   </>
// ) : (
//   <div>Loading...</div>
// )}


// API/getUser 

// const getUser = async (req, res) => {
//   const token = req.headers.token

//   const { data: user, error } = await supabase.auth.api.getUser(token)

//   if (error) return res.status(401).json({ error: error.message })
//   return res.status(200).json(user)
// }

// export default getUser
