"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => { // if this component mounts, run this effect
    let lastY = window.scrollY;
    let homeVisible = true;

    const home = document.getElementById("home"); // Watching Home Section for scrolling 
    const observer = new IntersectionObserver( // browser API to watch the home section and when it leaves viewport
      ([entry]) => { // when visibility changes, run this callback
        homeVisible = entry.isIntersecting; // true if home is even partially visible
        if (homeVisible) {
          setHidden(false); // Show the header 
        }
      },
      { threshold: 0.1 }, // when 15% is visible, trigger callback 
    );

    if (home) {
      observer.observe(home); // Start watching the home section 
    }

    const onScroll = () => { // if we are scrolling up, show the header 
      const y = window.scrollY;
      const goingUp = y < lastY;

      if (homeVisible || goingUp) {
        setHidden(false);
      } else if (y > lastY) {
        setHidden(true);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 bg-accent-red/70 backdrop-blur-md transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="flex items-center justify-between px-4 py-3 font-serif text-background sm:px-8 sm:py-4">
        <a href="#home" className="nav-mark font-garamond text-xl sm:text-2xl">
          AP
        </a>

        <div className="flex gap-3 text-sm font-montserrat sm:gap-6 sm:text-base">
          <a href="#home" className="nav-hover nav-hover--track">
            Home
          </a>
          <a href="#about" className="nav-hover nav-hover--track">
            About
          </a>
          <a href="#projects" className="nav-hover nav-hover--track">
            Projects
          </a>
          <a href="#experience" className="nav-hover nav-hover--track">
            Experience
          </a>
          <a href="#ugc" className="nav-hover nav-hover--track">
            UGC
          </a>
        </div>
      </nav>
    </header>
  );
}
