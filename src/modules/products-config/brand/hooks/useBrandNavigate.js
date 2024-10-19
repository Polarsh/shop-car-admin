import { useNavigate } from 'react-router-dom'

const useBrandNavigate = () => {
  const navigate = useNavigate()

  const navigateToBrandMenu = () => {
    navigate('/configuracion-autos/marcas')
  }

  const navigateToCreateBrand = () => {
    navigate('/configuracion-autos/marcas/agregar')
  }

  const navigateToEditBrand = brandId => {
    navigate(`/configuracion-autos/marcas/editar/${brandId}`)
  }

  const navigateToViewBrand = brandId => {
    navigate(`/configuracion-autos/marcas/ver/${brandId}`)
  }

  return {
    navigateToBrandMenu,
    navigateToCreateBrand,
    navigateToEditBrand,
    navigateToViewBrand,
  }
}

export default useBrandNavigate
