import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages'

export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
      </Routes>
    </div>
  )
}
