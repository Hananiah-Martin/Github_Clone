import { useState} from 'react';
import {useNavigate} from 'react-router-dom'

import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [isAuthenticated] = useState(true);
   const navigate=useNavigate();
  const openRepoForm=async(e)=>{
    e.preventDefault();
    console.log("new repo");
    navigate("/new");
  }
  const menuItems = [
    { name: 'Overview', href: '/' },
    { name: 'Repositories', href: '/allRepo' },
    { name: 'Stars', href: '/starredRepo' },
    { name: 'Explore', href: '/' },
  ];

  return (
    <nav className="bg-github-dark border-b border-github-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg height="32" viewBox="0 0 16 16" className="fill-white" width="32">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-github-dark border border-github-border rounded-md py-1.5 pl-10 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-github-hover"
                placeholder="Search GitHub"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <BellIcon className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
                <div className="relative">
                  <button className="flex items-center text-gray-300 hover:text-white" onClick={openRepoForm}>
                    <PlusIcon className="h-6 w-6" />
                  </button>
                </div>
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src="https://github.com/github.png"
                  alt="Profile"
                />
              </>
            ) : (
              <button className="bg-github-btn text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-opacity-90">
                Sign in
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <input
                type="text"
                className="w-full bg-github-dark border border-github-border rounded-md py-1.5 pl-10 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-github-hover"
                placeholder="Search GitHub"
              />
              <MagnifyingGlassIcon className="absolute left-6 top-[4.5rem] transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
            {!isAuthenticated && (
              <button className="w-full bg-github-btn text-white px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90">
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;