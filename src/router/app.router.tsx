import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes, PrivateRoutes, PublicRoutes } from '../modules'
import { useAuthStore } from '../stores'


export const AppRouter = () => {

  const status = useAuthStore( state => state.status )

  return (
    <div>
      <Routes>
        {
          ( status === 'unauthenticated' ) ? (
            <>
              <Route path="/*" element={ <PublicRoutes /> } />
              <Route path="/auth/*" element={ <AuthRoutes /> } />

              <Route path="/users/*" element={ <Navigate to="/auth/signin" /> } />
            </>
          ) : (
            <Route path="/*" element={ <PrivateRoutes /> } />
          )
        }
      </Routes>
    </div>
  )
}
