import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  Leaf,
  Quote,
  Recycle,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { StoreShell } from "@/components/store-shell";

const values = [
  {
    icon: Leaf,
    label: "Cruelty-Free",
  },
  {
    icon: ShieldCheck,
    label: "Dermatologist Tested",
  },
  {
    icon: Recycle,
    label: "Sustainable",
  },
];

const philosophyCards = [
  {
    title: "Nature Rooted",
    subtitle: "Harvesting Nature's Bounty",
    description:
      "We carefully source botanicals, flowers, and herbs to bring the strength of nature into every formula.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArxoLbz07tLkscw0Oa-qVd_akG3KhrYrCqP7DvXyXh0U0HeafdTC60a8fjUvq-MjSkHycxBv25LlqNGmfRetgQlfLopNIaQsAskB_wkMhkIuVTMoLlMTqicjy3306dy215Aou2eT8Bc7J2ModMD5X7S7u6-EEgbSoUYRaasVOHQfnxWmoA0B-lcfqrSBRFqzMOwtvqMoUfzcKBHldvLn-nmKlDwz6XxWm3Yoa73w34h3qgm4LB3wwQjttstrTUd4w4Jlu1hPnp3NPf",
  },
  {
    title: "Crafted with Care",
    subtitle: "Craftsmanship Redefined",
    description:
      "Our range blends age-old skincare wisdom with modern science to create textures that feel elegant and work hard.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTRMnQ6MJOuONdwcNT9vpKchQVoL5dirBIq-TupNJolonf-xKRsHjiXWSKqxAaToAX9m_azbdzFOosJym4lkohACNblH2bytfwoHdQhIUE84bNFx7Pa6G7HBNhWwFZmRUD5vJWgZ7KLRPdb7q79bEXS83bI5OWj4JKdACy_MQRZO0FbGGJrrJ1w_eWTZCzeg7uKNylzfHUbRdcLCBKtLZxX3wyhCu9UwtgY8IxvNvzCQDBs3c0oGuD2Acy7PQoPQvzowwFN5gAlcc3",
  },
  {
    title: "Made for Real Life",
    subtitle: "Accessible by Design",
    description:
      "We believe effective skincare should feel approachable, understandable, and available to more people every day.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgquDGpLq2yPZX5sU7_4jb93naeyrNJHJEFiP4zSvpd3z7RNuj1SJJjIF7aHAIxOcuGB5KuWNxordsd4yOnfKq0Icovyr01yDWGyChjXq87kz5usi_A-xnKCPBq_NHvUzEDXgdyuhmrH9WUUZtIxKTjivI7Rxg3MIBQrRx7mkqXL3cWs9ZvXpKZ__avhnhNYc-f7eP1CUIcnNdfANIBCM4SuDdrWReffS25quG9-O2_5Td9aYnF2_sU4VDA5QdXPPXMztRC7YSWqSt",
  },
];

const methodology = [
  "Botanicals selected for skin comfort and visible care",
  "Formulas refined with contemporary lab testing",
  "A balance of sensorial texture and daily performance",
];

const retailers = [
  {
    name: "Watsons",
    image:
      "https://static.wixstatic.com/media/10ada9_73072dda466e499ab08c9ef144d8dfd4~mv2.png/v1/fill/w_982,h_818,al_c/image.png",
  },
  {
    name: "Guardian",
    image: "https://sensecity.vn/phamvandong/wp-content/uploads/2021/07/guardian.png",
  },
  {
    name: "Shopee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJ40KvGZxXM9HpLuIOPjJli8pip-27xUA-A&s",
  },
  {
    name: "Lazada",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-FH7-u2opyYRQHoSQ9FvkGj1FhvpNqxeug&s",
  },
];

export const metadata: Metadata = {
  title: "About Us | The Originote",
  description:
    "Learn the story behind The Originote and how nature-led skincare meets thoughtful science.",
};

