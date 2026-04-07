import React, { createContext, useState, useEffect, useCallback } from 'react';
import { defaultProducts } from '../data/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize products from localStorage on mount
  useEffect(() => {
    initializeProducts();
  }, []);

  const initializeProducts = useCallback(() => {
    setIsLoading(true);
    
    // Check if products exist in localStorage
    const saved = localStorage.getItem('urunler');
    
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing products from localStorage:', error);
        // Fallback to default products
        setProducts(defaultProducts);
        localStorage.setItem('urunler', JSON.stringify(defaultProducts));
      }
    } else {
      // First time - initialize with default products
      setProducts(defaultProducts);
      localStorage.setItem('urunler', JSON.stringify(defaultProducts));
    }
    
    setIsLoading(false);
  }, []);

  // Sync products from localStorage (for cross-tab communication)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'urunler' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing products from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add product
  const addProduct = useCallback((productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      rating: 5,
      createdAt: new Date().toISOString()
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('urunler', JSON.stringify(updatedProducts));
    return newProduct;
  }, [products]);

  // Update product
  const updateProduct = useCallback((id, productData) => {
    const updatedProducts = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...productData,
          id: p.id, // Preserve original ID
          createdAt: p.createdAt // Preserve creation date
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    localStorage.setItem('urunler', JSON.stringify(updatedProducts));
  }, [products]);

  // Delete product
  const deleteProduct = useCallback((id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('urunler', JSON.stringify(updatedProducts));
  }, [products]);

  // Get product by ID
  const getProductById = useCallback((id) => {
    return products.find(p => p.id === parseInt(id));
  }, [products]);

  // Search products
  const searchProducts = useCallback((query) => {
    if (!query.trim()) return products;
    
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.shortDesc.toLowerCase().includes(lowerQuery)
    );
  }, [products]);

  // Batch update products (for admin import/reset)
  const updateAllProducts = useCallback((newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('urunler', JSON.stringify(newProducts));
  }, []);

  const value = {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts,
    updateAllProducts,
    initializeProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
