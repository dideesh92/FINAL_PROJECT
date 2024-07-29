import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Bill from './pages/Bill'
import Inventory from './pages/Inventory'
import SavedBills from './pages/SavedBills'


function App() {
  const router = createBrowserRouter(createRoutesFromElements(



    <>
       <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>

        <Route path='/' element={<MainLayout/>}>
        <Route path='/home' element={<Home/>}/> 
         <Route path='/bill' element={<Bill/>}/> 
        <Route path="/inventory" element={<Inventory />} />
        <Route path='/savedbills' element={<SavedBills/>}/>
        </Route>
   </>
  )
)
return (
    <>
      <RouterProvider router={router} />

    </>
)
}


export default App
