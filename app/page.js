// app/page.js (or pages/index.js)
// Requires: Tailwind CSS configured. Paste as a single React component file.
"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // Theme variables (google/tabnine-like accent)
  const THEME = {
    primary: "#1A73E8", // blue
    accent: "#34A853",  // green
    surface: "#0F1724", // dark surface for hero CTA
  };

  // Pricing tab state
  const [plan, setPlan] = useState("starter");

  // Testimonials carousel
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  // Intersection reveal for sections
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // simple counter animation when visible
  const counterRef = useRef(null);
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const targets = el.querySelectorAll("[data-target]");
          targets.forEach((node) => {
            const to = Number(node.getAttribute("data-target"));
            let cur = 0;
            const step = Math.max(1, Math.floor(to / 60));
            const t = setInterval(() => {
              cur += step;
              if (cur >= to) {
                node.innerText = to.toLocaleString();
                clearInterval(t);
              } else node.innerText = cur.toLocaleString();
            }, 12);
          });
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased text-slate-900" style={{ "--primary": THEME.primary, "--accent": THEME.accent }}>
      {/* Top bar */}
      <nav className="backdrop-blur sticky top-0 z-50 bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,var(--primary),var(--accent))" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0zm9-6v6l4 2" />
              </svg>
            </div>
            <span className="font-semibold text-lg">aliqannan</span>
            <span className="text-sm text-slate-500 ml-2 hidden md:inline">Smart scheduling for clinics</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-700 hover:text-[var(--primary)] transition">Features</a>
            <a href="#pricing" className="text-slate-700 hover:text-[var(--primary)] transition">Pricing</a>
            <a href="#docs" className="text-slate-700 hover:text-[var(--primary)] transition">Docs</a>
            <a href="/login" className="text-slate-700 hover:text-[var(--primary)] transition">Log in</a>
            <a
              href="/signup"
              className="ml-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[var(--primary)] text-white hover:opacity-95 transition"
            >
              <strong>Get Started</strong>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="white" d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <MobileMenu />
        </div>
      </nav>

      {/* HERO */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm text-slate-700">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} /> New: AI-powered reminders
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Book, manage and grow — <span className="text-[var(--primary)]">clinic scheduling</span> simplified.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              An intelligent scheduling platform for clinics: instant bookings, calendar sync, automated reminders, and analytics — all in one modern, secure dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/signup" className="inline-flex items-center justify-center gap-3 rounded-lg px-6 py-3 bg-[var(--primary)] text-white shadow hover:scale-[.998] transition">
                Start free trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 border border-slate-200 bg-white text-slate-700 hover:shadow-sm transition">
                How it works
              </a>
            </div>

            <div className="mt-4 flex gap-6 items-center text-sm text-slate-500">
              <div className="flex items-center gap-3" ref={counterRef}>
                <div>
                  <div className="text-2xl font-bold" data-target="4200">0</div>
                  <div className="text-xs">Appointments booked / mo</div>
                </div>
                <div className="border-l h-6 w-0 border-slate-200" />
                <div>
                  <div className="text-2xl font-bold" data-target="1200">0</div>
                  <div className="text-xs">Active clinics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - mock dashboard preview */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="rounded-xl shadow-xl overflow-hidden ring-1 ring-black/5">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-80">Clinic</div>
                    <div className="text-lg font-semibold">Sunrise Health</div>
                  </div>
                  <div className="text-sm opacity-80">UTC +3</div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/6 p-3">
                    <div className="text-xs opacity-80">Next</div>
                    <div className="font-medium mt-1">John Doe • 09:30</div>
                    <div className="text-[13px] opacity-70 mt-1">General Checkup</div>
                  </div>
                  <div className="rounded-lg bg-white/6 p-3">
                    <div className="text-xs opacity-80">Calendar</div>
                    <div className="font-medium mt-1">3 open slots</div>
                    <div className="text-[13px] opacity-70 mt-1">Dr. Ayman</div>
                  </div>
                </div>
 <div> 
            make a new adham qannan
            </div>
                <div className="mt-6">
                  <div className="text-xs opacity-80">Revenue</div>
                  <div className="text-2xl font-bold">$9,420 <span className="text-sm opacity-70">/ mo</span></div>
                </div>
              </div>

              <img
                src="https://images.unsplash.com/photo-1580281657521-24f5f6219f9e?auto=format&fit=crop&w=1200&q=60"
                alt="dashboard preview"
                className="w-full object-cover h-44"
              />
            </div>
          </div>
        </div>

        {/* subtle angled divider */}
        <div className="h-8 bg-gradient-to-r from-transparent to-white"></div>
      </header>

      {/* FEATURES */}
      <main className="max-w-7xl mx-auto px-6 -mt-4">
        <section id="features" className="py-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <article key={f.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{f.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="bg-white rounded-xl p-8 shadow-md grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold">How it works</h2>
              <p className="text-slate-600 mt-2">Connect your calendar, add providers, share booking links — that's it. Patients book, reminders get sent, and your schedule stays tidy.</p>

              <ol className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-medium">1</div>
                  <div>
                    <div className="font-medium">Connect Calendars</div>
                    <div className="text-sm text-slate-500">Google / Outlook sync</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--primary)] text-white flex items-center justify-center font-medium">2</div>
                  <div>
                    <div className="font-medium">Share Booking Links</div>
                    <div className="text-sm text-slate-500">Embedded widget or shareable link</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center font-medium">3</div>
                  <div>
                    <div className="font-medium">Automate Reminders</div>
                    <div className="text-sm text-slate-500">SMS / Email reminders reduce no-shows</div>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <img src="https://source.unsplash.com/800x600/?healthcare,app" alt="how it works" className="rounded-lg shadow-sm w-full object-cover h-64" />
            </div>
          </div>
        </section>

        {/* PRICING (tabs) */}
        <section id="pricing" className="py-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Plans for clinics of any size</h2>
              <p className="text-slate-600">Simple predictable pricing — upgrade or cancel anytime.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className={plan === "starter" ? "font-semibold text-slate-800" : ""}>
                <button onClick={() => setPlan("starter")}>Monthly</button>
              </span>
              <span>•</span>
              <span className={plan === "enterprise" ? "font-semibold text-slate-800" : ""}>
                <button onClick={() => setPlan("enterprise")}>Annual (save 2 months)</button>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div key={p.id} className={`rounded-xl p-6 shadow-sm border ${p.recommended ? "ring-2 ring-[var(--primary)]/20" : ""} bg-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-slate-500">{p.subtitle}</p>
                  </div>
                  {p.recommended && <div className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Popular</div>}
                </div>

                <div className="mt-6">
                  <div className="text-3xl font-bold">
                    {plan === "starter" ? p.price.month : p.price.year}
                    <span className="text-sm text-slate-500">/{plan === "starter" ? "mo" : "yr"}</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{p.description}</div>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="mt-1 text-[var(--primary)]" fill="none">
                        <path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="/signup" className="mt-6 inline-block w-full text-center rounded-lg px-4 py-3 bg-[var(--primary)] text-white font-medium hover:opacity-95 transition">Start {p.title}</a>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="rounded-xl p-6 bg-gradient-to-r from-white to-white/95 shadow grid md:grid-cols-3 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold">Loved by clinics worldwide</h3>
              <p className="text-slate-600 mt-2">Real results from real users.</p>
            </div>

            <div className="md:col-span-2">
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  {TESTIMONIALS.map((t, i) => (
                    <blockquote
                      key={t.name}
                      className={`min-w-full transition-transform duration-500 ${i === tIndex ? "translate-x-0" : i < tIndex ? "-translate-x-full" : "translate-x-full"}`}
                      aria-hidden={i !== tIndex}
                    >
                      <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex items-center gap-4">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-sm text-slate-500">{t.role}</div>
                          </div>
                        </div>
                        <p className="mt-4 text-slate-600">{t.quote}</p>
                      </div>
                    </blockquote>
                  ))}
                </div>

                {/* indicators */}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setTIndex(i)} className={`w-2 h-2 rounded-full ${i === tIndex ? "bg-[var(--primary)]" : "bg-slate-300"}`} aria-label={`Go to testimonial ${i+1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - accessible accordion */}
        <section id="docs" className="py-12 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold">Frequently asked</h3>
            <Accordion items={FAQ} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-lg">MediBook</div>
            <div className="mt-3 text-sm text-slate-600">Designed for clinics, built for reliability.</div>
          </div>

          <div className="flex gap-6">
            <div>
              <div className="font-medium">Product</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#docs">Docs</a></li>
              </ul>
            </div>

            <div>
              <div className="font-medium">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="font-medium">Subscribe</div>
            <p className="text-sm text-slate-600 mt-2">Get product updates and offers.</p>
            <form className="mt-3 flex gap-2">
              <input className="flex-1 rounded-lg px-3 py-2 border border-slate-200" placeholder="Your email" />
              <button type="submit" className="rounded-lg px-4 py-2 bg-[var(--primary)] text-white">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 py-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MediBook • Built with ❤️
        </div>
      </footer>

      {/* Small styles used for reveal */}
      <style jsx>{`
        .reveal { will-change: transform, opacity; }
        .reveal-visible { opacity: 1 !important; transform: none !important; }
        .reveal { opacity: 0; transform: translateY(24px); }
      `}</style>
    </div>
  );
}

