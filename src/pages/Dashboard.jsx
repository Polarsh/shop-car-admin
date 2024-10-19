import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function DashboardPage() {
  // Example data, replace this with actual data
  const salesData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas por mes',
        data: [15, 20, 30, 22, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const stockData = {
    labels: ['SUV', 'Sedán', 'Camioneta', 'Coupe'],
    datasets: [
      {
        label: 'Autos en stock',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const transmissionData = {
    labels: ['Automática', 'Manual'],
    datasets: [
      {
        label: 'Tipos de Transmisión',
        data: [70, 30],
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className='px-4'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

      {/* Gráfico de ventas */}
      <div className='bg-white p-4 shadow rounded-lg'>
        <h2 className='text-lg font-semibold mb-4'>Ventas por Mes</h2>
        <Bar data={salesData} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {/* Gráfico de autos en stock */}
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Distribución de Stock</h2>
          <Doughnut data={stockData} />
        </div>

        {/* Gráfico de transmisión */}
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Tipos de Transmisión</h2>
          <Doughnut data={transmissionData} />
        </div>
      </div>

      {/* Otra sección para estadísticas adicionales */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6'>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>
            Total de Autos Vendidos
          </h2>
          <p className='text-3xl font-bold'>126</p>
        </div>

        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Ingresos Totales</h2>
          <p className='text-3xl font-bold'>$300,000</p>
        </div>

        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Autos en Inventario</h2>
          <p className='text-3xl font-bold'>58</p>
        </div>
      </div>
    </div>
  )
}
