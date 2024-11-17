"use client";

import { useRouter } from "next/navigation";
import { TextEffect } from "@/components/core/text-effect"; // Make sure this path is correct
import WorkButton from "@/components/core/WorkButton"; // Importing the WorkButton component
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/core/aurora-background"; // Make sure this path is correct

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/question1"); // Your desired navigation or logic
  };

  return (
    <AuroraBackground className="absolute inset-0 -z-10">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      >
        <h1 className="text-3xl md:text-7xl font-bold dark:text-white text-center mb-4">
          <TextEffect per="char" preset="fade">
            Welcome to Anna
          </TextEffect>
        </h1>
        <p className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center">
          <TextEffect delay={0.7} per="char" preset="fade">
            AI act Norms Navigation Assistant
          </TextEffect>
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        >
          Get Started
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
