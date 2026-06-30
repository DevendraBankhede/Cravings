import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliberyboy.png";

const ContactUs = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validateError, setValidateError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !contactData.fullName ||
      !contactData.email ||
      !contactData.phone ||
      !contactData.subject ||
      !contactData.message
    ) {
      setValidateError("All fields are required");
      return;
    }

    setValidateError("");
    setSuccessMessage(
      "Thank you for contacting us! We'll get back to you soon.",
    );
    console.log("Contact data submitted:", contactData);

    const payload = {
      fullName: contactData.fullName,
      email: contactData.email.toLowerCase(),
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    };

    // Reset form after submission
    setTimeout(() => {
      setContactData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSuccessMessage("");
    }, 3000);
  };

  const inputClass =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)";

  return (
    <>
      <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10">
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
        <div className="w-2xl bg-(--background) rounded shadow p-10 flex flex-col justify-center">
          <div className="text-xl font-semibold mb-4">Contact Us</div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={contactData.fullName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactData.subject}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                rows="5"
                className={inputClass}
              />
            </div>

            {validateError && (
              <p className="text-red-500 text-sm col-span-2">{validateError}</p>
            )}

            {successMessage && (
              <p className="text-green-500 text-sm col-span-2">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              className="col-span-2 mt-2 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
            >
              Send Message
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Want to order Delicious Food?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Login
              </button>
              {" | "}
              <button
                onClick={() => navigate("/register")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;