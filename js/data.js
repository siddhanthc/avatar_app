const MALLESHWARAM_CENTER = [77.5720, 13.002];
const DEFAULT_ZOOM = 14.5;
const DEFAULT_PITCH = 50;
const DEFAULT_BEARING = -15;

// Malleshwaram neighborhood boundary (traced from Google Maps)
// N: 80 Feet Rd, NE-E: Sankey Rd diagonal, S: Mantri Square,
// SW: Dr Rajkumar Rd, W: Railway line (tight)
const MALLESHWARAM_BOUNDARY = [
  // ── North: along 80 Feet Rd ──
  [77.5650, 13.0130],  // NW — railway meets 80 Feet Rd
  [77.5700, 13.0135],  // N — along 80 Feet Rd
  [77.5740, 13.0125],  // N — continuing east
  // ── NE–E: diagonal along Sankey Rd ──
  [77.5770, 13.0100],  // NE — start of Sankey Rd
  [77.5790, 13.0075],  // E — along Sankey Rd
  [77.5810, 13.0045],  // E — continuing SE
  [77.5830, 13.0015],  // E — further along Sankey Rd
  [77.5835, 12.9985],  // E — eastern tip
  // ── SE–S: curving south toward Mantri Square ──
  [77.5820, 12.9955],  // SE — past Sankey Rd
  [77.5790, 12.9930],  // SE — near Kumarakrupa Rd
  [77.5750, 12.9910],  // S — heading to Mantri Square
  [77.5710, 12.9900],  // S — near Mantri Square Mall
  // ── SW: Dr Rajkumar Rd ──
  [77.5680, 12.9905],  // SW — southern edge
  [77.5660, 12.9920],  // SW — Dr Rajkumar Rd area
  // ── West: along the railway line ──
  [77.5655, 12.9960],  // W — railway line south
  [77.5652, 13.0000],  // W — railway line
  [77.5650, 13.0040],  // W — railway line
  [77.5650, 13.0080],  // W — railway line
  [77.5650, 13.0130],  // NW — close polygon at railway / 80 Feet Rd
];

