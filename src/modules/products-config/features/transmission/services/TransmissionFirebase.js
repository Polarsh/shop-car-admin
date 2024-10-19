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

class TransmissionService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/features/transmissions'
  }

  async getAllTransmissions() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const transmissions = []
      querySnapshot.forEach(doc => {
        transmissions.push({ id: doc.id, ...doc.data() })
      })
      const activeTransmissions = transmissions.filter(
        item => item.status !== 'deleted'
      )
      return activeTransmissions
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getTransmissionById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'not-found',
          message: 'Transmisión no encontrada',
        }
        throw error
      }

      const transmission = { id: docSnap.id, ...docSnap.data() }

      if (transmission.status === 'deleted') {
        const error = {
          code: 'deleted',
          message: 'Transmisión borrada',
        }
        throw error
      }

      return transmission
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createTransmission({ transmissionData }) {
    try {
      const docRef = await addDoc(
        collection(db, this.collectionName),
        transmissionData
      )
      return { id: docRef.id, ...transmissionData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateTransmission({ id, transmissionData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, transmissionData)
      return { id, ...transmissionData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new TransmissionService()
