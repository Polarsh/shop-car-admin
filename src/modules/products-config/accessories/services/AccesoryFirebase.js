import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../../../firebase/config'
import FirebaseErrorHandler from '../../../../services/FirebaseErrorHandler'

class AccessoryService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/accessories/accessories'
  }

  async getAllAccessories() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const accessories = []
      querySnapshot.forEach(doc => {
        accessories.push({ id: doc.id, ...doc.data() })
      })
      const activeAccessories = accessories.filter(
        item => item.status !== 'deleted'
      )
      return activeAccessories
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getAccessoryById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'my-error',
          message: 'Accesorio no encontrado',
        }
        throw error
      }

      const accessory = { id: docSnap.id, ...docSnap.data() }

      if (accessory.status === 'deleted') {
        const error = {
          code: 'my-error',
          message: 'Accesorio borrado',
        }
        throw error
      }

      return accessory
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createAccessory({ accessoryData }) {
    try {
      const docRef = await addDoc(
        collection(db, this.collectionName),
        accessoryData
      )
      return { id: docRef.id, ...accessoryData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateAccessory({ id, accessoryData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, accessoryData)
      return { id, ...accessoryData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new AccessoryService()
