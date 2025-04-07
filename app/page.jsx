import Nav from "@/src/components/Nav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Nav />

      {/* Add padding top to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 to-white py-20 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Create your own Business scheme
                </h1>
                <p className="text-gray-600 mb-8">
                  Get started with our expert tools and resources to build your
                  dream business
                </p>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition">
                  Get Started
                </button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://validthemes.net/site-template/dostart/assets/img/illustration/6.png"
                  alt="Business Illustration"
                  width={500}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-6 rounded-lg bg-white shadow-lg">
                <div className="w-12 h-12 bg-pink-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-pink-500">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Feature Title</h3>
                <p className="text-gray-600">
                  Description of the amazing feature that helps businesses grow.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Startup Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-pink-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Designed for startups with expert developer
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-pink-500">✓</span>
                    <span>Expert guidance and support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-pink-500">✓</span>
                    <span>Customizable solutions</span>
                  </li>
                </ul>
                <button className="mt-8 bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition">
                  Learn More
                </button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://validthemes.net/site-template/dostart/assets/img/illustration/12.png"
                  alt="Startup"
                  width={500}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>



        {/* Testimonials Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-900 text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Customer Review
            </h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src="/testimonial.jpg"
                    alt="Customer"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg mb-4">
                  "Amazing service and support! Highly recommended for any
                  startup looking to grow."
                </p>
                <h4 className="font-semibold">Happy Customer</h4>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Question and Answer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((faq) => (
                <div key={faq} className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-3">
                    Common Question {faq}?
                  </h3>
                  <p className="text-gray-600">
                    Detailed answer to the common question that helps users
                    understand our service better.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

     

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-pink-500 text-white">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Try Launch Today!
            </h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Get started with our platform and take your business to the next
              level
            </p>
            <button className="bg-white text-pink-500 px-8 py-3 rounded-full hover:bg-gray-100 transition">
              Get Started Now
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Let's Talk About You
                </h3>
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div>
                <Image
                  src="/contact-illustration.svg"
                  alt="Contact"
                  width={500}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">About Us</h3>
                <p className="text-gray-400">
                  Short description about the company and its mission.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Connect</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
