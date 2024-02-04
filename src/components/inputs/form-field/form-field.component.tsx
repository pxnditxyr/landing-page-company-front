
interface IFormFieldProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'date'
  name?: string
  value?: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

const customClass = 'w-60 px-3 py-2 rounded-lg shadow-2xl bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-blue-500 md:w-full'

export const FormField = ( { type = 'text', name = 'text', placeholder = 'text', className, value, style }: IFormFieldProps ) => {
  return (
    <input
      type={ type }
      name={ name }
      value={ value }
      placeholder={ placeholder }
      className={ `${ customClass } ${ className }` }
      style={ style }
    />
  )
}
