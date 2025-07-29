import React from 'react'
import { useState } from 'react'
import './Join.css'
import { Link } from 'react-router'
const Join = () => {
const [name, setname] = useState('')

const [room, setroom] = useState('')


  return (
   <>
  <div className='joinOuterContainer'>
 <div className='joinInnerConatiner'>
  <h1 className='heading'>Join</h1>
<div><input placeholder='Name' className='joinInput' type='text' onChange={(e)=> setname(e.target.value)}></input></div>
<div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={(e)=> setroom(e.target.value)}></input></div>
<Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
<button className='button mt-20' type='submit'>
SignIN
</button>
</Link>
 </div>

  </div>


   </>
  )
}

export default Join