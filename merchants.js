// ABOUTME: Static merchant database mapping merchants to reward categories
// ABOUTME: Used for auto-categorizing purchases when users search by merchant name

const merchantDatabase = {
  groceries: {
    keywords: ["grocery", "supermarket", "food store", "food market"],
    merchants: [
      "Albertsons",
      "Aldi",
      "Costco",
      "Food Lion",
      "Giant",
      "H-E-B",
      "Harris Teeter",
      "Kroger",
      "Meijer",
      "Piggly Wiggly",
      "Publix",
      "Safeway",
      "Sam's Club",
      "Save Mart",
      "ShopRite",
      "Sprouts",
      "Stop & Shop",
      "Target",
      "Trader Joe's",
      "Vons",
      "Walmart",
      "Wegmans",
      "Whole Foods",
      "WinCo",
      "Winn-Dixie"
    ]
  },

  gas: {
    keywords: ["fuel", "gas station", "gasoline", "petrol", "ev charging"],
    merchants: [
      "76",
      "Arco",
      "BP",
      "Casey's",
      "ChargePoint",
      "Chevron",
      "Circle K",
      "Citgo",
      "Conoco",
      "Costco Gas",
      "Cumberland Farms",
      "Electrify America",
      "Exxon",
      "EVgo",
      "GetGo",
      "Gulf",
      "Kum & Go",
      "Kwik Trip",
      "Marathon",
      "Mobil",
      "Murphy USA",
      "Phillips 66",
      "Pilot",
      "QuikTrip",
      "RaceTrac",
      "Sam's Club Gas",
      "Sheetz",
      "Shell",
      "Sinclair",
      "Speedway",
      "Sunoco",
      "Tesla Supercharger",
      "Texaco",
      "Valero",
      "Wawa"
    ]
  },

  dining: {
    keywords: ["restaurant", "food", "eat", "dine", "takeout", "delivery"],
    merchants: [
      "Applebee's",
      "Arby's",
      "Buffalo Wild Wings",
      "Burger King",
      "Cava",
      "Cheesecake Factory",
      "Chick-fil-A",
      "Chili's",
      "Chipotle",
      "Cracker Barrel",
      "Denny's",
      "Domino's",
      "DoorDash",
      "Dunkin'",
      "Five Guys",
      "Grubhub",
      "IHOP",
      "In-N-Out",
      "Jack in the Box",
      "Jersey Mike's",
      "Jimmy John's",
      "KFC",
      "Little Caesars",
      "Longhorn Steakhouse",
      "McDonald's",
      "Noodles & Company",
      "Olive Garden",
      "Outback Steakhouse",
      "Panda Express",
      "Panera",
      "Papa John's",
      "Pizza Hut",
      "Popeyes",
      "Postmates",
      "Qdoba",
      "Red Lobster",
      "Red Robin",
      "Shake Shack",
      "Sonic",
      "Starbucks",
      "Subway",
      "Sweetgreen",
      "Taco Bell",
      "Texas Roadhouse",
      "TGI Friday's",
      "Uber",
      "Uber Eats",
      "Wendy's",
      "Whataburger",
      "Wingstop",
      "Zaxby's"
    ]
  },

  travel: {
    keywords: ["flight", "airline", "hotel", "lodging", "vacation", "trip"],
    merchants: [
      "Airbnb",
      "Alaska Airlines",
      "American Airlines",
      "Best Western",
      "Booking.com",
      "Choice Hotels",
      "Delta",
      "Expedia",
      "Frontier Airlines",
      "Hawaiian Airlines",
      "Hilton",
      "Holiday Inn",
      "Hotels.com",
      "Hyatt",
      "IHG",
      "JetBlue",
      "Kayak",
      "La Quinta",
      "Marriott",
      "Motel 6",
      "Omni Hotels",
      "Orbitz",
      "Priceline",
      "Radisson",
      "Sheraton",
      "Southwest",
      "Spirit Airlines",
      "Travelocity",
      "Trivago",
      "United Airlines",
      "VRBO",
      "Westin",
      "Wyndham"
    ]
  },

  rideshare: {
    keywords: ["ride", "taxi", "cab", "transportation"],
    merchants: [
      "Lyft",
      "Uber",
      "Via",
      "Curb",
      "Wingz"
    ]
  },

  transit: {
    keywords: ["metro", "subway", "bus", "train", "commute", "public transit"],
    merchants: [
      "Amtrak",
      "BART",
      "Caltrain",
      "Chicago CTA",
      "DC Metro",
      "Greyhound",
      "LA Metro",
      "MBTA",
      "MTA",
      "NJ Transit",
      "SEPTA",
      "Uber Transit"
    ]
  },

  rentalCars: {
    keywords: ["car rental", "rental car", "rent a car"],
    merchants: [
      "Alamo",
      "Avis",
      "Budget",
      "Dollar",
      "Enterprise",
      "Hertz",
      "National",
      "Sixt",
      "Thrifty",
      "Turo",
      "Zipcar"
    ]
  },

  streaming: {
    keywords: ["stream", "subscription", "video", "music", "entertainment"],
    merchants: [
      "Amazon Prime Video",
      "Apple Music",
      "Apple TV+",
      "Audible",
      "Crunchyroll",
      "Deezer",
      "Discovery+",
      "Disney+",
      "ESPN+",
      "Hulu",
      "Max",
      "Netflix",
      "Pandora",
      "Paramount+",
      "Peacock",
      "SiriusXM",
      "Sling TV",
      "Spotify",
      "Tidal",
      "YouTube Music",
      "YouTube Premium"
    ]
  },

  online: {
    keywords: ["online shopping", "ecommerce", "internet shopping"],
    merchants: [
      "Amazon",
      "Chewy",
      "eBay",
      "Etsy",
      "Newegg",
      "Overstock",
      "Wayfair",
      "Zappos"
    ]
  },

  drugstores: {
    keywords: ["pharmacy", "drug store", "medicine", "prescription"],
    merchants: [
      "CVS",
      "Rite Aid",
      "Walgreens"
    ]
  },

  departmentStores: {
    keywords: ["department store", "clothing", "apparel", "fashion"],
    merchants: [
      "Belk",
      "Bloomingdale's",
      "Dillard's",
      "JCPenney",
      "Kohl's",
      "Macy's",
      "Nordstrom",
      "Nordstrom Rack",
      "Saks Fifth Avenue",
      "Saks Off 5th"
    ]
  },

  clothing: {
    keywords: ["clothes", "apparel", "fashion", "shoes", "accessories"],
    merchants: [
      "Abercrombie & Fitch",
      "American Eagle",
      "Ann Taylor",
      "Banana Republic",
      "Burlington",
      "Express",
      "Forever 21",
      "Gap",
      "H&M",
      "Hollister",
      "J.Crew",
      "Loft",
      "Lululemon",
      "Marshalls",
      "Nike",
      "Old Navy",
      "Ross",
      "T.J. Maxx",
      "Uniqlo",
      "Urban Outfitters",
      "Zara"
    ]
  },

  homeImprovement: {
    keywords: ["hardware", "home improvement", "tools", "lumber", "garden"],
    merchants: [
      "Ace Hardware",
      "Home Depot",
      "Lowe's",
      "Menards",
      "True Value"
    ]
  },

  electronics: {
    keywords: ["tech", "computer", "phone", "gadget", "appliance"],
    merchants: [
      "Apple Store",
      "B&H Photo",
      "Best Buy",
      "GameStop",
      "Micro Center",
      "Samsung"
    ]
  },

  furniture: {
    keywords: ["furniture", "home decor", "bedding", "mattress"],
    merchants: [
      "Ashley Furniture",
      "Bed Bath & Beyond",
      "CB2",
      "Crate & Barrel",
      "IKEA",
      "Pottery Barn",
      "Rooms To Go",
      "West Elm",
      "Williams Sonoma"
    ]
  },

  officeSupplies: {
    keywords: ["office", "supplies", "stationery", "printing"],
    merchants: [
      "FedEx Office",
      "Office Depot",
      "Staples",
      "The UPS Store"
    ]
  },

  fitness: {
    keywords: ["gym", "workout", "exercise", "health club"],
    merchants: [
      "24 Hour Fitness",
      "Anytime Fitness",
      "ClassPass",
      "Crunch Fitness",
      "Equinox",
      "Gold's Gym",
      "LA Fitness",
      "Orangetheory",
      "Peloton",
      "Planet Fitness",
      "SoulCycle",
      "YMCA"
    ]
  },

  entertainment: {
    keywords: ["movie", "concert", "event", "theater", "amusement"],
    merchants: [
      "AMC Theatres",
      "AXS",
      "Bowlero",
      "Cinemark",
      "Dave & Buster's",
      "Disney Parks",
      "Fandango",
      "Live Nation",
      "Regal Cinemas",
      "SeaWorld",
      "Six Flags",
      "StubHub",
      "Ticketmaster",
      "Topgolf",
      "Universal Studios"
    ]
  },

  utilities: {
    keywords: ["utility", "bill", "electric", "water", "internet", "phone"],
    merchants: [
      "AT&T",
      "Comcast",
      "Cox",
      "Google Fi",
      "Mint Mobile",
      "Spectrum",
      "T-Mobile",
      "Verizon",
      "Visible",
      "Xfinity"
    ]
  },

  insurance: {
    keywords: ["insurance", "coverage", "policy"],
    merchants: [
      "Allstate",
      "Geico",
      "Liberty Mutual",
      "Progressive",
      "State Farm",
      "USAA"
    ]
  },

  wholesale: {
    keywords: ["wholesale", "bulk", "warehouse club", "membership"],
    merchants: [
      "BJ's",
      "Costco",
      "Sam's Club"
    ]
  },

  petStores: {
    keywords: ["pet", "dog", "cat", "animal", "pet supplies"],
    merchants: [
      "Chewy",
      "PetSmart",
      "Petco"
    ]
  },

  parking: {
    keywords: ["parking", "garage", "lot"],
    merchants: [
      "LAZ Parking",
      "ParkMobile",
      "ParkWhiz",
      "SpotHero"
    ]
  },

  tolls: {
    keywords: ["toll", "highway", "expressway"],
    merchants: [
      "E-ZPass",
      "FasTrak",
      "SunPass",
      "TxTag"
    ]
  }
};

