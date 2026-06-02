import { useState, useEffect, useRef } from "react";

const DESTINATIONS = {
  library: [
    { name: "Martin Luther King Jr. Memorial Library", neighborhood: "Chinatown", address: "901 G St NW", description: "DC's stunning Mies van der Rohe masterpiece, freshly renovated. Huge cycling-friendly area with racks outside.", bikeFriendly: 5, distance: "2.1 mi", fun: "Has a rooftop terrace with skyline views 🏙️" },
    { name: "Georgetown Branch Library", neighborhood: "Georgetown", address: "3260 R St NW", description: "Charming neighborhood library right off the Capital Crescent Trail. Perfect mid-ride stop.", bikeFriendly: 5, distance: "3.4 mi", fun: "Minutes from the CCT trailhead 🌿" },
    { name: "Tenleytown Library", neighborhood: "Tenleytown", address: "4450 Wisconsin Ave NW", description: "Modern branch with great study spaces. Good bikeshare dock nearby.", bikeFriendly: 4, distance: "4.8 mi", fun: "AU students mix with locals here 📚" },
    { name: "Francis A. Gregory Library", neighborhood: "Fort Davis", address: "3660 Alabama Ave SE", description: "Award-winning library with a dramatic angular design. Part of the Anacostia Riverwalk network.", bikeFriendly: 4, distance: "5.2 mi", fun: "Designed by David Adjaye — stunning architecture 🏛️" },
    { name: "Palisades Library", neighborhood: "Palisades", address: "4901 V St NW", description: "Tucked-away gem near the Potomac. Quiet, cozy, and close to great trails.", bikeFriendly: 3, distance: "5.9 mi", fun: "Neighborhood secret — hardly any crowds 🤫" },
  ],
  restaurant: [
    { name: "Gravitas", neighborhood: "H Street NE", address: "1401 Okie St NE", description: "Chef Matt Baker's tasting-menu gem. Upscale farm-to-table, worth every mile of the ride.", bikeFriendly: 4, distance: "2.9 mi", fun: "One of DC's most celebrated dining experiences 🌟" },
    { name: "Maketto", neighborhood: "H Street NE", address: "1351 H St NE", description: "Indoor market meets SE Asian café. Incredible Taiwanese-Cambodian food, killer coffee, bike-rack right outside.", bikeFriendly: 5, distance: "2.8 mi", fun: "Also sells streetwear — ride, eat, shop 🛍️" },
    { name: "Tail Up Goat", neighborhood: "Adams Morgan", address: "1827 Adams Mill Rd NW", description: "Inventive Caribbean-inspired small plates. Bright, loud, and unforgettable. Easy bikeshare drop nearby.", bikeFriendly: 4, distance: "3.1 mi", fun: "Named a best restaurant by Bon Appétit 🏆" },
    { name: "Immigrant Food", neighborhood: "Penn Quarter", address: "1701 Pennsylvania Ave NW", description: "Globally inspired street food near the White House. Advocacy-driven concept with amazing food.", bikeFriendly: 5, distance: "1.8 mi", fun: "Right on the Penn Ave protected bike lane 🚲" },
    { name: "St. Anselm", neighborhood: "NoMa", address: "1250 5th St NE", description: "Wood-fired everything. Steaks, oysters, old fashioneds — a carnivore's reward after a long ride.", bikeFriendly: 4, distance: "2.4 mi", fun: "Open fire cooking you can watch from the bar 🔥" },
    { name: "Compass Rose", neighborhood: "Logan Circle", address: "1346 T St NW", description: "Global street food in a gorgeous rowhouse. The khinkali dumplings are life-changing.", bikeFriendly: 4, distance: "2.0 mi", fun: "Every dish is from a different country 🌍" },
  ],
  "art gallery": [
    { name: "National Gallery of Art", neighborhood: "National Mall", address: "6th & Constitution Ave NW", description: "World-class collection, free entry always. Bike to the Mall and lock up at the racks out front.", bikeFriendly: 5, distance: "2.0 mi", fun: "The East Building's atrium is jaw-dropping 🎨" },
    { name: "Hirshhorn Museum", neighborhood: "National Mall", address: "Independence Ave SW", description: "DC's contemporary art powerhouse. Rotating major exhibitions in a brutalist drum building.", bikeFriendly: 5, distance: "1.9 mi", fun: "The sunken sculpture garden is perfect for a rest 🗿" },
    { name: "Dupont Underground", neighborhood: "Dupont Circle", address: "19 Dupont Cir NW", description: "Abandoned trolley station turned underground gallery space. Surreal and unforgettable.", bikeFriendly: 4, distance: "2.5 mi", fun: "An art space literally underground beneath Dupont Circle 🚇" },
    { name: "Transformer Gallery", neighborhood: "Logan Circle", address: "1404 P St NW", description: "Fiercely independent contemporary gallery championing emerging artists and experimental work.", bikeFriendly: 4, distance: "2.2 mi", fun: "Free entry, radical programming 🤘" },
    { name: "Planet Word Museum", neighborhood: "Shaw", address: "925 G St NW", description: "World's first museum dedicated to language. Interactive, surprising, and deeply weird — in the best way.", bikeFriendly: 5, distance: "1.6 mi", fun: "The talking walls literally talk back to you 🗣️" },
  ],
  club: [
    { name: "Echostage", neighborhood: "NoMa", address: "2135 Queens Chapel Rd NE", description: "DC's premier electronic music venue. Massive production, world-class DJs. Bike parking available.", bikeFriendly: 3, distance: "4.1 mi", fun: "Consistently ranked one of the world's best clubs 🎧" },
    { name: "Flash", neighborhood: "Shaw", address: "645 Florida Ave NW", description: "Underground techno and house in an intimate basement. DC's beloved electronic bunker.", bikeFriendly: 4, distance: "2.3 mi", fun: "Dark, sweaty, perfect — the real deal 🖤" },
    { name: "Tropicalia", neighborhood: "U Street", address: "2001 14th St NW", description: "Rooftop Latin club with incredible views and even better salsa nights. Bikeshare dock a block away.", bikeFriendly: 4, distance: "2.6 mi", fun: "Rooftop views of the Monument while dancing 🌴" },
    { name: "Decades", neighborhood: "Dupont Circle", address: "1219 Connecticut Ave NW", description: "DC's nostalgia-fueled dance bar — each floor plays a different decade. Always packed on weekends.", bikeFriendly: 4, distance: "2.8 mi", fun: "Three floors, three decades, zero bad songs 💿" },
    { name: "Karma", neighborhood: "H Street NE", address: "1150 H St NE", description: "Hip-hop and R&B heavy hitter on the H Street corridor. The rooftop is a DC institution.", bikeFriendly: 3, distance: "3.0 mi", fun: "DJ lineups that rival much bigger cities 🎤" },
  ],
  park: [
    { name: "Meridian Hill Park", neighborhood: "Columbia Heights", address: "16th & Euclid St NW", description: "Cascading Italian-style fountain, drum circles on Sundays, stunning stonework. A DC treasure.", bikeFriendly: 5, distance: "2.9 mi", fun: "Sunday drum circle is a DC rite of passage 🥁" },
    { name: "Kenilworth Aquatic Gardens", neighborhood: "Deanwood", address: "1550 Anacostia Ave NE", description: "Lotus ponds, herons, and absolute serenity. Incredible via the Anacostia Riverwalk.", bikeFriendly: 5, distance: "5.8 mi", fun: "Lotus blooms in July are otherworldly 🌸" },
    { name: "Roosevelt Island", neighborhood: "Potomac River", address: "George Washington Pkwy", description: "Wild island wilderness accessible by footbridge. Absolutely stunning, nearly no one goes here.", bikeFriendly: 4, distance: "3.6 mi", fun: "A literal island nature preserve in the city 🏝️" },
    { name: "Fort Reno Park", neighborhood: "Tenleytown", address: "Chesapeake & Belt Rd NW", description: "Highest natural point in DC. Great sunset views and free summer concerts.", bikeFriendly: 4, distance: "4.5 mi", fun: "Highest point in DC — earn that summit 🏔️" },
    { name: "Dumbarton Oaks Gardens", neighborhood: "Georgetown", address: "1703 32nd St NW", description: "10 acres of meticulously designed European gardens hidden in Georgetown. Seasonal admission.", bikeFriendly: 4, distance: "3.8 mi", fun: "So beautiful it feels illegal to be free 🌺" },
  ],
  "coffee shop": [
    { name: "Compass Coffee", neighborhood: "Shaw", address: "1535 7th St NW", description: "DC's proudest local chain, roasted in-house. Multiple locations, always excellent. Great for a mid-ride refuel.", bikeFriendly: 5, distance: "1.9 mi", fun: "Founded by two Marines who were fed up with bad coffee ☕" },
    { name: "Qualia Coffee", neighborhood: "Petworth", address: "3917 Georgia Ave NW", description: "Serious single-origin coffee in a neighborhood gem. The espresso bar is exceptional.", bikeFriendly: 4, distance: "3.7 mi", fun: "One of DC's most respected independent roasters 🫘" },
    { name: "Slipstream", neighborhood: "Logan Circle", address: "1333 14th St NW", description: "Specialty coffee, natural wine, and craft beer under one roof. Open late, perfect pre- and post-ride.", bikeFriendly: 5, distance: "2.1 mi", fun: "Coffee shop by day, wine bar by night 🍷" },
    { name: "Lost Sock Roasters", neighborhood: "Brookland", address: "2236 12th St NE", description: "Beloved Northeast DC café with a cozy neighborhood feel. Trail-accessible via the Anacostia paths.", bikeFriendly: 4, distance: "4.0 mi", fun: "The name alone is worth the ride 🧦" },
    { name: "Sidamo Coffee & Tea", neighborhood: "H Street NE", address: "417 H St NE", description: "Ethiopian-owned specialty café on the H Street corridor. Incredible pour-overs.", bikeFriendly: 4, distance: "2.7 mi", fun: "Ethiopian coffee ceremony Saturdays 🇪🇹" },
  ],
  museum: [
    { name: "National Museum of African American History & Culture", neighborhood: "National Mall", address: "1400 Constitution Ave NW", description: "Arguably the most important museum in America. Reserve tickets in advance — completely worth it.", bikeFriendly: 5, distance: "1.8 mi", fun: "The bronze lattice exterior glows at sunset 🏛️" },
    { name: "National Zoo", neighborhood: "Woodley Park", address: "3001 Connecticut Ave NW", description: "Free Smithsonian zoo accessible via Rock Creek Trail. Giant pandas and 2,700 animals.", bikeFriendly: 4, distance: "3.5 mi", fun: "Free entry, always — thanks Smithsonian 🐼" },
    { name: "International Spy Museum", neighborhood: "Penn Quarter", address: "700 L'Enfant Plaza SW", description: "Wildly fun interactive spy museum. One of the best experiences in DC for adults.", bikeFriendly: 5, distance: "1.7 mi", fun: "You get a secret identity at the door 🕵️" },
    { name: "ARTECHOUSE", neighborhood: "Penn Quarter", address: "575 7th St NW", description: "DC's premier immersive digital art space. Rotating installations that blow your mind.", bikeFriendly: 5, distance: "1.5 mi", fun: "Immersive digital art you can walk inside 🌀" },
    { name: "National Building Museum", neighborhood: "Judiciary Square", address: "401 F St NW", description: "Architecture, design, and urbanism in a cathedral-sized Great Hall. Hidden gem of DC museums.", bikeFriendly: 5, distance: "1.4 mi", fun: "The Great Hall is one of DC's most spectacular interior spaces 🏗️" },
  ],
};

