import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../auth/authSlice";
import { clearCartItems } from "../cart/cartSlice";
import userIcon from "../../assets/user-icon.png";
import appLogo from "../../assets/app-logo.jpg";
import { enqueueSnackbar } from "notistack";
const navigation = [
  { name: "Products", to: "/", current: true },
  { name: "LogIn", to: "/login", current: false },
  { name: "SignUp", to: "/signup", current: false },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = ({ children }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(clearCartItems());
    dispatch(logoutUserAsync());
    enqueueSnackbar("Logged Out Successfully", { variant: "success" });
  };
  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-10">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-10 w-10 rounded"
                          src={appLogo}
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      {/* NavBar Links */}
                      <div className="ml-10 flex items-baseline space-x-4">
                        <NavLink
                          to="/"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Products
                        </NavLink>
                        {!userInfo && (
                          <NavLink
                            to="/login"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Login
                          </NavLink>
                        )}
                        {!userInfo && (
                          <NavLink
                            to="/signup"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Sign Up
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative mr-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />

                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <span className="inline-flex absolute items-center rounded-md bg-yellow-50 px-2 py-1 left-5 bottom-5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {items.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )}
                          </span>
                        </button>
                      </Link>
                      {/* Profile dropdown */}
                      {userInfo && (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={userIcon}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
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
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                              {userInfo && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      onClick={handleLogout}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Sign Out
                                    </div>
                                  )}
                                </Menu.Item>
                              )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <NavLink
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                  >
                    Products
                  </NavLink>
                  {!userInfo && (
                    <NavLink
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Login
                    </NavLink>
                  )}
                  {!userInfo && (
                    <NavLink
                      to="/signup"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Sign Up
                    </NavLink>
                  )}
                </div>
                {userInfo && (
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={userIcon}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>

                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <span className="inline-flex absolute items-center rounded-md bg-yellow-50 px-2 py-1 bottom-5 left-5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {items.length}
                          </span>
                        </button>
                      </Link>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <NavLink
                        to="/profile"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                      >
                        My Profile
                      </NavLink>
                      <NavLink
                        to="/my-orders"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                      >
                        My Orders
                      </NavLink>
                      {userInfo && (
                        <div
                          onClick={handleLogout}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white 
                        block rounded-md px-3 py-2 text-base font-medium"
                        >
                          Sign Out
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Ecommerce
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default NavBar;
