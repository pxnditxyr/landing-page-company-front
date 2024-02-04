import { BackIcon } from '../../icons'

interface BackButtonProps {
  onGoBack: () => void
}

export const BackButton = ( { onGoBack }: BackButtonProps ) => {
  return (
    <button
      onClick={ onGoBack }
      className="cursor-pointer z-20 rounded-full bg-white bg-opacity-50 shadow-lg p-2 hover:bg-opacity-100 transition-all duration-300 hover:transform hover:scale-105"
    >
      <BackIcon />
    </button>
  )
}
