import React from 'react'
import { Outlet } from 'react-router-dom'

const UserHomeLayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default UserHomeLayout