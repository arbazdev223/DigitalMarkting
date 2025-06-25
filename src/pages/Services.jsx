import React from 'react'
import CourseTabs from '../components/CourseTabs'
import ServicesSection from '../components/ServicesSection'

const Services = () => {
  return (
    <>
<CourseTabs
  heading={<><span className="text-[#0e3477]">Career Courses</span></>}
  paragraph="We offer tailored courses to help students and businesses excel."
  maxCount={100}
  label="Load More Courses"
/>
<ServicesSection/>

</>
  )
}

export default Services