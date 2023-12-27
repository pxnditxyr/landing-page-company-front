import { Navigate, Route, Routes } from 'react-router-dom'
import { SigninPage, SignupPage } from '../pages'

export const AuthRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="signin" element={ <SigninPage /> } />
        <Route path="signup" element={ <SignupPage /> } />

        <Route path="*" element={ <Navigate to="/auth/signin" /> } />
      </Routes>
    </div>
  )
}
