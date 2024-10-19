import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../../../../../firebase/config'
import FirebaseErrorHandler from '../../../../../services/FirebaseErrorHandler'

class DriveTrainService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/features/drivetrains'
  }

  async getAllDriveTrains() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const driveTrains = []
      querySnapshot.forEach(doc => {
        driveTrains.push({ id: doc.id, ...doc.data() })
      })
      const activeDriveTrains = driveTrains.filter(
        item => item.status !== 'deleted'
      )
      return activeDriveTrains
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getDriveTrainById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const error = {
          code: 'not-found',
          message: 'Tracción no encontrada',
        }
        throw error
      }

      const driveTrain = { id: docSnap.id, ...docSnap.data() }

      if (driveTrain.status === 'deleted') {
        const error = {
          code: 'deleted',
          message: 'Tracción borrada',
        }
        throw error
      }

      return driveTrain
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createDriveTrain({ driveTrainData }) {
    try {
      const docRef = await addDoc(
        collection(db, this.collectionName),
        driveTrainData
      )
      return { id: docRef.id, ...driveTrainData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateDriveTrain({ id, driveTrainData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, driveTrainData)
      return { id, ...driveTrainData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async deleteDriveTrain({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await deleteDoc(docRef)
      return { id }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new DriveTrainService()
