import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { addCurrentNavigation, selectCurrentNavigation } from '@/features/currentNavigationSlice';
import { selectCatchCopy } from '@/features/catchCopySlice';
import router from 'next/router';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const dispatch = useDispatch();
  const catchCopy = useSelector(selectCatchCopy);
  const currentNavigation = useSelector(selectCurrentNavigation)
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Color', href: 'PageEditCatchCopyStyle', current: false },
    // {
    //   name: catchCopy.catchCopy, href: '/', current: true
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
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-300">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item: any) => {
                  return (
                    <Disclosure.Button
                      key={item.name}
                      // as="a"
                      // href={item.href}
                      onClick={() => {
                        handleNavigationClick(item)
                        router.push(item.href);
                      }}
                      className={classNames(
                        item.name === currentNavigation.name ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-400 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
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

export default Header;
