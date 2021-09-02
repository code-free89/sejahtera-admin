import React from 'react';
import { navigation } from 'constants/index';
import classNames from 'classnames';
import { LogoutIcon } from '@heroicons/react/outline';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase';

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-gray-600 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="logo.png" alt="Easywire logo" />
              <div className="ml-4 text-2xl font-bold text-white">Sejahtera</div>
            </div>
            <nav className="mt-5 flex-1 flex flex-col w-full items-stretch" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname.includes(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md w-full"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push('/');
                  }}
                >
                  <LogoutIcon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
