"use client"

import { useState } from "react"
import { Clock, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

const Form = ({ service, pack, onBack }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    date: "",
    time: [],
  })
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)

  const timeSlots = ["6:00pm-6:30pm", "7:00pm-7:30pm", "9:30 pm-10:00pm", "10:30pm-11:00pm"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTimeSelect = (time) => {
    const updatedTimes = formData.time.includes(time)
      ? formData.time.filter((t) => t !== time)
      : [...formData.time, time]

    setFormData({ ...formData, time: updatedTimes })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8000/api/meeting/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (data.success) {
      alert(`Meeting Scheduled! Join here: ${data.meetLink}`)
    } else {
      alert("Error scheduling meeting")
    }
  }

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  const handleBackClick = () => {
    if (typeof onBack === "function") {
      onBack()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden relative">
      <button
        onClick={handleBackClick}
        className="absolute left-4 top-4 p-2 bg-[#2a2a2a] rounded-full shadow-md text-[#d2b48c] hover:text-[#f5f5dc] transition-colors duration-300 z-10"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#f5f5dc]">Let's get you started</h1>
          <p className="text-[#d2b48c]">Enter the details to get going</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#d2b48c] text-[#1a1a1a]" : "bg-[#3a3a3a] text-[#f5f5dc]"} font-bold`}
            >
              1
            </div>
            <span className={`mx-2 text-xs ${step >= 1 ? "text-[#d2b48c]" : "text-[#888]"}`}>General Details</span>
            <div className="w-12 h-1 mx-2 bg-[#3a3a3a]">
              <div className={`h-full ${step >= 2 ? "bg-[#d2b48c]" : "bg-[#3a3a3a]"}`}></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#d2b48c] text-[#1a1a1a]" : "bg-[#3a3a3a] text-[#f5f5dc]"} font-bold`}
            >
              2
            </div>
            <span className={`ml-2 text-xs ${step >= 2 ? "text-[#d2b48c]" : "text-[#888]"}`}>Schedule & Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(100vh-16rem)] overflow-y-auto px-2">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#f5f5dc] mb-1 text-sm">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c]"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#f5f5dc] mb-1 text-sm">Phone Number (WhatsApp)*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c]"
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#f5f5dc] mb-1 text-sm">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c]"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-[#f5f5dc] mb-1 text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c] min-h-[80px]"
                  placeholder="Describe your requirements"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#f5f5dc] mb-1 text-sm">Selected Service</label>
                  <input
                    type="text"
                    value={service}
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc]"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-[#f5f5dc] mb-1 text-sm">Selected Package</label>
                  <input
                    type="text"
                    value={pack}
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc]"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-[#d2b48c] text-[#1a1a1a] rounded-md font-medium flex items-center hover:bg-[#c19a6b] transition-colors text-sm"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#f5f5dc] mb-3">Schedule a Meeting</h2>

              <div>
                <label className="block text-[#f5f5dc] mb-1 text-sm">Select Date*</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={format(new Date(), "yyyy-MM-dd")}
                  className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#f5f5dc] mb-1 text-sm">Select Time*</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md text-[#f5f5dc] focus:outline-none focus:border-[#d2b48c] flex justify-between items-center"
                  >
                    <span>{formData.time.length > 0 ? formData.time.join(", ") : "Select available time slots"}</span>
                    <Clock className="h-4 w-4 text-[#d2b48c]" />
                  </button>

                  {showTimeDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md shadow-lg p-2 max-h-48 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <div key={time} className="flex items-center p-2 hover:bg-[#3a3a3a] cursor-pointer">
                          <input
                            type="checkbox"
                            id={`time-${time}`}
                            checked={formData.time.includes(time)}
                            onChange={() => handleTimeSelect(time)}
                            className="mr-2 h-4 w-4 accent-[#d2b48c]"
                          />
                          <label htmlFor={`time-${time}`} className="text-[#f5f5dc] cursor-pointer flex-1 text-sm">
                            {time}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-transparent border border-[#d2b48c] text-[#d2b48c] rounded-md font-medium flex items-center hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d2b48c] text-[#1a1a1a] rounded-md font-medium hover:bg-[#c19a6b] transition-colors text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Form

