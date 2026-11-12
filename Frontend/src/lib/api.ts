const API_URL = 'http://localhost:8080/api/v1'

export const api = {
  getProducts: async (filters?: Record<string, string | string[] | number | undefined>) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(val => params.append(key, val))
        } else if (value !== undefined && value !== '') {
          params.append(key, String(value))
        }
      })
    }
    const res = await fetch(`${API_URL}/products?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },
  getProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`)
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
  },
  getFilters: async () => {
    const res = await fetch(`${API_URL}/filters`)
    if (!res.ok) throw new Error('Failed to fetch filters')
    return res.json()
  }
}