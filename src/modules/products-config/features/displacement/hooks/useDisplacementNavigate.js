import { useNavigate } from 'react-router-dom'

const URLBASE = '/configuracion-autos/caracteristicas/cilindrada'

const useDisplacementNavigate = () => {
  const navigate = useNavigate()

  const navigateToDisplacementMenu = () => {
    navigate(URLBASE)
  }

  const navigateToCreateDisplacement = () => {
    navigate(`${URLBASE}/agregar`)
  }

  const navigateToEditDisplacement = displacementId => {
    navigate(`${URLBASE}/editar/${displacementId}`)
  }

  const navigateToViewDisplacement = displacementId => {
    navigate(`${URLBASE}/ver/${displacementId}`)
  }

  return {
    navigateToDisplacementMenu,
    navigateToCreateDisplacement,
    navigateToEditDisplacement,
    navigateToViewDisplacement,
  }
}

export default useDisplacementNavigate
