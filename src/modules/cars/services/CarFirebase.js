import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../../firebase/config'
import FirebaseErrorHandler from '../../../services/FirebaseErrorHandler'

class CarService {
  constructor() {
    this.collectionName = 'webs/car-shop/cars'
  }

  async getAllCars() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const cars = []
      querySnapshot.forEach(doc => {
        cars.push({ id: doc.id, ...doc.data() })
      })
      const activeCars = cars.filter(car => car.status !== 'deleted')
      return activeCars
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getCarById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'my-error',
          message: 'Auto no encontrado',
        }
        throw error
      }

      const car = { id: docSnap.id, ...docSnap.data() }

      if (car.status === 'deleted') {
        const error = {
          code: 'my-error',
          message: 'Auto borrado',
        }
        throw error
      }

      return car
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createCar({ carData }) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), carData)
      return { id: docRef.id, ...carData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateCar({ id, carData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, carData)
      return { id, ...carData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new CarService()
