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

class DisplacementService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/features/displacements'
  }

  async getAllDisplacements() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const displacements = []
      querySnapshot.forEach(doc => {
        displacements.push({ id: doc.id, ...doc.data() })
      })
      const activeDisplacements = displacements.filter(
        item => item.status !== 'deleted'
      )
      return activeDisplacements
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getDisplacementById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'not-found',
          message: 'Cilindrada no encontrada',
        }
        throw error
      }

      const displacement = { id: docSnap.id, ...docSnap.data() }

      if (displacement.status === 'deleted') {
        const error = {
          code: 'deleted',
          message: 'Cilindrada borrada',
        }
        throw error
      }

      return displacement
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createDisplacement({ displacementData }) {
    try {
      const docRef = await addDoc(
        collection(db, this.collectionName),
        displacementData
      )
      return { id: docRef.id, ...displacementData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateDisplacement({ id, displacementData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, displacementData)
      return { id, ...displacementData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new DisplacementService()
