import { Route, Routes } from 'react-router-dom'
import { AuthRoutes, PublicRoutes } from '../modules'


export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={ <PublicRoutes /> } />
        <Route path="/auth/*" element={ <AuthRoutes /> } />
      </Routes>
    </div>
  )
}
