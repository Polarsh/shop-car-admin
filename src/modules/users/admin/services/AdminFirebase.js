import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../../../../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import FirebaseErrorHandler from '../../../../services/FirebaseErrorHandler'
import { initializeSecondaryApp } from '../../../../../firebase/firebaseSecondaryConfig'
import { deleteApp } from 'firebase/app'

class AdminService {
  constructor() {
    this.collectionName = 'webs/car-shop/administrators'
  }

  async getAllAdministrators() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const admins = []
      querySnapshot.forEach(doc => {
        admins.push({ id: doc.id, ...doc.data() })
      })
      return admins
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getAdministratorById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        const error = {
          code: 'my-error',
          message: 'Administrador no encontrado',
        }
        throw error
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createAdministrator({ adminData }) {
    const { secondaryApp, secondaryAuth } = initializeSecondaryApp()

    try {
      // Crear el usuario en Firebase Authentication usando el segundo Auth instance
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        adminData.email,
        adminData.dni
      )
      const user = userCredential.user

      // Agregar el UID del usuario creado en Firebase Authentication a adminData
      adminData.id = user.uid

      // Crear el documento en Firestore con el UID del usuario como ID del documento
      await setDoc(doc(db, this.collectionName, user.uid), adminData)

      // Cerrar sesión en el segundo Auth instance
      await secondaryAuth.signOut()

      // Borrar el segundo Auth instance
      deleteApp(secondaryApp)

      return { adminData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateAdministrator({ id, adminData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, adminData)
      return { id, ...adminData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new AdminService()
