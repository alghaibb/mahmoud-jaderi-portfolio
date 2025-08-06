"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";

interface GalleryItem {
  image: string;
  caption: string;
}

interface ProjectGalleryProps {
  gallery: GalleryItem[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">Project Gallery</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Visual showcase of key features and user interface designs
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {gallery.map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 m-0 bg-black border-0 shadow-none rounded-none">
                <DialogTitle className="sr-only">{item.caption}</DialogTitle>
                <div className="relative w-full h-full bg-black overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-contain"
                    quality={100}
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 z-10">
                    <p className="text-white text-base leading-relaxed font-medium text-center">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto">
          * Images shown are representative of the actual application interface.
          Some screenshots may be placeholders for demonstration purposes.
        </p>
      </motion.div>
    </section>
  );
}
