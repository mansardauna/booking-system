import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className='md:w-6/12 m-auto p-2'>
      <div className="w-fit m-auto md:text-3x text-xl font-light">
        Welcom to Admin Dashboard
      </div>
      <div className="w-10/12 md:w-full m-auto text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa non aliquid laborum quo rerum fuga animi accusamus repellendus excepturi dolorem est eveniet doloribus consequuntur, fugit voluptatibus architecto, minus amet dolorum.
      </div>
      <div className="flex justify-between mt-5">
      <div className="">
        <Link to="/register" className='p-2 bg-slate-100'>
        Add new Event hall
        </Link>
      </div>
      <div className="">
        <Link to="/management" className='p-2 bg-slate-100'>
          Manage your Event hall
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin