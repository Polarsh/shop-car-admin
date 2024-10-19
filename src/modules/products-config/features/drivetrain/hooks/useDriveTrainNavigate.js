import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/caracteristicas/traccion'

const useDriveTrainNavigate = () => {
  const navigate = useNavigate()

  const navigateToDriveTrainMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateDriveTrain = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditDriveTrain = bodyId => {
    navigate(`${URLBASE}/editar/${bodyId}`)
  }

  const navigateToViewDriveTrain = bodyId => {
    navigate(`${URLBASE}/ver/${bodyId}`)
  }

  return {
    navigateToDriveTrainMenu,
    navigateToCreateDriveTrain,
    navigateToEditDriveTrain,
    navigateToViewDriveTrain,
  }
}

export default useDriveTrainNavigate
