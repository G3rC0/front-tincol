import { useAsync } from './useAsync'
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
} from '../services/productService'

export const useProducts         = ()   => useAsync(getProducts, [])
export const useFeaturedProducts = ()   => useAsync(getFeaturedProducts, [])
export const useProduct          = (id) => useAsync(() => getProductById(id), [id])