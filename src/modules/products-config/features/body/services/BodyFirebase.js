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

class BodyService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/features/bodies'
  }

  async getAllBodies() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const bodies = []
      querySnapshot.forEach(doc => {
        bodies.push({ id: doc.id, ...doc.data() })
      })
      return bodies
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getBodyById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        const error = {
          code: 'my-error',
          message: 'Carrocería no encontrada',
        }
        throw error
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createBody({ bodyData }) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), bodyData)
      return { id: docRef.id, ...bodyData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateBody({ id, bodyData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, bodyData)
      return { id, ...bodyData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new BodyService()
