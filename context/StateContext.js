import { createContext, useContext, useState, useEffect } from 'react';
import { readClient } from '@/lib/client';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const cart = Cookies.get('cart');
    if (cart) {
      const parsedCartItems = JSON.parse(cart);
      setCartItems(parsedCartItems);
  
      // Calculate total quantities and price based on cart items
      const totalQuantities = parsedCartItems.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = parsedCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  
      setTotalQuantities(totalQuantities);
      setTotalPrice(totalPrice);
    }
  }, []);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cartItems), { expires: 7, sameSite: 'none', secure: true });
  }, [cartItems]);


  const onAdd = async (product, quantity, showToast) => {
    try {
      const slug = product.slug.current;
      const query = `*[_type == "product" && slug.current == '${slug}']`;
      const productData = await readClient.fetch(query);

      if (productData[0].price !== product.price) {
        throw new Error('Price manipulation detected');
      }
  
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
    } catch (error) {
      console.error(error);
      toast.error('Error adding item to cart');
    }
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
    qty,
    setQty,
    incQty,
    decQty,
    onAdd,
    onRemove,
    showCart,
    setShowCart,
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    toggleCartItemQuantity,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
