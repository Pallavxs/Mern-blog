import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import usericon from '@/assets/images/user.png'
import { useSelector } from 'react-redux';

function CommentList({ props }) {
    const user =  useSelector((state) => state.user)
    const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`, {
          method: "get",
          credentials: "include",
    });

    const comments = data?.comments || [];
    if (loading) return <div>Loading...</div>

  return (
    <div>
        <h4 className='text-2xl font-bold'> 
            {
                props.newComment ?
                <span className='me-2'>{data && comments.length + 1}</span>
                : 
                <span className='me-2'>{data && comments.length}</span>
            } Comments </h4>

        <div className='mt-5'>
            {props.newComment // this will rerender not get fetch 
            && 
            <div className="flex gap-3 mb-5">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                            <AvatarImage src={user?.user?.avatar || usericon} />
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="flex items-center gap-2">{user?.user?.name}</p>
                            <p className="text-xs text-gray-500">{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className="pt-2 text-sm">
                                {props.newComment?.comment}
                            </div>
                        </div>
                    </div>
            }
            {data && comments.length > 0 // It will get fetch first  
            && comments.map(comment => {
                return(
                    <div key={comment._id} className="flex gap-3 mb-5">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                            <AvatarImage src={comment?.user?.avatar || usericon} />
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-base">{comment?.user?.name}</p>
                            </div>
                            <p className="text-xs text-gray-500">{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                            <p className="pt-2 text-sm">{comment?.comment}</p>
                        </div>
                    </div>
                )
            }
            )}

        </div>
    </div>
  )
}

export default CommentList
