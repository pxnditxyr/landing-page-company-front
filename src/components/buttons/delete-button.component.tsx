import { DeleteIcon } from '../../icons'

import './delete-button.styles.css'

interface DeleteButtonProps {
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export const DeleteButton = ( { onClick, className, style } : DeleteButtonProps ) => {
  return (
    <button
      className={ `delete-button ${ className }` }
      style={ style }
      onClick={ onClick }
    >
      <DeleteIcon
        className="delete-icon"
        width={ 35 }
        height={ 35 }
      />
    </button>
  )
}
