import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/caracteristicas/transmision'

const useTransmissionNavigate = () => {
  const navigate = useNavigate()

  const navigateToTransmissionMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateTransmission = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditTransmission = transmissionId => {
    navigate(`${URLBASE}/editar/${transmissionId}`)
  }

  const navigateToViewTransmission = transmissionId => {
    navigate(`${URLBASE}/ver/${transmissionId}`)
  }

  return {
    navigateToTransmissionMenu,
    navigateToCreateTransmission,
    navigateToEditTransmission,
    navigateToViewTransmission,
  }
}

export default useTransmissionNavigate
