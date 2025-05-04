import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";

function LikeCount({ props }) {
  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const user = useSelector(state => state.user)
  const { data: blogLikeCount, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
    {
      method: "get",
      credentials: "include",
    });

  useEffect(()=> {
    if(blogLikeCount) {
      setLikeCount(blogLikeCount.likeCount)
      setHasLiked(blogLikeCount.isUserLiked)
    }
  }, [blogLikeCount])

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn){
        return showToast('error', 'Please login into your account')
      }

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`
      ,{
        method: 'post',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ user: user.user._id, blogid: props.blogid})
      })

      if (!response.ok){
        showToast('error', response.statusText)
      }

      const responseData = await response.json()
      setLikeCount(responseData.likeCount)
      setHasLiked(!hasLiked)

    } catch (error) {
      showToast('error', response.message)
    }
  }

  return (
    <div>
       <button className="flex justify-between items-center gap-1" onClick={handleLike}>
              {!hasLiked? 
              <CiHeart />
              : 
              <FaHeart fill='red'/>
            }
              {likeCount}
          </button>
    </div>
  )
}

export default LikeCount
