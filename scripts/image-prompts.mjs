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
  'teal-and-orange grading, visible text or logos, stock-photo energy. ' +
  // Naming a film stock above sometimes makes the model draw the film rebate
  // itself, complete with "KODAK PORTRA 400" printed along the edge.
  'Do not draw a film border, film rebate, sprocket holes, frame edge, brand markings or ' +
  'any printed text anywhere in the image. Full bleed photograph only.';

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
    /*
     * Must show exactly the pieces that appear in the three look-*
     * photographs and nothing else. A flat lay containing garments that are
     * in none of the looks makes the section's claim untrue.
     */
    key: 'wardrobe-spread',
    aspect: '4:3',
    prompt:
      `${ANCHOR} Overhead flat lay on a clean white bedsheet in a bright Indian bedroom: the ` +
      'contents of one wardrobe laid out in three loose groups.\n' +
      'Group one: an ivory cream blazer, a plain white t-shirt, dark chocolate-brown wide-leg ' +
      'tailored trousers, a slim dark belt with a gold buckle, cream leather loafer mules, a tan ' +
      'leather tote bag.\n' +
      'Group two: a black cropped denim jacket, a fitted white top, a short black wrap mini skirt, ' +
      'tall black leather knee boots, a small black shoulder bag.\n' +
      'Group three: a dusty rose embroidered short kurta, a folded antique-gold tissue sharara, a ' +
      'dusty rose organza dupatta, gold statement earrings and gold bangles.\n\n' +
      'Everything worn-in rather than brand new. Bright soft daylight from the left. Shot from ' +
      'directly overhead, 35mm lens, arrangement relaxed and slightly off-centre. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    /*
     * All three outfits in ONE frame, then sliced into panels by
     * scripts/slice-triptych.mjs. One canvas keeps the face, the room and the
     * light identical across the three, which separate calls will not.
     *
     * The outfits come from client-supplied reference images. Do not loosen
     * them: the brief is these three specific looks, not "an office look".
     */
    key: 'looks-triptych',
    aspect: '16:9',
    size: '4K',
    prompt:
      'One single continuous photograph, no borders or dividing lines, of the SAME Indian woman ' +
      'appearing three times in the SAME room — a bright, warm bedroom in a contemporary Indian ' +
      'home with pale walls, a wooden floor, a large window with a sheer curtain on the left. ' +
      'Soft natural daylight throughout. She stands in three well-separated spots across the room, ' +
      'full length head to toe, with clear empty wall between them.\n\n' +
      'Same face, same long dark wavy hair, same warm skin in all three. Three completely ' +
      'different outfits:\n' +
      'LEFT, office: a relaxed ivory cream single-button blazer worn open, sleeves slightly pushed ' +
      'up, over a plain white fitted t-shirt tucked in; dark chocolate-brown high-waisted wide-leg ' +
      'tailored trousers with a slim dark belt and a gold buckle; cream leather loafer mules; a tan ' +
      'leather tote bag held at her side. Relaxed stance, one hand on the bag, looking off camera.\n' +
      'CENTRE, Saturday night: a black cropped denim jacket worn open over a fitted white top; a ' +
      'short black wrap mini skirt; tall black knee-high leather boots; a small black leather ' +
      'shoulder bag. Confident stance, weight on one hip, chin slightly lifted.\n' +
      'RIGHT, wedding: a dusty rose sleeveless short kurta with heavy tonal silver and pale pink ' +
      'embroidery across the yoke and hem; a wide flared antique-gold tissue brocade sharara; a ' +
      'matching dusty rose organza dupatta with an embroidered border draped over one shoulder; ' +
      'gold statement earrings and bangles. Turned slightly, one hand at her waist, a soft smile.\n\n' +
      'Three natural relaxed poses, NOT three identical straight-on stances. ' +
      `${CRAFT} Avoid: a plain white studio backdrop, a flat e-commerce catalogue look, identical ` +
      'repeated poses, arms hanging stiffly at the sides, mixing the three outfits up, putting the ' +
      `same garment into more than one look. ${NEGATIVE}`,
  },
  {
    key: 'measure-form',
    aspect: '4:3',
    prompt:
      'A tailor’s adjustable dress form standing in a bright, calm room in an Indian home, with a ' +
      'soft yellow measuring tape draped over one shoulder and hanging down. The form is covered in ' +
      'warm oatmeal linen on a dark wooden tripod stand. On a small side table beside it: a pair of ' +
      'fabric shears, a folded blue-and-white striped cotton shirt, and a few tailor’s chalk pieces. ' +
      'Clean white wall, a large window out of frame to the left casting soft directional daylight ' +
      'and a gentle shadow. Shot on a 50mm lens at a shallow aperture, the form sharp and the ' +
      'background falling away softly. Generous empty wall space above. ' +
      `${CRAFT} ${NEGATIVE}`,
  },
  {
    key: 'band-rail',
    aspect: '21:9',
    prompt:
      `${ANCHOR} A wide cinematic view straight down a long wardrobe rail in a bright Indian home, ` +
      'densely packed with clothes on mismatched hangers — cotton kurtas, crisp shirts, a folded ' +
      'saree in a garment bag, denim, two dupattas draped over the rail, a linen jacket. ' +
      'Colours run warm and varied, nothing colour-matched. No people in frame. Soft morning light ' +
      'rakes in from a window at the right, falling off gently into the depth of the wardrobe. ' +
      'Shot on a 50mm lens at a shallow aperture, focus landing a third of the way along the rail, ' +
      'the near and far ends softly out of focus. Composed for an extremely wide crop with the ' +
      'clothes filling the lower two-thirds of the frame. ' +
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
