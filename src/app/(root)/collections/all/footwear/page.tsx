'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'


type Props = {}

const Footwear = (props: Props) => {
  const {data}=useQuery({
    queryKey:['footwear'],
    queryFn:()=>{}
  })
  return (
    <div>Footwear</div>
  )
}

export default Footwear