const CATEGORIES = [
  { id: "library",      label: "Library",     icon: "📚", color: "#60a5fa" },
  { id: "restaurant",   label: "Restaurant",  icon: "🍽️", color: "#f87171" },
  { id: "art gallery",  label: "Art Gallery", icon: "🖼️", color: "#c084fc" },
  { id: "club",         label: "Club",        icon: "🎧", color: "#f472b6" },
  { id: "park",         label: "Park",        icon: "🌿", color: "#4ade80" },
  { id: "coffee shop",  label: "Coffee",      icon: "☕", color: "#fbbf24" },
  { id: "museum",       label: "Museum",      icon: "🏛️", color: "#38bdf8" },
];

function CyclistSpinner({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <style>{`
        @keyframes vw-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes vw-pedal { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes vw-legF { 0%,100% { transform: rotate(-28deg); } 50% { transform: rotate(28deg); } }
        @keyframes vw-legB { 0%,100% { transform: rotate(28deg); } 50% { transform: rotate(-28deg); } }
        @keyframes vw-bob { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-1px); } }
        @keyframes vw-road { from { transform: translateX(0); } to { transform: translateX(-18px); } }
      `}</style>

      {/* Road */}
      <rect x="0" y="41" width="52" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
      <g style={{ animation: "vw-road 0.45s linear infinite" }}>
        <rect x="2"  y="41.5" width="9" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="20" y="41.5" width="9" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="38" y="41.5" width="9" height="1" rx="0.5" fill="rgba(255,255,255,0.25)"/>
      </g>

      {/* Whole rider bobs */}
      <g style={{ animation: "vw-bob 0.45s ease-in-out infinite", transformOrigin: "26px 36px" }}>

        {/* Rear wheel */}
        <g style={{ animation: "vw-spin 0.45s linear infinite", transformOrigin: "16px 36px" }}>
          <circle cx="16" cy="36" r="9" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
          <circle cx="16" cy="36" r="1.5" fill="rgba(255,255,255,0.8)"/>
          <line x1="16" y1="27" x2="16" y2="45" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
          <line x1="7"  y1="36" x2="25" y2="36" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
          <line x1="9.5" y1="29.5" x2="22.5" y2="42.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
          <line x1="22.5" y1="29.5" x2="9.5" y2="42.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
        </g>

        {/* Front wheel */}
        <g style={{ animation: "vw-spin 0.45s linear infinite", transformOrigin: "38px 36px" }}>
          <circle cx="38" cy="36" r="9" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
          <circle cx="38" cy="36" r="1.5" fill="rgba(255,255,255,0.8)"/>
          <line x1="38" y1="27" x2="38" y2="45" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
          <line x1="29" y1="36" x2="47" y2="36" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
          <line x1="31.5" y1="29.5" x2="44.5" y2="42.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
          <line x1="44.5" y1="29.5" x2="31.5" y2="42.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
        </g>

        {/* Frame */}
        <line x1="16" y1="36" x2="26" y2="33" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="36" x2="23" y2="22" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="23" y1="22" x2="26" y2="33" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="35" y1="24" x2="26" y2="33" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="35" y1="24" x2="23" y2="22" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="35" y1="24" x2="38" y2="36" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
        {/* Saddle */}
        <line x1="20" y1="20" x2="26" y2="20" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="20" x2="23" y2="22" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round"/>
        {/* Handlebar */}
        <line x1="35" y1="22" x2="38" y2="19" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="36" y1="18" x2="40" y2="21" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Crank */}
        <g style={{ animation: "vw-pedal 0.45s linear infinite", transformOrigin: "26px 33px" }}>
          <line x1="26" y1="33" x2="26" y2="27" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="24" y="24.5" width="4" height="2" rx="1" fill="rgba(255,255,255,0.7)"/>
          <line x1="26" y1="33" x2="26" y2="39" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="24" y="38.5" width="4" height="2" rx="1" fill="rgba(255,255,255,0.7)"/>
        </g>
        <circle cx="26" cy="33" r="1.5" fill="rgba(255,255,255,0.9)"/>

        {/* Front leg */}
        <g style={{ animation: "vw-legF 0.45s ease-in-out infinite", transformOrigin: "24px 24px" }}>
          <line x1="24" y1="24" x2="24" y2="31" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="31" x2="27" y2="35" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round"/>
        </g>
        {/* Back leg */}
        <g style={{ animation: "vw-legB 0.45s ease-in-out infinite", transformOrigin: "24px 24px" }}>
          <line x1="24" y1="24" x2="23" y2="31" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="23" y1="31" x2="21" y2="35" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round"/>
        </g>

        {/* Torso */}
        <line x1="24" y1="22" x2="33" y2="26" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Arm */}
        <line x1="33" y1="26" x2="38" y2="21" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Head / helmet */}
        <ellipse cx="23" cy="17" rx="4" ry="3.5" fill="rgba(255,255,255,0.9)"/>
        <path d="M19 18 Q21.5 22 26 20" fill="none" stroke="rgba(249,115,22,0.7)" strokeWidth="1" strokeLinecap="round"/>
      </g>

      {/* Speed lines */}
      <line x1="7"  y1="28" x2="1"  y2="28" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="7"  y1="31" x2="0"  y2="31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="7"  y1="34" x2="2"  y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function BikeDots({ score, color }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < score ? color || "#f97316" : "rgba(255,255,255,0.12)", fontSize: 11, marginRight: 1 }}>●</span>
      ))}
    </span>
  );
}

