import React from 'react'

const CardPopUp = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [course, setCourse] = React.useState(null);
    const getDatafROMLocalStorage = () => {
        const storedCourse = localStorage.getItem('cart');
        if (storedCourse) {
            setCourse(JSON.parse(storedCourse));
        }
        console.log("Course from localStorage:", storedCourse);
    }
  return (
    <>
    <div className='max-w-2xl'>

    </div>
    
    
    
    </>
  )
}

export default CardPopUp