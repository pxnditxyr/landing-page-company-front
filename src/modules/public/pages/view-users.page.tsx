import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUsersStore } from '../../../stores'
import { LoadingPage } from '../../../components'
import { PublicNavbar } from '../components'
import { genderFormatter } from '../../../helpers'


const containerClassName = 'flex flex-col justify-center md:flex-row md:justify-start md:gap-2'
const subtitleClassName = 'text-lg text-orange-300 font-bold md:text-xl'
const paragraphClassName = 'text-base text-white md:text-lg'
const articleClassName = 'w-full flex flex-col p-4 text-[#092635] bg-gray-800/60 backdrop-blur-sm rounded-lg text-lg font-bold sm:p-8 overflow-x-auto'
const sectionClassName = 'w-full flex gap-2 flex-col xl:gap-4'

export const ViewUsersPage = () => {

  const params = useParams()
  const encodedId = String( params.id )
  const id = atob( encodedId )

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoadingUsers = useUsersStore( state => state.isLoading )
  const user = users.find( user => user.id === id )

  useEffect( () => {
    findAllUsers()
  }, [] )

  if ( isLoadingUsers ) return ( <LoadingPage /> )
  if ( !user ) return ( <h1> No User </h1> )

  return (
    <div 
      id="home"
      className="text-center text-slate-900 min-h-screen flex flex-col justify-start gap-6 items-center w-full overflow-x-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23d94100' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23af1800' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d3331e' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b01f19' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23c21d42' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%239e1036' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23c5275d' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23a0274f' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23b62184' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2391106c' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23c03e96' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%238f0f85' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundColor: '#ff7700',
      // backgroundPosition: 'center',
        }}
    >
      <PublicNavbar />
      <div className="px-4 sm:px-8 md:px-24">
        <h1
          className="text-md lg:text-4xl font-bold text-[#092635] backdrop-blur-sm bg-white/30 rounded-lg p-2"
        > { user.name } </h1>
        <div
          className="w-full flex flex-col items-center gap-4 p-4"
        >
          <article className={ articleClassName }>
            <section className="w-full p-6 flex flex-col items-center gap-2 lg:px-0">
              <h2 className="text-3xl text-emerald-400 font-black"> { user.name } { user.lastname } </h2>
              <h2 className="text-xl text-emerald-200 font-bold"> Email: { user.email } </h2>
            </section>
            <section className={ sectionClassName }>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Edad: </span>
                <p className={ paragraphClassName }>
                  { new Date( Date.now() - new Date( user.birthdate ).getTime() ).getUTCFullYear() - 1970 }
                </p>
              </div>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Genero: </span>
                <p className={ paragraphClassName }> { genderFormatter[ user.gender ] } </p>
              </div>
            </section>
            <section className={ sectionClassName }>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Telefono: </span>
                <p className={ paragraphClassName }> { user.phone } </p>
              </div>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Rol: </span>
                <p className={ paragraphClassName }> { user.role } </p>
              </div>
            </section>
            <section className={ sectionClassName }>
              <div className={ containerClassName }>
                <span className={ subtitleClassName }> Información: </span>
                <p className={ paragraphClassName }> { user.info } </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
