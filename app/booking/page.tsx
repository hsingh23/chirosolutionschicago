'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function Booking() {
  useEffect(() => {
    // This effect will run after the component mounts
    const script = document.createElement('script')
    script.src = 'https://www.schedulicity.com/scheduling/NCST6P/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Your Appointment</h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Choose your preferred service and time slot
        </p>

        <div id="SCHED_NCST6P" className="w-full max-w-3xl mx-auto">
          {/* Schedulicity widget will be loaded here */}
        </div>

        <Script
          src="https://www.schedulicity.com/scheduling/NCST6P/widget.js"
          strategy="lazyOnload"
        />
      </div>
    </div>
  )
}

