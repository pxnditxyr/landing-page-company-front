import { Route, Routes } from 'react-router-dom'
import { HomePage, ViewProjectPage, ViewTeamsPage, ViewUsersPage } from '../pages'

export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="project/:id" element={ <ViewProjectPage /> } />
        <Route path="team/:id" element={ <ViewTeamsPage /> } />
        <Route path="user/:id" element={ <ViewUsersPage /> } />

        <Route path="*" element={ <h1>404</h1> } />
      </Routes>
    </div>
  )
}
