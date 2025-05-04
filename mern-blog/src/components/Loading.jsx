import React from 'react'
import loadingIcon from '@/assets/images/loading.svg'
function Loading() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center'>
      <img src={loadingIcon} width={100}/>
    </div>
  )
}

export default Loading
