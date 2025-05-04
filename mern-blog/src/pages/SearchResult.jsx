import BlockCard from '@/components/BlockCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

function SearchResult() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`, {
    method: "get",
    credentials: "include",
  });

  if(loading) return <Loading />
  
  return (
    <>
    <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-3'>
    <h4>Search Result for: {q}</h4>
    </div>
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {data && data?.SearchData?.length > 0 ?
      data.SearchData.map(blog => <BlockCard  key={blog._id} props={blog}/>) 
      :
      <div>
        Data not found
      </div>
    }
    </div>
    </>
  )
}

export default SearchResult
