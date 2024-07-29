import React from 'react';
import { useNavigate } from 'react-router-dom';
import worker from '../assets/worker.gif';
import home from '../assets/home.gif'
import inventory from '../assets/inventory.gif'
import mail from '../assets/mail.gif'
import bills from '../assets/bill.gif'
import logout from '../assets/logout.gif'


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('logging out');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <div className="flex bg-white shadow-md"> 
        <div className="mt-[1%] flex items-center justify-end"> 
      
          <ul className="flex gap-5 ml-5">
            <li>
              <button
                className="px-4 py-2 rounded-lg text-white hover:scale-125 transition-all duration-500 cursor-pointer  bg-white"
                onClick={() => navigate('/home')}><img src={home} className='w-10 '/>
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 rounded-lg text-white hover:scale-125 transition-all duration-500 cursor-pointer  bg-white"
                onClick={() => navigate('/inventory')} ><img src={inventory} className='w-10 '/>
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 rounded-lg text-white hover:scale-125 transition-all duration-500 cursor-pointer bg-white"
                onClick={() => window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox')} ><img src={mail} className='w-10 '/>
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 rounded-lg text-white hover:scale-125 transition-all duration-500 cursor-pointer bg-white"
                onClick={() => navigate('/savedbills')}><img src={bills} className='w-10 '/>
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 rounded-lg text-white hover:scale-125 transition-all duration-500 cursor-pointer bg-white" 
                onClick={handleLogout}><img src={logout} className='w-10 '/>
              </button>
            </li>
          </ul>
          
        </div>
        <button className="ml-[68%]  hover:scale-125 transition-all duration-500 cursor-pointer"> <img src={worker} className='w-12 h-10 ' /></button>
      </div>
    </>
  );
};

export default Navbar;
