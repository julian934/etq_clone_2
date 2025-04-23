'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'


type Props = {}

const Dresswear = (props: Props) => {
  const {data}=useQuery({
    queryKey:['dresswear'],
    queryFn:()=>{}
  })
  return (
    <div>
        Dresswear
        </div>
  )
}

export default Dresswear