import React from 'react'

function Navbar({user}) {
  return (
    <>
    <nav className='main-navbar'>
      <h1>Navbar</h1>
      <p>{user}</p>
      <h1 className='text-title'></h1>
      <div className='User-image'></div>
    </nav>
  </>
  )
}

export default Navbar
