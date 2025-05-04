import React from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouterName'
import { useState } from 'react'

const SearchBox = ()  => {
  const navigate = useNavigate()
  const [query, setQuery] = useState()
  const getInput = (e) => {
    setQuery(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(RouteSearch(query))
  } 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input name='q' onInput={getInput} placeholder="Search here...." className="h-9 rounded-full bg-gray-50"></Input>
      </form>
    </div>
  )
}

export default SearchBox