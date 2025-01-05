"use server"
import axios from "axios"

export const connectToStripe=()=>{

}

export const connectToContentful=()=>{

}

export const connectToCloudinary=()=>{

}

export const connectToMongodb=async()=>{
  const getData= await fetch('/api/mongodb').then((vals)=>{
    return vals.json()
  })
  return getData
}

export const getPrice=async(price:string)=>{
  const getData= await fetch(`/api/getprice?price=${price}`).then((vals)=>{
    return vals.json()
  })
  return getData
}

