import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/initSupabase';
import {BsFillCaretDownFill} from "react-icons/Bs"
import {BsFillCaretUpFill} from "react-icons/Bs"
import Link from 'next/link'
import { useUser } from '../Context';

const NavigationBar = () => {

const [toggleToolTip, setToggleToolTip] = useState(false)  

const {user, session} = useUser();

if(!user) 
return (

<div className="NavigationBar">

<span>

</span>

<span className="NoUserInfo">

<Link href="/login">
   <a> <button className="bn30" >Log In </button> </a>
    </Link>

</span>


</div>
)

return (

<div className="NavigationBar">

<span>

</span>



<span className="UserInfo" onClick={ () => {
setToggleToolTip( (previousState) =>  !previousState )
}} >
 
<a>
{user.email}
</a>
{toggleToolTip ? <BsFillCaretUpFill/>: <BsFillCaretDownFill  /> }
</span>   

{toggleToolTip? 

<span className="UserTooltip">

<button onClick={ ()=> {

supabase.auth.signOut()
window.location = "/"  
}}>
  Log Out
</button>

</span> 

:
null
}  


</div>


  
     )
}

export default NavigationBar

 





