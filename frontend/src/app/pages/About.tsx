import React from "react";
import { motion } from "motion/react";
import { BookOpen, Star, Heart, Sparkles } from "lucide-react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 sm:space-y-16 lg:space-y-20 pb-4">
      <section className="text-center pt-8 sm:pt-16 pb-6 sm:pb-10">
        <motion.div variants={itemVariants} className="mx-auto flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md text-[#001852] font-medium text-sm mb-8 shadow-sm">
          <Star className="w-4 h-4 text-[#E5BE90]" />
          About Me
        </motion.div>
        <motion.h1 variants={itemVariants} className="font-serif text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight text-[#001852] leading-tight mb-6 sm:mb-8">
          Deepti Aneja
        </motion.h1>
        <motion.p variants={itemVariants} className="text-base sm:text-lg text-[#001852] leading-relaxed max-w-3xl mx-auto">
          A holistic guidance counsellor, integrative therapist, an NLP practioner offering structured therapy for healing and alignment.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="relative">
          <div className="aspect-[4/5] rounded-[1.75rem] sm:rounded-[3rem] overflow-hidden relative z-10 shadow-[0_8px_32px_rgba(88,88,88,0.05)]">
            <img
              src="/img/founder-portrait.png"
              alt="Founder of KosmicAlign"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 right-0 sm:-right-12 w-44 h-44 sm:w-64 sm:h-64 bg-[#E84C3D] opacity-20 rounded-full blur-[80px] z-0" />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 pr-0 md:pr-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#001852]">My Journey</h2>
          <p className="text-base sm:text-lg text-[#001852] leading-relaxed">
            “Who am I?” was the question that began my journey as a child. I am not a spiritual master or an enlightened guru. I have always been someone in quest of the Divine for healing my own inner world of trauma, grief, and suffering.
          </p>
          <p className="text-base sm:text-lg text-[#001852] leading-relaxed">
            This quest led me to study the mind, body, and soul. Spirituality is the core and base of my search and study, and I deliver my learnings in the form of structured, one-on-one customised therapy.
          </p>
          <div className="pt-6">
            <div className="text-[#001852] font-serif text-xl sm:text-2xl italic font-medium">"Harmony With-In is Harmony With-Out."</div>
            <div className="text-[#001852] text-sm mt-2">Founder, KosmicAlign</div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_8px_32px_rgba(88,88,88,0.02)] max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E5BE90]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative z-10">
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            <div className="w-16 h-16 bg-[#FFF5EA] rounded-full flex items-center justify-center border border-[#E5BE90]/30">
              <Heart className="w-8 h-8 text-[#E5BE90]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#001852]">My Philosophy</h3>
            <p className="text-[#001852] leading-relaxed text-base sm:text-lg">
              Every client is unique. Each person perceives and absorbs trauma differently, so therapy cannot be a one-hour or one-day task. It is a process and an art in progress, involving soul work to align the mind, body, and spirit.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            <div className="w-16 h-16 bg-[#FFF5EA] rounded-full flex items-center justify-center border border-[#E5BE90]/30">
              <BookOpen className="w-8 h-8 text-[#E84C3D]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#001852]">Methodology</h3>
            <p className="text-[#001852] leading-relaxed text-base sm:text-lg">
              My methodology is culture-sensitive and my approach blends with Cognitive Based Therapy, Neuro Linguistic Programming, Meridian Channelling, Qi flow techniques, and Customised Meditations. I observe patterns, listen for missing links, and work with the client's life story.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <motion.div variants={itemVariants} className="bg-[#FDF3E6]/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#E84C3D]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#001852] mb-4 sm:mb-6">Therapeutic Approach</h3>
          <p className="text-[#001852] leading-relaxed text-base sm:text-lg">
            Regression, intergenerational work, ancestral path work, inner child work, mother and father influence impact, womb healing, traumagram, and constellations are used as essential strategies to approach core issues and their source of origin.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#FFF5EA]/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Heart className="w-8 h-8 text-[#E5BE90]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#001852] mb-4 sm:mb-6">A Safe Space</h3>
          <p className="text-[#001852] leading-relaxed text-base sm:text-lg">
            KosmicAlign offers a safe space for healing and alignment. My work is guided by values, ethics, knowledge, and the belief that every individual is a beautiful creation in this universe and has the potential to reach his/her highest version of themselves.
          </p>
        </motion.div>
      </section>

    </motion.div>
  );
}
