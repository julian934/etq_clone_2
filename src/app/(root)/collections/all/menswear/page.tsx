import React from 'react'
import { useQuery } from '@tanstack/react-query'
type Props = {}

const Menswear = (props: Props) => {
  const {data}=useQuery({
    queryKey:['menswear'],
    queryFn:()=>{}
  })
  return (
    <div>Menswear</div>
  )
}

export default Menswear