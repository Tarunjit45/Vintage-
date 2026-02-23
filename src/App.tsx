import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Menu, 
  X, 
  ArrowRight, 
  Star,
  Search,
  Check
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-white z-50 relative">
            VANTAGE<span className="text-gold-400">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-gold-400 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden z-50 relative">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-gold-400 transition-colors"
            >
              <Search size={20} />
            </button>
            <button 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
            >
              <div className="flex flex-col space-y-8 text-center">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-2xl font-serif text-white hover:text-gold-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-3xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, products, or styles..."
                className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-5xl font-serif text-white placeholder-white/20 py-4 focus:outline-none focus:border-gold-400 transition-colors text-center"
                autoFocus
              />
              <p className="text-center text-gray-500 mt-4 text-sm uppercase tracking-widest">Press Enter to Search</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Barber working" 
          className="w-full h-full object-cover grayscale contrast-125"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gold-400 uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-medium"
        >
          Est. 2024 • Los Angeles
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 tracking-tight leading-none"
        >
          VANTAGE<br/>GROOMING
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a 
            href="#contact" 
            className="inline-block border border-white/30 hover:border-gold-400 hover:text-gold-400 text-white px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white/5"
          >
            Book Appointment
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" 
              alt="Barber tools" 
              className="w-full aspect-[4/5] object-cover grayscale contrast-110"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold-400/30 hidden md:block" />
          </motion.div>
        </div>
        
        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">The Art of <span className="text-gold-400 italic">Precision</span></h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              At Vantage, we believe that grooming is not just a routine, but a ritual. Our master barbers combine traditional techniques with modern style to create a look that is uniquely yours.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Located in the heart of the city, our space is designed to be a sanctuary where you can relax, unwind, and leave feeling your absolute best. We don't just cut hair; we cultivate confidence.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-3xl font-serif text-white mb-2">15+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif text-white mb-2">5k+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500">Happy Clients</p>
              </div>
            </div>

            <a href="#services" className="text-gold-400 hover:text-white transition-colors inline-flex items-center gap-2 uppercase text-xs tracking-widest">
              View Services <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "The Signature Cut",
      price: "$45",
      description: "Consultation, precision haircut, hot towel finish, and styling.",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Classic Shave",
      price: "$35",
      description: "Traditional straight razor shave with hot towels and essential oils.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Beard Sculpting",
      price: "$25",
      description: "Expert trimming and shaping to compliment your facial structure.",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "The Full Service",
      price: "$75",
      description: "Haircut, beard trim, and facial treatment for the ultimate refresh.",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 uppercase tracking-widest text-xs font-bold">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Services & Pricing</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden bg-zinc-900 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-serif text-white">{service.title}</h3>
                    <span className="text-gold-400 font-serif text-lg">{service.price}</span>
                  </div>
                  <div className="w-12 h-[1px] bg-white/30 mb-4 group-hover:w-full transition-all duration-500" />
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1593702295094-aea8c5c13d73?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635273051937-93c4d3063ceb?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop"
  ];

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div>
            <span className="text-gold-400 uppercase tracking-widest text-xs font-bold">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Selected Works</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-white hover:text-gold-400 transition-colors uppercase text-xs tracking-widest mt-6 md:mt-0">
            Follow on Instagram <Instagram size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square overflow-hidden relative group"
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Scissors className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-white hover:text-gold-400 transition-colors uppercase text-xs tracking-widest">
            Follow on Instagram <Instagram size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-zinc-900 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Star className="w-8 h-8 text-gold-400 mx-auto mb-8" fill="currentColor" />
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-serif italic leading-relaxed text-white mb-8"
        >
          "Hands down the best grooming experience in the city. The attention to detail is unmatched, and the atmosphere is pure class."
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white font-bold uppercase tracking-widest text-sm">James Sterling</p>
          <p className="text-gray-500 text-xs mt-1">Regular Client</p>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-gold-400 uppercase tracking-widest text-xs font-bold">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-8">Book Your Visit</h2>
          <p className="text-gray-400 mb-12 max-w-md">
            Ready for an upgrade? Book your appointment online or give us a call. Walk-ins are welcome based on availability.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-gold-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-white font-serif text-lg mb-1">Location</h4>
                <p className="text-gray-400">1234 Sunset Boulevard<br/>Los Angeles, CA 90026</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="text-gold-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-white font-serif text-lg mb-1">Contact</h4>
                <p className="text-gray-400">+1 (555) 123-4567<br/>hello@vantagegrooming.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-gold-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-white font-serif text-lg mb-1">Hours</h4>
                <p className="text-gray-400">Mon - Fri: 10am - 8pm<br/>Sat: 9am - 6pm<br/>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 md:p-12 border border-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-zinc-900 z-10"
              >
                <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center mb-6">
                  <Check className="text-gold-400 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Booking Confirmed</h3>
                <p className="text-gray-400">We'll see you soon. Check your email for details.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-gold-400 hover:text-white text-sm uppercase tracking-widest"
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
                    <input required type="text" className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Phone</label>
                    <input required type="tel" className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                  <input required type="email" className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Service</label>
                  <select className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors appearance-none">
                    <option>The Signature Cut</option>
                    <option>Classic Shave</option>
                    <option>Beard Sculpting</option>
                    <option>The Full Service</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Message (Optional)</label>
                  <textarea className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold-400 outline-none transition-colors h-32" placeholder="Any special requests?"></textarea>
                </div>
                <button 
                  disabled={formState === 'submitting'}
                  className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gold-400 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Processing...' : 'Confirm Booking'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-serif font-bold tracking-tighter text-white">
          VANTAGE<span className="text-gold-400">.</span>
        </div>
        
        <div className="text-gray-500 text-sm text-center md:text-left">
          <p>© 2024 Vantage Grooming Co. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-60">
            Developed by <span className="text-white">Conflux.ai</span> | <a href="mailto:confluxdotai@gmail.com" className="hover:text-gold-400 transition-colors">confluxdotai@gmail.com</a>
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-gold-400 selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
