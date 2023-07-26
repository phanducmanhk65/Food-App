import React from 'react'
import AvatarURL from "./avt.jpg";

const Avatar = () => {
  return (
    <div>
      <img src={AvatarURL} alt='Avatar' className="rounded-circle avatar-image"
                  style={{ width: '180px' }}></img>
    </div>
  )
}

export default Avatar
