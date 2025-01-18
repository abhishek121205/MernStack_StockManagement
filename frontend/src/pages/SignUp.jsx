import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SummaryApi } from '../common/commonApi'
import { toast } from 'react-toastify'

const SignUp = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiData = await fetch(SummaryApi.registerUser.url, {
      method: SummaryApi.registerUser.method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(user)
    })

    const response = await apiData.json()
    if (response.success) {
      toast.success(response.message)
      navigate("/")
      setUser({})
    }
    if (response.error) {
      toast.error(response.message);
    }

  }

  return (
    <section className='signUp flex items-center w-full h-full min-h-[100vh] bg-gray-900'>
      <div className="container mx-auto p-4">
        <div className="bg-gray-800 rounded-md p-4 w-full max-w-md mx-auto">
          <h1 className='text-gray-100 text-3xl pb-2'>Create account</h1>
          <form action="" className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>Username:</label>
              <input type="text"
                className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
                name='userName'
                value={user.userName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>Email:</label>
              <input type="text"
                className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
                name='email'
                value={user.email || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>Descryption:</label>
              <textarea className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
                name='descryption'
                rows={3}
                value={user.descryption || ""}
                onChange={handleChange}>
              </textarea>
            </div>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>Password:</label>
              <input type="text"
                className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
                name='password'
                value={user.password || ""}
                onChange={handleChange}
              />
              <span className='text-gray-300 text-sm'>Already have an account? <Link className='text-blue-500' to={"/"}>Log in</Link></span>
            </div>
            <div>
              <input type="submit" value={"Create"} className='text-gray-100 text-md bg-blue-500 min-w-[100px] max-w-[100px] py-1 rounded-md' />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
