import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { AiOutlineStock } from 'react-icons/ai'
import { FaCar } from 'react-icons/fa'
import { TbLogs } from 'react-icons/tb'

export const routeNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  /* 
  {
    name: 'Gestión de Usuarios',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Administradores', href: '/gestion-usuarios/administradores' },
    ],
  }, */
  {
    name: 'Gestión de Administradores',
    href: '/gestion-usuarios/administradores',
    icon: UsersIcon,
    current: false,
  },
  {
    name: 'Gestión de Autos',
    href: '/gestion-autos',
    icon: FaCar,
    current: false,
  },
  {
    name: 'Configuración de Autos',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Marcas', href: '/configuracion-autos/marcas' },
      { name: 'Características', href: '/configuracion-autos/caracteristicas' },
      { name: 'Accesorios', href: '/configuracion-autos/accesorios' },
    ],
  },
  {
    name: 'Ventas',
    href: '/ventas',
    icon: AiOutlineStock,
    current: false,
  },

  {
    name: 'Registro de Actividades',
    href: '/registro-actividades',
    icon: TbLogs,
    current: false,
  },
]

export function findTitleByPath(path) {
  for (const item of routeNavigation) {
    if (item.href && path.startsWith(item.href)) {
      return item.name
    }
    if (item.children) {
      for (const child of item.children) {
        if (path.startsWith(child.href)) {
          return `${item.name} - ${child.name}`
        }
      }
    }
  }
  return 'Error en ruta'
}
