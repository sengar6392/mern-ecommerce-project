import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cart from "../features/cart/Cart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync } from "../features/order/orderSlice";

const CheckoutPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState();
  const totalPrice = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleAddress = (e) => {
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address");
    } else if (!paymentMethod) {
      alert("Select a payment method");
    } else if (!items.length) {
      alert("No items in cart");
    } else {
      const order = {
        items,
        totalPrice,
        totalItems,
        user: userInfo.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
    }
  };

  useEffect(() => {
    if (currentOrder) {
      navigate(`/order-success/${currentOrder.id}`);
    }
  }, [currentOrder, navigate]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 mx-2 sm:mx-8 mt-8">
        <form
          className="col-span-3 sm:col-span-2  bg-white px-6 py-4"
          onSubmit={handleSubmit((data) => {
            console.log("data", data);
            dispatch(
              updateUserAsync({
                ...userInfo,
                addresses: [...userInfo.addresses, data],
              })
            );
          })}
        >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Add a new address
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name (First and Last name)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name", { required: "name is required" })}
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "mobile number is required",
                    })}
                    id="phone"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", { required: "email is required" })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country", {
                      required: "country is required",
                    })}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option selected>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("street", { required: "street is required" })}
                    id="street"
                    autoComplete="street"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city", { required: "city is required" })}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("state", { required: "state is required" })}
                    id="state"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pincode
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("pinCode", {
                      required: "pincode is required",
                    })}
                    id="pinCode"
                    autoComplete="pinCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-1">
              <button className="flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm">
                Reset
              </button>
              <button
                type="submit"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Add Address
              </button>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Your Addresses
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {userInfo.addresses.length !== 0
                  ? "Choose from existing addresses"
                  : "No address added"}
              </p>
              <ul>
                {userInfo.addresses.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2"
                  >
                    <div className="flex gap-x-4">
                      <input
                        // onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={index}
                        onClick={handleAddress}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 inline-flex">
                        <p>
                          <span className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </span>
                          ,{" "}
                          <span className="text-sm leading-6 text-gray-900">
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.pinCode},{address.country}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
                  </li>
                ))}
              </ul>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Payment Methods
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose one
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="cash"
                      name="payment-method"
                      onClick={handlePayment}
                      type="radio"
                      value="cash"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="cash"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cash
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="card"
                      name="payment-method"
                      onClick={handlePayment}
                      type="radio"
                      value="card"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="card"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Card payment
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
        <div className="bg-white mb-auto col-span-3 sm:col-span-1">
          <Cart checkoutPage handleOrder={handleOrder} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
