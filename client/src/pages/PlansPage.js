"use client"

import { useState } from "react"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Form from "../components/Form"

const services = [
  {
    id: 1,
    name: "Graphic Designing",
    description: "Professional graphic design services for all your branding needs",
    icon: "🎨",
    basicFeatures: ["Simple Logo", "Basic Social Media Posts"],
    premiumFeatures: ["Full Branding Kit (Logo, Social Media, Brochures, Posters, Banners, Business Cards)"],
    bgImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  },
  {
    id: 2,
    name: "Motion Graphics",
    description: "Engaging motion graphics to bring your ideas to life",
    icon: "🎬",
    basicFeatures: ["Basic Animated Ad"],
    premiumFeatures: [
      "High-Quality Motion Graphics (Promo Videos, Infographics, Custom Typography, Smooth Transitions, Advanced Effects)",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    name: "3D Model",
    description: "Detailed 3D modeling services for products and concepts",
    icon: "🧊",
    basicFeatures: ["Simple 3D Product Model"],
    premiumFeatures: ["High-Quality, Detailed 3D Models with Realistic Textures, Lighting & Custom Adjustments"],
    bgImage:
      "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    name: "3D Product Animation",
    description: "Short animations to showcase your products",
    icon: "📱",
    basicFeatures: ["Basic Product Spin Animation"],
    premiumFeatures: ["Complex Product Animations (Exploded Views, Custom Motion, Interactive 3D Visuals)"],
    bgImage:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  },
]

const PlansPage = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({ service: "", pack: "" })

  const getAnimationClass = (index) => {
    const row = Math.floor(index / 3)
    const col = index % 3

    if (row === 0) {
      return col === 0 ? "animate-slideOutLeft" : col === 2 ? "animate-slideOutRight" : "animate-slideOutUp"
    } else if (row === 1) {
      return col === 0 ? "animate-slideOutLeft" : col === 2 ? "animate-slideOutRight" : "animate-slideOutDown"
    } else {
      return "animate-slideOutDown"
    }
  }

  const handleServiceClick = (serviceId) => {
    if (isAnimating) return

    if (selectedService === serviceId) {
      setSelectedService(null)
      return
    }

    setSelectedService(serviceId)
    setIsAnimating(true)

    setTimeout(() => {
      setShowPlans(true)
      setIsAnimating(false)
    }, 500)
  }

  const handleBackClick = () => {
    setShowPlans(false)
    setTimeout(() => {
      setSelectedService(null)
    }, 300)
  }

  const handleSelectPlan = (serviceId, pack) => {
    const serviceName = services.find((s) => s.id === serviceId)?.name
    setSelectedPlan({ service: serviceName, pack })
    setShowForm(true)
  }

  const handleBackToPlans = () => {
    setShowForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto mt-16">
      {!selectedService && (
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#f5f5dc] mb-4 mt-5">Choose Your Service</h1>
          <p className="text-[#d2b48c] text-lg max-w-3xl mx-auto">
            Select from our professional design services to get started
          </p>
        </div>
      )}

      {selectedService && showPlans && !showForm && (
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#f5f5dc] mb-4 mt-5">Select Your Package</h1>
          <p className="text-[#d2b48c] text-lg max-w-3xl mx-auto">Choose the package that best suits your needs</p>
        </div>
      )}

      {/* Services Grid */}
      {(!selectedService || !showPlans) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative bg-[#2a2a2a] backdrop-blur-sm rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-105 h-60 ${
                selectedService ? getAnimationClass(index) : ""
              } ${selectedService === service.id ? "ring-2 ring-[#d2b48c]" : ""}`}
              onClick={() => handleServiceClick(service.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 hover:opacity-30"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              ></div>
              <div className="relative p-6 z-10">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#f5f5dc] mb-2">{service.name}</h3>
                <p className="text-[#d2b48c]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Service Details */}
      {selectedService && showPlans && !showForm && (
        <div className="relative">
          <button
            onClick={handleBackClick}
            className="absolute -left-2 -top-2 p-2 bg-[#2a2a2a] rounded-full shadow-md text-[#d2b48c] hover:text-[#f5f5dc] transition-colors duration-300 z-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg shadow-lg p-6 mb-12 animate-slideInFromBottom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Plan */}
              <div className="bg-[#2a2a2a]/50 backdrop-blur-sm rounded-lg p-6 border border-[#3a3a3a] hover:border-[#d2b48c] transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#f5f5dc]">Basic Plan</h3>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[#f5f5dc] mb-2">Features:</h4>
                  {services
                    .find((s) => s.id === selectedService)
                    ?.basicFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-[#d2b48c]">{feature}</span>
                      </div>
                    ))}
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Limited Revisions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Standard Delivery Time</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(selectedService, "Basic")}
                  className="w-full mt-8 bg-[#2a2a2a] text-[#f5f5dc] border border-[#d2b48c] font-medium py-2 px-4 rounded-md hover:bg-[#3a3a3a] transition-colors"
                >
                  Choose Basic
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-[#2a2a2a]/50 backdrop-blur-sm rounded-lg p-6 border border-[#d2b48c] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <div className="bg-[#d2b48c] text-[#1a1a1a] text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1">
                    POPULAR
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#f5f5dc]">Premium Plan</h3>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[#f5f5dc] mb-2">Features:</h4>
                  {services
                    .find((s) => s.id === selectedService)
                    ?.premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-[#d2b48c]">{feature}</span>
                      </div>
                    ))}
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Unlimited Revisions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Priority Support</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Dedicated Creative Consultant</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#d2b48c] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#d2b48c]">Expedited Delivery</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(selectedService, "Premium")}
                  className="w-full mt-8 bg-[#d2b48c] text-[#1a1a1a] font-medium py-2 px-4 rounded-md hover:bg-[#c19a6b] transition-colors"
                >
                  Choose Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="flex justify-center items-center py-10">
          <Form service={selectedPlan.service} pack={selectedPlan.pack} onBack={handleBackToPlans} />
        </div>
      )}
    </div>
  )
}

export default PlansPage

