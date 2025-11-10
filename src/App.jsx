import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import ShowContacts from "./page/ShowContacts";
import ShowSingleContact from "./page/ShowSingleContact";
import { getContact } from "./redux/slice";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <BrowserRouter>
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <Navbar />
        </header>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ShowContacts />} />
            <Route path="/create-contact" element={<ContactForm />} />
            <Route path="/single-contact-details/:id" element={<ShowSingleContact />} />
          </Routes>
        </main>
        <footer className="mt-auto bg-white shadow-inner py-4">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
