// hooks/useCartones.js
import useSWR from 'swr'
import { sendRequest } from '../helpers/bingoServices'

const fetcher = (endpoint) =>
  sendRequest({ endpoint, method: 'get' })

export const useCartones = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/cartones', fetcher)

  return {
    cartones: data || [],
    cartonesLoading: isLoading,
    cartonesError: error,
    mutateCartones: mutate
  }
}