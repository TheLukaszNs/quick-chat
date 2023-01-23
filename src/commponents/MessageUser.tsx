import { User } from '@prisma/client'
import React from 'react'

interface MessageProps{
    message: string,
    user:any,
    isDm?: boolean
}

const MessageUser = ({message,user,isDm}: MessageProps  ) => {
  return (

    <div className='flex'>
      <div><img src={`data:image/jpeg;base64,${user.image}`} alt=""></img></div>
      <div className='flex-col'>
        {isDm && <div>{user.name}</div>}
        <div>{message}</div>
      </div>

    </div>
    
  )
}

export default MessageUser