import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTeamMembersStore, useTeamsStore } from '../../../stores'
import { LoadingPage } from '../../../components'
import { PublicNavbar } from '../components'

export const ViewTeamsPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const teams = useTeamsStore( state => state.teams )
  const findAllTeams = useTeamsStore( state => state.findAll )
  const isLoadingTeams = useTeamsStore( state => state.isLoading )
  const team = teams.find( team => team.id === id )

  const teamMembers = useTeamMembersStore( state => state.teamMembers )
  const findAllTeamMembers = useTeamMembersStore( state => state.findAll )
  const isLoadingTeamMembers = useTeamMembersStore( state => state.isLoading )
  const users = teamMembers.filter( teamMember => teamMember.teamId === team?.id  )
  
  useEffect( () => {
    findAllTeams()
    findAllTeamMembers()
  }, [] )

  if ( isLoadingTeams || isLoadingTeamMembers ) return ( <LoadingPage /> )
  if ( !team ) return ( <h1> No Team </h1> )

  return (
    <div 
      id="home"
      className="text-center text-slate-900 min-h-screen flex flex-col justify-start gap-6 items-center w-full overflow-x-hidden"
      style={{
      backgroundImage: `url(${ team.imageUrl })`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
        }}
    >
      <PublicNavbar />
      <div className="px-4 sm:px-8 md:px-24">
        <h1
          className="text-md lg:text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
        > { team.name } </h1>
        <div
          className="w-full flex flex-col items-center gap-4 p-4"
        >
          <article className="w-full flex flex-col-reverse md:flex-row gap-2 p-6 text-[#092635] bg-gray-800/50 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8">
            <section className="flex flex-col justify-between p-2 gap-4 md:gap-0">
              <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
                <h2 className="text-3xl text-emerald-400 font-black"> { team.name } </h2>
                <h2 className="text-xl text-emerald-200 font-bold"> { team.details } </h2>
              </section>
              <section className="w-full flex flex-col">
                <div className="flex flex-col gap-2 text-lg font-bold text-white">
                  <span
                    className="text-xl text-orange-300 font-bold"
                  > Miembros del Equipo </span>
                  {
                    users.map( user => (
                      <Link
                        to={ `/user/${ btoa( user.userId ) }` }
                        className="text-[#35eaca] font-medium hover:underline transition-all duration-300"
                        key={ user.id }
                      > { user.user?.name } </Link>
                    ) )
                  }
                  {
                    users.length === 0 && <p className="text-white"> No hay miembros en este equipo </p>
                  }
                </div>
              </section>
            </section>
            <section className="w-full md:w-1/2 flex flex-col items-center gap-4 justify-center">
              <img
                src={ team.imageUrl }
                alt={ team.name }
                className="w-64 h-80 object-cover rounded-lg"
              />
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
