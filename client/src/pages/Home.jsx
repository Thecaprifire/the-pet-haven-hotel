import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel'; // Import the carousel
import FooterInfo from '../components/FooterInfo'; // Import the new FooterInfo component

const Home = () => {
  return (
    <main className="mt-16 text-white bg-gray-800"> {/* Updated background and text color */}
      <div className="flex flex-col items-center">
        {/* Image Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <ImageCarousel />
        </div>

        {/* Welcome Section */}
        <div className="w-full max-w-6xl px-4 lg:px-24 text-center my-8">
          <h1 className="text-4xl font-bold text-cyan-600"> {/* Updated text color */}
            Pet Haven Hotel
          </h1>
          <h2 className="text-2xl my-2 text-gray-400"> {/* Updated text color */}
            Your pet's home away from home!
          </h2>
          <section className="mt-6">
            <h3 className="text-2xl text-cyan-600"> {/* Updated text color */}
              Welcome to Pet Haven Hotel
            </h3>
            <p className="mt-4 text-lg text-gray-300"> {/* Updated text color */}
              At Pet Haven Hotel, we provide a luxurious and caring environment for your beloved pets.
              Our experienced staff is dedicated to ensuring that every pet receives personalized attention and care.
            </p>
            <p className="mt-4 text-lg text-gray-300"> {/* Updated text color */}
              We offer a variety of services tailored to your pet's needs, including grooming, spa treatments,
              and comfortable accommodations. Your pet will enjoy playtime, relaxation, and a home-like atmosphere
              while you’re away.
            </p>
            <p className="mt-4 text-lg text-gray-300"> {/* Updated text color */}
              Come and experience the best in pet hospitality at Pet Haven Hotel. Your furry friend will thank you!
            </p>
          </section>
        </div>

        {/* Services Button */}
        <div className="mt-10">
          <Link to="/services">
            <button className="bg-cyan-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-cyan-700 transition duration-300">
              Check Out Our Services!
            </button>
          </Link>
        </div>

        {/* Testimonials Section */}
            <div className="relative w-full mt-20 mb-20">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center h-96"
                style={{ backgroundImage: "url('/images/dog-tub.jpg')" }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-70"></div> {/* Darker gray overlay for better contrast */}
              </div>

              {/* Centered Testimonials */}
              <div className="relative z-100 flex flex-col items-center justify-center h-full p-8 text-white text-center"> {/* White text */}
                <h2 className="text-3xl font-bold mb-6 text-white"> {/* White heading */}
                  In The Press
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10"> {/* Adjusted for responsiveness */}
                  {/* Testimonial 1 */}
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-xs z-100"> {/* Dark gray background with white text */}
                    <p className="text-white italic">
                      "I can’t recommend Pet Haven Hotel enough! You guys! The luxurious spa services transformed my anxious dog into a calm and happy pup. It is the best! The staff is incredibly attentive and truly understands how to pamper pets."
                    </p>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-xs z-100"> {/* Dark gray background with white text */}
                    <p className="text-white italic">
                      "Pet Haven Hotel is more than just a place to stay; it's a spa retreat for my cat! The grooming services are exceptional, and I appreciate the holistic approach to pet care. My fur baby always looks and feels amazing after her stays!"
                    </p>
                  </div>
                  {/* Testimonial 3 */}
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-xs z-100"> {/* Dark gray background with white text */}
                    <p className="text-white italic">
                      "Pet Haven Hotel is a true paradise for my pup! The spa treatments are top-notch, and I love that they offer massages and facials for pets. My dog comes home feeling relaxed and rejuvenated!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

        {/* Footer Information Section */}
        <FooterInfo /> {/* Add FooterInfo here */}
      </div>
    </main>
  );
};

export default Home;