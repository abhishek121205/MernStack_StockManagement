import React, { useState } from 'react'
import AppRoutes from '../routes/AppRoutes'
import { ThemeProvider } from '../context/ThemeContext'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
                <div className="lg:hidden fixed top-4 left-4 z-20">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0 lg:ml-64'
                    } p-4 lg:p-8 pt-16 lg:pt-8`}>
                    <AppRoutes />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Dashboard