export default function AboutPage() {
  return (
    <StoreShell>
      <div className="mx-auto max-w-7xl space-y-24 px-4 py-8 sm:px-6 lg:px-12 lg:py-10">
        <section className="relative grid min-h-[620px] items-center gap-12 overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,var(--hero-start)_0%,var(--accent)_100%)] px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div className="blob-shape absolute -left-12 top-10 h-[320px] w-[320px] bg-primary/20 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                Beauty in Unity
              </p>
              <h1 className="max-w-3xl text-5xl leading-none tracking-[-0.06em] sm:text-7xl lg:text-[6rem]">
                Our <span className="font-light italic">Story.</span>
              </h1>
              <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
                The Originote is rooted in one simple belief: everyone deserves
                access to scientifically-backed skincare inspired by nature&apos;s
                purest source.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-line py-5 sm:max-w-xl sm:gap-8">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div key={value.label} className="flex flex-col gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-strong text-primary ring-1 ring-line">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                      {value.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full border border-foreground px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition hover:bg-foreground hover:text-background"
              >
                Explore Products
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div
              className="aspect-square w-full rounded-full bg-cover bg-center shadow-[0_35px_80px_rgba(46,42,40,0.22)]"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFsB08Rj2v1AhIBM7bNjbxX4YBl6w4W8D_D-HRFM50KTxQCw0DMXyFd4YRkmFX08DsrzTsqIrfZFaAQdPv4jWW9mOENzv5rq2GkkYSHLkoHeNjuistDPmMPFR98p1GGjidFAo4yU3R3gaPvduKCdzgmvyWhP0lE_rB4WQHyD3c8ohxwpZBLg1-LQilM_k0uUoyxhDfDuWk_n-rLrcyctmX9VsDcmv8iW5_gZpyAA5_6ddjEBlu160GRSv7uNOFbbbOrSZKF4h6qoLt")',
              }}
            />
            <div className="absolute -bottom-8 -left-2 hidden h-56 w-40 overflow-hidden rounded-[1.75rem] border border-white/30 bg-surface/60 backdrop-blur-xl lg:block">
              <div
                className="h-full w-full bg-cover bg-center blur-[1px]"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfJpzNeY1idUnU-4_6HqjA8p3oLsCg3vaanFNxx_QxS78vW1Iy_qK2FNZTJ_aPfVrN3a2385bbBtjaQYpG8N3CjeLyi2mWgmRbJZ768tPjqzBO94jBekzrS238KcmhkKFYqEAb9iWY8GQN9ax4ske-3Zs1px7oobVmO3hoLuiTvyKp55bys0dw_sQXt5Dpsj4CoYRv1lwdgBIE9GXwz6nlaT0iv4CTABAjpS5g9222ZtibIjtx2ShjIeiQELnPLElLv21P6gaOGWz9")',
                }}
              />
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <div className="w-full max-w-4xl rounded-[2.5rem] border border-line bg-surface p-10 text-center shadow-[0_24px_60px_rgba(46,42,40,0.05)] sm:p-14 lg:p-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
              Established 2021
            </p>
            <h2 className="mt-5 text-4xl tracking-[-0.04em] sm:text-5xl">
              Where innovation <span className="font-light italic">meets</span>{" "}
              nature
            </h2>
            <div className="mx-auto mt-8 max-w-2xl space-y-6 text-sm leading-7 text-muted sm:text-base">
              <p>
                The Originote blossomed from a deep commitment to nurturing
                beauty through nature&apos;s source. Our story is a journey back
                to the origin, where skincare meets purity and every formula
                tells a tale of authenticity.
              </p>
              <p>
                In the heart of botanical wonders, we built a brand around the
                idea that healthy, radiant skin should come from formulas that
                feel honest, effective, and thoughtfully made.
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,var(--paper)_0%,var(--accent)_100%)] px-6 py-16 sm:px-10 lg:px-16">
          <div className="blob-shape absolute right-0 top-10 h-64 w-64 bg-primary/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-12 w-12 text-primary/50" />
            <h2 className="mt-8 text-3xl leading-tight font-light italic tracking-[-0.03em] sm:text-5xl">
              &quot;Our mission is to bring nature-led skincare closer to
              everyday life through formulas that feel gentle, modern, and
              trustworthy.&quot;
            </h2>
            <div className="mx-auto mt-8 h-px w-16 bg-primary/30" />
          </div>
        </section>

        <section className="space-y-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Brand Philosophy
            </p>
            <h2 className="mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
              Crafted with intention
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {philosophyCards.map((card) => (
              <article
                key={card.title}
                className="group rounded-[2rem] bg-accent/80 p-6 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(46,42,40,0.08)] dark:bg-surface"
              >
                <div
                  className="aspect-[4/5] rounded-[1.5rem] bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url("${card.image}")` }}
                />
                <div className="mt-6 space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                    {card.subtitle}
                  </p>
                  <h3 className="text-2xl tracking-[-0.03em]">{card.title}</h3>
                  <p className="text-sm leading-7 text-muted">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className="order-2 h-[520px] rounded-[2rem] bg-primary bg-cover bg-center lg:order-1 lg:h-[620px]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(46,42,40,0.18), rgba(46,42,40,0.18)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmwFVBESgeIqZ2xJ3oOk2XR6K8VEn5QhpgZ8IfUm7oD6lMJA89vidaLO_XuRLkCgsYoLxK83fDfxb0LK6yBT7cjEHf1INATjJ3SYtLUMNeYg4YXzI_WEFZk0ikFHlyUQvcGFhBqV8I4wNrdUEq0Bn92DwYChEudXGvfDEYhvIx6eHwNXKZdfJjt3DdvV694qFymAFeBhS2A46tHsf01_Yqqa35kVEroi0Gve9tahB62O6dcgBW-OnC5j584fNF3Df1pLt3qjH9cGlH")',
            }}
          />

          <div className="order-1 lg:order-2 lg:pl-10">
            <div className="rounded-[2rem] bg-surface p-8 ring-1 ring-line sm:p-12">
              <div className="inline-flex rounded-full bg-primary/10 p-3 text-primary">
                <FlaskConical className="h-5 w-5" />
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Our Methodology
              </p>
              <h2 className="mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
                Science-first craftsmanship
              </h2>
              <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
                <p>
                  Crafted with precision and care, The Originote&apos;s skincare
                  range is a fusion of age-old wisdom and contemporary science.
                </p>
                <p>
                  Every formulation is designed to balance luxury, comfort, and
                  visible performance so the skincare experience feels elevated
                  without becoming complicated.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                {methodology.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px w-24 bg-line" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Dermatologist approved
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--paper)_100%)] px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              The Originote
            </p>
            <h2 className="mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
              Nurturing beauty from nature&apos;s source
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-6 text-sm leading-7 text-muted sm:text-base">
              <p>
                We believe in the power of nature&apos;s untouched beauty. From
                pristine landscapes to vibrant blooms, our skincare
                formulations are the result of meticulously sourced botanicals.
              </p>
              <p>
                We harvest the potency of plants, flowers, and herbs to create
                products that rejuvenate, replenish, and support healthy skin
                in a way that feels calm and uncomplicated.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-surface-strong px-5 py-3 ring-1 ring-line">
                <Sprout className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                  Rooted in botanicals, refined by science
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10 border-t border-line pt-16">
          <div className="text-center">
            <h2 className="text-4xl tracking-[-0.04em] sm:text-5xl">
              Available <span className="font-light italic">At.</span>
            </h2>
            <p className="mt-4 text-sm tracking-[0.12em] text-muted">
              Find The Originote at trusted retailers and online stores.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {retailers.map((retailer) => (
              <div
                key={retailer.name}
                className="flex aspect-[3/2] items-center justify-center rounded-[1.75rem] bg-surface-strong p-8 shadow-[0_10px_30px_rgba(46,42,40,0.05)] ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(46,42,40,0.08)]"
              >
                <div
                  className="h-full w-full bg-contain bg-center bg-no-repeat grayscale opacity-80 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  style={{ backgroundImage: `url("${retailer.image}")` }}
                  aria-label={retailer.name}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </StoreShell>
  );
}
