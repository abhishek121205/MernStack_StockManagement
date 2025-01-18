import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SummaryApi } from '../common/commonApi'
import { toast } from 'react-toastify'
import UserContext from '../context/userContext'
import { useSelector } from 'react-redux'

const Login = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const { fetchUsers } = useContext(UserContext)
  const { currentUser } = useSelector(state => state?.user)

  const handleChange = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiData = await fetch(SummaryApi.loginUser.url, {
      method: SummaryApi.loginUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(user)
    })

    const response = await apiData.json()
    if (response.success) {
      toast.success(response.message)
      fetchUsers()
      setUser({})
      setTimeout(() => {
        navigate("/dashboard/viewProducts")
      }, 500)
    }
    if (response.error) {
      toast.error(response.message);
    }
  }

  return (
    <section className='login flex items-center w-full h-full min-h-[100vh] bg-gray-900'>
      <div className="container mx-auto p-4">
        <div className="bg-gray-800 rounded-md p-4 w-full max-w-md mx-auto">
          <h1 className='text-gray-100 text-3xl pb-2'>Login to your account</h1>

          <form action="" className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>UserName:</label>
              <input type="text"
                name='userName'
                onChange={handleChange}
                className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
              />
            </div>
            <div>
              <label htmlFor="" className='block text-md mb-1 font-medium text-gray-300'>Paaword:</label>
              <input type="text"
                className='w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white'
                name='password'
                onChange={handleChange}
              />
              <span className='text-gray-300 text-sm'>Don't have an account? <Link className='text-blue-500' to={"/signup"}>SignUp</Link></span>
            </div>
            <div className='flex justify-between'>
              <input type="submit" value={"Login"} className='text-gray-100 text-md bg-blue-500 min-w-[100px] max-w-[100px] py-1 rounded-md' />
              <div>
                <h1 className='text-white'>UserName: john1212</h1>
                <span className='text-white'>password: 1234</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
