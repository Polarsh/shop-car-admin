import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/caracteristicas/combustible'

const useFuelNavigate = () => {
  const navigate = useNavigate()

  const navigateToFuelMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateFuel = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditFuel = bodyId => {
    navigate(`${URLBASE}/editar/${bodyId}`)
  }

  const navigateToViewFuel = bodyId => {
    navigate(`${URLBASE}/ver/${bodyId}`)
  }

  return {
    navigateToFuelMenu,
    navigateToCreateFuel,
    navigateToEditFuel,
    navigateToViewFuel,
  }
}

export default useFuelNavigate
