import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CreateProjectPage, CreateUserPage, ListProjectsPage, ViewProjectPage, 
  ListUsersPage, UpdateProjectPage, UpdateUserPage, ViewUserPage,
  ViewCompanyPage, UpdateCompanyPage, CreateCompanyPage,
  ListTeamsPage, CreateTeamPage, ViewTeamPage, UpdateTeamPage,
  ListProjectsTeamsPage, CreateProjectTeamsPage, ViewProjectTeamsPage,
  ListTeamMembersPage, CreateTeamMembersPage, SelectTeamsPage, ViewTeamMembersPage, ListContactUsPage, ViewContactPage,
} from '../pages'
import { PrivateLayout } from '../layout'
import { useAuthStore } from '../../../stores'

export const PrivateRoutes = () => {

  const signout = useAuthStore( state => state.signout )
  const error = useAuthStore( state => state.error )

  useEffect( () => {
    if ( error && error === 'Unauthorized' )
      signout()
  }, [ error ] )


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
          <Route path="projects-teams/*" element={ 
            <Routes>
              <Route path="/" element={ <ListProjectsTeamsPage /> } />
              <Route path="/:id" element={ <ViewProjectTeamsPage /> } />
              <Route path="create" element={ <CreateProjectTeamsPage /> } />
              <Route path="update/*" element={ <Navigate to="/projects-teams" /> } />
            </Routes>
          } />

          <Route path="team-members/*" element={
            <Routes>
              <Route path="/" element={ <ListTeamMembersPage /> } />
              <Route path="/:id" element={ <ViewTeamMembersPage /> } />
              <Route path="create" element={ <SelectTeamsPage /> } />
              <Route path="create/:id" element={ <CreateTeamMembersPage /> } />
              <Route path="update/*" element={ <Navigate to="/team-members" /> } />
            </Routes>
          } />

          <Route path="contact-us/*" element={
            <Routes>
              <Route path="/" element={ <ListContactUsPage /> } />
              <Route path=":id" element={ <ViewContactPage /> } />
            </Routes>
          } />

          <Route path="auth/*" element={ <Navigate to="/" /> } />
          <Route path="*" element={ <h1> Not Found </h1> } />
        </Routes>
      </PrivateLayout>
    </div>
  )
}
