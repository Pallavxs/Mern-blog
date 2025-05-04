import BlockCard from '@/components/BlockCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

function userBlog() {
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-user-blogs`, {
        method: 'get',
        credentials: 'include'
    });

    if (loading) return <Loading />;
    if (error) return <div>Error loading blogs.</div>;

    return (
        <>
            {blogData && blogData.blog.length > 0 ? (
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                    {blogData.blog.map((blog) => (
                        <BlockCard key={blog._id} props={blog} />
                    ))}
                </div>
            ) : (
                <div>No blogs found.</div>
            )}
        </>
    );
}

export default userBlog