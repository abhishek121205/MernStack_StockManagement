import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ClipboardDocumentListIcon , ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { SummaryApi } from '../common/commonApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../features/userSlice';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state?.user)

  const menuItems = [
    { id: 'viewProducts', name: 'View products', icon: HomeIcon, path: 'viewProducts' },
    { id: 'viewOrders', name: 'View orders', icon: ClipboardDocumentListIcon, path: 'viewOrders' },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon, path: 'settings' },
  ];

  const logout = async () => {
    const apiData = await fetch(SummaryApi.logoutUser.url, {
      credentials: "include"
    })
    const response = await apiData.json()

    if (response.success) {
      dispatch(setUserDetails(null))
      navigate("/")
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-screen bg-gray-800 text-white z-30
        transform transition-transform duration-300 ease-in-out
        w-64 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        <div className="flex justify-between items-center p-4">
          <div className="text-2xl font-bold">Hello, {currentUser.userName}</div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center space-x-2 p-3 rounded-lg cursor-pointer mb-2
                ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}
              `}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </NavLink>
          ))}
          <div
            className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer mb-2 hover:bg-gray-700"
            onClick={logout}
          >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span>Log Out</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;