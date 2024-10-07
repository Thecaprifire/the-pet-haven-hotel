import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../utils/mutations'; // Import LOGIN_USER mutation
import Auth from '../utils/auth'; // Import the Auth instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignUp = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [pets, setPets] = useState([{ name: '', gender: '', age: '', breed: '', notes: '' }]);
    const [register] = useMutation(REGISTER_USER);
    const [loginUser] = useMutation(LOGIN_USER); // Setup login mutation
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState('');
    const navigate = useNavigate(); // Initialize navigate for redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegistrationError('');
        setRegistrationSuccess('');

        const { password, confirmPassword, email } = userDetails;

        // Password validation
        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match.");
            return;
        }

        // Check for minimum password length
        if (password.length < 8) {
            setRegistrationError("Password must be at least 8 characters long.");
            return;
        }

        // Validate pet entries before submitting
        const updatedPets = pets.map(pet => ({
            ...pet,
            age: parseInt(pet.age, 10) >= 0 ? parseInt(pet.age, 10) : 0 // Ensure age is non-negative
        }));

        // Check for empty fields in pets
        for (const pet of updatedPets) {
            if (!pet.name || !pet.gender || !pet.breed) {
                setRegistrationError("Please fill out all pet details.");
                return;
            }
        }

        // Proceed with registration
        try {
            const { data: registerData } = await register({
                variables: {
                    ...userDetails,
                    pets: updatedPets,
                },
            });
            console.log('Registration successful:', registerData);

            // After successful registration, log the user in
            const { data: loginData } = await loginUser({
                variables: { email, password }
            });

            const { token } = loginData.login;
            Auth.login(token); // Save token to localStorage

            setRegistrationSuccess("Registration and login successful!");
            resetForm();
            navigate('/'); // Redirect to the main page after successful registration and login
        } catch (error) {
            console.error("Registration or login error:", error);
            const errorMessage = error.graphQLErrors?.[0]?.message || "Registration failed. Please check your inputs.";
            setRegistrationError(errorMessage);
        }
    };

    const handlePetChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPets = [...pets];
        updatedPets[index][name] = value;
        setPets(updatedPets);
    };

    const addPet = () => {
        setPets([...pets, { name: '', gender: '', age: '', breed: '', notes: '' }]);
    };

    const removePet = (index) => {
        if (window.confirm("Are you sure you want to remove this pet?")) {
            const updatedPets = pets.filter((_, i) => i !== index);
            setPets(updatedPets);
        }
    };

    const resetForm = () => {
        setUserDetails({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setPets([{ name: '', gender: '', age: '', breed: '', notes: '' }]);
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="font-bold text-2xl mb-4">Owner Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userDetails.firstName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userDetails.lastName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userDetails.username}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500 bg-transparent border-none cursor-pointer"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={userDetails.confirmPassword}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500 bg-transparent border-none cursor-pointer"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <h2 className="font-bold text-2xl mb-4">Pet Details</h2>
                {pets.map((pet, index) => (
                    <div key={index} className="border p-4 mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Pet Name"
                            value={pet.name}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                            required
                        />

                        <select
                            name="gender"
                            value={pet.gender}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2 text-gray-600"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={pet.age}
                            onChange={(e) => handlePetChange(index, e)} // Pass the event directly
                            className="border p-2 w-full mb-2"
                            required
                            min="0" // Prevent negative numbers
                        />
                        <input
                            type="text"
                            name="breed"
                            placeholder="Breed"
                            value={pet.breed}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <input
                            type="text"
                            name="notes"
                            placeholder="Notes"
                            value={pet.notes}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                        />
                        <button
                            type="button"
                            onClick={() => removePet(index)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Remove Pet
                        </button>
                    </div>
                ))}
                <div className="flex space-x-2">
                    <button type="button" onClick={addPet} className="bg-blue-500 text-white p-2 rounded">
                        Add Another Pet
                    </button>
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
                    Sign Up
                </button>
                {registrationError && <p className="text-red-500 mt-2">{registrationError}</p>}
                {registrationSuccess && <p className="text-green-500 mt-2">{registrationSuccess}</p>}
            </form>
        </div>
    );
};

export default SignUp;