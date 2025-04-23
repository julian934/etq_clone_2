"use client"
import React,{useEffect} from "react"
import { createContext,useState,ReactNode, FC} from "react"

interface User {
    _id: string;
    username: string;
    password: string;
    email?: string;
    userCart: any[];
    wishList: any[];
    address?: string;
    [key: string]: any; // to allow flexibility for future properties
  }

  interface StoreContextType {
    testData: any;
    state: any;
    dataCheck: (backendData: any) => void;
    bannerImgs: (banner1: string, banner2: string) => void;
    pageState: any;
    pagination: (data: any, signal: string) => void;
    addToCart: (product: any, price: any) => void;
    currCart: any;
    userData: (user: User) => void;
    userState: User | null;
    cartData: () => void;
    cartItems: User | null;
  }
/*
const initialContext={
   testData:null,
   state:null,
   dataCheck:function(backendData:any){},
   bannerImgs:function(banner1:string,banner2:string){},
   pageState:null,
   pagination:function(data:any,signal:string){},
   addToCart:function(product:any,price:any){},
   currCart:null,
   userData:function(user:any){},
   userState:null,
   cartData:function(){},
   cartItems:null
}
   */
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
  };
type ContextType=typeof initialContext;
export const StoreStateContext=createContext<ContextType>(initialContext);

interface StoreStateContextProviderProps{
    children:ReactNode;
}

export const StoreStateContextProvider:FC<StoreStateContextProviderProps>=({children})=>{
    const [state,setState]=useState<any>(initialContext)
    const [testData,setTestData]=useState<any>([]);
    const [bannerState,setBannerState]=useState<any>([]);
    const [pageState,setPageState]=useState<any>([]);
    const [currCart,setCart]=useState<any>([]);
    const [userState,setUserState]=useState<any>();
    const [cartItems,setCartItems]=useState<any>();

   useEffect(()=>{
    const storedUser=localStorage.getItem("userState");
    if(storedUser){
        setUserState(JSON.parse(storedUser));
    }
   },[]);
     const cartData=()=>{
        const currentUser= localStorage.getItem("userState");
        console.log("Current Cart User: ", currentUser);
        if(currentUser!=undefined){
           const currData=JSON.parse(currentUser);
           console.log("Parsed Cart User: ", currData)
          //setCartItems(currData.data)
          return currData.data;
        }
        return null
     }
   
    const userData=(user:any)=>{
        if(user!=undefined){
            setUserState(user.data);
            localStorage.setItem("userState",JSON.stringify(user));
        }
       
    }
    const dataCheck=(backendData:any)=>{
      setTestData(backendData)
    }
    const bannerImgs=(banner1:string,banner2:string)=>{

    }
    const addToCart=async(product:any, price: any)=>{
        console.log("userState:", JSON.stringify(userState, null, 2));

        const newItem={
            product:product,
            price:price,
            quantity:1
        }
       
       console.log("Context item: ", product),
       console.log("Context Price: ", price)
       if(!userState) return ;
       let itemCheck=userState?.data?.userCart[price]
       let cart=userState?.data?.userCart
       let check=cart.filter((val:any)=>val.product==product)
        if(check?.includes(price) || check.length>0 ){
            console.log("Increase")
            userState?.data?.userCart[price]?.quantity+1
            check[0].quantity++
            let checkedItem=check
            let oldItem=userState?.data?.userCart[`${price}`]
            let newCart=cart.map((val:any)=>{
                if(val.price==price){
                    val.quantity++
                }
            })
            console.log("Updated Cart: ", userState)
            console.log('Updated Item: ', checkedItem)
            console.log("Item to be replaced: ", oldItem)
            console.log('Old Cart: ', cart)
            console.log(" New Cart: ", newCart)
            const updatedUser={
                ...userState,
                data:{
                    ...userState.data,
                    userCart:cart
                }
               }
               
               setUserState(updatedUser);
                localStorage.setItem("userState",JSON.stringify(updatedUser));
        }else{
            const updatedUser={
                ...userState,
                data:{
                    ...userState.data,
                    userCart:[...userState.data?.userCart,newItem]
                }
               }
                setUserState(updatedUser);
                localStorage.setItem("userState",JSON.stringify(updatedUser));
        }
      
    }
    
    const pagination=(data:any,signal:string)=>{
        //set up logic for pagination, match indices with defaultVals
        let defaultVals=[1,2,3]
        if(signal=='next'){
          
        }
        else if(signal=='prev'){

        }
       
    }

    return(<StoreStateContext.Provider value={{state,dataCheck,testData,bannerImgs,pageState,pagination,addToCart,currCart,userData,userState,cartData,cartItems}} >
        {children}
    </StoreStateContext.Provider>)
}

export default StoreStateContextProvider