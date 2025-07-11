import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouterName'

function BlockCard({props}) {
    return (
    <Link  to={RouteBlogDetails(props.category.slug, props.slug)}>
    <Card className='pt-5'>
        <CardContent>
            <div className='flex items-center justify-between'>
                <div className='flex justify-between items-center gap-2'>
                    <Avatar className='w-8 h-8 rounded-full overflow-hidden'>
                        <AvatarImage src={props.author?.avatar || usericon }   className="w-full h-full object-cover"/>
                    </Avatar>
                    <span className='text-sm font-medium'>{props.author?.name}</span>
                </div>
                { props.author?.role === 'admin' &&
                <Badge variant='outline' className='bg-violet-500'>Admin</Badge>}
            </div>
            <div className='my-3 '>
                <img src={props.featuredImage} className='rounded w-full h-52 object-cover' />
            </div>
            <div>
                <p className='flex items-center gap-2 mb-2'>
                    <FaRegCalendarAlt/>
                    <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                </p>
                <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
            </div>
        </CardContent>
    </Card>
    </Link>
  )
}

export default BlockCard
