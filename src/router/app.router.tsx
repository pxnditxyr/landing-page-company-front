import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes, PrivateRoutes, PublicRoutes } from '../modules'
import { useAuthStore } from '../stores'
import { useEffect } from 'react'
import { LoadingPage } from '../components'


export const AppRouter = () => {

  const status = useAuthStore( state => state.status )
  const checkAuthStatus = useAuthStore( state => state.checkAuthStatus )

  useEffect( () => {
    checkAuthStatus()
  }, [])

  if ( status === 'pending' ) return ( <LoadingPage /> )

  return (
    <div>
      <Routes>
        {
          ( status === 'unauthenticated' ) ? (
            <>
              <Route path="/*" element={ <PublicRoutes /> } />
              <Route path="/auth/*" element={ <AuthRoutes /> } />

              <Route path="/users/*" element={ <Navigate to="/auth/signin" /> } />
              <Route path="/my-company/*" element={ <Navigate to="/auth/signin" /> } />
              <Route path="/contact-us/*" element={ <Navigate to="/auth/signin" /> } />
              <Route path="/projects/*" element={ <Navigate to="/auth/signin" /> } />
              <Route path="/teams/*" element={ <Navigate to="/auth/signin" /> } />
              <Route path="/projects-teams/*" element={ <Navigate to="/auth/signin" /> } />
            </>
          ) : (
            <Route path="/*" element={ <PrivateRoutes /> } />
          )
        }
      </Routes>
    </div>
  )
}
