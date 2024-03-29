import { useCallback } from 'react'

import './crud-table.styles.css'
import { EditIcon, EyeIcon, TrashIcon } from '../../../../icons/table'

interface IData {
  id: number | string
  [ key : string ] : any
}

interface IColumn {
  title: string
  key: string
  type?: 'text' | 'date' | 'boolean' | 'datetime' | 'image'
}

interface IProps {
  data: IData[]
  columns: IColumn[]
  enabledActions?: {
    toggleStatus?: boolean
    delete?: boolean
    edit?: boolean
    view?: boolean
  }
  selectableRows?: boolean
  actions?: {
    toggleStatusAction?: ( id : string ) => void
    deleteAction?:       ( id : string ) => void
    editAction?:         ( id : string ) => void
    viewAction?:         ( id : string ) => void
    selectAction?:       ( id : string ) => void
  }
}

export const CrudTable = ( {
  data, columns,
  selectableRows = false,
  enabledActions = {
    toggleStatus: false,
    delete: true,
    edit: true,
    view: true
  },
  actions
} : IProps ) => {

  const renderCell = useCallback( ( row : IData, column : IColumn ) => {
    switch ( column.key ) {
      case 'status':
        return (
          <div
            className={ `flex items-center justify-center h-6 py-4 px-3 rounded-full text-sm ${ row[ column.key ] ? 'bg-green-200 text-green-800' : 'bg-red-300 text-red-800' }` }
          >
            { row[ column.key ] ? 'Active' : 'Inactive' }
          </div>
        )
      case 'actions':
        return (
          <div>
            <div className="flex items-center justify-center space-x-2">
              {
                enabledActions.view && (
                  <section className="action-section">
                    <button
                      onClick={ () => actions?.viewAction?.( String( row.id ) ) }
                      className="hoverable-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EyeIcon
                        width={ 35 }
                        height={ 35 }
                      />
                    </button>
                    <span
                      className="hoverable-label"
                    > Ver </span>
                  </section>
                )
              }
              {
                enabledActions.edit && (
                  <section className="action-section">
                    <button
                      onClick={ () => actions?.editAction?.( String( row.id ) ) }
                      className="hoverable-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EditIcon
                        width={ 35 }
                        height={ 35 }
                      />
                    </button>
                    <span className="hoverable-label"> Editar </span>
                  </section>
                )
              }
              {
                enabledActions.delete && (
                  <section className="action-section">
                    <button
                      onClick={ () => actions?.deleteAction?.( String( row.id ) ) }
                      className="hoverable-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      <TrashIcon
                        width={ 35 }
                        height={ 35 }
                      />
                    </button>
                    <span
                      className="hoverable-label"
                    > Borrar </span>
                  </section>
                )
              }
              {
                enabledActions.toggleStatus && (
                  <button
                    onClick={ () => actions?.toggleStatusAction?.( String( row.id ) ) }
                  >
                    { row.status ? '❌' : '✅' }
                    { row.status ? 'Desactivar' : 'Activar' }
                  </button>
                )
              }
            </div>
          </div>
      )
      default:
        return (
          <div>
            {
              ( column.type === 'date' ) && (
                <span
                  className="text-sm"
                > { new Date( String( row[ column.key ] ) ).toLocaleDateString() } </span>
              )
            }
            {
              ( column.type === 'datetime' ) && ( <span> { new Date( String( row[ column.key ] ) ).toLocaleString() } </span> )
            }
            {
              ( column.type === 'boolean' ) && ( <span> { row[ column.key ] ? 'Si' : 'No' } </span> )
            }
            {
              ( column.type === undefined ) && ( <span> { row[ column.key ] } </span> )
            }
            {
              ( column.type === 'image' ) && (
                <img
                  src={ String( row[ column.key ] ) }
                  alt={ String( row[ column.key ] ) }
                  className="w-12 h-12 object-cover rounded-full"
                />
              )
            }
          </div>
        )
    }
  }, [] )

  return (
    <table className="w-full text-sm ext-left rtl:text-right text-gray-200 shadow-md rounded-md overflow-hidden backdrop-blur-sm bg-white/50">
      <thead className="bg-violet-800 text-white text-base">
        <tr className="border-b border-violet-900">
          { columns.map( ( column ) => (
            <th
              key={ column.key }
              className="p-4 text-left"
            >{ column.title }</th>
          ) ) }
        </tr>
      </thead>
      <tbody>
        {
          ( data.length > 0 ) ? (
            data.map( ( row ) => (
              <tr
                key={ row.id }
                className={ `border-b border-violet-900 hover:bg-red-500/60 text-[#092635] text-base hover:text-white transition-all duration-300 ${ selectableRows ? 'cursor-pointer' : '' }` }
                onClick={ () => actions?.selectAction?.( String( row.id ) ) }
              >
                { columns.map( ( column ) => (
                  <td
                    key={ column.key }
                    className="p-4 height-12"
                  >
                    { renderCell( row, column ) }
                  </td>
                ) ) }
              </tr>
            ) )
          ) : (
            <tr>
              <td
                colSpan={ columns.length }
                className="p-4 text-center text-gray-800 text-lg"
              > No hay datos para mostrar </td>
            </tr>
          )
        }
      </tbody>
      {
        
      }
    </table>
  )
}

