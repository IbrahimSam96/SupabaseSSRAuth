import React, { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from './utils/initSupabase'

import nookies from "nookies";

const UserContext = createContext({ user: null, session: null })

export const UserContextProvider = ({children}) => {
  
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (typeof window !== "undefined") {
      window.nookies = nookies;
    }
    
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {

      console.log(`token changed!`);
      if (!session) {
        console.log(`no token found...`);
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {path: '/'});
        return;
      }

      setSession(session)
      setUser(session?.user ?? null)

      console.log(`updating token...`);
   
      const token = supabase.auth.currentSession.access_token;
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {path: '/'});

    });
    
    return () => {
      authListener.unsubscribe()
    }

  }, []);

  const value = {
    session,
    user,
  }

console.log(value)

  return <UserContext.Provider value={value} > {children} </UserContext.Provider> 
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
