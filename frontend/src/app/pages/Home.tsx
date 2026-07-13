import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Heart, Sun, MapPin, Globe, Sparkles, User, Calendar, MessageCircle, ClipboardList } from "lucide-react";
import { fetchServices } from "../../lib/api";
import { FALLBACK_SERVICES, normalizeServicesResponse } from "../../lib/services";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0-_Q7dRxEdjSYo0Q_39y3RbKJk3lzHgTwh5Fvh3RVctmh8Q/viewform?usp=send_form";

const heroSlides = [
  {
    src: "/img/hero/flower-in-hands.png",
    alt: "A white flower resting gently in open hands",
    fit: "cover",
  },
  {
    src: "/img/hero/lotus-pebbles-landscape.png",
    alt: "A white lotus resting above stacked pebbles and their reflection",
    fit: "cover",
  },
  {
    src: "/img/hero/moonlit-tree.png",
    alt: "A red-leafed tree beneath a pale moon in a quiet winter landscape",
    fit: "cover",
  },
];

function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      5000,
    );
    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };
  const showNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  return (
    <section className="relative left-1/2 flex min-h-[100svh] w-screen -translate-x-1/2 items-end overflow-hidden bg-[#111417] px-6 pb-10 pt-28 sm:min-h-screen sm:px-8 sm:pb-16 sm:pt-32 lg:px-12">
      <div className="absolute inset-0" aria-live="off">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            aria-hidden={index !== activeSlide}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.fit === "contain" && (
              <img
                src={slide.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-55 blur-2xl"
              />
            )}
            <img
              src={slide.src}
              alt={index === activeSlide ? slide.alt : ""}
              className={`absolute inset-0 h-full w-full ${
                slide.fit === "contain"
                  ? "object-contain object-center sm:object-right"
                  : "object-cover object-center"
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,20,23,0.72)_0%,rgba(17,20,23,0.46)_52%,rgba(17,20,23,0.1)_100%)] sm:bg-[linear-gradient(90deg,rgba(17,20,23,0.68)_0%,rgba(17,20,23,0.34)_50%,rgba(17,20,23,0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,20,23,0.48)_0%,transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(0deg,#F6D4B8_0%,rgba(246,212,184,0)_100%)]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#F0BD8B] sm:text-xs">
            Holistic Guidance Counsellor
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="no-section-marker mb-5 max-w-3xl font-serif text-[2.55rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
“Life is not about Perfection.
It is about alignment and balance.          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-4 max-w-2xl text-[0.95rem] leading-relaxed text-white/80 drop-shadow-md sm:text-lg">
            A safe space to release repetitive patterns, inherited fears, and anxiety - and gently return to the most aligned version of yourself.
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-7 font-serif text-base text-white sm:mb-10 sm:text-xl">
            Let&apos;s create your golden version, together.
          </motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link to="/booking" className="group flex w-full items-center justify-center gap-2 border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#001852] transition-colors duration-300 hover:bg-transparent hover:text-white sm:w-auto sm:text-base">
              Book Your Session <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/services" className="group flex w-full items-center justify-center gap-2 px-2 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:text-[#F0BD8B] sm:w-auto sm:text-base">
              Explore Services <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center gap-3 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0" aria-label="Hero slideshow controls">
          <button type="button" onClick={showPrevious} aria-label="Previous hero image" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#111417]/30 text-white backdrop-blur-sm transition hover:border-[#F0BD8B] hover:text-[#F0BD8B]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 px-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show hero image ${index + 1}`}
                aria-current={index === activeSlide}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeSlide ? "w-6 bg-[#F0BD8B]" : "w-2 bg-white/45 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <button type="button" onClick={showNext} aria-label="Next hero image" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#111417]/30 text-white backdrop-blur-sm transition hover:border-[#F0BD8B] hover:text-[#F0BD8B]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices()
      .then((res) => setDbServices(normalizeServicesResponse(res)))
      .catch(() => setDbServices(FALLBACK_SERVICES));
  }, []);

  const servicesData = [
    {
      title: "Clarity Call",
      desc: "A focused 30-minute conversation to find clarity and identify your next helpful step.",
      icon: Sparkles,
      bg: "bg-[#FDEBD0]",
      image: "/img/services/clarity-call.png",
    },
    {
      title: "Individual Therapy Sessions",
      desc: "One-on-one customised therapy for personal healing, emotional clarity, and inner alignment.",
      icon: User,
      bg: "bg-[#FDF3E6]", // Light Sand
      image: "/img/services/individual-therapy-relatable.png",
    },
    {
      title: "Adolescence Counselling",
      desc: "A safe, understanding space for teenagers to process emotions, change, and identity.",
      icon: Star,
      bg: "bg-[#FDEBD0]", // Light Orange
      image: "/img/services/adolescence-counselling-relatable.png",
    },
    {
      title: "Emotional Counselling",
      desc: "Compassionate support for understanding, processing, and healing difficult emotions.",
      icon: Heart,
      bg: "bg-[#FDF3E6]", // Light Sand
      image: "/img/services/emotional-counselling-relatable.png",
    },
    {
      title: "Relationship Counselling",
      desc: "Guidance for communication, attachment patterns, narcissistic abuse healing and healthier connections.",
      icon: MessageCircle,
      bg: "bg-[#FDEBD0]", // Light Orange
      image: "/img/services/relationship-counselling-relatable.png",
    },
    {
      title: "Issues Related to Repetitive Patterns in Life",
      desc: "Observe visible and hidden patterns, connect missing links, and begin resolving cycles.",
      icon: Sparkles,
      bg: "bg-[#FDF3E6]", // Light Sand
      image: "/img/services/repetitive-patterns-relatable.png",
    },
    {
      title: "Feeling 'Stuck in Life'",
      desc: "Therapeutic guidance for moments when life feels stagnant, unclear, or disconnected.",
      icon: Sun,
      bg: "bg-[#FDEBD0]", // Light Orange
      image: "/img/services/stuck-in-life-relatable.png",
    },
    {
      title: "Intergenerational Trauma Therapy",
      desc: "Structured work with inherited trauma, ancestral patterns, and family imprints.",
      icon: Sparkles,
      bg: "bg-[#FDF3E6]",
      image: "/img/services/rep_therapy.png",
    },
  ];

  const toolsUsed = [
    { name: "Inner Child Therapy", desc: "Healing early emotional wounds with care and awareness." },
    { name: "Attachment Trauma Therapy", desc: "Understanding relationship imprints and rebuilding secure connection." },
    { name: "CBT techniques", desc: "Working with thoughts, emotions, and behavioral patterns." },
    { name: "NLP tools and techniques", desc: "Practical language and perception tools for inner change." },
    { name: "Customised and guided Meditations", desc: "Meditative practices shaped around the client's process." },
    { name: "Self Analysis Techniques", desc: "Structured reflection to understand triggers and life patterns." },
    { name: "Art therapy", desc: "Creative expression as a doorway into emotional material." },
    { name: "Music therapy", desc: "Using sound and music as support for regulation and expression." },
    { name: "Representative Micro Constellation Work", desc: "A focused way to observe hidden relational and family dynamics." }
  ];

  const steps = [
    { title: "Select Service", desc: "Choose the counselling or therapy support that matches your present need.", icon: User },
    { title: "Pick a Time", desc: "Find a slot that works for you via our live availability calendar.", icon: Calendar },
    { title: "Begin Journey", desc: "Join your online or in-person session and begin the work with care.", icon: MessageCircle },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 sm:space-y-20 lg:space-y-24">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* Featured Services */}
      <section className="relative z-10 -mt-12 max-w-7xl mx-auto pt-10 sm:-mt-20 sm:pt-14 lg:-mt-24 lg:pt-16">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#001852] mb-4">
            Our Core Services
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#001852] max-w-xl mx-auto text-base sm:text-lg">
            Compassionate, structured guidance tailored to your unique emotional and psychological footprint.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {servicesData.map((service, idx) => {
            const dbService = dbServices.find(s => s.title === service.title);
            const bookingLink = dbService ? `/booking?service=${dbService.id}` : "/booking";

            return (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className={`rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden ${service.bg} group flex flex-col h-full shadow-sm`}>
              <div className="h-48 sm:h-56 overflow-hidden relative">
                <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.015] group-active:scale-[1.015]" />
                <div className="absolute inset-0 bg-white/5 transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white/60 backdrop-blur-sm">
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                    <service.icon className="w-6 h-6 text-[#E84C3D]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#001852] mb-3">{service.title}</h3>
                  <p className="text-[#001852] leading-relaxed mb-6">{service.desc}</p>
                </div>
                <Link to={bookingLink} className="group/link inline-flex items-center text-[#E84C3D] font-semibold transition-colors duration-300 gap-2 hover:text-[#C0392B]">
                  Book Session <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          )})}
        </div>
      </section>

      {/* Tools Used */}
      <section className="max-w-5xl mx-auto bg-[#FDF3E6]/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-5 sm:p-10 md:p-16 text-center shadow-inner">
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#001852] mb-8">
          Therapeutic Tools & Techniques
        </motion.h2>
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 text-left sm:text-center">
          {toolsUsed.map((tool, idx) => (
            <div key={idx} tabIndex={0} className="group relative bg-white px-5 py-4 sm:px-6 sm:py-3 rounded-2xl sm:rounded-full text-[#001852] font-medium shadow-sm hover:shadow-md transition-all border border-[#E5BE90]/30 hover:border-[#E84C3D]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84C3D]/30 cursor-default">
              <span className="flex items-start sm:inline gap-2">
                <Sparkles className="w-4 h-4 mt-1 sm:mt-0 sm:inline-block sm:mr-2 text-[#E84C3D] shrink-0" /> {tool.name}
              </span>
              <span className="mt-2 block text-sm font-normal leading-relaxed text-[#001852] sm:hidden">{tool.desc}</span>
              
              <div className="absolute hidden opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-[#001852] text-white text-xs px-3 py-2 rounded-lg pointer-events-none z-20 shadow-lg text-center sm:block">
                {tool.desc}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-opacity-0 border-4 border-t-[#001852]"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="bg-white/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#001852] mb-4">How It Works</h2>
            <p className="text-[#001852] text-base sm:text-lg">A simple way to find alignment and confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-[#FFF5EA]" />
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#FFF5EA] border-4 border-white shadow-md flex items-center justify-center mb-6">
                  <step.icon className="w-10 h-10 text-[#E84C3D]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#001852] mb-3">
                  <span className="text-[#E5BE90] mr-2">0{idx + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-[#001852] max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Person vs Online */}
      <section className="bg-white/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#001852]">
            Find Guidance Wherever You Are
          </h2>
          <p className="text-base sm:text-lg text-[#001852] leading-relaxed">
            Whether you prefer the grounding energy of an in-person session or the convenience of remote therapy, KosmicAlign is structured to meet you where you are.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5BE90]/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#E5BE90]" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-[#001852] mb-1">In-Person in Delhi</h4>
                <p className="text-[#001852]">Visit our serene wellness space in the heart of Delhi for a deeply personal, grounded experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E84C3D]/20 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#E84C3D]" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-[#001852] mb-1">Online Worldwide</h4>
                <p className="text-[#001852]">Connect online for structured therapy sessions from the comfort of your home, anywhere in the world.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        id="journey"
        variants={itemVariants}
        className="grid overflow-hidden rounded-[1.75rem] bg-white/90 shadow-[0_8px_32px_rgba(88,88,88,0.02)] sm:rounded-[2.5rem] md:grid-cols-[1fr_minmax(0,0.95fr)]"
      >
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 md:px-14">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-[#001852] sm:text-4xl">
            Your journey
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[#001852] sm:text-lg">
            It is an ongoing journey which may take multiple sessions for each client, the number of sessions may vary in each individual's life.
          </p>
        </div>
        <div className="min-h-52 overflow-hidden bg-[#FDF3E6] sm:min-h-64 md:min-h-full">
          <img
            src="/img/journey-growth.png"
            alt="Plants growing from seedlings into blooming roses"
            loading="lazy"
            className="h-full w-full scale-[1.16] object-cover object-center"
          />
        </div>
      </motion.section>

      {/* Client Intake */}
      <section className="bg-white/90 rounded-[1.75rem] sm:rounded-[2.5rem] py-12 sm:py-16 px-5 sm:px-6 md:px-12 text-center relative overflow-hidden shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF5EA] rounded-full blur-[100px]" />

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full bg-[#FFF5EA] border border-[#E5BE90]/30 flex items-center justify-center mx-auto mb-7 shadow-sm">
            <ClipboardList className="w-7 h-7 text-[#E84C3D]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#001852] mb-4">
            Client Intake Form
          </h2>
          <p className="text-[#001852] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Share a little about what brings you here so your first conversation can begin with care, context, and clarity.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E84C3D] text-white rounded-full font-semibold transition-colors duration-300 hover:bg-[#C0392B]"
          >
            Complete Intake Form <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
}