function DestinationCard({ dest, category, isRandom, onDismiss, onSpin }) {
  const cat = CATEGORIES.find(c => c.id === category);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest.address + " Washington DC")}&travelmode=bicycling`;
  return (
    <div style={{ ...S.destCard, borderColor: cat.color + "50", background: `linear-gradient(145deg, ${cat.color}10 0%, rgba(12,16,28,0.97) 55%)` }}>
      {isRandom && <div style={S.randomBadge}>🎲 Random Pick</div>}
      <div style={S.destCardTop}>
        <span style={{ ...S.catPill, background: cat.color + "20", color: cat.color, borderColor: cat.color + "40" }}>
          {cat.icon} {cat.label}
        </span>
        <span style={S.destNeighborhood}>{dest.neighborhood}</span>
      </div>
      <div style={S.destName}>{dest.name}</div>
      <div style={S.destAddress}>📍 {dest.address}</div>
      <p style={S.destDesc}>{dest.description}</p>
      <div style={S.funFact}><span>💡</span><span>{dest.fun}</span></div>
      <div style={S.metaRow}>
        <div style={S.metaBlock}>
          <div style={S.metaLabel}>Distance</div>
          <div style={{ ...S.metaVal, color: cat.color }}>{dest.distance}</div>
        </div>
        <div style={S.metaDivider} />
        <div style={S.metaBlock}>
          <div style={S.metaLabel}>Bike Access</div>
          <div style={S.metaVal}><BikeDots score={dest.bikeFriendly} color={cat.color} /></div>
        </div>
      </div>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...S.mapsBtn, background: cat.color }}>
        🗺️ Get Cycling Directions
      </a>
      <div style={S.cardFooterBtns}>
        {isRandom && onSpin && (
          <button style={S.spinAgainBtn} onClick={onSpin}>🔀 Spin Again</button>
        )}
        {onDismiss && (
          <button style={S.dismissBtn} onClick={onDismiss}>✕ Dismiss</button>
        )}
      </div>
    </div>
  );
}

function MiniCard({ dest, category, onClick }) {
  const cat = CATEGORIES.find(c => c.id === category);
  return (
    <div style={S.miniCard} onClick={onClick}>
      <div style={S.miniLeft}>
        <div style={S.miniName}>{dest.name}</div>
        <div style={S.miniSub}>{dest.neighborhood} · {dest.distance}</div>
      </div>
      <div style={S.miniRight}>
        <BikeDots score={dest.bikeFriendly} color={cat.color} />
        <span style={{ ...S.miniArrow, color: cat.color }}>›</span>
      </div>
    </div>
  );
}

export default function DCBikeDestinations() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [expandedDest, setExpandedDest] = useState(null);
  const [randomDest, setRandomDest] = useState(null);
  const [randomCat, setRandomCat] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [schedDest, setSchedDest] = useState("");
  const [schedMeet, setSchedMeet] = useState("");
  const [schedTime, setSchedTime] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipResults, setZipResults] = useState(null);
  const [zipError, setZipError] = useState("");
  const [zipDetecting, setZipDetecting] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    setZipDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const zip = data?.address?.postcode?.slice(0, 5);
          if (zip && /^\d{5}$/.test(zip)) {
            setZipCode(zip);
          }
        } catch (_) {}
        setZipDetecting(false);
      },
      () => setZipDetecting(false),
      { timeout: 6000 }
    );
  }, []);


  const handleCatSelect = (id) => {
    const next = id === selectedCat ? null : id;
    setSelectedCat(next);
    setExpandedDest(null);
    setRandomDest(null);
    setFilterText("");
    if (next) setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleRandom = () => {
    if (spinning) return;
    setSpinning(true);
    setRandomDest(null);
    setSelectedCat(null);
    setExpandedDest(null);
    setTimeout(() => {
      const entries = Object.entries(DESTINATIONS);
      const [catId, spots] = entries[Math.floor(Math.random() * entries.length)];
      const spot = spots[Math.floor(Math.random() * spots.length)];
      setRandomCat(catId);
      setRandomDest(spot);
      setSpinning(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 1500);
  };

  const filteredDests = selectedCat
    ? DESTINATIONS[selectedCat].filter(d =>
        !filterText ||
        d.name.toLowerCase().includes(filterText.toLowerCase()) ||
        d.neighborhood.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  const ZIP_DATA = {
    "20001": { neighborhood: "Shaw / NoMa", area: "DC", destinations: ["library","restaurant","art gallery","coffee shop","museum"] },
    "20002": { neighborhood: "Capitol Hill / H Street NE", area: "DC", destinations: ["restaurant","club","coffee shop","park"] },
    "20003": { neighborhood: "Capitol Hill / Navy Yard", area: "DC", destinations: ["restaurant","park","museum","coffee shop"] },
    "20004": { neighborhood: "Penn Quarter / Downtown", area: "DC", destinations: ["art gallery","museum","restaurant","library"] },
    "20005": { neighborhood: "Logan Circle / Thomas Circle", area: "DC", destinations: ["restaurant","coffee shop","club","art gallery"] },
    "20006": { neighborhood: "Foggy Bottom / West End", area: "DC", destinations: ["art gallery","museum","restaurant","park"] },
    "20007": { neighborhood: "Georgetown", area: "DC", destinations: ["restaurant","library","coffee shop","park"] },
    "20008": { neighborhood: "Woodley Park / Cleveland Park", area: "DC", destinations: ["museum","park","coffee shop","restaurant"] },
    "20009": { neighborhood: "Adams Morgan / Columbia Heights", area: "DC", destinations: ["restaurant","club","coffee shop","art gallery"] },
    "20010": { neighborhood: "Columbia Heights / Petworth", area: "DC", destinations: ["coffee shop","restaurant","park","library"] },
    "20011": { neighborhood: "Petworth / Brightwood", area: "DC", destinations: ["park","coffee shop","library","restaurant"] },
    "20012": { neighborhood: "Takoma / Brightwood Park", area: "DC", destinations: ["park","library","coffee shop","restaurant"] },
    "20015": { neighborhood: "Chevy Chase DC / Tenleytown", area: "DC", destinations: ["library","park","coffee shop","restaurant"] },
    "20016": { neighborhood: "Foxhall / Spring Valley", area: "DC", destinations: ["park","library","restaurant","coffee shop"] },
    "20017": { neighborhood: "Brookland / Michigan Park", area: "DC", destinations: ["coffee shop","library","park","restaurant"] },
    "20018": { neighborhood: "Woodridge / Fort Lincoln", area: "DC", destinations: ["park","library","restaurant","coffee shop"] },
    "20019": { neighborhood: "Capitol Heights / Deanwood", area: "DC", destinations: ["park","library","restaurant","coffee shop"] },
    "20020": { neighborhood: "Anacostia / Congress Heights", area: "DC", destinations: ["park","library","art gallery","restaurant"] },
    "20024": { neighborhood: "Southwest Waterfront / The Wharf", area: "DC", destinations: ["restaurant","park","museum","coffee shop"] },
    "20032": { neighborhood: "Congress Heights / Bellevue", area: "DC", destinations: ["park","library","restaurant","coffee shop"] },
    "20036": { neighborhood: "Dupont Circle", area: "DC", destinations: ["art gallery","restaurant","club","coffee shop"] },
    "20037": { neighborhood: "Foggy Bottom / GWU", area: "DC", destinations: ["art gallery","museum","restaurant","coffee shop"] },
    "20782": { neighborhood: "Hyattsville / Langley Park", area: "MD", destinations: ["restaurant","library","park","coffee shop"] },
    "20783": { neighborhood: "Chillum / Adelphi", area: "MD", destinations: ["park","library","restaurant","coffee shop"] },
    "20784": { neighborhood: "Landover Hills / Cheverly", area: "MD", destinations: ["park","restaurant","library","coffee shop"] },
    "20785": { neighborhood: "Landover / Glenarden", area: "MD", destinations: ["park","restaurant","library","coffee shop"] },
    "20706": { neighborhood: "Lanham / Seabrook", area: "MD", destinations: ["park","restaurant","library","coffee shop"] },
    "20707": { neighborhood: "Laurel", area: "MD", destinations: ["park","restaurant","library","coffee shop"] },
    "20770": { neighborhood: "Greenbelt", area: "MD", destinations: ["park","library","restaurant","coffee shop"] },
    "20771": { neighborhood: "Greenbelt / NASA Goddard", area: "MD", destinations: ["park","museum","library","restaurant"] },
    "20902": { neighborhood: "Silver Spring / Wheaton", area: "MD", destinations: ["restaurant","library","coffee shop","art gallery"] },
    "20910": { neighborhood: "Silver Spring Downtown", area: "MD", destinations: ["restaurant","art gallery","coffee shop","club"] },
    "20912": { neighborhood: "Takoma Park MD", area: "MD", destinations: ["coffee shop","library","restaurant","park"] },
    "20814": { neighborhood: "Bethesda", area: "MD", destinations: ["restaurant","art gallery","coffee shop","library"] },
    "20815": { neighborhood: "Chevy Chase MD", area: "MD", destinations: ["restaurant","coffee shop","park","library"] },
    "20816": { neighborhood: "Friendship Heights / Glen Echo", area: "MD", destinations: ["art gallery","park","restaurant","coffee shop"] },
    "22201": { neighborhood: "Courthouse / Clarendon", area: "VA", destinations: ["restaurant","coffee shop","club","art gallery"] },
    "22202": { neighborhood: "Crystal City / Pentagon City", area: "VA", destinations: ["restaurant","museum","coffee shop","park"] },
    "22203": { neighborhood: "Ballston / Virginia Square", area: "VA", destinations: ["restaurant","coffee shop","library","art gallery"] },
    "22204": { neighborhood: "Columbia Pike / Arlington", area: "VA", destinations: ["restaurant","coffee shop","park","library"] },
    "22205": { neighborhood: "Westover / Bluemont", area: "VA", destinations: ["park","coffee shop","restaurant","library"] },
    "22206": { neighborhood: "Shirlington / Baileys Crossroads", area: "VA", destinations: ["restaurant","art gallery","coffee shop","park"] },
    "22207": { neighborhood: "North Arlington / Donaldson Run", area: "VA", destinations: ["park","restaurant","coffee shop","library"] },
    "22209": { neighborhood: "Rosslyn / Fort Myer", area: "VA", destinations: ["restaurant","art gallery","coffee shop","museum"] },
    "22301": { neighborhood: "Del Ray / Rosemont", area: "VA", destinations: ["restaurant","coffee shop","park","art gallery"] },
    "22302": { neighborhood: "Alexandria / Seminary Hill", area: "VA", destinations: ["restaurant","library","coffee shop","park"] },
    "22304": { neighborhood: "Alexandria / Holmes Run", area: "VA", destinations: ["park","library","restaurant","coffee shop"] },
    "22314": { neighborhood: "Old Town Alexandria", area: "VA", destinations: ["restaurant","art gallery","museum","coffee shop"] },
  };

  const handleZipSearch = () => {
    const z = zipCode.trim();
    if (!z) { setZipError("Please enter a zip code."); return; }
    if (!/^\d{5}$/.test(z)) { setZipError("Enter a valid 5-digit zip code."); return; }
    const match = ZIP_DATA[z];
    if (!match) { setZipError("Zip code not found in the DMV area. Try a DC, MD, or VA zip."); setZipResults(null); return; }
    setZipError("");
    const cats = match.destinations.map(id => CATEGORIES.find(c => c.id === id)).filter(Boolean);
    const spots = match.destinations.flatMap(catId =>
      (DESTINATIONS[catId] || []).slice(0, 2).map(d => ({ ...d, catId }))
    );
    setZipResults({ ...match, zip: z, cats, spots });
  };

  const totalSpots = Object.values(DESTINATIONS).flat().length;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
        @keyframes glow { 0%,100% { opacity:.6 } 50% { opacity:1 } }
        @keyframes spin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      {/* ── Header ── */}
      <header style={S.header}>
        <div style={S.headerGlow} />
        <svg width="100%" viewBox="0 0 680 410" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginBottom: 12 }}>
          <defs>
            <clipPath id="clip-r"><path d="M30,30 L30,200 L75,200 L75,132 L105,132 L135,200 L183,200 L148,125 Q188,106 188,78 Q188,30 128,30 Z"/></clipPath>
            <clipPath id="clip-i"><rect x="198" y="30" width="50" height="170"/></clipPath>
            <clipPath id="clip-d-top"><path d="M258,30 L258,200 L328,200 Q428,200 428,115 Q428,30 328,30 Z"/></clipPath>
            <clipPath id="clip-e"><path d="M438,30 L438,200 L650,200 L650,158 L488,158 L488,128 L620,128 L620,102 L488,102 L488,72 L650,72 L650,30 Z"/></clipPath>
            <clipPath id="clip-d2"><path d="M30,215 L30,395 L140,395 Q248,395 248,305 Q248,215 140,215 Z"/></clipPath>
            <clipPath id="clip-m2"><polygon points="258,395 258,215 303,215 343,308 383,215 428,215 428,395 393,395 393,290 343,395 293,290 293,395"/></clipPath>
            <clipPath id="clip-v2"><polygon points="438,215 483,215 544,378 605,215 650,215 578,395 510,395"/></clipPath>
          </defs>
          {/* RIDE — white */}
          <g clipPath="url(#clip-r)"><rect x="30" y="30" width="158" height="170" fill="#f0f4ff"/></g>
          <path d="M30,30 L30,200 L75,200 L75,132 L105,132 L135,200 L183,200 L148,125 Q188,106 188,78 Q188,30 128,30 Z" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>

          <g clipPath="url(#clip-i)"><rect x="198" y="30" width="50" height="170" fill="#f0f4ff"/></g>
          <rect x="198" y="30" width="50" height="170" fill="none" stroke="#f0f4ff" strokeWidth="4.5"/>
          <g clipPath="url(#clip-d-top)"><rect x="258" y="30" width="170" height="170" fill="#f0f4ff"/></g>
          <path d="M258,30 L258,200 L328,200 Q428,200 428,115 Q428,30 328,30 Z" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>
          <g clipPath="url(#clip-e)"><rect x="438" y="30" width="212" height="170" fill="#f0f4ff"/></g>
          <path d="M438,30 L438,200 L650,200 L650,158 L488,158 L488,128 L620,128 L620,102 L488,102 L488,72 L650,72 L650,30 Z" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>
          {/* D — DC flag */}
          <g clipPath="url(#clip-d2)">
            <rect x="30" y="215" width="218" height="180" fill="#fff"/>
            <rect x="30" y="303" width="218" height="42" fill="#BF0A30"/>
            <rect x="30" y="345" width="218" height="16" fill="#fff"/>
            <rect x="30" y="361" width="218" height="34" fill="#BF0A30"/>
            <text x="99"  y="292" textAnchor="middle" fontSize="34" fill="#BF0A30" fontFamily="serif">★</text>
            <text x="139" y="292" textAnchor="middle" fontSize="34" fill="#BF0A30" fontFamily="serif">★</text>
            <text x="179" y="292" textAnchor="middle" fontSize="34" fill="#BF0A30" fontFamily="serif">★</text>
          </g>
          <path d="M30,215 L30,395 L140,395 Q248,395 248,305 Q248,215 140,215 Z" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>
          {/* M — Maryland flag */}
          <g clipPath="url(#clip-m2)">
            <rect x="258" y="215" width="85" height="90" fill="#FDBF13"/>
            <line x1="258" y1="215" x2="343" y2="305" stroke="#000" strokeWidth="11"/>
            <line x1="258" y1="239" x2="320" y2="305" stroke="#000" strokeWidth="11"/>
            <line x1="258" y1="263" x2="296" y2="305" stroke="#000" strokeWidth="11"/>
            <line x1="281" y1="215" x2="343" y2="239" stroke="#000" strokeWidth="11"/>
            <line x1="305" y1="215" x2="343" y2="233" stroke="#000" strokeWidth="11"/>
            <rect x="343" y="215" width="85" height="90" fill="#BF0A30"/>
            <line x1="343" y1="215" x2="428" y2="305" stroke="#fff" strokeWidth="11"/>
            <line x1="343" y1="239" x2="405" y2="305" stroke="#fff" strokeWidth="11"/>
            <line x1="343" y1="263" x2="381" y2="305" stroke="#fff" strokeWidth="11"/>
            <line x1="366" y1="215" x2="428" y2="239" stroke="#fff" strokeWidth="11"/>
            <line x1="390" y1="215" x2="428" y2="233" stroke="#fff" strokeWidth="11"/>
            <rect x="258" y="305" width="85" height="90" fill="#BF0A30"/>
            <line x1="258" y1="305" x2="343" y2="395" stroke="#fff" strokeWidth="11"/>
            <line x1="258" y1="329" x2="320" y2="395" stroke="#fff" strokeWidth="11"/>
            <line x1="258" y1="353" x2="296" y2="395" stroke="#fff" strokeWidth="11"/>
            <line x1="281" y1="305" x2="343" y2="329" stroke="#fff" strokeWidth="11"/>
            <line x1="305" y1="305" x2="343" y2="323" stroke="#fff" strokeWidth="11"/>
            <rect x="343" y="305" width="85" height="90" fill="#FDBF13"/>
            <line x1="343" y1="305" x2="428" y2="395" stroke="#000" strokeWidth="11"/>
            <line x1="343" y1="329" x2="405" y2="395" stroke="#000" strokeWidth="11"/>
            <line x1="343" y1="353" x2="381" y2="395" stroke="#000" strokeWidth="11"/>
            <line x1="366" y1="305" x2="428" y2="329" stroke="#000" strokeWidth="11"/>
            <line x1="390" y1="305" x2="428" y2="323" stroke="#000" strokeWidth="11"/>
          </g>
          <polygon points="258,395 258,215 303,215 343,308 383,215 428,215 428,395 393,395 393,290 343,395 293,290 293,395" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>
          {/* V — Virginia flag */}
          <g clipPath="url(#clip-v2)">
            <rect x="438" y="215" width="212" height="180" fill="#00308F"/>
            <circle cx="544" cy="305" r="62" fill="#00308F" stroke="#fff" strokeWidth="3"/>
            <rect x="535" y="272" width="10" height="46" rx="4" fill="#fff" opacity="0.92"/>
            <circle cx="540" cy="267" r="8.5" fill="#fff" opacity="0.92"/>
            <line x1="528" y1="260" x2="528" y2="338" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
            <polygon points="528,256 522,269 534,269" fill="#fff" opacity="0.9"/>
            <ellipse cx="550" cy="338" rx="12" ry="5.5" fill="#fff" opacity="0.4"/>
            <text x="544" y="358" textAnchor="middle" fontFamily="sans-serif" fontSize="9.5" fill="#fff" opacity="0.75" letterSpacing="0.08em">VIRGINIA</text>
            <text x="544" y="260" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#fff" opacity="0.55" letterSpacing="0.05em">SIC SEMPER TYRANNIS</text>
          </g>
          <polygon points="438,215 483,215 544,378 605,215 650,215 578,395 510,395" fill="none" stroke="#f0f4ff" strokeWidth="4.5" strokeLinejoin="round"/>
        </svg>
        <p style={S.subhead}>Get the most out of the DMV on every ride.</p>
      </header>

      {/* ── Find Destinations Near You ── */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={S.zipSection}>
          <div style={S.zipHeader}>
            <span style={{ fontSize: 22 }}>📮</span>
            <div>
              <div style={S.zipTitle}>Find Destinations Near You</div>
              <div style={S.zipSub}>Enter your zip code to see what's nearby</div>
            </div>
          </div>
          <div style={S.zipInputRow}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                style={{ ...S.zipInput, paddingRight: zipDetecting ? 36 : 16 }}
                placeholder={zipDetecting ? "Detecting your location…" : "e.g. 20009"}
                value={zipCode}
                maxLength={5}
                onChange={e => { setZipCode(e.target.value.replace(/\D/,"")); setZipError(""); setZipResults(null); }}
                onKeyDown={e => e.key === "Enter" && handleZipSearch()}
              />
              {zipDetecting && (
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</span>
              )}
              {!zipDetecting && zipCode.length === 5 && (
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>📍</span>
              )}
            </div>
            <button style={S.zipBtn} onClick={handleZipSearch}>Search</button>
          </div>
          {zipError && <div style={S.zipError}>⚠️ {zipError}</div>}

          {zipResults && (
            <div style={{ animation: "slideUp 0.3s cubic-bezier(.4,0,.2,1)" }}>
              <div style={S.zipResultHeader}>
                <div style={S.zipNeighborhood}>
                  <span style={{ ...S.zipAreaBadge, background: zipResults.area === "DC" ? "rgba(191,10,48,0.2)" : zipResults.area === "MD" ? "rgba(253,191,19,0.2)" : "rgba(0,48,143,0.2)", color: zipResults.area === "DC" ? "#f87171" : zipResults.area === "MD" ? "#fbbf24" : "#60a5fa", borderColor: zipResults.area === "DC" ? "rgba(191,10,48,0.4)" : zipResults.area === "MD" ? "rgba(253,191,19,0.4)" : "rgba(0,48,143,0.4)" }}>
                    {zipResults.area}
                  </span>
                  <span style={S.zipNeighborhoodName}>{zipResults.neighborhood}</span>
                  <span style={S.zipCodeDisplay}>{zipResults.zip}</span>
                </div>
              </div>
              <div style={S.zipCatRow}>
                {zipResults.cats.map(cat => (
                  <button key={cat.id} style={{ ...S.zipCatChip, borderColor: cat.color + "55", background: cat.color + "12", color: cat.color }} onClick={() => handleCatSelect(cat.id)}>
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
              <div style={S.zipSpotList}>
                <div style={S.zipSpotListTitle}>Nearby spots to check out:</div>
                {zipResults.spots.map((dest, i) => {
                  const cat = CATEGORIES.find(c => c.id === dest.catId);
                  return (
                    <div key={i} style={S.zipSpotRow} onClick={() => { setSelectedCat(dest.catId); setExpandedDest(dest.name); setTimeout(() => resultsRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 80); }}>
                      <span style={{ fontSize: 16 }}>{cat?.icon}</span>
                      <div style={S.zipSpotInfo}>
                        <div style={S.zipSpotName}>{dest.name}</div>
                        <div style={S.zipSpotMeta}>{dest.neighborhood} · {dest.distance}</div>
                      </div>
                      <span style={{ ...S.miniArrow, color: cat?.color, fontSize: 18 }}>›</span>
                    </div>
                  );
                })}
              </div>
              <a href={`https://www.google.com/maps/search/bike+destinations/@${zipResults.zip.slice(0,2)}.0,-77.0,13z`} target="_blank" rel="noopener noreferrer" style={{ ...S.openMapsBtn, marginTop: 10, display: "block" }}>
                🗺️ Explore {zipResults.neighborhood} in Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Surprise Me ── */}
      <section style={S.surpriseSection}>
        <button
          style={{ ...S.surpriseBtn, opacity: spinning ? 0.85 : 1 }}
          onClick={handleRandom}
          disabled={spinning}
        >
          <div style={{ ...S.surpriseIconWrap, background: spinning ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.12)", overflow: "hidden" }}>
            {spinning ? <CyclistSpinner size={44} /> : <span style={{ fontSize: 26 }}>🎲</span>}
          </div>
          <div style={S.surpriseText}>
            <div style={S.surpriseTitle}>{spinning ? "Finding your spot…" : "Surprise Me"}</div>
            <div style={S.surpriseSub}>Because there's a destination for every ride</div>
          </div>
          {!spinning && <span style={S.surpriseArrow}>→</span>}
        </button>
      </section>

      {/* ── Divider ── */}
      <div style={S.orDivider}>
        <div style={S.orLine} /><span style={S.orText}>or choose a category</span><div style={S.orLine} />
      </div>

      {/* ── Category Buttons ── */}
      <section style={S.catSection}>
        <div style={S.catGrid}>
          {CATEGORIES.map(cat => {
            const active = selectedCat === cat.id;
            const count = DESTINATIONS[cat.id].length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCatSelect(cat.id)}
                style={{
                  ...S.catBtn,
                  borderColor: active ? cat.color : "rgba(255,255,255,0.07)",
                  background: active ? `${cat.color}18` : "rgba(255,255,255,0.03)",
                  boxShadow: active ? `0 0 18px ${cat.color}30, inset 0 0 12px ${cat.color}10` : "none",
                  transform: active ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                <span style={S.catEmoji}>{cat.icon}</span>
                <span style={{ ...S.catName, color: active ? cat.color : "#9aa5bc" }}>{cat.label}</span>
                <span style={{
                  ...S.catBadge,
                  background: active ? `${cat.color}25` : "rgba(255,255,255,0.05)",
                  color: active ? cat.color : "#4b5563",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Schedule a RIDE button ── */}
      <div style={{ padding: "0 16px 20px" }}>
        <button style={S.scheduleBtn} onClick={() => setScheduleOpen(true)}>
          <span style={{ fontSize: 20 }}>🗓️</span>
          <div>
            <div style={S.scheduleBtnLabel}>Schedule a RIDE</div>
            <div style={S.scheduleBtnSub}>Plan your route, set your meeting place & time</div>
          </div>
          <span style={{ color: "#38bdf8", fontSize: 20, opacity: 0.7 }}>→</span>
        </button>
      </div>

      {scheduleOpen && (
        <div style={S.scheduleOverlay}>
          <div style={S.scheduleScreen}>
            {/* Header */}
            <div style={S.scheduleHeader}>
              <button style={S.scheduleBack} onClick={() => setScheduleOpen(false)}>← Back</button>
              <div style={S.scheduleTitle}>Schedule a RIDE</div>
              <div style={{ width: 60 }} />
            </div>

            <div style={S.scheduleBody}>

              {/* Destination */}
              <div style={S.scheduleSection}>
                <div style={S.scheduleSectionLabel}>📍 Destination</div>
                <input
                  style={S.scheduleInput}
                  placeholder="Where are you riding to?"
                  value={schedDest}
                  onChange={e => setSchedDest(e.target.value)}
                />
              </div>

              {/* Meeting Place */}
              <div style={S.scheduleSection}>
                <div style={S.scheduleSectionLabel}>🤝 Meeting Place</div>
                <input
                  style={S.scheduleInput}
                  placeholder="Where will the group meet?"
                  value={schedMeet}
                  onChange={e => setSchedMeet(e.target.value)}
                />
                {/* Embedded Google Maps */}
                <div style={S.mapContainer}>
                  {schedMeet && schedDest ? (
                    <iframe
                      title="Ride Route Map"
                      width="100%"
                      height="100%"
                      style={{ border: "none", borderRadius: 12, display: "block" }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAw-1QL7LRQZTqaA5mRbolhS630XgxaT9k&origin=${encodeURIComponent(schedMeet + " Washington DC")}&destination=${encodeURIComponent(schedDest + " Washington DC")}&mode=bicycling`}
                    />
                  ) : (
                    <div style={S.mapPlaceholder}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
                      <div style={{ fontSize: 13, color: "#4b5563", textAlign: "center", lineHeight: 1.5 }}>
                        Enter a Meeting Place and Destination<br />to see your route
                      </div>
                    </div>
                  )}
                </div>
                {schedMeet && schedDest && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(schedMeet + " Washington DC")}&destination=${encodeURIComponent(schedDest + " Washington DC")}&travelmode=bicycling`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={S.openMapsBtn}
                  >
                    🚲 Open Full Route in Google Maps
                  </a>
                )}
              </div>

              {/* Departure Time */}
              <div style={S.scheduleSection}>
                <div style={S.scheduleSectionLabel}>⏰ Departure Time</div>
                <div style={S.departureNote}>
                  💡 Plan to arrive <strong style={{ color: "#f97316" }}>15 minutes early</strong> — give yourself buffer for traffic, parking your bike, and getting oriented.
                </div>
                <input
                  type="datetime-local"
                  style={S.scheduleInput}
                  value={schedTime}
                  onChange={e => setSchedTime(e.target.value)}
                />
                {schedTime && (
                  <div style={S.departureEarly}>
                    🟢 Aim to leave by <strong style={{ color: "#4ade80" }}>
                      {(() => {
                        const d = new Date(schedTime);
                        d.setMinutes(d.getMinutes() - 15);
                        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                      })()}
                    </strong> to arrive 15 min early
                  </div>
                )}
              </div>

              {/* Summary */}
              {schedDest && schedMeet && schedTime && (
                <div style={S.scheduleSummary}>
                  <div style={S.summaryTitle}>🚲 Ride Summary</div>
                  <div style={S.summaryRow}><span style={S.summaryLabel}>Destination</span><span style={S.summaryVal}>{schedDest}</span></div>
                  <div style={S.summaryRow}><span style={S.summaryLabel}>Meeting Place</span><span style={S.summaryVal}>{schedMeet}</span></div>
                  <div style={S.summaryRow}>
                    <span style={S.summaryLabel}>Departure</span>
                    <span style={S.summaryVal}>{new Date(schedTime).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      <section ref={resultsRef} style={S.results}>

        {/* Random result */}
        {!spinning && randomDest && (
          <div style={{ animation: "popIn 0.35s cubic-bezier(.4,0,.2,1)" }}>
            <div style={S.resultsHeader}>
              <span style={S.resultsTitle}>🎲 Your destination awaits</span>
            </div>
            <DestinationCard
              dest={randomDest}
              category={randomCat}
              isRandom
              onDismiss={() => setRandomDest(null)}
              onSpin={handleRandom}
            />
          </div>
        )}

        {/* Category results */}
        {selectedCat && !randomDest && (() => {
          const cat = CATEGORIES.find(c => c.id === selectedCat);
          return (
            <div>
              <div style={S.resultsHeader}>
                <span style={S.resultsTitle}>{cat.icon} {cat.label}s in DC</span>
                <span style={{ ...S.resultsCount, color: cat.color }}>{filteredDests.length} spots</span>
              </div>
              <div style={{ position: "relative", marginBottom: 14 }}>
                <input
                  style={{ ...S.searchInput, borderColor: filterText ? cat.color + "60" : "rgba(255,255,255,0.1)" }}
                  placeholder={`Search ${cat.label.toLowerCase()}s…`}
                  value={filterText}
                  onChange={e => { setFilterText(e.target.value); setExpandedDest(null); }}
                />
                {filterText && (
                  <button style={S.clearBtn} onClick={() => setFilterText("")}>✕</button>
                )}
              </div>
              {filteredDests.length === 0 && (
                <div style={S.emptyMsg}>No results for "{filterText}"</div>
              )}
              {filteredDests.map((dest, i) => (
                <div key={dest.name} style={{ marginBottom: 10, animation: `slideUp 0.28s ${i * 0.05}s both` }}>
                  {expandedDest === dest.name
                    ? <DestinationCard dest={dest} category={selectedCat} onDismiss={() => setExpandedDest(null)} />
                    : <MiniCard dest={dest} category={selectedCat} onClick={() => setExpandedDest(dest.name)} />
                  }
                </div>
              ))}
            </div>
          );
        })()}

        {/* Idle */}
        {!selectedCat && !randomDest && !spinning && (
          <div style={S.idleWrap}>
            <div style={S.idleTiles}>
              {CATEGORIES.map(cat => (
                <div key={cat.id} style={{ ...S.idleTile, borderColor: cat.color + "30" }}
                     onClick={() => handleCatSelect(cat.id)}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{DESTINATIONS[cat.id].length}</span>
                </div>
              ))}
            </div>
            <p style={S.idlePrompt}>
              <em style={{ color: "#f97316", fontStyle: "normal", fontWeight: 600 }}>A destination for every ride.</em>
              <br />Pick a category or hit <strong style={{ color: "#f97316" }}>Surprise Me</strong> to find yours.
            </p>
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer style={S.footer}>
        <div style={S.footerSlogan}>A destination for every ride.</div>
        <span style={{ fontSize: 11, color: "#2d3748" }}>🟠 Bike access rating based on racks, lanes & bikeshare proximity</span>
      </footer>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#080b14",
    minHeight: "100vh",
    color: "#e8edf5",
    maxWidth: 500,
    margin: "0 auto",
    paddingBottom: 48,
  },

  // Header
  header: {
    position: "relative",
    padding: "30px 22px 26px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    overflow: "hidden",
  },
  headerGlow: {
    position: "absolute", top: -80, right: -80,
    width: 260, height: 260,
    background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)",
    pointerEvents: "none",
  },
  eyebrow: { fontFamily: "'Syne', sans-serif", fontSize: 16.5, fontWeight: 700, letterSpacing: "0.14em", color: "#f97316", marginBottom: 10 },
  headline: { fontFamily: "'DM Sans', sans-serif", fontSize: 9.6, fontWeight: 900, lineHeight: 1.15, marginBottom: 10 },
  accentText: { color: "#f97316" },
  subhead: { fontSize: 10, color: "#5a6478", lineHeight: 1.5 },

  // Surprise
  surpriseSection: { padding: "20px 16px 4px" },
  surpriseBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 20px",
    background: "linear-gradient(135deg, rgba(249,115,22,0.13), rgba(251,191,36,0.06))",
    border: "1.5px solid rgba(249,115,22,0.45)",
    borderRadius: 18,
    cursor: "pointer",
    color: "inherit",
    fontFamily: "inherit",
    transition: "all 0.18s",
    textAlign: "left",
  },
  surpriseIconWrap: {
    width: 52, height: 52, borderRadius: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "background 0.2s",
  },
  surpriseText: { flex: 1 },
  surpriseTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#f97316", marginBottom: 2 },
  surpriseSub: { fontSize: 12, color: "#5a6478" },
  surpriseArrow: { fontSize: 22, color: "#f97316", opacity: 0.6 },

  // Or divider
  orDivider: { display: "flex", alignItems: "center", gap: 10, padding: "18px 20px 10px" },
  orLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.05)" },
  orText: { fontSize: 11, fontWeight: 600, color: "#2d3748", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" },

  // Categories
  catSection: { padding: "0 16px 20px" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  catBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
    padding: "13px 6px 10px",
    border: "1.5px solid",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
    background: "none",
    fontFamily: "inherit",
  },
  catEmoji: { fontSize: 22 },
  catName: { fontSize: 11, fontWeight: 600, transition: "color 0.2s", textAlign: "center" },
  catBadge: { fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99 },

  // Results
  results: { padding: "0 16px" },
  resultsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  resultsTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#e8edf5" },
  resultsCount: { fontSize: 13, fontWeight: 700 },

  // Destination card
  destCard: {
    border: "1.5px solid",
    borderRadius: 18,
    padding: 20,
    marginBottom: 4,
  },
  randomBadge: {
    display: "inline-block",
    background: "rgba(249,115,22,0.18)",
    border: "1px solid rgba(249,115,22,0.38)",
    color: "#f97316",
    fontSize: 11, fontWeight: 700,
    padding: "3px 11px", borderRadius: 99, marginBottom: 12,
  },
  destCardTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  catPill: { fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, border: "1px solid" },
  destNeighborhood: { fontSize: 12, color: "#4b5563" },
  destName: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#f0f4ff", lineHeight: 1.2, marginBottom: 4 },
  destAddress: { fontSize: 12, color: "#3d4863", marginBottom: 10 },
  destDesc: { fontSize: 13, color: "#7d8da8", lineHeight: 1.6, marginBottom: 12 },
  funFact: {
    display: "flex", gap: 8,
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10, padding: "10px 12px",
    fontSize: 12, color: "#9aa5bc", lineHeight: 1.5, marginBottom: 14,
  },
  metaRow: { display: "flex", alignItems: "center", marginBottom: 14 },
  metaBlock: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 },
  metaDivider: { width: 1, height: 34, background: "rgba(255,255,255,0.07)", margin: "0 6px" },
  metaLabel: { fontSize: 10, color: "#2d3748", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" },
  metaVal: { fontSize: 15, fontWeight: 800 },
  mapsBtn: {
    display: "block", textAlign: "center",
    padding: "12px", borderRadius: 12,
    fontWeight: 800, fontSize: 13, color: "#0c0f1a",
    textDecoration: "none", marginBottom: 10,
  },
  cardFooterBtns: { display: "flex", gap: 8 },
  spinAgainBtn: {
    flex: 1, padding: "9px", background: "rgba(249,115,22,0.1)",
    border: "1px solid rgba(249,115,22,0.3)", borderRadius: 10,
    color: "#f97316", fontWeight: 700, fontSize: 13,
    cursor: "pointer", fontFamily: "inherit",
  },
  dismissBtn: {
    flex: 1, padding: "9px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10, color: "#3d4863",
    fontSize: 12, cursor: "pointer", fontFamily: "inherit",
  },

  // Search
  searchInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid",
    borderRadius: 11, padding: "10px 36px 10px 14px",
    color: "#e8edf5", fontSize: 13, outline: "none",
    fontFamily: "inherit", transition: "border-color 0.2s",
  },
  clearBtn: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", color: "#4b5563",
    fontSize: 14, cursor: "pointer", padding: 4,
  },
  emptyMsg: { textAlign: "center", color: "#3d4863", fontSize: 13, padding: "32px 0" },

  // Mini card
  miniCard: {
    display: "flex", alignItems: "center",
    background: "rgba(255,255,255,0.03)",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: 13, padding: "13px 16px",
    cursor: "pointer", transition: "all 0.15s",
  },
  miniLeft: { flex: 1, paddingRight: 10 },
  miniName: { fontWeight: 700, fontSize: 14, color: "#dde4f0", marginBottom: 3 },
  miniSub: { fontSize: 12, color: "#4b5563" },
  miniRight: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
  miniArrow: { fontSize: 22, fontWeight: 700, lineHeight: 1 },

  // Idle
  idleWrap: { padding: "10px 0 0" },
  idleTiles: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  idleTile: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    padding: "10px 14px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid",
    borderRadius: 10, cursor: "pointer",
  },
  idlePrompt: { fontSize: 13, color: "#3d4863", lineHeight: 1.65, textAlign: "center", padding: "0 8px" },

  footer: {
    textAlign: "center", padding: "20px 20px 0",
    borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 20,
    display: "flex", flexDirection: "column", gap: 8, alignItems: "center",
  },
  footerSlogan: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 5,
    letterSpacing: "0.04em",
    color: "#f97316",
    opacity: 0.5,
  },

  // Zip code finder
  zipSection: {
    background: "rgba(255,255,255,0.03)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 18, padding: 18,
    display: "flex", flexDirection: "column", gap: 14,
  },
  zipHeader: { display: "flex", alignItems: "center", gap: 12 },
  zipTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#e8edf5" },
  zipSub: { fontSize: 12, color: "#5a6478", marginTop: 2 },
  zipInputRow: { display: "flex", gap: 8 },
  zipInput: {
    flex: 1, background: "rgba(255,255,255,0.06)",
    border: "1.5px solid rgba(255,255,255,0.12)",
    borderRadius: 12, padding: "11px 16px",
    color: "#e8edf5", fontSize: 15, outline: "none",
    fontFamily: "inherit", letterSpacing: "0.1em", fontWeight: 700,
  },
  zipBtn: {
    padding: "11px 20px", background: "#f97316",
    border: "none", borderRadius: 12,
    color: "#0c0f1a", fontWeight: 800, fontSize: 14,
    cursor: "pointer", fontFamily: "inherit",
  },
  zipError: { fontSize: 13, color: "#f87171", padding: "8px 12px", background: "rgba(248,113,113,0.08)", borderRadius: 8, border: "1px solid rgba(248,113,113,0.2)" },
  zipResultHeader: { marginBottom: 10 },
  zipNeighborhood: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  zipAreaBadge: { fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 99, border: "1px solid", letterSpacing: "0.06em" },
  zipNeighborhoodName: { fontWeight: 700, fontSize: 14, color: "#e8edf5" },
  zipCodeDisplay: { fontSize: 12, color: "#4b5563", marginLeft: "auto" },
  zipCatRow: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 },
  zipCatChip: {
    fontSize: 12, fontWeight: 700, padding: "5px 11px",
    borderRadius: 99, border: "1px solid", cursor: "pointer",
    fontFamily: "inherit", transition: "all 0.15s",
  },
  zipSpotList: { display: "flex", flexDirection: "column", gap: 8 },
  zipSpotListTitle: { fontSize: 11, fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 },
  zipSpotRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12, cursor: "pointer",
  },
  zipSpotInfo: { flex: 1 },
  zipSpotName: { fontWeight: 600, fontSize: 13, color: "#dde4f0" },
  zipSpotMeta: { fontSize: 11, color: "#4b5563", marginTop: 2 },

  // Schedule button
  scheduleBtn: {
    width: "100%",
    display: "flex", alignItems: "center", gap: 14,
    padding: "16px 20px",
    background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(56,189,248,0.04))",
    border: "1.5px solid rgba(56,189,248,0.35)",
    borderRadius: 18,
    cursor: "pointer", color: "inherit", fontFamily: "inherit",
    textAlign: "left", transition: "all 0.18s",
  },
  scheduleBtnLabel: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#38bdf8", marginBottom: 2 },
  scheduleBtnSub: { fontSize: 12, color: "#5a6478" },

  // Schedule overlay/screen
  scheduleOverlay: {
    position: "fixed", inset: 0, zIndex: 200,
    background: "#080b14",
    overflowY: "auto",
    animation: "slideUp 0.3s cubic-bezier(.4,0,.2,1)",
  },
  scheduleScreen: { maxWidth: 500, margin: "0 auto", minHeight: "100vh", paddingBottom: 40 },
  scheduleHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 16px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "sticky", top: 0, background: "#080b14", zIndex: 10,
  },
  scheduleBack: {
    background: "none", border: "none", color: "#38bdf8",
    fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: "4px 0",
  },
  scheduleTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#e8edf5" },
  scheduleBody: { padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 },
  scheduleSection: { display: "flex", flexDirection: "column", gap: 10 },
  scheduleSectionLabel: { fontWeight: 700, fontSize: 14, color: "#e8edf5", letterSpacing: "0.02em" },
  scheduleInput: {
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: 12, padding: "12px 16px",
    color: "#e8edf5", fontSize: 14, outline: "none",
    fontFamily: "inherit", transition: "border-color 0.2s",
    colorScheme: "dark",
  },
  mapContainer: {
    width: "100%", height: 260,
    borderRadius: 12, overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  mapPlaceholder: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    height: "100%", padding: 20,
  },
  openMapsBtn: {
    display: "block", textAlign: "center",
    padding: "12px", borderRadius: 12,
    background: "#38bdf8", color: "#0c0f1a",
    fontWeight: 800, fontSize: 13, textDecoration: "none",
  },
  departureNote: {
    background: "rgba(249,115,22,0.08)",
    border: "1px solid rgba(249,115,22,0.2)",
    borderRadius: 10, padding: "10px 14px",
    fontSize: 13, color: "#aab4c8", lineHeight: 1.6,
  },
  departureEarly: {
    background: "rgba(74,222,128,0.08)",
    border: "1px solid rgba(74,222,128,0.2)",
    borderRadius: 10, padding: "10px 14px",
    fontSize: 13, color: "#aab4c8",
  },
  scheduleSummary: {
    background: "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(56,189,248,0.03))",
    border: "1.5px solid rgba(56,189,248,0.25)",
    borderRadius: 16, padding: 18,
  },
  summaryTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#38bdf8", marginBottom: 12 },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 },
  summaryLabel: { fontSize: 12, color: "#4b5563", fontWeight: 600, flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 1 },
  summaryVal: { fontSize: 13, color: "#e8edf5", fontWeight: 600, textAlign: "right" },
};
