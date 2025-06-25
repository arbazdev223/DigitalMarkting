import React from 'react'

const FormControl = () => {
    
  return (
    <div>       <form className="space-y-3">
  <input
    type="text"
    placeholder="Full Name"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  />
  <input
    type="email"
    placeholder="Email"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  />
  <input
    type="tel"
    placeholder="Phone"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
  />
  <input
    type="text"
    placeholder="Subject"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
  />
  <textarea
    placeholder="Message"
    rows={4}
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  ></textarea>

  <div className="flex items-start gap-2">
    <input type="checkbox" id="policy" className="accent-white mt-1" required />
    <label htmlFor="policy" className="text-sm">
       I agree to the <a href="#" className="underline">DIDM Terms of Use</a> and <a href="#" className="underline">privacy policy</a>.
    </label>
  </div>

  <button
    type="submit"
    className="w-full bg-white text-[#0e3477] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
  >
    Submit
  </button>
</form></div>
  )
}

export default FormControl