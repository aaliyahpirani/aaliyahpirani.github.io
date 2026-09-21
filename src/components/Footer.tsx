import Image from "next/image";
import PointerWash from "@/components/PointerWash";

const socials = [
  {
    href: "https://www.instagram.com/aalipirani",
    src: "/instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://github.com/aaliyahpirani",
    src: "/github.svg",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/aaliyahpirani",
    src: "/linkedin.svg",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-accent-red" data-fade-group>
      <PointerWash tone="dark" />
      <div className="relative z-[2] flex items-center justify-between gap-3 px-4 py-3 font-serif text-background sm:px-8 sm:py-4">
        <p data-fade-item data-fade-index="0" className="text-sm font-garamond sm:text-2xl">
          © 2026 Aaliyah Pirani
        </p>

        <div data-fade-item data-fade-index="1" className="flex items-center gap-4 sm:gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src={social.src}
                alt={social.label}
                width={24}
                height={24}
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
