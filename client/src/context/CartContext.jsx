import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

const CART_KEY = "cravings_cart";
const emptyCart = { restaurantId: null, restaurantName: "", items: [] };

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || emptyCart;
    } catch {
      return emptyCart;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const getItemQuantity = (itemId) => {
    const found = cart.items.find((i) => i._id === itemId);
    return found ? found.quantity : 0;
  };

  // returns "added" or "different_restaurant"
  const addItem = (item, restaurantId, restaurantName) => {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      return "different_restaurant";
    }

    setCart((prev) => {
      const exists = prev.items.find((i) => i._id === item._id);
      const updatedItems = exists
        ? prev.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [
            ...prev.items,
            {
              _id: item._id,
              itemName: item.itemName,
              price: item.price,
              image: item.image,
              category: item.category,
              foodType: item.foodType,
              quantity: 1,
            },
          ];

      return { restaurantId, restaurantName, items: updatedItems };
    });

    return "added";
  };

  const increaseItem = (itemId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i._id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    }));
  };

  const decreaseItem = (itemId) => {
    setCart((prev) => {
      const updatedItems = prev.items
        .map((i) => (i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);

      return {
        ...prev,
        items: updatedItems,
        restaurantId: updatedItems.length ? prev.restaurantId : null,
        restaurantName: updatedItems.length ? prev.restaurantName : "",
      };
    });
  };

  const removeItem = (itemId) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter((i) => i._id !== itemId);

      return {
        ...prev,
        items: updatedItems,
        restaurantId: updatedItems.length ? prev.restaurantId : null,
        restaurantName: updatedItems.length ? prev.restaurantName : "",
      };
    });
  };

  const clearCart = () => setCart(emptyCart);

  // clears cart and starts fresh with new restaurant's item
  const replaceCart = (item, restaurantId, restaurantName) => {
    setCart({
      restaurantId,
      restaurantName,
      items: [
        {
          _id: item._id,
          itemName: item.itemName,
          price: item.price,
          image: item.image,
          category: item.category,
          foodType: item.foodType,
          quantity: 1,
        },
      ],
    });
  };

  const value = {
    cart,
    totalItems,
    totalPrice,
    getItemQuantity,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
    replaceCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);