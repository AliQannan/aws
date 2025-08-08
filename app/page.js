
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-600">Doctor Appointments</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-700 hover:text-teal-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hover:text-teal-600 transition">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-700 hover:text-teal-600 transition">Pricing</a></li>
              <li><a href="/login" className="text-teal-600 hover:underline font-medium">Log In</a></li>
              <li><a href="/signup" className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-24"
        style={{ backgroundImage: "url('/path/to/medical-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/80 to-teal-500/40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Book Doctor Appointments Instantly</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Streamline scheduling—no more phone calls or waiting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Get Started Free</a>
            <a href="#how-it-works" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition">See How It Works</a>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* ...rest of your sections unchanged, but consider swapping icon colors to teal accents ... */}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Clinic?</h2>
          <p className="text-xl opacity-90 mb-8">Join clinics saving time and delighting patients.</p>
          <a href="/signup" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block">Start Free Trial</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} MediBook. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
