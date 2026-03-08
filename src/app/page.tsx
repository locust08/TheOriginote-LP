import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { landingPageImages } from "@/lib/landing-page-images";

const stats = [
  { value: "100k+", label: "customers" },
  { value: "250k+", label: "sold products" },
  { value: "80k+", label: "positive reviews" },
];

const products = [
  {
    name: "Hyalucera Moisturizer",
    category: "Hydrating Gel",
    price: "300 LE",
    image: landingPageImages.products.hyalucera,
  },
  {
    name: "Niacinamide Serum",
    category: "Brightening",
    price: "450 LE",
    image: landingPageImages.products.niacinamide,
  },
  {
    name: "Sunscreen SPF50",
    category: "Protection",
    price: "500 LE",
    image: landingPageImages.products.sunscreen,
  },
  {
    name: "Cica Cleanser",
    category: "Daily Wash",
    price: "280 LE",
    image: landingPageImages.products.cicaCleanser,
  },
];

const companyLinks = ["ABOUT", "OUR STORY", "SUSTAINABILITY", "CAREERS"];
const supportLinks = ["CONTACT US", "FAQ", "RETURNS", "SHIPPING"];
const certifications = ["Cruelty Free", "Vegan", "Paraben Free"];

function ArrowUpRight() {
  return <span aria-hidden="true">/</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-line bg-background/85 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.3em]">
            <span className="text-base">+</span>
            <span className="hidden sm:inline">Menu</span>
          </button>
          <h1 className="text-center text-sm font-medium tracking-[0.28em] sm:text-2xl sm:tracking-[0.35em]">
            THE ORIGINOTE
          </h1>
          <ThemeToggle />
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-18 px-4 py-6 sm:space-y-24 sm:px-6 sm:py-8 lg:px-12">
        <section className="relative grid min-h-[560px] items-center gap-10 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,var(--glow)_0%,transparent_38%),linear-gradient(135deg,var(--hero-start)_0%,var(--hero-end)_100%)] px-5 py-8 shadow-[0_24px_60px_rgba(46,42,40,0.08)] sm:min-h-[640px] sm:px-6 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10">
          <div className="blob-shape absolute inset-x-0 top-6 -z-10 mx-auto h-[92%] w-[96%] bg-accent/70 blur-3xl" />
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.38em] text-muted sm:tracking-[0.45em]">
                Mindful skincare for luminous routines
              </p>
              <h2 className="max-w-3xl text-4xl leading-none font-light tracking-[-0.05em] sm:text-7xl lg:text-[6.25rem]">
                Nourish your <span className="italic">skin.</span>
              </h2>
              <p className="max-w-md text-sm leading-7 text-muted">
                At THE ORIGINOTE, we strive to inspire confidence, promote
                self-care, and make the world a little more beautiful, one
                glowing complexion at a time.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 border-y border-line py-5 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted sm:tracking-[0.3em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex w-fit items-center gap-3 rounded-full border border-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.28em] transition hover:bg-foreground hover:text-background"
              >
                Shop Now
                <ArrowUpRight />
              </a>
              <p className="text-[10px] italic tracking-[0.15em] text-muted">
                Visible results in less than 7 days!
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="relative aspect-square overflow-hidden rounded-full border border-surface-strong/60 shadow-[0_30px_80px_rgba(46,42,40,0.22)]">
              <Image
                src={landingPageImages.hero.main}
                alt="Person applying skincare"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
            </div>
            <div className="absolute -bottom-8 left-0 hidden h-52 w-40 overflow-hidden rounded-[1.5rem] border border-surface-strong/50 bg-surface/70 backdrop-blur-xl lg:block">
              <Image
                src={landingPageImages.hero.detail}
                alt="Skincare detail"
                fill
                className="object-cover blur-[1px]"
                sizes="160px"
              />
            </div>
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-[1.75rem] border border-line bg-surface p-6 shadow-[0_20px_40px_rgba(46,42,40,0.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl leading-tight tracking-[-0.03em]">
                Formulate your perfect routine by taking this{" "}
                <span className="underline decoration-primary underline-offset-4">
                  quiz
                </span>
              </h3>
              <span className="mt-1 text-primary">
                <ArrowUpRight />
              </span>
            </div>
            <div className="mt-6 flex gap-3 overflow-hidden">
              {landingPageImages.quizThumbs.map((src, index) => (
                <div
                  key={src}
                  className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-muted">
                Bestsellers
              </p>
              <h3 className="mt-3 text-4xl tracking-[-0.04em] sm:text-5xl">
                Ritual-ready essentials
              </h3>
            </div>
          </div>

          <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {products.map((product) => (
              <article
                key={product.name}
                className="group min-w-[78vw] snap-start rounded-[1.75rem] bg-accent p-4 sm:min-w-[320px]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-surface-strong">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                  <span className="absolute right-4 top-4 text-sm text-muted">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <h4 className="text-xl tracking-[-0.03em]">{product.name}</h4>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {product.price}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="/products"
              className="inline-flex items-center gap-3 rounded-full border border-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.28em] transition hover:bg-foreground hover:text-background"
            >
              Shop All Products
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 h-[500px] overflow-hidden rounded-[2rem] bg-primary lg:order-1 lg:h-[620px]">
            <Image
              src={landingPageImages.sections.organic}
              alt="Organic products being used"
              fill
              className="object-cover mix-blend-multiply opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2 lg:pl-12">
            <div className="space-y-6 rounded-[2rem] bg-surface p-8 ring-1 ring-line sm:p-12">
              <h2 className="text-4xl tracking-[-0.04em] sm:text-5xl">
                Organic Products
              </h2>
              <p className="max-w-sm text-sm leading-7 text-muted">
                Our mission is to transform skincare into a mindful, empowering
                ritual that supports both personal well-being and environmental
                sustainability.
              </p>
              <div className="h-px w-24 bg-line" />
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted">
                Naturally sourced ingredients
              </p>
            </div>
          </div>
        </section>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 rounded-[2rem] bg-surface p-8 ring-1 ring-line sm:p-12 lg:pr-12">
            <h2 className="text-4xl tracking-[-0.04em] sm:text-5xl">
              Dermatologist Approved
            </h2>
            <p className="text-sm leading-7 text-muted">
              Each formula is meticulously crafted and rigorously tested in
              collaboration with skincare experts to deliver gentle yet
              effective results for all skin types, including sensitive skin.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {certifications.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-surface-strong px-4 py-2 text-[10px] uppercase tracking-[0.3em] ring-1 ring-line"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] overflow-hidden rounded-[2rem] bg-primary lg:h-[620px]">
            <Image
              src={landingPageImages.sections.dermatologist}
              alt="Dermatologist approved care"
              fill
              className="object-cover mix-blend-luminosity opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>
      </main>

      <footer id="footer" className="mt-24 bg-accent/85 px-4 py-14 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Subscribe
            </h4>
            <form className="flex max-w-md flex-col gap-3 rounded-[2rem] border border-line bg-surface-strong p-2 sm:flex-row">
              <input
                type="email"
                placeholder="Email Address"
                className="min-w-0 flex-1 rounded-full border-none bg-transparent px-5 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] text-background transition hover:bg-primary"
              >
                Send
              </button>
            </form>
            <p className="max-w-xs text-[10px] leading-5 text-muted">
              Sign up to receive updates on new product launches, exclusive
              offers, and skincare tips.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-line pt-12 sm:pt-16 md:flex-row">
          <h2 className="text-center text-xl tracking-[0.28em] text-muted sm:text-2xl sm:tracking-[0.35em]">
            THE ORIGINOTE
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-[0.24em] text-muted sm:gap-6 sm:tracking-[0.28em]">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <span>&copy; 2024 The Originote</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
