export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-secondary)]">
      <header className="bg-[var(--color-primary)] shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Doctor Appointments</h1>
          <nav>
            <ul className="flex space-x-6">
              {['Features','How It Works','Pricing'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                     className="hover:underline hover:text-[var(--color-accent)] transition">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="/login" className="font-medium hover:underline hover:text-[var(--color-accent)]">Log In</a>
              </li>
              <li>
                <a href="/signup" className="bg-[var(--color-accent)] text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
                  Sign Up
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="relative bg-cover bg-center py-24"
               style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/80 to-[var(--color-accent)]/40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Transform Clinic Scheduling
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            A smarter way to book, manage, and grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup"
               className="bg-white text-[var(--color-bg)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started Free
            </a>
            <a href="#how-it-works"
               className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[var(--color-bg)] transition">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Other sections follow with consistent use of the --color- variables */}

      <footer className="bg-[var(--color-primary)] text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} MediBook. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            {['Privacy Policy','Terms of Service','Support'].map((link) => (
              <a key={link} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
