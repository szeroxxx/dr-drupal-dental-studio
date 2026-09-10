import { BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { IconChip } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { clinic, formatTime } from "@/lib/clinic-data";

/** Only figures that can be checked publicly. Add patient counts or years here once confirmed. */
export function TrustStrip() {
  const lastClose = clinic.hours.sessions.at(-1)?.closes;
  const stats = [
    {
      icon: Star,
      value: clinic.ratings.google.value.toFixed(1),
      label: clinic.ratings.google.count ? `Google · ${clinic.ratings.google.count} reviews` : "Google rating",
    },
    {
      icon: BadgeCheck,
      value: clinic.ratings.justdial.value.toFixed(1),
      label: `Justdial · ${clinic.ratings.justdial.count} ratings`,
    },
    ...(lastClose ? [{ icon: Clock, value: formatTime(lastClose), label: "Open evenings until" }] : []),
    { icon: MapPin, value: clinic.address.locality, label: "Near Gulab Tower Road" },
  ];

  return (
    <section aria-label="At a glance" className="border-y border-line bg-white py-12 md:py-14">
      <Container>
        <Stagger as="ul" className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {stats.map(({ icon: Icon, value, label }) => (
            <StaggerItem as="li" key={label} className="flex items-center gap-4 lg:justify-center lg:px-6">
              <IconChip>
                <Icon aria-hidden />
              </IconChip>
              <div>
                <p className="font-serif text-[2rem] font-medium leading-none text-ink sm:text-[2.4rem]">{value}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
