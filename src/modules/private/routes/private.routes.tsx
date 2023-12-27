import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../../../stores'
import { CreateUsersPage, ListUsersPage, UpdateUsersPage, ViewUsersPage } from '../pages'

export const PrivateRoutes = () => {

  const signout = useAuthStore( state => state.signout )

  return (
    <div>
      <button onClick={ signout } className="btn"> Signout </button>
      <nav>
        <ul className="flex gap-4 w-full justify-center items-center">
          <li>
            <Link
              to="/"
              className="text-turquoise-blue-600 font-bold hover:underline"
            > Dashboard </Link>
          </li>
          <li>
            <Link
              to="my-company"
              className="text-turquoise-blue-600 font-bold hover:underline"
            > Companies </Link>
          </li>
          <li>
            <Link
              to="users"
              className="text-turquoise-blue-600 font-bold hover:underline"
            > Users </Link>
          </li>
          <li> <Link to="contact-us"> Contact Us </Link> </li>
          <li> <Link to="projects"> Projects </Link> </li>
          <li> <Link to="teams"> Teams </Link> </li>
          <li> <Link to="projects-teams"> Projects Teams </Link> </li>
          <li> <Link to="team-members"> Team Members </Link> </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ <h1> Dashboard </h1> } />
        <Route path="my-company/*" element={ <h1> Companies </h1> } />
        <Route path="users/*" element={ 
            <Routes>
              <Route path="/" element={ <ListUsersPage /> } />
              <Route path=":id" element={ <ViewUsersPage /> } />
              <Route path="create" element={ <CreateUsersPage /> } />
              <Route path="update/:id" element={ <UpdateUsersPage /> } />
            </Routes>
          } />

        <Route path="contact-us/*" element={ <h1> Contact Us </h1> } />
        <Route path="projects/*" element={ <h1> Projects </h1> } />
        <Route path="teams/*" element={ <h1> Teams </h1> } />
        <Route path="projects-teams/*" element={ <h1> Projects Teams </h1> } />
        <Route path="team-members/*" element={ <h1> Team Members </h1> } />

        <Route path="auth/*" element={ <Navigate to="/" /> } />
        <Route path="*" element={ <h1> Not Found </h1> } />
      </Routes>
    </div>
  )
}
