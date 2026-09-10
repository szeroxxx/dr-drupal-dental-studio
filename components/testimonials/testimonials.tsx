import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GoogleIcon } from "@/components/ui/icons";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { Stars } from "@/components/ui/stars";
import { clinic, reviews } from "@/lib/clinic-data";
import { ReviewCarousel } from "./review-carousel";

function ReviewsInvitation() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-canvas p-8 md:p-12">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full border border-brand-200/60" />
      <Quote aria-hidden className="relative size-10 text-brand-500" />
      <p className="relative mt-8 text-balance font-serif text-[1.7rem] leading-[1.22] text-ink md:text-[2.15rem]">
        Every review of the studio is written by a patient, in their own words — so we&apos;d rather you read them
        on Google than have us paraphrase them here.
      </p>
      <div className="relative mt-auto flex flex-wrap items-center gap-4 pt-10">
        <ButtonLink href={clinic.links.googleProfile} withArrow>
          Read patient reviews
        </ButtonLink>
        <span className="text-sm text-muted">Opens our Google Business Profile</span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { google, justdial } = clinic.ratings;

  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="reviews-title">
      <Container>
        <SectionHeader
          id="reviews-title"
          eyebrow="Patient reviews"
          title={
            <>
              What our <Script>patients</Script> say
            </>
          }
          action={
            <ButtonLink href={clinic.links.googleProfile} variant="secondary" withArrow>
              All reviews on Google
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {reviews.length > 0 ? <ReviewCarousel reviews={reviews} /> : <ReviewsInvitation />}
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            <Reveal delay={0.08} className="rounded-3xl border border-brand-100 bg-brand-50 p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white shadow-soft">
                  <GoogleIcon className="size-6" />
                </span>
                <span className="text-lg font-semibold text-ink">Google</span>
              </div>
              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="font-serif text-7xl font-medium leading-[0.8] text-ink">{google.value.toFixed(1)}</span>
                <Stars value={google.value} size="size-5" />
              </div>
              <p className="mt-4 text-sm text-muted">
                Overall rating on our Google Business Profile
                {google.count ? ` · ${google.count} reviews` : ""}
              </p>
              <ButtonLink href={clinic.links.googleProfile} size="sm" className="mt-7">
                Read or write a review
                <ArrowUpRight aria-hidden />
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href={clinic.links.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 rounded-3xl border border-line bg-white p-8 transition-[border-color,box-shadow] duration-500 hover:border-brand-300 hover:shadow-lift"
              >
                <span>
                  <span className="flex items-center gap-3">
                    <span className="font-serif text-5xl font-medium leading-none text-ink">{justdial.value.toFixed(1)}</span>
                    <Stars value={justdial.value} size="size-4" />
                  </span>
                  <span className="mt-3 block text-sm text-muted">
                    From {justdial.count} ratings on Justdial
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-brand-700 transition-[transform,border-color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand-300">
                  <ArrowUpRight aria-hidden className="size-5" />
                  <span className="sr-only">View the Justdial listing (opens in a new tab)</span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
