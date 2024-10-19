import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../../../../firebase/config'
import FirebaseErrorHandler from '../../../../../services/FirebaseErrorHandler'

class FuelService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/features/fuels'
  }

  async getAllFuels() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const fuels = []
      querySnapshot.forEach(doc => {
        fuels.push({ id: doc.id, ...doc.data() })
      })
      const activeFuels = fuels.filter(item => item.status !== 'deleted')
      return activeFuels
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getFuelById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'not-found',
          message: 'Combustible no encontrado',
        }
        throw error
      }

      const fuel = { id: docSnap.id, ...docSnap.data() }

      if (fuel.status === 'deleted') {
        const error = {
          code: 'deleted',
          message: 'Combustible borrado',
        }
        throw error
      }

      return fuel
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createFuel({ fuelData }) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), fuelData)
      return { id: docRef.id, ...fuelData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateFuel({ id, fuelData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, fuelData)
      return { id, ...fuelData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new FuelService()
