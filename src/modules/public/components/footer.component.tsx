export const Footer = () => {
  return (
    <div className="w-full bg-slate-900 text-white flex flex-col p-4 py-8 justify-center items-center sm:flex-row gap-2">
      <p> © 2023 - { new Date().getFullYear() } </p>
      <p className="hidden sm:block"> | </p>
      <p> Todos los derechos reservados </p>
      <p className="hidden sm:block"> | </p>
      <p> Desarrollado por <a href="mailto:pxnditxyr@gmail.com" className="underline text-teal-500"> Pxndxs </a> </p>
    </div>
  )
}
