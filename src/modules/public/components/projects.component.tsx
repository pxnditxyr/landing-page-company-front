import { useEffect } from 'react'
import { useProjectsStore } from '../../../stores'
import { Link } from 'react-router-dom'

export const ProjectsParallax = () => {

  const projects = useProjectsStore( state => state.projects )
  const findAllProjects = useProjectsStore( state => state.findAll )

  useEffect( () => {
    findAllProjects()
  }, [] )

  return (
    <div
      className={ `text-slate-900 min-h-screen flex bg-[url("https://images.unsplash.com/photo-1514496959998-c01c40915c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")] bg-cover bg-center bg-fixed flex-wrap gap-6 justify-center items-center px-4 py-8 overflow-y-auto` }
      id="projects"
    >
      {
        projects.map( project => (
          <article
            className="flex bg-white flex-col items-center justify-between rounded-[.5em] shadow-lg px-4 py-6 h-[550px] w-[300px] min-w-[280px]"
            key={ project.id }
          >
            <section className="flex flex-col items-center gap-4 py-2 w-full">
              <img
                src={ project.imageUrl }
                alt={ project.name }
                className="w-[90%] h-[200px] bg-slate-900 bg-cover bg-center rounded-[.3em] shadow-xl"
              />
              <div className="flex flex-col items-center w-full px-4">
                <p
                  className="w-full text-[25px] font-bold text-center text-pretty line-clamp-2 truncate"
                >{ project.name }</p>
                <p className="w-full text-pretty leading-relaxed text-[0.9rem] md:text-[16px] line-clamp-6 truncate sm:line-clamp-4 lg:line-clamp-3" >{ project.details }</p>
              </div>
            </section>
            <section className="py-4">
              <Link
                className="px-[3.5em] py-[1em] bg-slate-900 text-white text-[.875rem] font-bold uppercase rounded-[.3em]"
                to={ `/project/${ btoa( project.id ) }` }
              > Ver más </Link>
            </section>
          </article>
        ) )
      }
    </div>
  )
}
