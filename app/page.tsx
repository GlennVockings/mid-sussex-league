import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomepageGrid } from "@/components/features/homepage/HomepageGrid";
import { getHomepageContent } from "@/components/features/homepage/getHomepageContent";

export default async function HomePage() {
  const homepage = await getHomepageContent();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <section className="mb-7 flex flex-col gap-4 lg:mb-9 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-msfl-blue">
              Mid Sussex Football
            </p>

            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl">
              What&apos;s happening
              <br className="hidden sm:block" /> across the league.
            </h1>
          </div>

          <p className="max-w-md text-sm font-medium leading-6 text-muted sm:text-base">
            Matches, moments and stories from grassroots football — ranked by
            what people are actually watching.
          </p>
        </section>

        <HomepageGrid data={homepage} />

        <section className="mt-5 rounded-[var(--radius-card)] bg-msfl-navy px-6 py-8 text-white sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10 lg:py-10">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
              Coming next
            </div>

            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Your football. Your homepage.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Follow teams, competitions and players to build a homepage around
              the football you care about.
            </p>
          </div>

          <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-black text-msfl-navy lg:mt-0">
            Personalisation coming soon
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}