/* -------------------------
   Subcomponents & data
   ------------------------- */

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="p-2 rounded-md">
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-slate-700">
          <path d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-4 top-16 bg-white shadow rounded-lg px-4 py-3 w-48">
          <a href="#features" className="block py-2 text-sm">Features</a>
          <a href="#pricing" className="block py-2 text-sm">Pricing</a>
          <a href="#docs" className="block py-2 text-sm">Docs</a>
          <a href="/login" className="block py-2 text-sm">Log in</a>
        </div>
      )}
    </div>
  );
}

function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="mt-4 space-y-2">
      {items.map((it, i) => (
        <div key={i} className="border border-slate-100 rounded-lg overflow-hidden">
          <button
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left px-4 py-3 flex justify-between items-center"
          >
            <span className="font-medium">{it.q}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" className={`transform transition ${openIndex === i ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
          {openIndex === i && <div className="px-4 py-3 text-sm text-slate-600 border-t border-slate-100">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---- Data ---- */

const FEATURES = [
  {
    title: "Instant Booking",
    body: "Publish a booking link and let patients self-schedule with validation and rules.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M7 3v4M17 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  },
  {
    title: "Calendar Sync",
    body: "Two-way sync with Google and Outlook to avoid double bookings.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  },
  {
    title: "Automated Reminders",
    body: "Reduce no-shows with SMS & email reminders that you can tailor per clinic.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v6M5 20h14M7 9h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  },
];

const PRICING = [
  {
    id: "basic",
    title: "Starter",
    subtitle: "For small clinics",
    price: { month: "$9", year: "$90" },
    description: "Essential features to get started.",
    features: ["Unlimited bookings", "1 clinic", "Email support"],
    recommended: false
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "Growing practices",
    price: { month: "$29", year: "$290" },
    description: "Advanced automation and analytics.",
    features: ["Everything in Starter", "Multi-staff", "SMS reminders", "Analytics"],
    recommended: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "Large clinics & hospitals",
    price: { month: "Custom", year: "Custom" },
    description: "SLA, dedicated support & integrations.",
    features: ["SAML SSO", "Dedicated onboarding", "Custom integrations"],
    recommended: false
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. Salma",
    role: "Clinic Owner • Cairo",
    quote: "MediBook cut our admin time by half — patients love the simplicity.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Dr. Ali",
    role: "GP • Ramallah",
    quote: "Syncing with Google Calendar was seamless and reliable.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Nora",
    role: "Practice Manager • Amman",
    quote: "Automated reminders reduced missed appointments dramatically.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
];

const FAQ = [
  { q: "Do you offer a free trial?", a: "Yes — 14-day free trial, no credit card required." },
  { q: "What payment methods are supported?", a: "We accept major credit cards and monthly invoicing for Enterprise." },
  { q: "Can I sync multiple calendars?", a: "Yes — connect multiple provider calendars per clinic." },
];
