import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import dynamic from 'next/dynamic';
import { selectUser } from '@/features/userSlice';
import Link from 'next/link';
import { addCurrentNavigation, selectCurrentNavigation } from '@/features/currentNavigationSlice';
import router from 'next/router';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentNavigation = useSelector(selectCurrentNavigation)
  const Login: any = dynamic(() => import('./Login'), { ssr: false });
  const Logout: any = dynamic(() => import('./Logout'), { ssr: false });
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Color', href: 'PageEditCatchCopyStyle', current: false },
    // {
    //   name: currentNavigation.name, href: '/', current: true
    // }
  ];
  const handleNavigationClick = (item: any) => {
    dispatch(addCurrentNavigation(
      {
        name: item.name,
        href: item.href,
        current: true
      }
    ))
    router.push(item.href);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-pink-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-pink-50 hover:bg-pink-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item: any) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            currentNavigation ? 'bg-red-900 text-white' : 'text-pink-100 hover:bg-pink-900 hover:text-black',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-pink-900 p-1 text-pink-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-900"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {user.icon ? (
                      <div>
                        <Menu.Button className="flex rounded-full bg-pink-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-900">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`${user.icon}`}
                            alt="" />
                        </Menu.Button>
                      </div>
                    ) : (
                      <div className="flex rounded-full  text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-900">
                        <Link href="/" >
                          <Login />
                        </Link>
                      </div>
                    )}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-pink-100' : '', 'block px-4 py-2 text-sm text-pink-800')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/PageExample"
                              className={classNames(active ? 'bg-pink-100' : '', 'block px-4 py-2 text-sm text-pink-800')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-pink-100' : '', 'block px-4 py-2 text-sm text-pink-800')}
                            >
                              <Logout />
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item: any) => {
                  return (
                    <a
                      key={item.name}
                      // href={item.href}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item.name === currentNavigation.name ? 'bg-red-900 text-white' : 'text-pink-100 hover:bg-pink-900 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={currentNavigation ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
