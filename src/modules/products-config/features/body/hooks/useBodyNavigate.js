import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/caracteristicas/carroceria'

const useBodyNavigate = () => {
  const navigate = useNavigate()

  const navigateToBodyMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateBody = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditBody = bodyId => {
    navigate(`${URLBASE}/editar/${bodyId}`)
  }

  const navigateToViewBody = bodyId => {
    navigate(`${URLBASE}/ver/${bodyId}`)
  }

  return {
    navigateToBodyMenu,
    navigateToCreateBody,
    navigateToEditBody,
    navigateToViewBody,
  }
}

export default useBodyNavigate
