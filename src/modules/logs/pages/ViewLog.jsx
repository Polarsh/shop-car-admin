import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import useLog, { LogHelper } from '../hooks/useLog'
import useLogNavigate from '../hooks/useLogNavigate'
import { formatDateTime } from '../../../utils/functions'
import Title from '../../../components/others/Title'
import CardComponent from '../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../components/Input/View'
import InputJsonOnlyViewComponent from '../../../components/Input/ViewJson'
import ButtonComponent, {
  ButtonStyle,
} from '../../../components/Buttons/Button'
import LoadingPage from '../../../components/LoadingPage'

export default function ViewLogPage() {
  const { logId } = useParams()

  const { log, isLoading, error, getLogById } = useLog()

  const { navigateToLogMenu } = useLogNavigate()

  useEffect(() => {
    getLogById({ id: logId })
  }, [])

  if (isLoading) return <LoadingPage />
  if (error) return <div>Error: {error.message}</div>
  if (!log) return <div>No se encontró el registro</div>

  let previousDataLabel = ''
  let newDataLabel = ''

  switch (log.eventType) {
    case LogHelper.eventType.CREATE:
      previousDataLabel = 'Información previa (No disponible)'
      newDataLabel = 'Información creada'
      break
    case LogHelper.eventType.UPDATE:
      previousDataLabel = 'Información previa'
      newDataLabel = 'Información actualizada'
      break
    case LogHelper.eventType.DELETE:
      previousDataLabel = 'Información eliminada'
      newDataLabel = 'Información modificada (No disponible)'
      break
    default:
      break
  }

  const logDetail = [
    { label: 'Módulo', value: log.module },
    { label: 'Tipo de registro', value: log.logLevel },
    { label: 'Tipo de evento', value: log.eventType },
  ]

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Detalles del registro'}
          description={'Aqui podras encontrar el detalle del registro'}
        />

        {log && (
          <CardComponent className='bg-white space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent
                label={'Responsable'}
                value={log.userEmail}
              />
              <InputOnlyViewComponent
                label={'Fecha'}
                value={formatDateTime(log.timestamp)}
              />
            </div>

            <InputOnlyViewComponent
              label={'Descripción'}
              value={log.description}
            />

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              {logDetail.map(detail => (
                <InputOnlyViewComponent
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </div>

            <div
              className={`grid gap-6 ${log.previousData && log.newData ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {log.previousData && (
                <InputJsonOnlyViewComponent
                  label={previousDataLabel}
                  value={log.previousData}
                />
              )}
              {log.newData && (
                <InputJsonOnlyViewComponent
                  label={newDataLabel}
                  value={log.newData}
                />
              )}
            </div>

            {/* Botones */}
            <div className='flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToLogMenu}
                label={'Regresar'}
                icon={IoMdArrowRoundBack}
                variant={ButtonStyle.Outline}
              />
            </div>
          </CardComponent>
        )}
      </div>
    </>
  )
}
