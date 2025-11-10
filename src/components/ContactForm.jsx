import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, removeError, removeMessage } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ContactForm() {
  const { loading, error, message } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phoneNumber: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phoneNumber) {
      toast.error("Please fill all fields!");
      return;
    }
    if (form.phoneNumber.length !== 10) {
      toast.error("Phone number should be 10 digits");
      return;
    };
    if (!form.name.length > 3) {
      toast.error("Name should greater than 3 characters");
      return;
    }
    dispatch(createContact(form));
    toast.success("Contact Add successfully");
    setForm({ name: "", email: "", phoneNumber: "" });
    navigate("/");
  };



  return (
    <>
      {/* <section className="flex justify-center items-center min-h-[85vh]  px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">
          Add New Contact
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold w-full p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Contact"}
          </button>
        </form>
      </div>
    </section> */}

      <motion.section
        className="flex justify-center items-center min-h-[85vh] px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">
            Add New Contact
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-semibold w-full p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Adding..." : "Add Contact"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-3 w-full bg-gray-200 text-gray-700 font-semibold p-3 rounded-lg hover:bg-gray-300 transition"
            >
              Go Back to Home
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
}

export default ContactForm;
