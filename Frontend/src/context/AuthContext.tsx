import { createContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';

export interface AuthContextType {
  user: any | null;
  cartItems: any[];
  toastItem: any | null;
  setToastItem: (item: any) => void;
  login: (userData: any, token: string) => void;
  logout: () => void;
  toggleWishlist: (id: string) => void;
  toggleCart: (product: any, showToast?: boolean) => void;
  removeCartItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCashback: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [toastItem, setToastItem] = useState<any>(null);

  // 1. On initial load, check localStorage and fetch the full profile (cart, etc.)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      
      // Fetch the unified profile from the new backend endpoint
      api.getMe(token).then(profile => {
        // Backend returns an array of Product objects for the cart
        // We map over them and add a default quantity of 1 for the frontend UI
        const hydratedCart = profile.cart.map((item: any) => ({ ...item, quantity: 1 }));
        setCartItems(hydratedCart);
      }).catch(err => {
        console.error("Failed to hydrate profile:", err);
      });
    }
  }, []);

  // 2. Login handles saving token and fetching the profile
  const login = (userData: any, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    api.getMe(token).then(profile => {
      const hydratedCart = profile.cart.map((item: any) => ({ ...item, quantity: 1 }));
      setCartItems(hydratedCart);
    }).catch(err => {
      console.error("Failed to fetch profile after login:", err);
    });
  };

  // 3. Logout clears everything
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCartItems([]);
    setToastItem(null);
  };

  // 4. Wishlist Logic
  const toggleWishlist = (id: string) => {
    if (!user) return alert("Please log in first");
    const token = localStorage.getItem('token') || '';
    
    api.toggleWishlist(id, token).then(res => {
      const updated = { ...user, wishlist: res.wishlist };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }).catch(() => alert("Backend error toggling wishlist"));
  };

  // 5. Cart Logic
  const toggleCart = (product: any, showToast: boolean = true) => {
    if (!user) return alert("Please log in first");
    
    const existingItem = cartItems.find(item => item.id === product.id);
    const token = localStorage.getItem('token') || '';

    if (existingItem) {
      // If it's already in the cart, just increase the quantity
      updateQuantity(product.id, 1);
      if (showToast) setToastItem(product);
    } else {
      // If it's a new item, call the backend
      api.toggleCart(product.id, token).then(res => {
        // Update the user's cart IDs in local storage
        const updatedUser = { ...user, cart: res.cart };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Add to the local cart array with quantity 1
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
        
        // Show the success modal
        if (showToast) setToastItem(product);
      }).catch(() => alert("Backend error adding to cart"));
    }
  };

  const removeCartItem = (id: string) => {
    const token = localStorage.getItem('token') || '';
    api.removeFromCart(id, token).then(res => {
      const updatedUser = { ...user, cart: res.cart };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setCartItems(cartItems.filter(item => item.id !== id));
    }).catch(err => console.error("Failed to remove item:", err));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        // Ensure quantity never goes below 1
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      const updatedUser = { ...user, cart: [] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // 6. Calculations based on quantity
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.priceValue || parseFloat(item.price.replace('€', '')) || 0;
    return acc + (itemPrice * item.quantity);
  }, 0);
  
  const cartCashback = cartSubtotal * 0.14; // 14% Cashback

  return (
    <AuthContext.Provider value={{ 
      user, cartItems, toastItem, setToastItem, login, logout, 
      toggleWishlist, toggleCart, removeCartItem, updateQuantity, clearCart,
      cartSubtotal, cartCashback
    }}>
      {children}
    </AuthContext.Provider>
  );
}