// Build reverse lookup: merchant name -> array of categories
// This handles merchants that appear in multiple categories (e.g., Costco in groceries + wholesale)
function buildMerchantLookup() {
  const lookup = {};
  
  for (const [category, data] of Object.entries(merchantDatabase)) {
    for (const merchant of data.merchants) {
      const key = merchant.toLowerCase();
      if (!lookup[key]) {
        lookup[key] = [];
      }
      lookup[key].push(category);
    }
  }
  
  return lookup;
}

const merchantLookup = buildMerchantLookup();

// Search for a merchant and return matching categories
// Returns: { merchant: string, categories: string[] } or null if not found
function findMerchant(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  
  // Exact match
  if (merchantLookup[term]) {
    return {
      merchant: searchTerm,
      categories: merchantLookup[term]
    };
  }
  
  // Partial match - find merchants that contain the search term
  const matches = [];
  for (const [merchant, categories] of Object.entries(merchantLookup)) {
    if (merchant.includes(term) || term.includes(merchant)) {
      matches.push({ merchant, categories });
    }
  }
  
  if (matches.length === 1) {
    return matches[0];
  }
  
  if (matches.length > 1) {
    // Return all matches, let caller decide
    return { 
      merchant: searchTerm, 
      categories: [...new Set(matches.flatMap(m => m.categories))],
      multipleMatches: matches
    };
  }
  
  return null;
}

// Get all merchants for a given category
function getMerchantsByCategory(category) {
  const data = merchantDatabase[category];
  return data ? data.merchants : [];
}

// Get all categories
function getAllCategories() {
  return Object.keys(merchantDatabase);
}

// Get category display name (convert camelCase to Title Case)
function getCategoryDisplayName(category) {
  return category
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}
