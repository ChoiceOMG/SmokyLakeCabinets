import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';

// TODO: Remember state of mobile nav to keep it open and replace the logo

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  const { data: session, status } = useSession();
  const [mobileNavType, setNavbarMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const toggleNavbarMenu = () => {
    setNavbarMenu(!mobileNavType);
    console.log(mobileNavType, 'navbarMenu');
  };
  return (
    <section className="overflow-hidden bg-gray-50 pt-6 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between rounded-full bg-white px-6 py-3.5">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="hidden w-auto lg:block">
                  <ul className="flex items-center justify-center">
                    <li className="mr-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mr-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/kitchen"
                      >
                        Kitchen
                      </Link>
                    </li>
                    <li className="mr-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/island"
                      >
                        Island
                      </Link>
                    </li>
                    <li className="mr-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/vanity"
                      >
                        Vanity
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="hidden w-auto lg:block">
                  <div className="-m-2 flex flex-wrap">
                    <div className="w-full p-2 md:w-auto">
                      <button
                        className="block w-full rounded-full border bg-white px-8 py-3.5  text-center text-base font-bold text-gray-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200"
                        onClick={() => signIn()}
                      >
                        Log In
                      </button>
                    </div>
                    <div className="w-full p-2 md:w-auto">
                      <button
                        className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-base font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                        type="button"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-auto lg:hidden">
                  <button className="inline-block" onClick={toggleNavbarMenu}>
                    <svg
                      className="navbar-burger text-blue-500"
                      width="45"
                      height="45"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="56"
                        height="56"
                        rx="28"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M37 32H19M37 24H19"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'navbar-menu fixed top-0 left-0 bottom-0 z-50 w-4/6 sm:max-w-xs',
              mobileNavType ? 'block' : 'hidden'
            )}
          >
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
            <nav className="relative z-10 h-full overflow-y-auto bg-white px-9 pt-8">
              <div className="flex h-full flex-wrap justify-between">
                <div className="w-full">
                  <div className="-m-2 flex items-center justify-between">
                    <div className="w-auto p-2">
                      <button
                        className="navbar-burger inline-block"
                        onClick={toggleNavbarMenu}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 18L18 6M6 6L18 18"
                            stroke="#111827"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col justify-center py-8">
                  <ul>
                    <li className="mb-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/kitchen"
                      >
                        Kitchen
                      </Link>
                    </li>
                    <li className="mb-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/island"
                      >
                        Island
                      </Link>
                    </li>
                    <li className="mb-9">
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/vanity"
                      >
                        Vanity
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block text-sm font-bold text-gray-900 hover:text-gray-700"
                        href="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Profile */}
                <div className="mr-8 ">
                  {session ? (
                    <>
                      <div
                        className="group flex cursor-pointer flex-row items-center"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                      >
                        {session.user?.image && (
                          <Image
                            src={session.user.image}
                            alt="Profile image"
                            width={32}
                            height={32}
                            className="mr-3 h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <h4 className="mr-4 dark:text-slate-200">
                          {session.user?.name}
                        </h4>
                        <button
                          className="text-slate-200 group-hover:text-slate-100"
                          role="button"
                        >
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {showUserMenu ? (
                              <path
                                d="M1 5L5 1L9 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            ) : (
                              <path
                                d="M1 1L5 5L9 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            )}
                          </svg>
                        </button>
                      </div>
                      <div
                        className={clsx(
                          'fixed top-20 right-6 mt-2 w-56 origin-bottom-right rounded-md shadow-lg',
                          {
                            hidden: !showUserMenu,
                          }
                        )}
                      >
                        <div className="shadow-xs rounded-md bg-white py-1">
                          <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Your Profile
                          </a>
                          <Link
                            href="/api/auth/signout"
                            // TODO: Do we want to use signout() instead?
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={() => signIn()}
                      auto
                      color="primary"
                      rounded
                    >
                      Login
                    </Button>
                  )}
                </div>
                <div className="flex w-full flex-col justify-end pb-8">
                  <div className="-m-2 flex flex-wrap">
                    <div className="w-full p-2">
                      <a
                        className="block w-full rounded-full border bg-white px-4 py-2.5 text-center text-sm font-bold text-gray-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200"
                        href="#"
                      >
                        Log In
                      </a>
                    </div>
                    <div className="w-full p-2">
                      <a
                        className="block w-full rounded-full bg-blue-500 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                        href="#"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
