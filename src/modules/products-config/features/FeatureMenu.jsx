import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  {
    name: 'Carrocería',
    href: '/configuracion-autos/caracteristicas/carroceria',
  },
  {
    name: 'Combustible',
    href: '/configuracion-autos/caracteristicas/combustible',
  },
  {
    name: 'Tracción',
    href: '/configuracion-autos/caracteristicas/traccion',
  },
  {
    name: 'Transmisión',
    href: '/configuracion-autos/caracteristicas/transmision',
  },
  {
    name: 'Cilindrada',
    href: '/configuracion-autos/caracteristicas/cilindrada',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FeatureMenuTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = tabs.find(tab => location.pathname.startsWith(tab.href))

  const handleSelectChange = event => {
    const selectedTab = tabs.find(tab => tab.name === event.target.value)
    if (selectedTab) {
      window.location.href = selectedTab.href
    }
  }

  useEffect(() => {
    if (location.pathname === '/configuracion-autos/caracteristicas') {
      navigate(tabs[0].href)
    }
  }, [])

  return (
    <>
      <div className='-mt-10 -mx-4 sm:-mx-6 lg:-mx-8 bg-white'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:hidden'>
            <label htmlFor='tabs' className='sr-only'>
              Selecciona la pestaña
            </label>
            <select
              id='tabs'
              name='tabs'
              value={currentTab?.name}
              onChange={handleSelectChange}
              className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm'>
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <div className='border-b border-gray-200'>
              <nav aria-label='Tabs' className='-mb-px flex space-x-8'>
                {tabs.map(tab => {
                  const isCurrent = location.pathname.startsWith(tab.href)
                  return (
                    <Link
                      key={tab.name}
                      to={tab.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={classNames(
                        isCurrent
                          ? 'border-secondary text-primary'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                      )}>
                      {tab.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <Outlet />
      </div>
    </>
  )
}
