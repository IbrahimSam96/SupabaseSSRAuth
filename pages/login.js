import { supabase } from '../utils/initSupabase';
import React, { useEffect, useState } from 'react';
import {IoReturnDownBackSharp} from  "react-icons/io5"

const Login = () => {

const [email, setEmail] = useState('')
const [sentEmail, setSentEmail] = useState(false)
const [error, setError] = useState(false)
const [ errorMessage, setMessageError] = useState("")
const [loading, setLoading] = useState(false)


const handleLogin = async (email) => {
  try {
    setError(false)
    setLoading(true)
    const { error } = await supabase.auth.signIn({ email })
    if (error) {
      setMessageError(error.message) 
      setError(true)
    } 
 
  } catch (error) {
    setError(false)

  } finally {
    setLoading(false)
    setSentEmail(true)
  }
  
}

  return (
  
    <div className="Login">

 <div className="MagicLogin">
     <h4>Magic link</h4>
    
        <h1>Supabase + Next.js </h1>
      

{ sentEmail && !error?

<>
<span> <IoReturnDownBackSharp onClick={() => {
      setSentEmail(false)
    }}/>  </span>
    <span> Magic Link sent to {email}  </span>
  
</>
:
<>
<p >Sign in via magic link with your email below</p>
  <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>

          </button>

        </div>
        {error? 
        
        <span className="ErrorMessage">
             {errorMessage}  
        </span>
        :
        null
        }

        </>

}

 
     </div> 

    </div>
    
  )
}

export default Login    


/* <form onSubmit={handleMagicLinkSignIn}>
<input
  label="Email address"
  autoComplete="email"
  placeholder="Type in your email address"
  defaultValue={email}
  onChange={ (e) => setEmail(e.target.value)}
/>
<button type="submit">Send magic link</button>
</form>
<hr />
*/

