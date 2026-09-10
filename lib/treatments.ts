/**
 * VERIFY — confirm this list against the treatments the studio actually offers.
 * Descriptions explain what each treatment involves; they deliberately make no outcome promises.
 */

export type TreatmentIconName =
  | "implant"
  | "rootCanal"
  | "cleaning"
  | "whitening"
  | "braces"
  | "extraction"
  | "kids"
  | "crown";

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  icon: TreatmentIconName;
  overview: string;
  expect: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    short: "A fixed replacement for missing teeth",
    icon: "implant",
    overview:
      "An implant is a small titanium post placed in the jawbone to support a crown, bridge or denture where a tooth is missing. Whether it suits you depends on your gum and bone health, which is assessed first.",
    expect: [
      "An assessment of gum and bone health, including X-rays",
      "Placement of the implant, followed by a healing period",
      "A custom crown fitted once the implant has settled",
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Treating an infected or inflamed tooth",
    icon: "rootCanal",
    overview:
      "When the nerve inside a tooth becomes inflamed or infected, root canal treatment cleans and seals the inside of the tooth so it can be kept. It is carried out under local anaesthetic.",
    expect: [
      "Diagnosis with an examination and X-ray",
      "Cleaning and sealing of the root canals, over one or more visits",
      "A filling or crown to protect the tooth afterwards",
    ],
  },
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    short: "Scaling and polishing for healthier gums",
    icon: "cleaning",
    overview:
      "Professional scaling removes hardened plaque (tartar) that a toothbrush can't, helping keep gums healthy. A routine cleaning is also a chance to spot problems early.",
    expect: [
      "A check of your teeth and gums",
      "Scaling to remove tartar above and below the gumline",
      "Polishing, plus advice on brushing and cleaning between teeth",
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Brightening stained or dull teeth",
    icon: "whitening",
    overview:
      "Dentist-supervised whitening lightens the natural colour of your teeth. Results vary from person to person, so your teeth and gums are checked first and expectations are discussed honestly.",
    expect: [
      "A shade check and suitability assessment",
      "A whitening plan that suits your teeth and routine",
      "Guidance on sensitivity and looking after the result",
    ],
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    short: "Straightening and aligning teeth",
    icon: "braces",
    overview:
      "Fixed braces and clear aligners gradually move teeth into better positions. The right option depends on your bite, how your teeth need to move and what suits your routine.",
    expect: [
      "An orthodontic assessment with records",
      "A plan explaining the options, timing and costs",
      "Regular review visits while treatment progresses",
    ],
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    short: "Careful removal when a tooth can't be saved",
    icon: "extraction",
    overview:
      "Sometimes a tooth is too damaged, infected or crowded to keep. An extraction is done under local anaesthetic, and options for replacing the tooth are discussed before and after.",
    expect: [
      "An examination and X-ray to plan the extraction",
      "Removal under local anaesthetic",
      "Written aftercare, and a review visit if needed",
    ],
  },
  {
    slug: "kids-dentistry",
    name: "Kids Dentistry",
    short: "Relaxed check-ups for young smiles",
    icon: "kids",
    overview:
      "Early visits help children feel at ease in the dental chair. Check-ups look at growing teeth, include advice on brushing and diet, and treat cavities when needed.",
    expect: [
      "A relaxed introduction to the chair and instruments",
      "A check of growing teeth and the bite",
      "Practical tips for parents on brushing and snacks",
    ],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    short: "Restoring broken or missing teeth",
    icon: "crown",
    overview:
      "A crown covers and protects a weakened tooth; a bridge replaces a missing tooth by attaching to the teeth on either side. Both are made to match the shape and shade of your natural teeth.",
    expect: [
      "Preparation of the tooth and an impression or scan",
      "A temporary crown while the final one is made",
      "Fitting, a bite check and aftercare advice",
    ],
  },
];

export const treatmentOptions = [
  ...treatments.map((t) => ({ value: t.slug, label: t.name })),
  { value: "consultation", label: "General check-up / Not sure yet" },
];

export function treatmentLabel(value: string) {
  return treatmentOptions.find((o) => o.value === value)?.label ?? value;
}
