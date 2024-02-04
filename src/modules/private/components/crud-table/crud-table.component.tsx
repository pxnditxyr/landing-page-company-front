import { useCallback } from 'react'

import './crud-table.styles.css'
import { EditIcon, EyeIcon, TrashIcon } from '../../../../icons/table'

interface IData {
  id: number | string
  [ key : string ] : string | number | boolean | Date | null | undefined
}

interface IColumn {
  title: string
  key: string
  type?: 'text' | 'date' | 'boolean' | 'datetime'
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
  actions?: {
    toggleStatusAction?: ( id : string ) => void
    deleteAction?:       ( id : string ) => void
    editAction?:         ( id : string ) => void
    viewAction?:         ( id : string ) => void
  }
}

export const CrudTable = ( {
  data, columns,
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
                      className="hoverable-button "
                    >
                      <EyeIcon
                        className="min-w-4 min-h-4 max-w-6 max-h-6 object-contain opacity-80"
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
                    >
                      <EditIcon className="min-w-4 min-h-4 max-w-6 max-h-6 object-contain opacity-80" />
                    </button>
                    <span
                      className="hoverable-label"
                    > Editar </span>
                  </section>
                )
              }
              {
                enabledActions.delete && (
                  <section className="action-section">
                    <button
                      onClick={ () => actions?.deleteAction?.( String( row.id ) ) }
                      className="hoverable-button"
                    >
                      <TrashIcon className="min-w-4 min-h-4 max-w-6 max-h-6 object-contain opacity-80 hover:text-red-500 transition-all duration-300" />
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
              ( column.type === undefined ) && ( <span> { String( row[ column.key ] ) } </span> )
            }
          </div>
        )
    }
  }, [] )

  return (
    <table className="w-full text-sm ext-left rtl:text-right text-gray-200 shadow-md rounded-md overflow-hidden backdrop-blur-sm bg-white/30">
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
        { data.map( ( row ) => (
          <tr
            key={ row.id }
            className="border-b border-violet-900 hover:bg-violet-500 hover:text-violet-800 text-[#092635] text-base hover:text-white transition-all duration-300"
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
        ) ) }
      </tbody>
    </table>
  )
}

