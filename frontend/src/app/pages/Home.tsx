import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, Sun, MapPin, Globe, Sparkles, User, Calendar, MessageCircle, ClipboardList } from "lucide-react";
import { fetchServices } from "../../lib/api";
import { FALLBACK_SERVICES, normalizeServicesResponse } from "../../lib/services";
import { InstagramFeed } from "../components/InstagramFeed";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0-_Q7dRxEdjSYo0Q_39y3RbKJk3lzHgTwh5Fvh3RVctmh8Q/viewform?usp=send_form";

const fallingPetals = [
  { x: "58%", y: "13%", size: 12, delay: 0, drift: 18 },
  { x: "63%", y: "20%", size: 9, delay: 0.35, drift: -14 },
  { x: "69%", y: "9%", size: 13, delay: 0.7, drift: 12 },
  { x: "74%", y: "24%", size: 8, delay: 1.05, drift: -10 },
  { x: "80%", y: "14%", size: 11, delay: 1.4, drift: 16 },
  { x: "86%", y: "23%", size: 9, delay: 1.75, drift: -12 },
  { x: "92%", y: "15%", size: 12, delay: 2.1, drift: 14 },
  { x: "96%", y: "28%", size: 8, delay: 2.45, drift: -16 },
  { x: "77%", y: "7%", size: 10, delay: 2.8, drift: 10 },
  { x: "88%", y: "8%", size: 11, delay: 3.15, drift: -13 },
  { x: "66%", y: "31%", size: 8, delay: 3.5, drift: 15 },
];

function HeroTreeIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1240 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute top-[-9%] right-[-9%] h-[118%] w-[108%] min-w-[880px] opacity-95"
        initial={{ opacity: 0, x: 42, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <pattern id="hero-tree-bark" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M0 6 C7 2 15 10 22 6 M0 16 C7 12 15 20 22 16" fill="none" stroke="#F1E8CF" strokeWidth="2.4" />
          </pattern>
          <filter id="tree-shadow" x="-15%" y="-20%" width="135%" height="150%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#2F1F0E" floodOpacity="0.12" />
          </filter>
        </defs>

        <g filter="url(#tree-shadow)" opacity="0.98">
          <circle cx="640" cy="10" r="175" fill="#A996BE" opacity="0.9" />
          <circle cx="790" cy="-8" r="205" fill="#4A1977" />
          <circle cx="980" cy="-14" r="210" fill="#3D126C" />
          <circle cx="1110" cy="44" r="172" fill="#4D1F7D" />
          <circle cx="760" cy="118" r="145" fill="#6D3E96" />
          <circle cx="940" cy="118" r="154" fill="#4A1977" />
        </g>

        <g opacity="0.76">
          {Array.from({ length: 46 }).map((_, index) => {
            const cx = 600 + ((index * 83) % 590);
            const cy = -8 + ((index * 47) % 190);
            const rx = 10 + (index % 5) * 2;
            const angle = (index * 31) % 180;
            const fill = index % 3 === 0 ? "#EEE8F4" : index % 3 === 1 ? "#5A238A" : "#6C3297";

            return (
              <ellipse
                key={index}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={rx * 1.65}
                transform={`rotate(${angle} ${cx} ${cy})`}
                fill={fill}
                opacity={index % 3 === 0 ? 0.92 : 0.42}
              />
            );
          })}
        </g>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1068 -80 C1080 46 1076 160 1042 292 C1016 392 1024 500 1072 708" stroke="#685B38" strokeWidth="86" />
          <path d="M1068 -80 C1080 46 1076 160 1042 292 C1016 392 1024 500 1072 708" stroke="url(#hero-tree-bark)" strokeWidth="86" />

          <path d="M978 258 C832 270 724 322 628 398" stroke="#685B38" strokeWidth="72" />
          <path d="M978 258 C832 270 724 322 628 398" stroke="url(#hero-tree-bark)" strokeWidth="72" />

          <path d="M925 198 C822 170 736 100 680 -58" stroke="#685B38" strokeWidth="62" />
          <path d="M925 198 C822 170 736 100 680 -58" stroke="url(#hero-tree-bark)" strokeWidth="62" />

          <path d="M1012 176 C1100 150 1166 88 1238 -12" stroke="#685B38" strokeWidth="60" />
          <path d="M1012 176 C1100 150 1166 88 1238 -12" stroke="url(#hero-tree-bark)" strokeWidth="60" />
        </g>
      </motion.svg>

      {fallingPetals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute block rounded-[70%_0_70%_0] bg-[#E9E3F2]"
          style={{ left: petal.x, top: petal.y, width: petal.size, height: petal.size * 1.55, rotate: index % 2 ? -22 : 18 }}
          animate={{
            x: [0, petal.drift, petal.drift * -0.35, petal.drift * 0.45],
            y: [0, 22, 118, 190],
            opacity: [0.78, 0.78, 0.5, 0],
            scale: [0.95, 0.98, 0.88, 0.72],
          }}
          transition={{
            duration: 5.4 + index * 0.12,
            delay: petal.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-y-0 left-0 w-[58%] bg-[#FFF3E4]/80" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[#FFF3E4]/70" />
    </div>
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
      desc: "Guidance for communication, attachment patterns, and healthier connection.",
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-32">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-2rem)] flex items-center overflow-hidden mt-4 px-6 sm:px-10 md:px-20 py-20 md:py-28">
        <HeroTreeIllustration />

        <div className="relative z-10 max-w-[46rem]">
          <motion.p variants={itemVariants} className="mb-6 text-sm font-medium tracking-[0.08em] uppercase text-[#6C5B32]">
            Holistic Guidance Counsellor
          </motion.p>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#171717] leading-[1.06] mb-7">
            Here to help you navigate life's tough moments
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-[#313131] mb-4 max-w-xl leading-relaxed">
            At KosmicAlign, therapy is a process of aligning the mind, body, and spirit with structured, one-on-one support created around your life story.
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg font-serif text-[#171717] mb-9">
            You do not have to move through it alone.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link to="/booking" className="group w-full sm:w-auto px-7 py-3.5 bg-white text-[#171717] rounded-full text-base font-semibold transition-colors duration-300 border border-[#171717] hover:bg-[#171717] hover:text-white flex items-center justify-center gap-2">
              Book Your Session <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="group w-full sm:w-auto px-2 py-3.5 text-[#171717] text-base font-semibold hover:text-[#4B2B83] transition-colors duration-300 flex items-center justify-center gap-2">
              Explore Services <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-semibold text-[#585858] mb-4">
            Our Core Services
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#7A7A7A] max-w-xl mx-auto text-lg">
            Compassionate, structured guidance tailored to your unique emotional and psychological footprint.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const dbService = dbServices.find(s => s.title === service.title);
            const bookingLink = dbService ? `/booking?service=${dbService.id}` : "/booking";

            return (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className={`rounded-[2rem] overflow-hidden ${service.bg} group flex flex-col h-full shadow-sm`}>
              <div className="h-56 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
                <div className="absolute inset-0 bg-white/5 transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between bg-white/60 backdrop-blur-sm">
                <div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <service.icon className="w-6 h-6 text-[#E84C3D]" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#585858] mb-3">{service.title}</h3>
                  <p className="text-[#7A7A7A] leading-relaxed mb-6">{service.desc}</p>
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
      <section className="max-w-5xl mx-auto bg-[#FDF3E6] rounded-[3rem] p-12 md:p-20 text-center shadow-inner">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-semibold text-[#585858] mb-8">
          Therapeutic Tools & Techniques
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          {toolsUsed.map((tool, idx) => (
            <div key={idx} className="group relative bg-white px-6 py-3 rounded-full text-[#585858] font-medium shadow-sm hover:shadow-md transition-all border border-[#E5BE90]/30 hover:border-[#E84C3D]/50 cursor-default">
              <Sparkles className="w-4 h-4 inline-block mr-2 text-[#E84C3D]" /> {tool.name}
              
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-[#585858] text-white text-xs px-3 py-2 rounded-lg pointer-events-none z-20 shadow-lg text-center">
                {tool.desc}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-opacity-0 border-4 border-t-[#585858]"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="bg-white rounded-[3rem] p-12 md:p-24 shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-[#585858] mb-4">How It Works</h2>
            <p className="text-[#7A7A7A] text-lg">A simple way to find alignment and confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-[#FFF5EA]" />
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#FFF5EA] border-4 border-white shadow-md flex items-center justify-center mb-6">
                  <step.icon className="w-10 h-10 text-[#E84C3D]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#585858] mb-3">
                  <span className="text-[#E5BE90] mr-2">0{idx + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-[#7A7A7A] max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Person vs Online */}
      <section className="bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#585858]">
            Find Guidance Wherever You Are
          </h2>
          <p className="text-lg text-[#7A7A7A] leading-relaxed">
            Whether you prefer the grounding energy of an in-person session or the convenience of remote therapy, KosmicAlign is structured to meet you where you are.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5BE90]/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#E5BE90]" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-[#585858] mb-1">In-Person in Delhi</h4>
                <p className="text-[#7A7A7A]">Visit our serene wellness space in the heart of Delhi for a deeply personal, grounded experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E84C3D]/20 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#E84C3D]" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-[#585858] mb-1">Online Worldwide</h4>
                <p className="text-[#7A7A7A]">Connect online for structured therapy sessions from the comfort of your home, anywhere in the world.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Client Intake */}
      <section className="bg-white rounded-[3rem] py-20 px-6 md:px-12 text-center relative overflow-hidden shadow-[0_8px_32px_rgba(88,88,88,0.02)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF5EA] rounded-full blur-[100px]" />

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full bg-[#FFF5EA] border border-[#E5BE90]/30 flex items-center justify-center mx-auto mb-7 shadow-sm">
            <ClipboardList className="w-7 h-7 text-[#E84C3D]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#585858] mb-4">
            Client Intake Form
          </h2>
          <p className="text-[#7A7A7A] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
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
