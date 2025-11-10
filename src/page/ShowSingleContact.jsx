import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getSingleContact, removeSingleContact } from "../redux/slice";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ShowSingleContact() {
  const { singleContact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      dispatch(deleteContact(id));
      toast.success("Contact deleted successfully");
      dispatch(removeSingleContact());
      navigate("/");
    }
  }

  useEffect(()=>{
    if(!singleContact?.name && id){
      dispatch(getSingleContact(id));
    }
  },[dispatch,id,singleContact?.name])

  if (!singleContact?.name) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No contact selected.
      </div>
    );
  }

  return (
    <motion.div className="flex justify-center items-center min-h-[70vh]" initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md md:max-w-lg p-6 sm:p-8 mx-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Contact Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200 rounded-lg">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold p-3 w-1/3 text-gray-700">Name:</td>
                <td className="p-3 text-gray-600">{singleContact.name}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold p-3 text-gray-700">Email:</td>
                <td className="p-3 text-gray-600">{singleContact.email}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold p-3 text-gray-700">Phone:</td>
                <td className="p-3 text-gray-600">{singleContact.phoneNumber}</td>
              </tr>
              <tr>
                <td className="font-semibold p-3 text-gray-700">Created At:</td>
                <td className="p-3 text-gray-600">
                  {new Date(singleContact.createdAt).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => handleDelete(singleContact._id)}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
          >
            <FaTrash /> Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ShowSingleContact;
