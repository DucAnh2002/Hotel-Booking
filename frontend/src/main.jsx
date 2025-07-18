import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import RoomContextProvider from './context/RoomContext.jsx'
import FoodContextProvider from './context/FoodContext.jsx'
//
createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-nw1rm8udcnlm6ta2.us.auth0.com"
    clientId="HCtBqNk3DrvLaxJRcz2Kc72jVRYh7oUq"
    authorizationParams={{
      audience: 'https://hotel-api',
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <RoomContextProvider>
        <FoodContextProvider>
          <App />
        </FoodContextProvider>
      </RoomContextProvider>
    </BrowserRouter>
  </Auth0Provider>
)
