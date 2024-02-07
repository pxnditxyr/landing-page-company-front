import { PencilIcon } from '../../icons'
import './edit-button.styles.css'

interface EditButtonProps {
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export const EditButton = ( { onClick, className, style } : EditButtonProps ) => {
  return (
    <button className={ `edit-button ${ className }` } style={ style } onClick={ onClick }>
      <PencilIcon
        className="edit-icon"
        width={ 35 }
        height={ 35 }
      />
    </button>
  )
}
