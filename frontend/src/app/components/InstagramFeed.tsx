import React from "react";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/kosmicalign?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export function InstagramFeed() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <section className="-mt-12 px-6 py-10 md:-mt-20 md:py-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF5EA] mb-4 shadow-sm border border-[#E5BE90]/30">
          <Instagram className="w-6 h-6 text-[#E84C3D]" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-semibold text-[#585858] mb-3">
          Follow Our Journey
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[#7A7A7A] max-w-xl mx-auto text-base md:text-lg mb-6">
          Insights and behind the scenes on Instagram.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 bg-white border border-[#E84C3D] text-[#E84C3D] rounded-full font-semibold transition-colors duration-300 hover:bg-[#E84C3D] hover:text-white"
          >
            <Instagram className="w-4 h-4" />
            @KosmicAlign
          </a>
        </motion.div>
      </div>
    </section>
  );
}
