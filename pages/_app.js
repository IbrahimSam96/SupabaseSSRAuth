import NavigationBar from '../components/NavigationBar'
import { UserContextProvider } from '../Context'
import Head from 'next/head'

import './../style.css'

export default function MyApp({ Component, pageProps }) {
  
  return (
     <UserContextProvider >
<Head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
</Head>
        <NavigationBar {...pageProps} /> 
        <Component {...pageProps} />

      </UserContextProvider>
  )
}
