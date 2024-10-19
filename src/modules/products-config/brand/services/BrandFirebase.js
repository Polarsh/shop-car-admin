import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../../../../firebase/config'
import FirebaseErrorHandler from '../../../../services/FirebaseErrorHandler'
import { removeAccentsAndSpaces } from '../../../../utils/functions'

class BrandService {
  constructor() {
    this.collectionName = 'webs/car-shop/config-cars/brands/brands'
  }

  async getAllBrands() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const brands = []
      querySnapshot.forEach(doc => {
        brands.push({ id: doc.id, ...doc.data() })
      })
      return brands
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getBrandById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        const error = {
          code: 'my-error',
          message: 'Marca no encontrada',
        }
        throw error
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createBrand({ brandData }) {
    try {
      const normalizedName = removeAccentsAndSpaces(brandData.name)
      const docRef = doc(db, this.collectionName, normalizedName)
      await setDoc(docRef, { ...brandData }) // Usa la id generada como el ID del documento
      return { id: normalizedName, ...brandData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateBrand({ id, brandData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await updateDoc(docRef, brandData)
      return { id, ...brandData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new BrandService()
