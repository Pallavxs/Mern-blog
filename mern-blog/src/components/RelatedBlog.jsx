import { getEnv } from '@/helpers/getEnv';
import { RouteBlogDetails } from '@/helpers/RouterName';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading';

function RelatedBlog({ props }) {
    const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`, {
        method: "get",
        credentials: "include",
    });
    
    if(loading) return <Loading />
    
  return (
    <div>
      <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>
      <div>
        {data && data.relatedBlog.length > 0 
        ?
        data.relatedBlog.map(blog => {
          return (
            <Link key={blog._id} to={RouteBlogDetails(props.category,blog.slug)} >
              <div className='flex items-center gap-2 mb-3'>
                <img className='w-[120px] h-[90] object-cover rounded-md' src={blog.featuredImage}/>
                <h4 className='line-clamp-2 text-lg font-semibold'>{blog.title}</h4>
              </div>
            </Link>
          )
        })
          :
        <div>
          No relatedBlog 
        </div>
      }
        
      </div>
    </div>
  )
}

export default RelatedBlog
