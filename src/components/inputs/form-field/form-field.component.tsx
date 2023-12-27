
interface IFormFieldProps {
  type: 'text' | 'password' | 'email' | 'number' | 'date'
  name: string
  value?: string
  placeholder: string
  className?: string
}

const customClass = 'min-w-60 px-3 py-2 rounded-lg shadow-2xl bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-blue-500'

export const FormField = ( { type, name, placeholder, className, value }: IFormFieldProps ) => {
  return (
    <input
      type={ type }
      name={ name }
      value={ value }
      placeholder={ placeholder }
      className={ `${ customClass } ${ className }` }
    />
  )
}
