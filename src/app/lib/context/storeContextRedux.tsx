"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  ReactNode,
} from "react";

// Define types
interface Product {
  _id?: string;
  name?: string;
  images?: string[];
  size?: string;
  color?: string;
  price: number;
  quantity: number;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  email?: string;
  userCart: Product[];
  wishList: Product[];
  address?: string;
  [key: string]: any;
}

interface StoreContextType {
  testData: any;
  state: any;
  dataCheck: (backendData: any) => void;
  bannerImgs: (banner1: string, banner2: string) => void;
  pageState: any;
  pagination: (data: any, signal: string) => void;
  addToCart: (product: Product, price: number) => void;
  currCart: any;
  userData: (user: User) => void;
  userState: User | null;
  cartData: () => void;
  cartItems: User | null;
  cartState:boolean | null,
  viewCart:()=>void;
}

const initialContext: StoreContextType = {
  testData: null,
  state: null,
  dataCheck: () => {},
  bannerImgs: () => {},
  pageState: null,
  pagination: () => {},
  addToCart: () => {},
  currCart: null,
  userData: () => {},
  userState: null,
  cartData: () => {},
  cartItems: null,
  cartState:false,
  viewCart:()=>{}
};

export const StoreStateContext = createContext<StoreContextType>(initialContext);

interface ProviderProps {
  children: ReactNode;
}

export const StoreStateContextProvider: FC<ProviderProps> = ({ children }) => {
  const [testData, setTestData] = useState<any>([]);
  const [bannerState, setBannerState] = useState<any>([]);
  const [pageState, setPageState] = useState<any>([]);
  const [currCart, setCart] = useState<any>([]);
  const [userState, setUserState] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<User | null>(null);
  const [cartState,setCartState]=useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userState");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const cartData = () => {
    const currentUser = localStorage.getItem("userState");
    if (currentUser) {
      const parsedData = JSON.parse(currentUser);
      setCartItems(parsedData);
    }
  };

  const userData = (user: User) => {
    setUserState(user);
    localStorage.setItem("userState", JSON.stringify(user));
  };

  const dataCheck = (backendData: any) => {
    setTestData(backendData);
  };

  const bannerImgs = (banner1: string, banner2: string) => {
    setBannerState([banner1, banner2]);
  };

  const addToCart = (product: Product, price: number) => {
    if (!userState) return;

    const newItem: Product = {
      ...product,
      price,
      quantity: 1,
    };

    const cart = userState.userCart || [];
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(newItem);
    }

    const updatedUser: User = {
      ...userState,
      userCart: cart,
    };

    setUserState(updatedUser);
    localStorage.setItem("userState", JSON.stringify(updatedUser));
  };

  const pagination = (data: any, signal: string) => {
    // placeholder for pagination logic
    const defaultVals = [1, 2, 3];
  };
  const viewCart=()=>{
    setCartState(!cartState)
  }

  return (
    <StoreStateContext.Provider
      value={{
        testData,
        state: null,
        dataCheck,
        bannerImgs,
        pageState,
        pagination,
        addToCart,
        currCart,
        userData,
        userState,
        cartData,
        cartItems,
        viewCart,
        cartState
      }}
    >
      {children}
    </StoreStateContext.Provider>
  );
};

export default StoreStateContextProvider;
