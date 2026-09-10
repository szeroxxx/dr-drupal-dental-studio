# Demo photography sources

Downloaded and visually inspected on 10 September 2026. These photographs are representative stock images: they do not depict Dr. Dhrupal Modi, Dr. Dhrupal's Dental Studio, its actual patients, or its treatment outcomes. No model is presented as a reviewer or identified as the clinic's dentist. The clinic logo remains the supplied asset in `public/brand/`.

All photographs are provided under the [Pexels License](https://www.pexels.com/license/), which permits free use and modification on websites. Attribution is optional; it is recorded here for traceability. Pexels prohibits implying endorsement by pictured people and showing identifiable people in an offensive or harmful context. Visible illustrative captions and factual clinic text must remain distinct.

| Local file | Photographer | Original source | Demo use |
| --- | --- | --- | --- |
| `patient-consultation.webp` | Gustavo Fring | [Dentist with Satisfied Patient, 5622269](https://www.pexels.com/photo/dentist-with-satisfied-patient-5622269/) | Hero and care inspiration |
| `dental-guidance.webp` | Cedric Fauntleroy | [Dentist with a Patient, 4269363](https://www.pexels.com/photo/dentist-with-a-patient-4269363/) | Dental-care introduction; this is not a portrait of Dr. Dhrupal |
| `treatment-planning.webp` | Cedric Fauntleroy | [A Dentist Showing a Dental X-Ray to a Patient, 4269204](https://www.pexels.com/photo/a-dentist-showing-a-dental-x-ray-to-a-patient-4269204/) | Process, care inspiration and gallery |
| `gentle-examination.webp` | Cedric Fauntleroy | [Woman in Gray Scrub, 4269494](https://www.pexels.com/photo/woman-in-gray-scrub-4269494/) | Care inspiration |
| `patient-welcome.webp` | Pavel Danilyuk | [Dentist and Patient Shaking Hands, 6812577](https://www.pexels.com/photo/dentist-and-patient-shaking-hands-6812577/) | Visual beside the Google reviews invitation; neither person is attributed a review |
| `dental-suite.webp` | Pavel Danilyuk | [Empty Dentist Office, 6812461](https://www.pexels.com/photo/empty-dentist-office-6812461/) | Representative interior gallery |
| `calm-interior.webp` | Esteban Santiago Gonzalez | [Armchair and Sink in Room, 12251080](https://www.pexels.com/photo/armchair-and-sink-in-room-12251080/) | Booking-area interior and gallery |
| `dental-chair.webp` | Cedric Fauntleroy | [A Dental Chair in a Clinic, 4269265](https://www.pexels.com/photo/a-dental-chair-in-a-clinic-4269265/) | Representative equipment gallery |

Images were downloaded from the corresponding `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg` asset, limited to 1600 pixels for transfer, then auto-oriented and encoded using the existing Sharp dependency as WebP at quality 82, maximum 1400 pixels on the long edge. Images retain their original photographic content; responsive crops are applied in the UI. No original full-resolution downloads are stored in the project. All runtime image references point to `/images/` and use `next/image`; there are no stock-image hotlinks.

When verified clinic photography is supplied, replace the paths and descriptions in `lib/clinic-data.ts` and the section components. Keep stock captions for any remaining stock scenes. Use actual patient before/after pairs only after obtaining written consent; never construct a before/after pair from unrelated photographs.
