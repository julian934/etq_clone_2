"use client"
import React from "react"
import { createContext,useState,ReactNode, FC} from "react"

const initialContext={
   testData:null,
   state:null,
   dataCheck:function(backendData:any){},
   bannerImgs:function(banner1:string,banner2:string){},
   pageState:null,
   pagination:function(data:any,signal:string){},
   addToCart:function(item:any){},
   currCart:null
}
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
    const dataCheck=(backendData:any)=>{
      setTestData(backendData)
    }
    const bannerImgs=(banner1:string,banner2:string)=>{

    }
    const addToCart=(item:any)=>{
        setCart((prev:any)=>{
            return [...prev, item]
        })

    }
    const pagination=(data:any,signal:string)=>{
        //set up logic for pagination, match indices with defaultVals
        let defaultVals=[1,2,3]
        if(signal=='next'){
          
        }
        else if(signal=='prev'){

        }
       
    }

    return(<StoreStateContext.Provider value={{state,dataCheck,testData,bannerImgs,pageState,pagination,addToCart,currCart}} >
        {children}
    </StoreStateContext.Provider>)
}

export default StoreStateContextProvider