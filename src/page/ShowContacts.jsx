import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
  getContact,
  getSingleContact,
  removeMessage,
  removeSuccess,
  removeLoading,
} from "../redux/slice";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ShowContacts() {
  const { contact, loading, success, message, error } = useSelector(
    (state) => state.contact
  );
  const [findValue,setFindValue]= useState("");
  const [searchBy,setSearchBy]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      dispatch(removeMessage());
      dispatch(removeSuccess());
      dispatch(removeLoading());
    }
  }, [dispatch, success, loading]);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  function showSingleContact(id) {
    dispatch(getSingleContact(id));
    navigate(`/single-contact-details/${id}`);
  }

  return (
    <>
    <motion.section className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-3 py-10" initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-blue-700">
          All Contacts
        </h2>

       
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 w-full">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">SearchBy</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone Number</option>
          </select>

          <input
            type="text"
            value={findValue}
            onChange={(e) => setFindValue(e.target.value)}
            placeholder="🔍 Search contact..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-2">
            <button
              onClick={() => dispatch(getContact({ keyword: findValue, searchBy }))}
              disabled={findValue !== "" ? false : true}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Find
            </button>
            <button
              onClick={() => {
                setFindValue("");
                dispatch(getContact());
              }}
              disabled={findValue !== "" ? false : true}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              All Contact
            </button>
          </div>
        </div>

  
        {loading && (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading...
          </p>
        )}
        {error && <p className="text-center text-red-600 font-medium">{error}</p>}

        {contact && contact.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm sm:text-base text-left">
              <thead className="bg-blue-600 text-white uppercase">
                <tr>
                  <th className="py-3 px-4">Sr No.</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4 text-center">More Info</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((data, index) => (
                  <tr
                    key={data._id}
                    className="border-b hover:bg-blue-50 transition duration-200"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {data.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{data.email}</td>
                    <td className="py-3 px-4 flex justify-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                        title="View Info"
                        onClick={() => showSingleContact(data._id)}
                      >
                        <FaUserAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 text-lg mt-4">
              No contacts found.
            </p>
          )
        )}
      </div>
    </motion.section>
    </>
  );
}

export default ShowContacts;
