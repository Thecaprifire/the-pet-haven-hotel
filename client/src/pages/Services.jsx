import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Auth from '../utils/auth'; // Import the Auth instance for authentication handling

// Services data
const servicesList = [
    {
        id: '1',
        name: 'Basic',
        description: 'Pamper your pet with our essential spa services, perfect for a quick refresh. This package includes a gentle shampoo bath, a thorough coat brushing, ear cleaning, and a nail trim. Your pet will leave feeling clean and rejuvenated.',
        price: 20,
        tier: 'Basic',
        image: 'images/basic.jpg',
        backgroundColor: '#f0f8ff' // Light blue background
    },
    {
        id: '2',
        name: 'Standard',
        description: 'Upgrade your pet’s spa experience with our Standard Package. Along with all the Basic services, your pet will enjoy a deep conditioning treatment to soften and detangle their coat, followed by a relaxing paw massage. This package also includes a spritz of our signature pet-safe fragrance.',
        price: 40,
        tier: 'Standard',
        image: '/images/standard.jpg',
        backgroundColor: '#ffffff' // White background
    },
    {
        id: '3',
        name: 'Premium',
        description: 'Our Premium Package offers a luxurious spa experience for your pet. In addition to all Standard services, this package includes a soothing oatmeal or hypoallergenic bath tailored to their skin type, teeth brushing for fresh breath, and a blueberry facial to brighten their fur. Your pet will feel pampered from head to tail.',
        price: 60,
        tier: 'Premium',
        image: '/images/premium.jpg',
        backgroundColor: '#f0f8ff' // Light blue background
    },
    {
        id: '4',
        name: 'Deluxe',
        description: 'For the ultimate spa indulgence, treat your pet to our Deluxe Package. This all-inclusive experience features everything from the Premium Package, plus a full-body massage to ease tension, a warm towel wrap for deep relaxation, and a personalized grooming session tailored to their unique style. We will finish with a gourmet treat and a complimentary bandana or bow.',
        price: 80,
        tier: 'Deluxe',
        image: '/images/deluxe.jpg',
        backgroundColor: '#ffffff' // White background
    }
];

const ServiceCard = ({ service, onBook }) => {
    return (
        <div
            key={service.id}
            className="rounded-lg shadow-md mb-4 w-full flex flex-col md:flex-row bg-gray-800 text-gray-300"
            style={{ backgroundColor: service.backgroundColor }}
        >
            <div className="relative w-full md:w-3/3 h-full">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-between p-4 w-full">
                <h2 className="text-4xl font-semibold mb-4 text-cyan-600">{service.name}</h2>
                <p>{service.description}</p>
                <p className="text-xl mt-2 text-cyan-600">Price: ${service.price}</p>
                
                <button
                    onClick={onBook} // Redirect to Booking page
                    className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition duration-300"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

const Services = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleBookNow = (serviceId) => {
        const currentUser = Auth.getProfile(); // Get current user's profile
        
        if (!Auth.loggedIn()) {
            alert("User is not authenticated.");
            navigate('/login'); // Redirect to login page if user is not authenticated
            return;
        }

        // Redirect to Booking page with the selected service ID
        navigate(`/booking/${serviceId}`);
    };

    return (
        <main className="mt-16 p-4 pt-20 bg-gray-800 text-gray-300">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-bold mt-8 mb-8 text-center text-cyan-600 shadow-lg">Our Services</h1>
                <ul className="mt-4 space-y-4 w-4/5 flex flex-col items-center">
                    {servicesList.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onBook={() => handleBookNow(service.id)} // Pass the service ID to the booking handler
                        />
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Services;