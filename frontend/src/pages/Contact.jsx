import React, { useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showTip, setShowTip] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Hey 👋 please tell me your name.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Names usually don't have numbers 😉";
    }

    if (!formData.email.trim()) {
      newErrors.email = "I'll need your email to get back to you 🙂";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Hmm, that doesn't look like a valid email.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please say something, even just a 'Hello Amanuel' ";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const emailData = {
      from_name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() === "" ? "Personal" : formData.company.trim(),
      message: formData.message.trim(),
    };

    try {
      // Replace with your backend API endpoint
      const response = await fetch(import.meta.env.VITE_API_URL || "/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      
      setSuccess(data.message || "Message sent successfully 🚀 I'll get back to you soon.");

      setFormData({
        name: "",
        company: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({ submit: "Something went wrong 😕 Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#f2f6fd] py-24 px-4 flex flex-col items-center"
    data-testid="contact-section"
      itemScope 
      itemType="https://schema.org/ContactPage" >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold" itemProp="headline" >Let's Work Together</h1>
        <p className="text-gray-500 mt-3">
          Have a project in mind or just want to say hello?
        </p>
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 p-6 md:p-12">
        <div className="border border-blue-400 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Have a project in mind or need help with a website?
          </h2>

          <p className="mt-6 text-gray-600 text-center">
            Feel free to reach out — I'm open to freelance opportunities and
            collaboration.
            <br />
            <br />
            Open to frontend internships, junior roles, and freelance work.
          </p>

          <div className="mt-8 grid gap-4 text-gray-600">
            <div className="flex items-center gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <FaMapMarkerAlt className="text-blue-500" />
              <span itemProp="addressCountry">Ethiopia</span>
            </div>
            <div className="flex items-center gap-3" data-testid="contact-availability">
              <FaCheckCircle className="text-green-500" />
              <span>Availability: Open to opportunities</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10 items-center justify-center">
            <a
              href="https://github.com/amanuel1221"
              target="_blank"
              rel="noopener noreferrer me"
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
              data-testid="github"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://peerlist.io/amanuelamare084"
              target="_blank"
              rel="noopener noreferrer me"
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-blue-500 hover:text-[#00AA6C] transition group"
              aria-label="Peerlist profile"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:text-[#00AA6C]"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 12.5h-2.5v5h-3v-5H10v3h-3v-6.5h8.5v3.5z"/>
              </svg>
            </a>
            <div className="relative inline-block group">
              <a
                href="https://linkedin.com/in/amanuel-amare-684234372"
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 flex items-center justify-center border rounded-lg 
                           hover:border-blue-500 hover:text-blue-500 transition"
                data-testid="linkedin"
                aria-label="Linkedin profile"
              
              >
                <FaLinkedin />
              </a>
             
            </div>
            <a
              href="https://x.com/AmanuelAma66386"
              target="_blank"
              rel="noopener noreferrer me"
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
              data-testid="twitter"
              aria-label="twitter profile"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.hackerrank.com/settings/account"
              target="_blank"
              rel="noopener noreferrer me"
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
              data-testid="hacker-rank"
              aria-label="hacker-rank profile"
            >
              <SiHackerrank />
            </a>
            <a
              href="mailto:bdu1600905@bdu.edu.et"
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
              data-testid="email"
              aria-label="mailing service"  
              itemProp="email"
            >
              <FaEnvelope />
            </a>
          </div>
          
          <p className="text-gray-700 text-sm mt-2 text-center" itemProp="email">
            bdu1600905@bdu.edu.et
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/assets/images/Amanuel_cv.pdf"
              download="Amanuel_CV.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3"
                />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        <div className="border rounded-2xl p-8">
          <h2 className="text-center font-semibold mb-8">Let's work together</h2>

          <form data-testid="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <label className="md:w-32 text-center md:text-right font-medium">
                Name:
              </label>
              <div className="flex-1">
                <input
                  data-testid="input-name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-md border text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                />
                {errors.name && (
                  <p data-testid="error-name" className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <label className="md:w-32 text-center md:text-right font-medium" itemProp="email">
                Email:
              </label>
              <div className="flex-1">
                <input
                  data-testid="input-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-md border text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                />
                {errors.email && (
                  <p data-testid="error-email" className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <label className="md:w-32 text-center md:text-right font-medium">
                Company:
              </label>
              <input
                data-testid="input-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Optional"
                className="flex-1 px-4 py-2.5 rounded-md border text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <label className="md:w-32 text-center md:text-right font-medium md:pt-2">
                Message:
              </label>
              <div className="flex-1">
                <textarea
                  data-testid="input-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hey Amanuel..."
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-md border text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                />
                {errors.message && (
                  <p data-testid="error-message" className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-white border text-sm font-semibold hover:bg-gray-100 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 text-blue-600 animate-spin"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12"
                      cy="12" r="10" stroke="currentColor" strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : "Send"}
            </button>

            {success && (
              <p data-testid="sucess-submit" className="text-green-600 text-center text-sm">{success}</p>
            )}
            {errors.submit && (
              <p data-testid="error-submit" className="text-red-500 text-center text-sm"> {errors.submit}  </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;