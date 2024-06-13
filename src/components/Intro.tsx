"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import Me from "@/assets/images/me.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import { MdOutlineCloudDownload } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Intro = () => {
  return (
    <section className="mb-28 max-w-[50rem] text-center sm:mb-0">
      <div className="flex items-center justify-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <Image
              src={Me}
              alt="Image of myself"
              width={192}
              height={192}
              quality="95"
              priority={true}
              className="object-cover border-white rounded-full shadow-md border-1 h-52 w-52"
            />
          </motion.div>
        </div>
      </div>
      <motion.p
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] tracking-wider sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Hello, I&apos;m Mahmoud.</span> I&apos;m a{" "}
        <span className="font-bold">full-stack developer</span> based in{" "}
        <span className="font-bold">Australia</span>. I enjoy building{" "}
        <span className="italic">web applications.</span> My primary focus is{" "}
        <span className="underline">React (Next.js)</span>
      </motion.p>
      <motion.div
        className="flex flex-col items-center justify-center gap-4 px-4 font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link href="#contact">
          <Button className="transition outline-none hover:scale-110 focus:scale-110 active:scale-105">
            <span>Contact Me</span>
          </Button>
        </Link>
        <Link
          href="/mahmoud-jaderi-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download={true}
        >
          <Button
            variant="secondary"
            className="gap-2 transition outline-none hover:scale-110 focus:scale-110 active:scale-105"
          >
            <span>Download CV</span> <MdOutlineCloudDownload />
          </Button>
        </Link>
        <div className="flex gap-2 mt-1">
          <Link
            href="https://www.linkedin.com/in/mahmoud-jaderi-150316290/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={24}
              className="transition hover:scale-110 focus:scale-110 active:scale-105"
            />
          </Link>
          <Link
            href="https://github.com/alghaibb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={24}
              className="transition hover:scale-110 focus:scale-110 active:scale-105"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
