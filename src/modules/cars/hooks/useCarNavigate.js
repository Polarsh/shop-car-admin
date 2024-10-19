import { useNavigate } from 'react-router-dom'

const URLBASE = '/gestion-autos'

const useCarNavigate = () => {
  const navigate = useNavigate()

  const navigateToCarMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateCar = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditCar = carId => {
    navigate(`${URLBASE}/editar/${carId}`)
  }

  const navigateToViewCar = carId => {
    navigate(`${URLBASE}/ver/${carId}`)
  }

  return {
    navigateToCarMenu,
    navigateToCreateCar,
    navigateToEditCar,
    navigateToViewCar,
  }
}

export default useCarNavigate
