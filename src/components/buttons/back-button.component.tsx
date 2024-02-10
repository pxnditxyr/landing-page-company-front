import { BackIcon } from '../../icons'

interface BackButtonProps {
  onGoBack?: () => void
  className?: string
  style?: React.CSSProperties
}

export const BackButton = ( { onGoBack, className, style }: BackButtonProps ) => {
  return (
    <button
      onClick={ onGoBack }
      className={ `cursor-pointer z-20 rounded-full bg-white bg-opacity-50 shadow-lg p-2 hover:bg-opacity-100 transition-all duration-300 hover:transform hover:scale-105 ${ className }` }
      style={ style }
    >
      <BackIcon />
    </button>
  )
}
