import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='w-full bg-slate-700 h-screen'>
      App
      <Outlet />
    </div>
  )
}

export default App