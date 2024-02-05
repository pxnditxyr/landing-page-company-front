import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CreateProjectPage, CreateUserPage, ListProjectsPage, ViewProjectPage, 
  ListUsersPage, UpdateProjectPage, UpdateUserPage, ViewUserPage,
  ViewCompanyPage, UpdateCompanyPage, CreateCompanyPage,
  ListTeamsPage, CreateTeamPage, ViewTeamPage, UpdateTeamPage,
} from '../pages'
import { PrivateLayout } from '../layout'

export const PrivateRoutes = () => {
  return (
    <div>
      <PrivateLayout>
        <Routes>
          <Route path="/" element={ <Navigate to="/my-company" /> } />
          <Route path="my-company/*" element={
            <Routes>
              <Route path="/" element={ <ViewCompanyPage /> } />
              <Route path="update" element={ <UpdateCompanyPage /> } />
              <Route path="create" element={ <CreateCompanyPage /> } />
            </Routes>
          } />
          <Route path="users/*" element={ 
            <Routes>
              <Route path="/" element={ <ListUsersPage /> } />
              <Route path="/:id" element={ <ViewUserPage /> } />
              <Route path="create" element={ <CreateUserPage /> } />
              <Route path="update/:id" element={ <UpdateUserPage /> } />
            </Routes>
          } />

          <Route path="contact-us/*" element={ <h1> Contact Us </h1> } />

          <Route path="projects/*" element={ 
            <Routes>
              <Route path="/" element={ <ListProjectsPage /> } />
              <Route path="/:id" element={ <ViewProjectPage /> } />
              <Route path="create" element={ <CreateProjectPage /> } />
              <Route path="update/:id" element={ <UpdateProjectPage /> } />
            </Routes>
          } />

          <Route path="teams/*" element={ 
            <Routes>
              <Route path="/" element={ <ListTeamsPage /> } />
              <Route path="/:id" element={ <ViewTeamPage /> } />
              <Route path="create" element={ <CreateTeamPage /> } />
              <Route path="update/:id" element={ <UpdateTeamPage /> } />
            </Routes>
          } />
          <Route path="projects-teams/*" element={ <h1> Projects Teams </h1> } />
          <Route path="team-members/*" element={ <h1> Team Members </h1> } />

          <Route path="auth/*" element={ <Navigate to="/" /> } />
          <Route path="*" element={ <h1> Not Found </h1> } />
        </Routes>
      </PrivateLayout>
    </div>
  )
}
