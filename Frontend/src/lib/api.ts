const API_URL = 'https://eneba-marketplace-api-mi7b.onrender.com/api/v1'

export const api = {
  getProducts: async (filters?: Record<string, string | string[] | number | undefined>) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach(val => params.append(key, val))
        else if (value !== undefined && value !== '') params.append(key, String(value))
      })
    }
    const res = await fetch(`${API_URL}/products?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },
  // ... (Keep the rest of the api.ts methods exactly as they are)
  getProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`)
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
  },
  getFilters: async () => {
    const res = await fetch(`${API_URL}/filters`)
    if (!res.ok) throw new Error('Failed to fetch filters')
    return res.json()
  },
  getHomeData: async () => {
    const res = await fetch(`${API_URL}/home`)
    if (!res.ok) throw new Error('Failed to fetch home data')
    return res.json()
  },
  search: async (query: string) => {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error('Search failed')
    return res.json()
  },
  register: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Registration failed')
    return json
  },
  login: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Login failed')
    return json
  },
  getMe: async (token: string) => {
    const res = await fetch(`${API_URL}/user/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) throw new Error('Failed to fetch profile')
    return res.json()
  },
  toggleWishlist: async (productId: string, token: string) => {
    const res = await fetch(`${API_URL}/user/wishlist`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ productId }) })
    if (!res.ok) throw new Error('Failed to toggle wishlist')
    return res.json()
  },
  toggleCart: async (productId: string, token: string) => {
    const res = await fetch(`${API_URL}/user/cart`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ productId }) })
    if (!res.ok) throw new Error('Failed to toggle cart')
    return res.json()
  },
  removeFromCart: async (productId: string, token: string) => {
    const res = await fetch(`${API_URL}/user/cart/remove`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ productId }) })
    if (!res.ok) throw new Error('Failed to remove item')
    return res.json()
  },
  createOrder: async (data: { items: any[], total: number, paymentMethod: string }, token: string) => {
    const res = await fetch(`${API_URL}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) })
    if (!res.ok) throw new Error('Failed to create order')
    return res.json()
  },
  getOrders: async (token: string) => {
    const res = await fetch(`${API_URL}/orders`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
  }
}