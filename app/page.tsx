"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative   flex  flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {" Enhance Clinical Care with Smart Voice Assistants "
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Empower your patients with personalized care through our AI-driven voice assistant.
Seamlessly automate appointment scheduling, symptom triage, and 24/7 follow-up care—giving patients control over their health like never before.
        </motion.p>
        <Link href={"/dashboard"}>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10  flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started
            </button>
          </motion.div>
        </Link>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-10 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          
          <footer className="w-full bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 ">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/user-avatar.png"
                  alt="Brand Logo"
                  className="w-13 h-13 rounded-full object-cover border border-gray-300"
                />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  <Image src="/logo.svg" alt="arcAbhi" width={200} height={100} />
                </span>
              </div>


              <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
                Powered by{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Abhi-2005
                </span>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold md:text-2xl">
          <Image src="/logo.svg" alt="arcAbhi" width={200} height={100} />
        </h1>
      </div>
      {!user ? (
        <Link href={"/sign-in"}>
          <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black  cursor-pointer dark:hover:bg-gray-200">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Link href={"/dashboard"}>
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black cursor-pointer dark:hover:bg-gray-200">
              Dashboard
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};
