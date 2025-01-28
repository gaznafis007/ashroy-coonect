'use client';
import React from 'react'
import Button from '../Button/Button'

 const Feedback = () =>{
    const handleFeedback = (event) =>{
        event.preventDefault()
        const form = event.target
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;
        const feedback = {
            name,
            email,
            phone,
            message
        }
        console.log(feedback)
        form.reset()
    }
return (
    <section className='mx-4 md:mx-12 my-4 md:my-12'>
        <div className="flex flex-col space-y-8 md:space-y-16 bg-yellow-400 rounded-xl p-12 md:p-24 items-center justify-center">
            {/* text section */}
            <div className="flex flex-col space-y-4">
                <h2 className="font-semibold text-4xl text-center">Contact Us</h2>
                <p className="font-thin text-center">Please feel free to give us any feedback and you can also let us know were should we go next</p>
            </div>
            {/* form section */}
            <form onSubmit={handleFeedback} className='flex flex-col space-y-2 md:space-y-4 w-full md:w-1/2'>
                <div className="flex flex-col space-y-3 md:space-y-6">
                    <label className='font-thin text-xl md:text-2xl'>Your name</label>
                    <input type="text" name="name" placeholder='John Doe' className="px-3 py-4 border border-yellow-600 text-gray-600 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-3 md:space-y-6">
                    <label className='font-thin text-xl md:text-2xl'>Your Email</label>
                    <input type="text" name="email" placeholder='john@gmail.com' className="px-3 py-4 border border-yellow-600 text-gray-600 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-3 md:space-y-6">
                    <label className='font-thin text-xl md:text-2xl'>Contact No</label>
                    <input type="text" name="phone" placeholder='015XXXXX' className="px-3 py-4 border border-yellow-600 text-gray-600 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-3 md:space-y-6">
                    <label className='font-thin text-xl md:text-2xl'>Message</label>
                    <textarea type="text" name="message" placeholder='you message' className="px-3 py-4 border border-yellow-600 text-gray-600 rounded-xl" rows={3}></textarea>
                </div>
                <Button type={'submit'} bg={'bg-black'}>Send us</Button>
            </form>
        </div>
    </section>
)
}

export default Feedback