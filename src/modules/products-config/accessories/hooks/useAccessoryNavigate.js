import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/accesorios'

const useAccessoryNavigate = () => {
  const navigate = useNavigate()

  const navigateToAccessoryMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateAccessory = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditAccessory = accessoryId => {
    navigate(`${URLBASE}/editar/${accessoryId}`)
  }

  const navigateToViewAccessory = accessoryId => {
    navigate(`${URLBASE}/ver/${accessoryId}`)
  }

  return {
    navigateToAccessoryMenu,
    navigateToCreateAccessory,
    navigateToEditAccessory,
    navigateToViewAccessory,
  }
}

export default useAccessoryNavigate
