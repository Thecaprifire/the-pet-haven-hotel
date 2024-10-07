import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BOOK_SERVICES } from '../utils/mutations'; // Assuming there's a BOOK_SERVICES mutation
import Auth from '../utils/auth'; // Import for authentication handling
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and service ID from URL

const Booking = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams(); // Get the serviceId from URL

    const [formData, setFormData] = useState({
        serviceId: serviceId || '', // Default to serviceId from params if available
        date: '',
        time: '',
        petName: ''
    });

    const [bookServices] = useMutation(BOOK_SERVICES);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!Auth.loggedIn()) {
            alert('Please log in to book a service.');
            navigate('/login'); // Redirect to login page if not logged in
            return;
        }

        const currentUser = Auth.getProfile(); // Get the logged-in user's profile

        // Check if all fields are filled
        if (!formData.serviceId || !formData.date || !formData.time || !formData.petName) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            // Call the booking mutation
            const { data } = await bookServices({
                variables: {
                    userId: currentUser.data._id, // The logged-in user's ID
                    serviceIds: [formData.serviceId], // Selected service
                    date: formData.date,
                    time: formData.time,
                    petName: formData.petName
                }
            });

            alert('You successfully booked!');
            navigate('/profile'); // Redirect to the profile page after booking
        } catch (err) {
            console.error(err);
            alert('Failed to book the service.');
        }
    };

    return (
        <main className="mt-16 p-4 pt-20 bg-gray-800 text-gray-300 min-h-screen">
            <div className="max-w-xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center text-cyan-600">Book a Service</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Select Service */}
                    <div>
                        <label htmlFor="serviceId" className="block text-gray-300 text-lg">
                            Select Service
                        </label>
                        <select
                            id="serviceId"
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded"
                        >
                            <option value="">Choose a service</option>
                            <option value="1">Basic</option>
                            <option value="2">Standard</option>
                            <option value="3">Premium</option>
                            <option value="4">Deluxe</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-gray-300 text-lg">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label htmlFor="time" className="block text-gray-300 text-lg">
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded"
                        />
                    </div>

                    {/* Pet Name */}
                    <div>
                        <label htmlFor="petName" className="block text-gray-300 text-lg">
                            Pet Name
                        </label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            value={formData.petName}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded"
                            placeholder="Enter your pet's name"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 text-white py-3 px-6 rounded hover:bg-cyan-700 transition duration-300"
                        >
                            Book
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Booking;