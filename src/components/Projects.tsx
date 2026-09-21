"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PointerWash from "@/components/PointerWash";

const projectImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.JPEG",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
];

const awards = [
  {
    title: "TD Scholarship for Community Leadership",
    amount: "70000",
    date: "May 2024",
    description:
      "One of twenty Canadian recipients of the TD Scholarship for Community Leadership, awarded for immense display of impact and leadership in the community.",
  },
  {
    title: "Department of Computer Science Research Scholarship",
    amount: "12000",
    date: "March 2026",
    description:
      "Awarded to outstanding students in the department of computer science in the University of Toronto to pursue research in the field.",
  },
  {
    title: "Howard Ferguson Admission Scholarship",
    amount: "12000",
    date: "September 2024",
    description:
      "Awarded to an outstanding non-Ontario resident to pursue a degree at the University of Toronto.",
  },
  {
    title: "University of Toronto Scholar",
    amount: "1500",
    date: "July 2025",
    description:
      "Recognition of academic excellence in the Faculty of Arts and Science.",
  },
];

const projects = [
  {
    title: "Deformable materials simulation",
    date: "May 2026–present",
    description:
      "GPU-accelerated soft-tissue simulation at the MedCVR Lab, built on FlexiCubes and NVIDIA Warp. I added a tearing force model so mesh can rupture under tension, for surgical visualization and robot-training data.",
    tech: ["Python", "NVIDIA Warp", "FlexiCubes", "CUDA"],
  },
  {
    title: "Palate",
    date: "January 2026",
    description:
      "Group dining app that settles restaurant deadlocks in five stages: preferences, vibe check, Gemini keywords, swipe filtering, and a blind vote. After the meal, cuisine and tag feedback sharpens the next suggestion.",
    tech: ["Next.js", "Node.js", "Gemini API", "MongoDB", "Python"],
  },
  {
    title: "SnackOverflow",
    date: "November–December 2025",
    description:
      "Six-person Java recipe app structured around Clean Architecture, with Spoonacular search, saved recipes, meal planning, and dietary filters. My first large object-oriented codebase built to stay maintainable.",
    tech: ["Java", "MongoDB", "Spoonacular API", "Clean Architecture", "OOP"],
  },
  {
    title: "Bear With Me",
    date: "November 2025",
    description:
      "Pronunciation practice for young children, hidden in a stuffed bear. A Raspberry Pi listens, Azure scores speech, and ElevenLabs answers aloud, with a parent dashboard for progress off the screen.",
    tech: ["Raspberry Pi", "Azure API", "ElevenLabs API", "Python"],
  },
  {
    title: "Neural network from scratch",
    date: "2025",
    description:
      "A feedforward network written in NumPy only—sigmoid activations, backpropagation, and SGD—trained on MNIST. Built to understand how a network actually learns, without a framework in the way.",
    tech: ["Python", "NumPy", "Machine learning"],
  },
  {
    title: "Aqualens",
    date: "2024–2025",
    description:
      "Flutter field app with Engineers Without Borders UofT and CGEN for water-quality testers in Mexico. I owned login and authentication and helped keep capture and storage simple on the ground.",
    tech: ["Dart", "Flutter"],
  },
];

type Project = (typeof projects)[number];

function formatAmount(amount: string) {
  return `$${Number(amount).toLocaleString("en-CA")}`;
}