const places = [
  // ── Temples ──────────────────────────────────────────────
  {
    id: 'kaadu-malleshwara',
    name: 'Kaadu Malleshwara Temple',
    category: 'temple',
    coordinates: [77.5715, 13.0050],
    description:
      'A 17th-century Shiva temple that gives Malleshwaram its name. Built in 1669 by Venkoji (step-brother of Shivaji) in Dravidian style, featuring an intricate gopuram. "Kaadu" means forest, referring to the thick greenery that once surrounded it.',
    timings: '6:00 AM – 12:00 PM, 5:00 PM – 9:00 PM',
    rating: 4.5,
    established: '1669 AD',
    deity: 'Lord Shiva (Mallikarjuna)',
    highlight: 'Visit during Shivaratri for the grand annual festival',
  },
  {
    id: 'nandi-tirtha',
    name: 'Dakshinamukha Nandi Tirtha Kalyani Kshetra',
    category: 'temple',
    coordinates: [77.5709, 13.0034],
    description:
      'A serene 400-year-old temple featuring a rare south-facing Nandi statue from whose mouth water continuously flows over a Shivalinga. The beautiful stepped Kalyani (tank) adds to its meditative ambiance.',
    timings: '6:30 AM – 12:30 PM, 5:30 PM – 8:30 PM',
    rating: 4.6,
    established: '~1600s',
    deity: 'Nandi & Shiva',
    highlight: 'The south-facing Nandi is architecturally unique in India',
  },
  {
    id: 'iskcon',
    name: 'ISKCON Temple',
    category: 'temple',
    coordinates: [77.5486, 13.0097],
    description:
      'Sri Radha Krishna Chandra Temple — one of the largest ISKCON temples in the world. Its striking blend of modern and Dravidian architecture draws millions of devotees and visitors annually.',
    timings: '4:15 AM – 1:00 PM, 4:00 PM – 8:30 PM',
    rating: 4.6,
    established: '1997',
    deity: 'Radha Krishna',
    highlight: 'Attend the evening aarti for a mesmerizing experience',
  },
  {
    id: 'sai-baba',
    name: 'Shirdi Sai Baba Temple',
    category: 'temple',
    coordinates: [77.5705, 13.0048],
    description:
      'A popular temple near Sampige Road dedicated to Shirdi Sai Baba. Draws millions of devotees every year and is a spiritual landmark in the heart of Malleshwaram.',
    timings: '6:00 AM – 12:00 PM, 4:00 PM – 9:00 PM',
    rating: 4.4,
    deity: 'Shirdi Sai Baba',
    highlight: 'Thursday evening prayers are especially vibrant',
  },
  {
    id: 'gangamma-devi',
    name: 'Gangamma Devi Temple',
    category: 'temple',
    coordinates: [77.5718, 13.0045],
    description:
      'Located on 2nd Temple Street right beside Kaadu Malleshwara Temple, this temple is dedicated to Goddess Gangamma (Ganga). An important neighborhood shrine with deep local roots.',
    timings: '6:00 AM – 12:00 PM, 5:00 PM – 8:30 PM',
    rating: 4.3,
    deity: 'Gangamma (Goddess Ganga)',
    highlight: 'Annual Gangamma Devi festival draws the whole neighborhood',
  },

  // ── Eateries ─────────────────────────────────────────────
  {
    id: 'ctr',
    name: 'CTR – Central Tiffin Room (Sri Sagar)',
    category: 'eatery',
    coordinates: [77.5689, 13.0034],
    description:
      'A legendary corner eatery on Margosa Road, 7th Cross, serving Bangalore\'s most iconic Masala Dosa since the 1960s. The crispy, buttery dosa with potato filling is worth every minute in the queue.',
    timings: '7:30 AM – 12:30 PM, 4:00 PM – 8:30 PM',
    rating: 4.5,
    mustTry: 'Benne Masala Dosa, Set Dosa, Filter Coffee',
    priceRange: '₹50 – ₹150',
  },
  {
    id: 'veena-stores',
    name: 'Veena Stores',
    category: 'eatery',
    coordinates: [77.5688, 13.0032],
    description:
      'A tiny, no-frills institution beloved for its fluffy idlis, crispy vadas, and unbeatable chutneys. Efficiency and taste over ambiance — grab a plate and eat standing with the locals.',
    timings: '6:00 AM – 12:00 PM, 3:30 PM – 8:00 PM',
    rating: 4.4,
    mustTry: 'Idli-Vada, Kesari Bath, Puliyogare, Filter Coffee',
    priceRange: '₹30 – ₹100',
  },
  {
    id: 'janatha-hotel',
    name: 'Hotel Janatha',
    category: 'eatery',
    coordinates: [77.5713, 13.0000],
    description:
      'A Malleshwaram institution spilling over with patrons for good reason — home to some of the city\'s best dosas. Reasonably priced, hearty South Indian fare that keeps generations coming back.',
    timings: '6:30 AM – 12:30 PM, 4:00 PM – 8:30 PM',
    rating: 4.3,
    mustTry: 'Masala Dosa, Rava Idli, Khara Bath',
    priceRange: '₹40 – ₹120',
  },
  {
    id: 'dose-corner',
    name: 'Malleswaram Dose Corner',
    category: 'eatery',
    coordinates: [77.5700, 12.9980],
    description:
      'Tucked between 16th and 18th Cross, this local favorite is known for its perfectly crisp benne (butter) masala dosas, cooked on a traditional cast-iron griddle.',
    timings: '7:00 AM – 1:00 PM, 4:00 PM – 9:00 PM',
    rating: 4.3,
    mustTry: 'Benne Masala Dosa, Open Dosa',
    priceRange: '₹40 – ₹120',
  },
  {
    id: 'iyer-mess',
    name: 'Iyer Mess',
    category: 'eatery',
    coordinates: [77.5690, 13.0000],
    description:
      'An authentic South Indian vegetarian mess serving traditional Tamil Brahmin cuisine. Simple, home-style meals that transport you to a different era of Bangalore.',
    timings: '12:00 PM – 3:00 PM, 7:30 PM – 9:30 PM',
    rating: 4.2,
    mustTry: 'Unlimited Thali, Rasam, Payasam',
    priceRange: '₹100 – ₹200',
  },
  {
    id: 'higher-taste',
    name: 'The Higher Taste',
    category: 'eatery',
    coordinates: [77.5488, 13.0097],
    description:
      'A pure vegetarian fine-dining restaurant within the ISKCON temple complex. Serves sattvic cuisine (no onion, no garlic) with a refined touch — a unique culinary experience.',
    timings: '11:00 AM – 3:00 PM, 6:00 PM – 10:00 PM',
    rating: 4.4,
    mustTry: 'Paneer Makhani, Thali, Fresh Juices',
    priceRange: '₹200 – ₹500',
  },

  // ── Landmarks ────────────────────────────────────────────
  {
    id: '8th-cross-market',
    name: '8th Cross Market',
    category: 'landmark',
    coordinates: [77.5713, 12.9998],
    description:
      'The bustling heart of Malleshwaram — a vibrant street market lined with vendors selling fresh flowers, fruits, vegetables, traditional sweets, and puja items. The quintessential Bangalore neighborhood market experience.',
    timings: '6:00 AM – 9:00 PM (best before noon)',
    rating: 4.5,
    highlight: 'Visit early morning for the freshest flowers and produce',
  },
  {
    id: 'sankey-tank',
    name: 'Sankey Tank',
    category: 'landmark',
    coordinates: [77.5741, 13.0090],
    description:
      'One of Bangalore\'s oldest man-made lakes, built in 1882. Spread over 15 hectares across Malleshwaram, Vyalikaval, and Sadashiva Nagar — perfect for morning walks, photography, and a peaceful escape.',
    timings: '5:00 AM – 10:00 AM, 3:30 PM – 7:30 PM',
    rating: 4.4,
    highlight: 'Stunning sunset views and a well-maintained walking track',
  },
  {
    id: 'chowdiah-hall',
    name: 'Chowdiah Memorial Hall',
    category: 'landmark',
    coordinates: [77.5756, 13.0065],
    description:
      'One of Bengaluru\'s premier cultural venues, famously built in the shape of a giant violin as a tribute to legendary violinist T. Chowdiah. Hosts concerts, classical music, theatre, and dance performances.',
    timings: 'Event-based (box office: 10 AM – 5 PM)',
    rating: 4.5,
    highlight: 'The violin-shaped architecture is one of a kind in the world',
  },
];
