'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/app/lib/actions/getData'
type Props = {}

const SignIn = (props: Props) => {
  const {data}=useQuery({
    queryKey:['users'],
    queryFn:getUsers
  })
  console.log(data)
  return (
    <div>SignIn</div>
  )
}

export default SignIn