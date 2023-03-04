import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity, showToast) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    const updatedCartItems = checkProductInCart
      ? cartItems.map((cartProduct) =>
          cartProduct._id === product._id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct
        )
      : [...cartItems, { ...product, quantity }];

    if(showToast) toast.success(`${quantity} ${product.name} added to the cart.`);

    setQty(1);
    setCartItems(updatedCartItems); 
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  };

  const onRemove = (product, showToast) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    if(showToast) toast.error(`${foundProduct.name} removed from the cart.`);

    setCartItems(newCartItems);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);

    let updatedProduct;
    if (value === "inc") {
      updatedProduct = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
    } else if (value === "dec" && foundProduct.quantity > 1) {
      updatedProduct = {
        ...foundProduct,
        quantity: foundProduct.quantity - 1,
      };
    } else {
      return;
    }

    const updatedCartItems = [
      ...cartItems.slice(0, index),
      updatedProduct,
      ...cartItems.slice(index + 1),
    ];

    setCartItems(updatedCartItems);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + (value === "inc" ? foundProduct.price : -foundProduct.price)
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities + (value === "inc" ? 1 : -1)
    );
  };


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const value = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    setQty,
    incQty,
    decQty,
    onAdd,
    onRemove,
    toggleCartItemQuantity,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
