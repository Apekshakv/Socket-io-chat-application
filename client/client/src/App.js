import React, { Children } from 'react'
import { Routes ,Route } from 'react-router'
import Join from './Join'
import Chat from './Chat'
const App = () => {
  return (
  
    <Routes>
    <Route path='/' element={<Join />}></Route>
     <Route path='/chat' element={<Chat/>}></Route>
    </Routes>

  )
}

export default App