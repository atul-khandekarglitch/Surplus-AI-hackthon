import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  SAMPLE_USERS, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS,
  LOCATIONS_LIST 
} from '../data/initialData';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  // Products state (persisted in session storage for realistic refresh behavior)
  const [products, setProducts] = useState(() => {
    const saved = sessionStorage.getItem('connector_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Current authenticated user (simulated)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('connector_user');
    // Default logged in as demo consumer for immediate friendly UX, or null
    return saved ? JSON.parse(saved) : SAMPLE_USERS[0]; // Rajesh Patil (seller) by default for rich dashboard testing, or can switch anytime
  });

  // Shopping Cart state
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem('connector_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = sessionStorage.getItem('connector_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = sessionStorage.getItem('connector_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // User selected location filter
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS_LIST[0].name);

  // Sync to session storage
  useEffect(() => {
    sessionStorage.setItem('connector_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    sessionStorage.setItem('connector_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    sessionStorage.setItem('connector_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem('connector_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    sessionStorage.setItem('connector_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Auth actions
  const login = (role) => {
    const matchedUser = SAMPLE_USERS.find(u => u.role === role) || SAMPLE_USERS[0];
    setCurrentUser(matchedUser);
    addNotification({
      title: `Logged in as ${matchedUser.name}`,
      message: `Switched active demo persona to ${matchedUser.role.toUpperCase()}.`,
      type: 'user'
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(newUser);
    addNotification({
      title: 'Registration Successful',
      message: `Welcome to Connector, ${newUser.name}! Your account is active.`,
      type: 'user'
    });
    return newUser;
  };

  // Product management actions
  const addProduct = (newProductData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      sellerId: currentUser?.id || 'biz-1',
      sellerName: currentUser?.businessName || currentUser?.name || 'Local Seller',
      sellerType: currentUser?.businessType || 'Small Business',
      status: 'Active',
      rating: 5.0,
      wastePreventedKg: Number(newProductData.quantity) || 5,
      coordinates: [18.6214 + (Math.random() - 0.5) * 0.02, 73.7548 + (Math.random() - 0.5) * 0.02],
      distanceKm: +(0.5 + Math.random() * 2.5).toFixed(1),
      ...newProductData
    };
    setProducts(prev => [newProduct, ...prev]);
    
    // Add real-time notification
    addNotification({
      title: 'Listing Published',
      message: `"${newProduct.name}" has been published to the Connector surplus marketplace!`,
      type: 'product',
      link: '/marketplace'
    });

    return newProduct;
  };

  const updateProductStatus = (productId, newStatus) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));

    addNotification({
      title: 'Listing Status Updated',
      message: `Product status changed to "${newStatus}".`,
      type: 'product'
    });
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, ...updatedData };
      }
      return p;
    }));

    addNotification({
      title: 'Listing Updated',
      message: `Product details for "${updatedData.name || 'product'}" updated successfully.`,
      type: 'product'
    });
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification({
      title: 'Listing Removed',
      message: `The product listing was successfully removed.`,
      type: 'product'
    });
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const updatedQty = Math.min(existing.quantity + quantity, product.quantity);
        return prev.map(item => item.id === product.id ? { ...item, quantity: updatedQty } : item);
      }
      return [...prev, { ...product, quantity: Math.min(quantity, product.quantity) }];
    });

    addNotification({
      title: 'Item Added to Cart',
      message: `${quantity}x ${product.name} added to your basket.`,
      type: 'order'
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    const maxQty = product ? product.quantity : 99;
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.min(newQuantity, maxQty) };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order actions
  const placeOrder = (fulfillmentDetails) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const originalSubtotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSavings = originalSubtotal - subtotal;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      customerId: currentUser?.id || 'guest',
      customerName: currentUser?.name || fulfillmentDetails.customerName || 'Demo Shopper',
      customerPhone: currentUser?.mobile || fulfillmentDetails.customerPhone || '+91 98000 00000',
      sellerId: cart[0].sellerId || 'biz-1',
      sellerName: cart[0].sellerName || 'Connector Verified Seller',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.discountedPrice,
        originalPrice: item.originalPrice,
        image: item.image
      })),
      totalAmount: subtotal,
      savings: totalSavings,
      fulfillmentType: fulfillmentDetails.fulfillmentType || 'Pickup',
      pickupTime: fulfillmentDetails.pickupTime || 'Within 2 hours',
      deliveryAddress: fulfillmentDetails.deliveryAddress || '',
      status: 'Pending',
      timeline: [
        { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          status: 'Pending', 
          note: 'Demo order initiated and recorded in session state.' 
        }
      ]
    };

    // Deduct quantities from products
    setProducts(prev => prev.map(p => {
      const orderedItem = cart.find(c => c.id === p.id);
      if (orderedItem) {
        const remaining = p.quantity - orderedItem.quantity;
        return {
          ...p,
          quantity: remaining > 0 ? remaining : 0,
          status: remaining <= 0 ? 'Sold' : p.status
        };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    addNotification({
      title: 'Order Placed Successfully! (Demo)',
      message: `Order #${newOrder.id} for ₹${newOrder.totalAmount} has been registered.`,
      type: 'order',
      link: '/orders'
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...order,
          status: newStatus,
          timeline: [
            ...order.timeline,
            { time: now, status: newStatus, note: note || `Order updated to ${newStatus}` }
          ]
        };
      }
      return order;
    }));

    addNotification({
      title: 'Order Status Changed',
      message: `Order #${orderId} is now ${newStatus}.`,
      type: 'order',
      link: '/orders'
    });
  };

  // Notification helper
  const addNotification = ({ title, message, type = 'general', link = null }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      link
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Impact metrics calculated from actual state
  const platformStats = {
    totalListings: products.length,
    activeListings: products.filter(p => p.status === 'Active').length,
    ordersCompleted: orders.filter(o => o.status === 'Completed' || o.status === 'Ready for Pickup').length,
    totalWastePreventedKg: products.reduce((acc, p) => acc + (p.wastePreventedKg || 0), 0) + (orders.length * 4.5),
    totalRevenueRecovered: orders.reduce((acc, o) => acc + o.totalAmount, 0) + 1250,
    averageDiscount: Math.round(products.reduce((acc, p) => acc + p.discountPercentage, 0) / (products.length || 1))
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      currentUser,
      cart,
      orders,
      notifications,
      selectedLocation,
      setSelectedLocation,
      platformStats,
      login,
      logout,
      registerUser,
      addProduct,
      updateProduct,
      updateProductStatus,
      deleteProduct,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addNotification,
      markAllNotificationsAsRead,
      markNotificationAsRead
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
