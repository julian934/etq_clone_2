'use client'
import React,{useState,useRef} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/lib/actions/getData'
import Footer from '@/app/components/ui/footer/footer'
type Props = {}

const Search = (props: Props) => {
  {/* Set the data types.*/}
  const [searchTerm,setSearchTerm]=useState<any>('')
  const [searchState,setSearchState]=useState<any>([])
  const searchRef=useRef<any>()
    const {data}=useQuery({
      queryKey:['searchTerms'],
      queryFn:getProducts,
      
    })
    const handleSearchTerms=()=>{
            setSearchTerm(searchRef.current.value)
            setSearchState(data?.data?.filter((it:any)=>it.name.includes(searchTerm)))
    }
    console.log(data?.data)
    console.log(searchTerm)
    console.log(searchState)
  {/* Search bar works partially but is case sensitive. Make it case insensitive*/}
  return (
    <div>Search
      <div>
        <input className='' type='text' onChange={handleSearchTerms}  ref={searchRef} />
      </div>
      <div>
        {!searchTerm && data?.data?.map((vals:any)=>(<div key={vals.id} className='' >
             <h1 className='' >{vals.name}</h1>
        </div>))}
        {searchTerm && searchState?.map((vals:any)=>(<div key={vals.id} className='' >
          <h1 className=''  key={vals.id} >{vals.name}</h1>
        </div>))}
      </div>
      <Footer/>
    </div>
  )
}

export default Search