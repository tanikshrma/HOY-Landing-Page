/**
 * Prompt set for HOY landing page photography.
 *
 * Two failure modes to steer against, both learned the hard way:
 *
 *  1. Generic AI stock — colour-matched outfits, plastic smiles, beige studio
 *     voids. Countered by NEGATIVE plus real rooms and real clutter.
 *
 *  2. Prompting hard for "documentary realism" drags the model toward Western
 *     indie-film photography: it will quietly swap in a white subject and a
 *     peeling American apartment. Countered by ANCHOR, which restates
 *     ethnicity and location in every single prompt, and by keeping decay
 *     words ("dim", "peeling", "grey") out of the scene descriptions.
 *
 * The brand is aspirational. Subjects are comfortable and self-possessed —
 * mildly exasperated at most, never miserable, and the homes are bright and
 * well-kept.
 */

const ANCHOR =
  'All people in this image are Indian, with South Asian features and brown skin. ' +
  'The location is contemporary urban India. This is essential and must not be substituted.';

const CRAFT =
  'Editorial lifestyle photography on 35mm film, Kodak Portra 400, fine natural grain. ' +
  'Bright, airy, well-exposed, soft natural daylight from a large window. ' +
  'Real unretouched skin texture, natural hair with a few strays, believable bodies. ' +
  'Warm neutral colour, gently lifted shadows. Candid off-guard moment, relaxed framing.';

const NEGATIVE =
  'Avoid: white or European subjects, American or European interiors, run-down or peeling rooms, ' +
  'dim muddy lighting, distressed or unhappy expressions, colour-coordinated matching outfits, ' +
  'wide toothy grins, posed catalogue stances, empty beige studio backdrops, glossy retouched skin, ' +
  'teal-and-orange grading, visible text or logos, stock-photo energy.';

/** @type {{key:string, aspect:string, prompt:string}[]} */
export const PROMPTS = [
  {
    key: 'hero-desktop',
    aspect: '16:9',
    prompt:
      `${ANCHOR} A 30-year-old Indian woman stands in the bedroom of a bright, well-kept Mumbai apartment ` +
      'on a weekday morning, already in tailored trousers and a plain camisole, holding up two shirts ' +
      'and looking between them with a small wry half-smile — mildly exasperated, not upset. ' +
      'Her hair is loosely tied, she looks put-together and comfortable. Behind her a full wardrobe ' +
      'stands open: kurtas, shirts, jeans, a saree in a garment bag, packed but tidy. A few considered-' +
      'and-rejected pieces are folded on the neatly made bed. Clean white walls, a large window on the ' +
      'left flooding the room with soft morning light. Wide shot on a 35mm lens; she sits in the right ' +
      'third of the frame with open, bright wall space on the left. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'hero-mobile',
    aspect: '3:4',
    prompt:
      `${ANCHOR} Vertical portrait. A 30-year-old Indian woman in the bedroom of a bright Mumbai apartment ` +
      'on a weekday morning, in tailored trousers and a plain camisole, holding up two shirts and ' +
      'deciding between them with a small wry half-smile. Loosely tied hair, relaxed and self-possessed. ' +
      'A full but tidy open wardrobe behind her, a couple of folded shirts on the neatly made bed in the ' +
      'soft-focus foreground. Clean white walls, big window, abundant soft morning daylight. ' +
      'Shot at chest height on a 50mm lens, framed from mid-thigh up, she is centred. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'step-capture',
    aspect: '4:3',
    prompt:
      `${ANCHOR} Close over-the-shoulder shot of a young Indian woman's hands holding a smartphone up to ` +
      'photograph a folded indigo block-print cotton kurta laid on a bed. Her phone screen shows the ' +
      'kurta framed in a camera app. Bright clean bedroom in an Indian apartment, white bedsheet, ' +
      'soft daylight from the right. Shallow depth of field with focus on the phone screen, 50mm lens. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'step-measure',
    aspect: '4:3',
    prompt:
      `${ANCHOR} A 29-year-old Indian woman stands in her bright, tidy bedroom holding a soft yellow ` +
      'measuring tape across her shoulders, looking down to read the measurement with a ' +
      'small focused smile. She wears a simple fitted grey top and jeans. A phone lies screen-up on ' +
      'the neatly made bed beside a notebook. Large window on the left, soft daylight. ' +
      'Three-quarter shot from mid-thigh up on a 50mm lens, she is slightly right of centre. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'step-outfit',
    aspect: '4:3',
    prompt:
      `${ANCHOR} A 28-year-old Indian man with brown skin and dark hair, mid-stride in the bright hallway ` +
      'of his modern Indian apartment, pulling a canvas bag strap onto his shoulder as he heads out. ' +
      'He wears an olive overshirt over a faded grey tee with dark indigo jeans — the colours work ' +
      'together but were clearly not bought as a set, and the overshirt has a natural crease. ' +
      'He looks quietly pleased, glancing off to the side, not at the camera. Clean painted walls, ' +
      'daylight pouring in through the open door behind him. 35mm lens. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'rewear',
    aspect: '4:3',
    prompt:
      `${ANCHOR} Overhead flat lay on a clean, lightly creased white bedsheet in an Indian home: one ` +
      'blue-and-white striped cotton shirt laid in the centre, with three different sets of things it ' +
      'could be worn with arranged loosely around it — dark indigo jeans with white sneakers; ' +
      'beige linen trousers with tan leather sandals; and a black Nehru-collar layering vest with ' +
      'brown juttis. Everything is worn-in rather than brand new. Bright soft daylight from the left. ' +
      'Shot from directly overhead, 35mm lens, arrangement slightly off-centre. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'occasion',
    aspect: '4:3',
    prompt:
      `${ANCHOR} A warm, lively Diwali evening gathering in a bright Delhi apartment, shot from the edge ` +
      'of the room. Eight or nine Indian people in their late twenties and thirties stand talking in ' +
      'small groups, holding plates and cups, relaxed and laughing gently. Everyone is dressed ' +
      'differently: one man in a plain black kurta, a woman in a deep green silk saree, someone in ' +
      'jeans with a well-cut blazer, another in a printed midi dress, one in a bandhgala. ' +
      'Marigold strings and warm fairy lights, clean white walls. A person walks through the ' +
      'foreground, motion-blurred. 28mm lens, handheld, natural and slightly imperfect framing. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'wardrobe-detail',
    aspect: '3:4',
    prompt:
      `${ANCHOR} Vertical close shot into an open wardrobe in a bright Indian home: a dense row of clothes ` +
      'on mismatched wooden and plastic hangers — cotton kurtas, crisp shirts, two dupattas draped ' +
      'over the rail, a stack of folded jeans on the shelf below. Full and lived-in but cared for. ' +
      'Soft daylight from a window to the side reaching into the wardrobe. ' +
      '50mm lens, shallow focus on the middle of the rail. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'og-share',
    aspect: '16:9',
    prompt:
      `${ANCHOR} A 30-year-old Indian woman seen from behind and slightly to the side, standing in front of ` +
      'a full open wardrobe in a bright, clean Mumbai bedroom, one hand sliding hangers along the rail. ' +
      'She wears tailored trousers and a plain camisole, hair loosely tied. Soft abundant morning light. ' +
      'Wide shot with generous bright empty wall space across the left half of the frame. 35mm lens. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
];
