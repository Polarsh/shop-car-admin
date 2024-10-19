import { useNavigate } from 'react-router-dom'

const useLogNavigate = () => {
  const navigate = useNavigate()

  const navigateToLogMenu = () => {
    navigate('/registro-actividades')
  }

  const navigateToLogView = logId => {
    navigate(`/registro-actividades/ver/${logId}`)
  }

  return {
    navigateToLogMenu,
    navigateToLogView,
  }
}

export default useLogNavigate
