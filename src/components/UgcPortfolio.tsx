import Image from "next/image";
import PointerWash from "@/components/PointerWash";

const ugcPortfolioUrl = "#";

const ugcItems: {
  title: string;
  href: string;
  image: string;
  labels: string[];
}[] = [
  {
    title: "Chotto Matte Toronto",
    href: "https://www.instagram.com/p/DeAVvb8PJl4/",
    image: "/chottomatte.jpg",
    labels: ["restaurants", "toronto", "aesthetic"],
  },
  {
    title: "Flying Tiger Copenhagen 2026",
    href: "https://www.instagram.com/p/DdtjbehRR2w/",
    image: "/ftc.jpg",
    labels: ["lifestyle", "halloween", "daily"],
  },
  {
    title: "Amazon Prime Fall 2026",
    href: "https://www.instagram.com/p/DeGHs_3tq98/",
    image: "/amazon.png",
    labels: ["student life", "integrated", "lifestyle"],
  },
  {
    title: "SoftMoc Back to School",
    href: "https://www.instagram.com/p/Db8dmFXEU8_/?img_index=1",
    image: "/softmoc.jpg",
    labels: ["university", "fashion"],
  },
  {
    title: "Student Price Card",
    href: "https://www.instagram.com/reel/Dc7vQc2BELQ/",
    image: "/spc.jpg",
    labels: ["student", "shopping", "lifestyle"],
  },
];

export default function UgcPortfolio() {
  return (
    <section
      id="ugc"
      data-fade-group
      className="relative scroll-mt-20 overflow-hidden bg-accent-yellow px-6 py-16 sm:px-16 lg:px-24"
    >
      <PointerWash />
      <h2
        data-fade-item
        data-fade-index="0"
        className="relative z-[2] text-center font-playfair text-4xl text-accent-red md:text-5xl"
      >
        If you didn't know...
      </h2>
      <p
        data-fade-item
        data-fade-index="1"
        className="relative z-[2] mx-auto mt-4 max-w-2xl text-center font-garamond text-lg text-foreground/90 md:text-xl"
      >
        I'm also a UGC creator. For any brands, here's a sample of some of my favourite collaborations to date!
      </p>

      <div className="ugc-scroll relative z-[2] mx-auto mt-12 max-w-7xl overflow-x-auto pt-2 pb-8">
        <div className="mx-auto flex w-max gap-10">
          {ugcItems.map((item, index) => (
            <a
              key={`${item.title}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-56 shrink-0 flex-col"
            >
              <div data-fade-item data-fade-index={index + 2}>
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-accent-red bg-background motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-1">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="14rem"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-garamond text-accent-mauve">
                      Image coming soon
                    </div>
                  )}
                </div>
              </div>
              <div data-fade-item data-fade-index={index + 2}>
                <h3 className="mt-5 font-serif text-xl text-accent-red">
                  {item.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {item.labels.map((label, labelIndex) => (
                    <span
                      key={`${label}-${labelIndex}`}
                      className="border border-accent-red bg-background px-3 py-1 font-garamond text-sm text-accent-red shadow-[4px_4px_0_0_#45151b]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