function ProjectPopOut({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const beginClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onCloseRef.current();
      return;
    }
    setOpen(false);
    window.setTimeout(() => onCloseRef.current(), 450);
  };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") beginClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-8 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-popout-title"
    >
      <button
        type="button"
        aria-label="Close project details"
        className={`project-popout-backdrop absolute inset-0 bg-background/35 ${open ? "is-open" : ""}`}
        onClick={beginClose}
      />
      <article
        className={`project-popout-panel relative z-[1] w-full max-w-2xl overflow-hidden rounded-3xl border border-accent-red bg-background shadow-[8px_8px_0_0_#45151b] ${open ? "is-open" : ""}`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <img
            src="/transparent_flower.webp"
            alt=""
            className="project-popout-flower absolute -right-6 -top-4 h-36 w-auto max-w-none opacity-30"
          />
        </div>
        <div className="relative z-[1] px-10 py-10 sm:px-14 sm:py-12">
          <div className="flex items-start justify-between gap-6">
            <p className="font-garamond text-sm tracking-wide text-accent-mauve">
              {project.date}
            </p>
            <button
              type="button"
              onClick={beginClose}
              aria-label="Close"
              className="relative z-[1] px-1 font-garamond text-2xl leading-none text-accent-red"
            >
              ×
            </button>
          </div>
          <h3
            id="project-popout-title"
            className="mt-5 max-w-[18ch] font-playfair text-3xl leading-tight text-accent-red sm:text-4xl"
          >
            {project.title}
          </h3>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.tech.map((item) => (
              <span
                key={item}
                className="border border-accent-red bg-background px-3 py-1 font-garamond text-sm text-accent-red shadow-[4px_4px_0_0_#45151b]"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-7 min-h-[9rem] font-serif text-sm leading-relaxed text-foreground sm:min-h-[11rem] sm:text-base">
            {project.description}
          </p>
        </div>
      </article>
    </div>
  );
}

function ProjectPhotoStrip() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      track.style.transform = "none";
      return;
    }

    let currentX = 0;
    let frame = 0;

    const tick = () => {
      const maxX = Math.max(0, track.scrollWidth - root.clientWidth);
      const rect = root.getBoundingClientRect();
      const travel = Math.max(window.innerHeight + rect.height, 1);
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / travel),
      );
      const targetX = maxX === 0 ? 0 : -progress * maxX;
      currentX += (targetX - currentX) * 0.08;
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center overflow-x-hidden overflow-y-visible bg-accent-red px-4 py-6 sm:px-8"
      data-fade-group
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {projectImages.map((src, index) => (
          <div
            key={src}
            data-fade-item
            data-fade-index={index}
            className="relative z-0 -ml-6 shrink-0 first:ml-0 hover:z-20 sm:-ml-8"
          >
            <div className="relative aspect-[3/4] w-[16vw] min-w-24 overflow-hidden border-16 border-accent-red shadow-md motion-safe:transition-[transform,box-shadow] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:scale-[1.06] motion-safe:hover:shadow-[0_10px_28px_rgba(255,247,214,0.28)]">
              <Image
                src={src}
                alt={`Project photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="16vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section className="flex min-h-screen flex-col">
      <ProjectPhotoStrip />
      <div
        id="projects"
        data-fade-group
        className="relative flex flex-1 scroll-mt-20 flex-col items-start overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
      >
        <PointerWash />
        <h2
          data-fade-item
          data-fade-index="0"
          className="relative z-[2] text-left text-5xl text-foreground md:text-6xl"
        >
          <span className="font-playfair text-7xl">Projects</span>
        </h2>
        <p
          data-fade-item
          data-fade-index="1"
          className="relative z-[2] mt-5 max-w-2xl text-left font-garamond text-xl text-foreground/90"
        >
          Selected work from school, research, and things I built to learn.
        </p>

        <div className="relative z-[2] mt-12 flex w-full max-w-7xl flex-col gap-10 pb-8 md:flex-row md:gap-12 md:overflow-x-scroll projects-scroll">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              data-fade-item
              data-fade-index={index + 2}
              onClick={() => setOpenProject(project)}
              className="w-full cursor-pointer text-left md:w-[calc((100%-6rem)/3)] md:shrink-0"
            >
              <h3 className="font-serif text-2xl text-accent-red">
                {project.title}
              </h3>
              <h4 className="font-serif text-foreground">{project.date}</h4>
              <p className="mt-3 line-clamp-4 font-serif leading-relaxed text-foreground">
                {project.description}
              </p>
              <span className="mt-4 inline-block font-serif text-sm text-accent-mauve">
                Read more
              </span>
            </button>
          ))}
        </div>
      </div>
      {openProject ? (
        <ProjectPopOut
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      ) : null}
      <div
        id="awards"
        data-fade-group
        className="relative overflow-hidden bg-accent-mauve px-6 py-14 sm:px-16 lg:px-24"
      >
        <PointerWash tone="dark" />
        <h2
          data-fade-item
          data-fade-index="0"
          className="relative z-[2] text-center font-playfair text-4xl text-background md:text-5xl"
        >
          Awards and Recognition
        </h2>
        <p
          data-fade-item
          data-fade-index="1"
          className="relative z-[2] mx-auto mt-3 max-w-2xl text-center font-garamond text-base text-background/90 md:text-lg"
        >
          Scholarships and honours for community leadership, research, and
          academic work at the University of Toronto.
        </p>
        <div className="relative z-[2] mx-auto mt-8 grid w-full max-w-5xl gap-x-12 gap-y-8 text-left sm:grid-cols-2">
          {awards.map((award, index) => (
            <article
              key={award.title}
              data-fade-item
              data-fade-index={index + 3}
              className="border-t border-background/35 pt-4"
            >
              <p className="font-playfair text-3xl tracking-tight text-background md:text-4xl">
                {formatAmount(award.amount)}
              </p>
              <h3 className="mt-2 font-serif text-lg text-background md:text-xl">
                {award.title}
              </h3>
              <p className="mt-1 font-serif text-xs tracking-wide text-background/75">
                {award.date}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-background">
                {award.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
