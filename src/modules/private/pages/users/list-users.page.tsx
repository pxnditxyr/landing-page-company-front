import { useEffect } from 'react'
import { useUsersStore } from '../../../../stores'

export const ListUsersPage = () => {

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoadingUsers = useUsersStore( state => state.isLoading )

  useEffect( () => {
    findAllUsers()
  }, [] )

  if ( isLoadingUsers ) return <h1> Loading... </h1>


  return (
    <div>
      <h1> List Users Page </h1>
      <pre> { JSON.stringify( users, null, 2 ) } </pre>
    </div>
  )
}
