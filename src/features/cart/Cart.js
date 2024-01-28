import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemAsync, updateCartItemAsync } from "./cartSlice";


const Cart = ({cartPage, checkoutPage,handleOrder}) => {
  const dispatch = useDispatch();
  const {items,status} = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuanity = (e, item) => {
    dispatch(updateCartItemAsync({ id: item.id, quantity: e.target.value }));
  };
  const handleRemove = (id) => {
    dispatch(deleteCartItemAsync(id));
  };
  return (
    <>
      {/* <div className="bg-white mx-auto sm:mx-20 lg:mx-60 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-8"> */}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">
            Cart
          </h1>
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.product.title}</a>
                      </h3>
                      <p className="ml-4">${item.product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="mt-2">
                      <label
                        htmlFor="qty"
                        className="inline mr-4 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select id="qty" value={item.quantity} onChange={(e) => handleQuanity(e, item)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => handleRemove(item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      {
        !items.length && <h1 className="text-base my-10 font-medium text-gray-900 text-center">Your Cart is empty</h1>
      }
        <div className="flex justify-between text-base my-2 font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <div className="flex justify-between text-base my-2 font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          {cartPage===true && items.length>0 && (
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          )}
          {checkoutPage===true && (
            <div
              onClick={handleOrder}
              className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Order Now
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Cart;
