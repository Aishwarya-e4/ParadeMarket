import React, { useState, useMemo } from "react";
import {
  Home as HomeIcon, Sparkles, PawPrint, Dumbbell, PartyPopper, Search, ShoppingCart,
  Star, MapPin, Clock, User, Store, LayoutDashboard, CreditCard, Check,
  ChevronRight, ChevronLeft, Plus, Minus, Trash2, Mail, ShieldCheck,
  TrendingUp, Calendar, X, ArrowRight, Ticket, Menu
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
   canvas #F1ECE1  ink #22271F  brand #2F6F5E  gold #D6A339
   line #D8D0BE
--------------------------------------------------------------- */
const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');";

const CATEGORIES = [
  { id: "home", name: "Home Services", icon: HomeIcon, color: "#8C6A4F" },
  { id: "beauty", name: "Beauty & Wellness", icon: Sparkles, color: "#B4577B" },
  { id: "pet", name: "Pet Care", icon: PawPrint, color: "#4C7BA6" },
  { id: "fitness", name: "Fitness", icon: Dumbbell, color: "#5C8A4C" },
  { id: "events", name: "Events", icon: PartyPopper, color: "#7A5FA6" },
];

const MERCHANTS = [
  { id: "m1", name: "Bright Fix Handyman", category: "home", tagline: "Repairs, mounts & small fixes done right", rating: 4.8, reviewCount: 132, area: "Serves East Side, 8mi radius",
    services: [
      { id: "s1", name: "Furniture assembly", price: 65, duration: "45 min", desc: "Flat-pack furniture, shelving, and bed frames assembled and leveled." },
      { id: "s2", name: "TV mounting", price: 85, duration: "1 hr", desc: "Wall mount installation up to 65in, cables concealed." },
      { id: "s3", name: "Leaky faucet repair", price: 95, duration: "1 hr", desc: "Diagnose and fix kitchen or bathroom faucet leaks." },
    ],
    reviews: [
      { user: "Priya S.", stars: 5, text: "Showed up on time and mounted our TV perfectly." },
      { user: "Dan O.", stars: 5, text: "Fixed the faucet in twenty minutes flat." },
      { user: "Kevin R.", stars: 4, text: "Good work, a bit of a wait to schedule." },
    ]},
  { id: "m2", name: "GreenBlade Lawn Co.", category: "home", tagline: "Weekly mowing & seasonal cleanups", rating: 4.6, reviewCount: 88, area: "Serves Northside metro",
    services: [
      { id: "s4", name: "Standard mow", price: 45, duration: "30 min", desc: "Mow, edge, and blow for lots up to 1/4 acre." },
      { id: "s5", name: "Seasonal cleanup", price: 180, duration: "3 hr", desc: "Leaf removal, bed clearing, and green waste haul-away." },
      { id: "s6", name: "Hedge trimming", price: 70, duration: "1 hr", desc: "Shape and trim hedges and shrubs." },
    ],
    reviews: [
      { user: "Marta L.", stars: 5, text: "Lawn has never looked better." },
      { user: "Owen T.", stars: 4, text: "Reliable weekly service." },
    ]},
  { id: "m3", name: "Studio Lune Hair", category: "beauty", tagline: "Cut, color & styling in a calm space", rating: 4.9, reviewCount: 210, area: "Downtown studio",
    services: [
      { id: "s7", name: "Women's haircut", price: 68, duration: "45 min", desc: "Consultation, wash, cut, and style." },
      { id: "s8", name: "Full color", price: 145, duration: "2 hr", desc: "Single-process color, gloss, and blowout." },
      { id: "s9", name: "Blowout", price: 40, duration: "30 min", desc: "Wash and professional blowout styling." },
    ],
    reviews: [
      { user: "Aisha K.", stars: 5, text: "Best color I've had in years." },
      { user: "Beth N.", stars: 5, text: "Calm, unrushed, lovely space." },
      { user: "Yuki M.", stars: 5, text: "My haircut grew out beautifully." },
    ]},
  { id: "m4", name: "Bare Skin Studio", category: "beauty", tagline: "Facials & skincare treatments", rating: 4.7, reviewCount: 96, area: "Westgate district",
    services: [
      { id: "s10", name: "Signature facial", price: 95, duration: "1 hr", desc: "Custom facial for your skin type with LED therapy." },
      { id: "s11", name: "Microdermabrasion", price: 120, duration: "1 hr", desc: "Exfoliating treatment for tone and texture." },
    ],
    reviews: [
      { user: "Carla V.", stars: 5, text: "My skin has never felt this smooth." },
      { user: "Renee F.", stars: 4, text: "Lovely, relaxing, worth the price." },
    ]},
  { id: "m5", name: "Waggy Tails Grooming", category: "pet", tagline: "Gentle grooming for anxious pups too", rating: 4.9, reviewCount: 174, area: "Mobile — comes to you",
    services: [
      { id: "s12", name: "Small dog bath & trim", price: 55, duration: "1 hr", desc: "Bath, brush-out, trim, ears, and nails for dogs under 25lb." },
      { id: "s13", name: "Large dog full groom", price: 85, duration: "1.5 hr", desc: "Full grooming service for dogs over 25lb." },
      { id: "s14", name: "Nail trim", price: 15, duration: "15 min", desc: "Quick nail trim and filing." },
    ],
    reviews: [
      { user: "Jon P.", stars: 5, text: "So patient with my nervous rescue dog." },
      { user: "Tara W.", stars: 5, text: "Comes right to our driveway, so easy." },
    ]},
  { id: "m6", name: "Pawsitive Walks", category: "pet", tagline: "Daily walks & drop-in visits", rating: 4.8, reviewCount: 63, area: "Serves Midtown",
    services: [
      { id: "s15", name: "30-min walk", price: 22, duration: "30 min", desc: "Solo walk with photo updates." },
      { id: "s16", name: "60-min walk", price: 35, duration: "1 hr", desc: "Longer walk for high-energy dogs." },
      { id: "s17", name: "Drop-in visit", price: 18, duration: "20 min", desc: "Feeding, water, and a potty break." },
    ],
    reviews: [
      { user: "Grace H.", stars: 5, text: "Sends the sweetest photo updates every walk." },
    ]},
  { id: "m7", name: "Iron Room Personal Training", category: "fitness", tagline: "1-on-1 strength coaching", rating: 5.0, reviewCount: 41, area: "Riverside gym",
    services: [
      { id: "s18", name: "Single session", price: 80, duration: "1 hr", desc: "One-on-one strength and conditioning session." },
      { id: "s19", name: "5-session pack", price: 360, duration: "1 hr each", desc: "Five sessions, save $40 versus single rate." },
    ],
    reviews: [
      { user: "Ravi D.", stars: 5, text: "Hit a new deadlift PR after two months." },
    ]},
  { id: "m8", name: "Flow State Yoga", category: "fitness", tagline: "Small-group vinyasa & restorative", rating: 4.8, reviewCount: 120, area: "Garden district studio",
    services: [
      { id: "s20", name: "Drop-in class", price: 28, duration: "1 hr", desc: "Single vinyasa or restorative class." },
      { id: "s21", name: "Monthly unlimited", price: 140, duration: "unlimited", desc: "Unlimited classes for one month." },
    ],
    reviews: [
      { user: "Sofia B.", stars: 5, text: "Best studio energy in the city." },
      { user: "Wes A.", stars: 4, text: "Great teachers, gets crowded on weekends." },
    ]},
  { id: "m9", name: "Sound & Story DJs", category: "events", tagline: "DJ + MC for weddings & parties", rating: 4.9, reviewCount: 57, area: "Travels citywide",
    services: [
      { id: "s22", name: "4-hour wedding package", price: 650, duration: "4 hr", desc: "DJ, MC, and sound system for your reception." },
      { id: "s23", name: "Hourly add-on", price: 120, duration: "1 hr", desc: "Extend coverage beyond the base package." },
    ],
    reviews: [
      { user: "The Alvarez Wedding", stars: 5, text: "Read the room perfectly all night." },
    ]},
];

const fmt = (n) => `$${n.toFixed(2)}`;
const catOf = (id) => CATEGORIES.find((c) => c.id === id);
const merchantOf = (id) => MERCHANTS.find((m) => m.id === id);

/* ---------------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------------- */
function Stars({ value, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(value) ? "#D6A339" : "none"}
          stroke={i <= Math.round(value) ? "#D6A339" : "#B9B2A0"}
        />
      ))}
    </span>
  );
}

function CategoryChip({ id }) {
  const c = catOf(id);
  const Icon = c.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: `${c.color}1A`, color: c.color }}
    >
      <Icon size={13} /> {c.name}
    </span>
  );
}

function Toast({ text, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#22271F] text-[#F1ECE1] px-5 py-3 rounded-full shadow-lg text-sm flex items-center gap-2 font-medium">
      <Check size={16} className="text-[#D6A339]" /> {text}
    </div>
  );
}

/* ---------------------------------------------------------------
   NAV
--------------------------------------------------------------- */
function Nav({ go, cartCount, role, setRole, currentMerchantId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const prevCount = React.useRef(cartCount);
  React.useEffect(() => {
    if (cartCount > prevCount.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 500);
      prevCount.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);
  const roleLabel = role === "guest" ? "Guest" : role === "customer" ? "Customer" : "Merchant";
  return (
    <div className="sticky top-0 z-40 bg-[#F1ECE1]/95 backdrop-blur border-b border-[#D8D0BE]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2 shrink-0">
          <Ticket size={22} className="text-[#2F6F5E]" />
          <span className="font-['Fraunces'] text-[22px] font-semibold tracking-tight text-[#22271F]">Parade</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => go("category", { category: c.id })}
              className="text-sm px-3 py-1.5 rounded-full text-[#4A4636] hover:bg-[#E6E0D2] transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-white border border-[#D8D0BE] rounded-full px-1 py-1 text-xs">
            {["guest", "customer", "merchant"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  if (r === "customer") go("customerDashboard");
                  if (r === "merchant") go("merchantDashboard");
                  if (r === "guest") go("home");
                }}
                className={`px-2.5 py-1 rounded-full capitalize transition-colors ${
                  role === r ? "bg-[#22271F] text-[#F1ECE1]" : "text-[#6B664F]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {role === "customer" && (
            <button onClick={() => go("cart")} className="relative p-2 rounded-full hover:bg-[#E6E0D2]">
              <ShoppingCart size={19} className={`text-[#22271F] ${bounce ? "animate-cart-bounce" : ""}`} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#2F6F5E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {role === "guest" && (
            <button
              onClick={() => go("signup")}
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#22271F] text-[#F1ECE1] hover:bg-[#2F6F5E] transition-colors"
            >
              Sign up
            </button>
          )}

          <button className="md:hidden p-2" onClick={() => setMenuOpen((v) => !v)}>
            <Menu size={20} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[#D8D0BE] px-5 py-3 flex flex-col gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => { go("category", { category: c.id }); setMenuOpen(false); }}
              className="text-left text-sm py-2 text-[#4A4636]"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   HOME
--------------------------------------------------------------- */
function Bunting() {
  const flags = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES];
  return (
    <div className="overflow-hidden border-y border-[#D8D0BE] bg-[#22271F] select-none" aria-hidden="true">
      <div className="flex items-end w-max py-3" style={{ animation: "paradeScroll 26s linear infinite" }}>
        {flags.map((c, i) => (
          <span
            key={i}
            className="animate-flag inline-block mx-3 shrink-0"
            style={{ animationDelay: `${(i % 5) * 0.15}s` }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22">
              <path d="M0 0 H18 L9 22 Z" fill={c.color} />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function Home({ go, query, setQuery }) {
  const featured = MERCHANTS.slice(0, 3);
  return (
    <div>
      <Bunting />
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-[#2F6F5E] mb-4">
            <ShieldCheck size={14} /> Vetted local pros, one checkout
          </span>
          <h1 className="font-['Fraunces'] text-5xl sm:text-6xl leading-[1.05] text-[#22271F] font-semibold tracking-tight">
            Book real, local pros&nbsp;— in one line-up.
          </h1>
          <p className="mt-5 text-[#4A4636] text-lg leading-relaxed">
            Every merchant on Parade runs their own storefront. You browse, compare,
            and check out the same way every time — no matter whose door you're walking through.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); go("category", { category: "all", q: query }); }}
            className="mt-8 flex items-center gap-2 bg-white border border-[#D8D0BE] rounded-full p-1.5 pl-5 max-w-lg"
          >
            <Search size={18} className="text-[#8A8468]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search “dog groomer”, “haircut”, “DJ”…"
              className="flex-1 bg-transparent outline-none text-sm py-2"
            />
            <button className="bg-[#2F6F5E] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#25594B] transition-colors">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <h2 className="font-['Fraunces'] text-xl font-semibold text-[#22271F] mb-4">Browse by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const count = MERCHANTS.filter((m) => m.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => go("category", { category: c.id })}
                className="group text-left bg-white border border-[#D8D0BE] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden"
              >
                <span
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background: `repeating-linear-gradient(90deg, ${c.color} 0 10px, transparent 10px 20px)`,
                  }}
                />
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${c.color}1A` }}
                >
                  <Icon size={19} style={{ color: c.color }} />
                </div>
                <div className="font-semibold text-[#22271F] text-[15px]">{c.name}</div>
                <div className="text-xs text-[#8A8468] mt-1">{count} merchants</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Fraunces'] text-xl font-semibold text-[#22271F]">Featured this week</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {featured.map((m) => (
            <MerchantCard key={m.id} m={m} go={go} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MerchantCard({ m, go }) {
  const c = catOf(m.category);
  const Icon = c.icon;
  return (
    <button
      onClick={() => go("storefront", { merchant: m.id })}
      className="group text-left bg-white border border-[#D8D0BE] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-[#22271F]/20 transition-all duration-300 ease-out"
    >
      <div
        className="h-28 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${c.color}33, ${c.color}0D)` }}
      >
        <Icon size={34} style={{ color: c.color }} className="transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <div className="font-['Fraunces'] font-semibold text-[#22271F] text-[16px] leading-snug">{m.name}</div>
        <p className="text-xs text-[#6B664F] mt-1 line-clamp-2">{m.tagline}</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-[#4A4636]">
          <Stars value={m.rating} size={12} />
          <span className="font-medium">{m.rating}</span>
          <span className="text-[#B9B2A0]">({m.reviewCount})</span>
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------------
   CATEGORY / SEARCH
--------------------------------------------------------------- */
function CategoryPage({ params, go, query, setQuery }) {
  const [sort, setSort] = useState("rating");
  const cat = params.category && params.category !== "all" ? params.category : null;
  const list = useMemo(() => {
    let r = MERCHANTS.filter((m) => (cat ? m.category === cat : true));
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.tagline.toLowerCase().includes(q) ||
          m.services.some((s) => s.name.toLowerCase().includes(q))
      );
    }
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "price") r = [...r].sort((a, b) => a.services[0].price - b.services[0].price);
    return r;
  }, [cat, query, sort]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2 text-sm text-[#8A8468] mb-2">
        <button onClick={() => go("home")} className="hover:text-[#22271F]">Home</button>
        <ChevronRight size={13} />
        <span className="text-[#22271F] font-medium">{cat ? catOf(cat).name : "All categories"}</span>
      </div>
      <h1 className="font-['Fraunces'] text-3xl font-semibold text-[#22271F] mb-6">
        {cat ? catOf(cat).name : "All merchants"}
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-[#D8D0BE] rounded-full px-4 py-2 flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="text-[#8A8468]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this category…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex gap-1 bg-white border border-[#D8D0BE] rounded-full p-1 text-xs">
          {[{ id: "rating", label: "Top rated" }, { id: "price", label: "Price: low" }].map((o) => (
            <button
              key={o.id}
              onClick={() => setSort(o.id)}
              className={`px-3 py-1.5 rounded-full ${sort === o.id ? "bg-[#22271F] text-[#F1ECE1]" : "text-[#6B664F]"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => go("category", { category: c.id })}
              className={`text-xs px-2.5 py-1.5 rounded-full border ${
                cat === c.id ? "border-[#22271F] text-[#22271F]" : "border-[#D8D0BE] text-[#8A8468]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 text-[#8A8468]">
          <Store size={32} className="mx-auto mb-3" />
          No merchants match that search yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {list.map((m) => (
            <MerchantCard key={m.id} m={m} go={go} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   STOREFRONT
--------------------------------------------------------------- */
function StorefrontSkeleton() {
  return (
    <div>
      <div className="h-40 sm:h-52 skeleton-shimmer rounded-none" />
      <div className="max-w-5xl mx-auto px-5">
        <div className="-mt-8 bg-white border border-[#D8D0BE] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="h-4 w-28 rounded-full skeleton-shimmer" />
          <div className="h-8 w-64 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-80 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-48 rounded-lg skeleton-shimmer" />
          <div className="pt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-lg skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Storefront({ params, go, addToCart, role, toast }) {
  const m = merchantOf(params.merchant);
  const [tab, setTab] = useState("services");
  const [loading, setLoading] = useState(true);
  const c = catOf(m.category);
  const Icon = c.icon;

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [params.merchant]);

  if (loading) return <StorefrontSkeleton />;

  return (
    <div>
      <div className="h-40 sm:h-52 relative" style={{ background: `linear-gradient(135deg, ${c.color}44, ${c.color}11)` }}>
        <Icon size={56} style={{ color: c.color }} className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0" />
      </div>
      <div className="max-w-5xl mx-auto px-5">
        <div className="-mt-8 bg-white border border-[#D8D0BE] rounded-2xl p-6 shadow-sm animate-page">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CategoryChip id={m.category} />
              <h1 className="font-['Fraunces'] text-3xl font-semibold text-[#22271F] mt-3">{m.name}</h1>
              <p className="text-[#6B664F] mt-1">{m.tagline}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-[#4A4636]">
                <span className="flex items-center gap-1"><Stars value={m.rating} /> {m.rating} ({m.reviewCount} reviews)</span>
                <span className="flex items-center gap-1 text-[#8A8468]"><MapPin size={14} /> {m.area}</span>
              </div>
            </div>
            {role !== "merchant" && (
              <button
                onClick={() => go("cart")}
                className="text-sm font-medium px-4 py-2 rounded-full border border-[#D8D0BE] hover:border-[#22271F] transition-colors"
              >
                View cart
              </button>
            )}
          </div>

          <div className="flex gap-1 mt-6 border-b border-[#D8D0BE]">
            {["services", "reviews", "about"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                  tab === t ? "border-[#2F6F5E] text-[#22271F]" : "border-transparent text-[#8A8468]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "services" && (
            <div className="mt-5 divide-y divide-[#EDE8DA]">
              {m.services.map((s) => (
                <div key={s.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-[#22271F]">{s.name}</div>
                    <div className="text-sm text-[#6B664F] mt-0.5 max-w-md">{s.desc}</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8A8468] mt-1.5">
                      <Clock size={12} /> {s.duration}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-['IBM_Plex_Mono'] text-lg text-[#22271F]">{fmt(s.price)}</div>
                    {role !== "merchant" && (
                      <button
                        onClick={() => { addToCart(m.id, s.id); toast(`Added ${s.name} to cart`); }}
                        className="mt-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#22271F] text-[#F1ECE1] hover:bg-[#2F6F5E] active:scale-95 transition-all"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="mt-5 space-y-4">
              {m.reviews.map((r, i) => (
                <div key={i} className="pb-4 border-b border-[#EDE8DA] last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-[#22271F]">{r.user}</span>
                    <Stars value={r.stars} size={13} />
                  </div>
                  <p className="text-sm text-[#4A4636] mt-1.5">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="mt-5 text-sm text-[#4A4636] leading-relaxed max-w-lg">
              {m.name} is a Parade merchant in the {c.name} category. {m.area}. Bookings are confirmed
              directly through Parade's standard checkout, and payment is held securely until service is complete.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CART
--------------------------------------------------------------- */
function CartPage({ cart, updateQty, removeItem, go }) {
  const grouped = useMemo(() => {
    const g = {};
    cart.forEach((item) => {
      g[item.merchantId] = g[item.merchantId] || [];
      g[item.merchantId].push(item);
    });
    return g;
  }, [cart]);

  const subtotal = cart.reduce((sum, i) => {
    const m = merchantOf(i.merchantId);
    const s = m.services.find((s) => s.id === i.serviceId);
    return sum + s.price * i.qty;
  }, 0);
  const fee = subtotal * 0.03;
  const total = subtotal + fee;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <ShoppingCart size={36} className="mx-auto mb-4 text-[#B9B2A0]" />
        <h2 className="font-['Fraunces'] text-2xl text-[#22271F] mb-2">Your cart is empty</h2>
        <p className="text-[#6B664F] mb-6">Add a service from any merchant storefront to get started.</p>
        <button onClick={() => go("home")} className="px-5 py-2.5 rounded-full bg-[#22271F] text-[#F1ECE1] text-sm font-medium">
          Browse categories
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 grid md:grid-cols-[1fr_300px] gap-8">
      <div>
        <h1 className="font-['Fraunces'] text-3xl font-semibold text-[#22271F] mb-6">Your cart</h1>
        {Object.entries(grouped).map(([merchantId, items]) => {
          const m = merchantOf(merchantId);
          return (
            <div key={merchantId} className="mb-6 bg-white border border-[#D8D0BE] rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#EDE8DA] font-medium text-[#22271F] flex items-center gap-2">
                <Store size={15} className="text-[#8A8468]" /> {m.name}
              </div>
              <div className="divide-y divide-[#EDE8DA]">
                {items.map((item) => {
                  const s = m.services.find((s) => s.id === item.serviceId);
                  return (
                    <div key={item.serviceId} className="px-5 py-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-[#22271F] text-sm">{s.name}</div>
                        <div className="text-xs text-[#8A8468] mt-0.5">{fmt(s.price)} each</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#D8D0BE] rounded-full">
                          <button onClick={() => updateQty(merchantId, item.serviceId, -1)} className="p-1.5"><Minus size={13} /></button>
                          <span className="text-sm w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(merchantId, item.serviceId, 1)} className="p-1.5"><Plus size={13} /></button>
                        </div>
                        <span className="font-['IBM_Plex_Mono'] text-sm w-16 text-right">{fmt(s.price * item.qty)}</span>
                        <button onClick={() => removeItem(merchantId, item.serviceId)} className="text-[#B9556B] p-1">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <ReceiptPanel subtotal={subtotal} fee={fee} total={total}>
        <button
          onClick={() => go("checkout")}
          className="w-full mt-5 bg-[#2F6F5E] text-white font-medium py-3 rounded-full hover:bg-[#25594B] transition-colors flex items-center justify-center gap-2"
        >
          Proceed to checkout <ArrowRight size={15} />
        </button>
      </ReceiptPanel>
    </div>
  );
}

function ReceiptPanel({ subtotal, fee, total, children }) {
  return (
    <div className="relative bg-white border border-[#D8D0BE] rounded-2xl p-5 h-fit sticky top-24">
      <div className="absolute -left-2 top-1/2 w-4 h-4 bg-[#F1ECE1] rounded-full border border-[#D8D0BE]" />
      <div className="absolute -right-2 top-1/2 w-4 h-4 bg-[#F1ECE1] rounded-full border border-[#D8D0BE]" />
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#8A8468] font-semibold mb-4">
        <Ticket size={14} /> Order summary
      </div>
      <div className="font-['IBM_Plex_Mono'] text-sm space-y-2 text-[#4A4636]">
        <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
        <div className="flex justify-between"><span>Service fee</span><span>{fmt(fee)}</span></div>
        <div className="border-t border-dashed border-[#D8D0BE] my-2" />
        <div className="flex justify-between text-[#22271F] font-semibold text-base"><span>Total</span><span>{fmt(total)}</span></div>
      </div>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   CHECKOUT
--------------------------------------------------------------- */
function Checkout({ cart, go, placeOrder }) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", address: "" });
  const [card, setCard] = useState({ number: "", exp: "", cvc: "" });

  const subtotal = cart.reduce((sum, i) => {
    const m = merchantOf(i.merchantId);
    const s = m.services.find((s) => s.id === i.serviceId);
    return sum + s.price * i.qty;
  }, 0);
  const fee = subtotal * 0.03;
  const total = subtotal + fee;

  const steps = ["Details", "Payment", "Review"];

  const canContinue1 = details.name && details.email && details.address;
  const canContinue2 = card.number.length >= 12 && card.exp && card.cvc;

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 grid md:grid-cols-[1fr_300px] gap-8">
      <div>
        <button onClick={() => go("cart")} className="flex items-center gap-1 text-sm text-[#8A8468] mb-4 hover:text-[#22271F]">
          <ChevronLeft size={15} /> Back to cart
        </button>
        <h1 className="font-['Fraunces'] text-3xl font-semibold text-[#22271F] mb-6">Checkout</h1>

        <div className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${
                    step > i + 1 ? "bg-[#2F6F5E] text-white" : step === i + 1 ? "bg-[#22271F] text-white" : "bg-[#E6E0D2] text-[#8A8468]"
                  }`}
                >
                  {step > i + 1 ? <Check size={13} /> : i + 1}
                </div>
                <span className={`text-sm ${step === i + 1 ? "text-[#22271F] font-medium" : "text-[#8A8468]"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-[#D8D0BE]" />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white border border-[#D8D0BE] rounded-2xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={details.name} onChange={(v) => setDetails({ ...details, name: v })} placeholder="Jordan Ellis" />
              <Field label="Email" value={details.email} onChange={(v) => setDetails({ ...details, email: v })} placeholder="jordan@email.com" type="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone" value={details.phone} onChange={(v) => setDetails({ ...details, phone: v })} placeholder="(555) 010-0000" />
              <Field label="Service address" value={details.address} onChange={(v) => setDetails({ ...details, address: v })} placeholder="123 Maple St, Apt 4" />
            </div>
            <button
              disabled={!canContinue1}
              onClick={() => setStep(2)}
              className="w-full mt-2 bg-[#22271F] disabled:opacity-40 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2"
            >
              Continue to payment <ArrowRight size={15} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white border border-[#D8D0BE] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#6B664F] bg-[#F1ECE1] border border-[#D8D0BE] rounded-lg px-3 py-2 mb-2">
              <ShieldCheck size={14} className="text-[#2F6F5E]" />
              Payments are processed by a PCI-compliant gateway. Card details never touch Parade's servers. (Demo form — no real charge occurs.)
            </div>
            <Field label="Card number" value={card.number} onChange={(v) => setCard({ ...card, number: v.replace(/\D/g, "").slice(0, 16) })} placeholder="4242 4242 4242 4242" icon={<CreditCard size={15} />} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" value={card.exp} onChange={(v) => setCard({ ...card, exp: v })} placeholder="MM/YY" />
              <Field label="CVC" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, "").slice(0, 4) })} placeholder="123" />
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-full border border-[#D8D0BE] text-sm font-medium">Back</button>
              <button
                disabled={!canContinue2}
                onClick={() => setStep(3)}
                className="flex-1 bg-[#22271F] disabled:opacity-40 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2"
              >
                Review order <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white border border-[#D8D0BE] rounded-2xl p-6 space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wide text-[#8A8468] font-semibold mb-1.5">Contact & address</div>
              <div className="text-sm text-[#22271F]">{details.name} · {details.email}</div>
              <div className="text-sm text-[#6B664F]">{details.address}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#8A8468] font-semibold mb-1.5">Payment</div>
              <div className="text-sm text-[#22271F] font-['IBM_Plex_Mono']">•••• •••• •••• {card.number.slice(-4)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#8A8468] font-semibold mb-2">Items</div>
              {cart.map((item) => {
                const m = merchantOf(item.merchantId);
                const s = m.services.find((s) => s.id === item.serviceId);
                return (
                  <div key={item.serviceId} className="flex justify-between text-sm py-1 text-[#4A4636]">
                    <span>{s.name} × {item.qty} <span className="text-[#B9B2A0]">— {m.name}</span></span>
                    <span className="font-['IBM_Plex_Mono']">{fmt(s.price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-full border border-[#D8D0BE] text-sm font-medium">Back</button>
              <button
                onClick={() => placeOrder(details)}
                className="flex-1 bg-[#2F6F5E] text-white font-medium py-3 rounded-full hover:bg-[#25594B] transition-colors flex items-center justify-center gap-2"
              >
                Place order — {fmt(total)} <Check size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <ReceiptPanel subtotal={subtotal} fee={fee} total={total} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", icon }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[#6B664F] mb-1.5 block">{label}</span>
      <div className="flex items-center gap-2 border border-[#D8D0BE] rounded-lg px-3 py-2.5 focus-within:border-[#2F6F5E] transition-colors">
        {icon && <span className="text-[#8A8468]">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm bg-transparent"
        />
      </div>
    </label>
  );
}

/* ---------------------------------------------------------------
   CONFIRMATION
--------------------------------------------------------------- */
function Confirmation({ order, go }) {
  if (!order) return null;
  return (
    <div className="max-w-md mx-auto px-5 py-14">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#2F6F5E]/10 flex items-center justify-center mx-auto mb-4 animate-check-pop">
          <Check size={26} className="text-[#2F6F5E]" />
        </div>
        <h1 className="font-['Fraunces'] text-2xl font-semibold text-[#22271F]">Order confirmed</h1>
        <p className="text-sm text-[#6B664F] mt-1 flex items-center justify-center gap-1.5">
          <Mail size={13} /> Receipt sent to {order.email}
        </p>
      </div>

      <div className="relative bg-white border border-[#D8D0BE] rounded-2xl p-6 [mask-image:radial-gradient(circle_5px_at_0_50%,transparent_5px,black_5.5px),radial-gradient(circle_5px_at_100%_50%,transparent_5px,black_5.5px)]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#8A8468] font-semibold">Order</div>
            <div className="font-['IBM_Plex_Mono'] text-lg text-[#22271F]">{order.id}</div>
          </div>
          <Ticket size={22} className="text-[#D6A339]" />
        </div>
        <div className="border-t border-dashed border-[#D8D0BE] my-3" />
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1 text-[#4A4636]">
            <span>{item.name} × {item.qty}</span>
            <span className="font-['IBM_Plex_Mono']">{fmt(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-[#D8D0BE] my-3" />
        <div className="flex justify-between text-base font-semibold text-[#22271F]">
          <span>Total paid</span>
          <span className="font-['IBM_Plex_Mono']">{fmt(order.total)}</span>
        </div>
        <div className="text-xs text-[#8A8468] mt-4">{new Date(order.date).toLocaleString()}</div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => go("customerDashboard")} className="flex-1 py-3 rounded-full border border-[#D8D0BE] text-sm font-medium">
          View my orders
        </button>
        <button onClick={() => go("home")} className="flex-1 py-3 rounded-full bg-[#22271F] text-white text-sm font-medium">
          Back home
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CUSTOMER DASHBOARD
--------------------------------------------------------------- */
function CustomerDashboard({ orders, go, addReview }) {
  const [reviewFor, setReviewFor] = useState(null);
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-full bg-[#2F6F5E]/10 flex items-center justify-center">
          <User size={19} className="text-[#2F6F5E]" />
        </div>
        <div>
          <h1 className="font-['Fraunces'] text-2xl font-semibold text-[#22271F]">Your account</h1>
          <p className="text-sm text-[#8A8468]">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-[#8A8468] bg-white border border-[#D8D0BE] rounded-2xl">
          <Calendar size={30} className="mx-auto mb-3" />
          No orders yet — browse a category to book your first service.
          <div className="mt-4">
            <button onClick={() => go("home")} className="px-5 py-2 rounded-full bg-[#22271F] text-white text-sm font-medium">Browse</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border border-[#D8D0BE] rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="font-['IBM_Plex_Mono'] text-sm text-[#22271F]">{o.id}</div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#2F6F5E]/10 text-[#2F6F5E]">Confirmed</span>
              </div>
              {Object.entries(o.byMerchant).map(([mid, items]) => {
                const m = merchantOf(mid);
                return (
                  <div key={mid} className="mb-2 last:mb-0">
                    <div className="text-sm font-medium text-[#22271F] flex items-center justify-between">
                      <span>{m.name}</span>
                      {!o.reviewed?.[mid] && (
                        <button
                          onClick={() => setReviewFor({ orderId: o.id, merchantId: mid })}
                          className="text-xs text-[#2F6F5E] font-medium hover:underline"
                        >
                          Leave a review
                        </button>
                      )}
                      {o.reviewed?.[mid] && <span className="text-xs text-[#8A8468]">Reviewed ✓</span>}
                    </div>
                    {items.map((it) => (
                      <div key={it.name} className="text-xs text-[#6B664F] flex justify-between">
                        <span>{it.name} × {it.qty}</span>
                        <span className="font-['IBM_Plex_Mono']">{fmt(it.price * it.qty)}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="text-right text-sm font-semibold text-[#22271F] mt-2 border-t border-[#EDE8DA] pt-2">
                Total {fmt(o.total)}
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewFor && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-5" onClick={() => setReviewFor(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Fraunces'] text-lg font-semibold text-[#22271F]">Rate {merchantOf(reviewFor.merchantId).name}</h3>
              <button onClick={() => setReviewFor(null)}><X size={18} /></button>
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setStars(i)}>
                  <Star size={24} fill={i <= stars ? "#D6A339" : "none"} stroke={i <= stars ? "#D6A339" : "#B9B2A0"} />
                </button>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How did it go?"
              className="w-full border border-[#D8D0BE] rounded-lg p-3 text-sm outline-none focus:border-[#2F6F5E] h-24 resize-none"
            />
            <button
              onClick={() => {
                addReview(reviewFor.orderId, reviewFor.merchantId, stars, text);
                setReviewFor(null);
                setText("");
                setStars(5);
              }}
              className="w-full mt-3 bg-[#22271F] text-white font-medium py-2.5 rounded-full"
            >
              Submit review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MERCHANT DASHBOARD
--------------------------------------------------------------- */
function MerchantDashboard({ orders, merchantId, setMerchantId }) {
  const m = merchantOf(merchantId);
  const myOrders = orders.filter((o) => o.byMerchant[merchantId]);
  const revenue = myOrders.reduce((sum, o) => {
    const items = o.byMerchant[merchantId];
    return sum + items.reduce((s, i) => s + i.price * i.qty, 0);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#D6A339]/15 flex items-center justify-center">
            <LayoutDashboard size={19} className="text-[#D6A339]" />
          </div>
          <div>
            <h1 className="font-['Fraunces'] text-2xl font-semibold text-[#22271F]">Merchant dashboard</h1>
            <p className="text-sm text-[#8A8468]">Viewing as</p>
          </div>
        </div>
        <select
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          className="border border-[#D8D0BE] rounded-full px-4 py-2 text-sm bg-white outline-none"
        >
          {MERCHANTS.map((mm) => (
            <option key={mm.id} value={mm.id}>{mm.name}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={TrendingUp} label="Revenue (all time)" value={fmt(revenue)} />
        <StatCard icon={Calendar} label="Orders received" value={myOrders.length} />
        <StatCard icon={Star} label="Rating" value={`${m.rating} ★ (${m.reviewCount})`} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#D8D0BE] rounded-2xl p-5">
          <h2 className="font-semibold text-[#22271F] mb-4">Orders</h2>
          {myOrders.length === 0 ? (
            <p className="text-sm text-[#8A8468]">No orders yet for {m.name}. Try placing one as a customer first.</p>
          ) : (
            <div className="space-y-3">
              {myOrders.map((o) => (
                <div key={o.id} className="border border-[#EDE8DA] rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-['IBM_Plex_Mono'] text-[#22271F]">{o.id}</span>
                    <span className="text-xs font-medium text-[#2F6F5E]">Confirmed</span>
                  </div>
                  {o.byMerchant[merchantId].map((it) => (
                    <div key={it.name} className="text-xs text-[#6B664F] flex justify-between mt-1">
                      <span>{it.name} × {it.qty}</span>
                      <span className="font-['IBM_Plex_Mono']">{fmt(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#D8D0BE] rounded-2xl p-5">
            <h2 className="font-semibold text-[#22271F] mb-3">Service listings</h2>
            <div className="space-y-2">
              {m.services.map((s) => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="text-[#4A4636]">{s.name}</span>
                  <span className="font-['IBM_Plex_Mono'] text-[#22271F]">{fmt(s.price)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#D8D0BE] rounded-2xl p-5">
            <h2 className="font-semibold text-[#22271F] mb-3">Recent reviews</h2>
            <div className="space-y-3">
              {m.reviews.slice(0, 3).map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[#22271F]">{r.user}</span>
                    <Stars value={r.stars} size={12} />
                  </div>
                  <p className="text-xs text-[#6B664F] mt-0.5">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-[#D8D0BE] rounded-2xl p-5">
      <Icon size={17} className="text-[#8A8468] mb-3" />
      <div className="text-2xl font-['Fraunces'] font-semibold text-[#22271F]">{value}</div>
      <div className="text-xs text-[#8A8468] mt-1">{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SIGNUP
--------------------------------------------------------------- */
function Signup({ go, setRole, toast }) {
  const [as, setAs] = useState("customer");
  const [category, setCategory] = useState("home");

  return (
    <div className="max-w-md mx-auto px-5 py-14">
      <h1 className="font-['Fraunces'] text-3xl font-semibold text-[#22271F] mb-2">Join Parade</h1>
      <p className="text-sm text-[#6B664F] mb-6">Create an account as a customer or list your business.</p>

      <div className="flex bg-white border border-[#D8D0BE] rounded-full p-1 mb-6 text-sm">
        {["customer", "merchant"].map((r) => (
          <button
            key={r}
            onClick={() => setAs(r)}
            className={`flex-1 py-2 rounded-full capitalize font-medium transition-colors ${
              as === r ? "bg-[#22271F] text-[#F1ECE1]" : "text-[#6B664F]"
            }`}
          >
            {r === "customer" ? "I'm a customer" : "I'm a merchant"}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#D8D0BE] rounded-2xl p-6 space-y-4">
        <Field label={as === "merchant" ? "Business name" : "Full name"} placeholder={as === "merchant" ? "Bright Fix Handyman" : "Jordan Ellis"} value="" onChange={() => {}} />
        <Field label="Email" placeholder="you@email.com" value="" onChange={() => {}} type="email" />
        <Field label="Password" placeholder="••••••••" value="" onChange={() => {}} type="password" />
        {as === "merchant" && (
          <label className="block">
            <span className="text-xs font-medium text-[#6B664F] mb-1.5 block">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-[#D8D0BE] rounded-lg px-3 py-2.5 text-sm outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
        )}
        <button
          onClick={() => {
            setRole(as);
            toast(as === "merchant" ? "Merchant account created — storefront ready to customize" : "Welcome to Parade!");
            go(as === "merchant" ? "merchantDashboard" : "customerDashboard");
          }}
          className="w-full bg-[#2F6F5E] text-white font-medium py-3 rounded-full hover:bg-[#25594B] transition-colors"
        >
          {as === "merchant" ? "Create merchant account" : "Create account"}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   APP
--------------------------------------------------------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [params, setParams] = useState({});
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("guest");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [merchantId, setMerchantId] = useState("m1");
  const [toastMsg, setToastMsg] = useState(null);

  const go = (v, p = {}) => {
    setParams(p);
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toast = (t) => setToastMsg(t);

  const addToCart = (merchantId, serviceId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.merchantId === merchantId && i.serviceId === serviceId);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { merchantId, serviceId, qty: 1 }];
    });
  };
  const updateQty = (merchantId, serviceId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.merchantId === merchantId && i.serviceId === serviceId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };
  const removeItem = (merchantId, serviceId) =>
    setCart((prev) => prev.filter((i) => !(i.merchantId === merchantId && i.serviceId === serviceId)));

  const placeOrder = (details) => {
    const byMerchant = {};
    cart.forEach((item) => {
      const m = merchantOf(item.merchantId);
      const s = m.services.find((s) => s.id === item.serviceId);
      byMerchant[item.merchantId] = byMerchant[item.merchantId] || [];
      byMerchant[item.merchantId].push({ name: s.name, price: s.price, qty: item.qty });
    });
    const subtotal = cart.reduce((sum, i) => {
      const m = merchantOf(i.merchantId);
      const s = m.services.find((s) => s.id === i.serviceId);
      return sum + s.price * i.qty;
    }, 0);
    const total = subtotal * 1.03;
    const order = {
      id: "PRD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      email: details.email,
      date: Date.now(),
      byMerchant,
      total,
      items: Object.values(byMerchant).flat(),
      reviewed: {},
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    setCart([]);
    go("confirmation");
  };

  const addReview = (orderId, merchantId, stars, text) => {
    merchantOf(merchantId).reviews.unshift({ user: "You", stars, text: text || "Great service!" });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, reviewed: { ...o.reviewed, [merchantId]: true } } : o))
    );
    toast("Review posted — thanks!");
  };

  return (
    <div className="min-h-screen bg-[#F1ECE1]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        * { font-family: 'Inter', sans-serif; }
        .font-\\['Fraunces'\\] { font-family: 'Fraunces', serif; }
        .font-\\['IBM_Plex_Mono'\\] { font-family: 'IBM Plex Mono', monospace; }

        :focus-visible {
          outline: 2px solid #2F6F5E;
          outline-offset: 2px;
          border-radius: 4px;
        }

        @keyframes paradeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceCart {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.25) rotate(-8deg); }
          50% { transform: scale(1.1) rotate(6deg); }
          75% { transform: scale(1.2) rotate(-3deg); }
        }
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes flagWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-page { animation: pageIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-cart-bounce { animation: bounceCart 0.5s ease; }
        .animate-check-pop { animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-flag { animation: flagWave 2.4s ease-in-out infinite; transform-origin: top center; }
        .skeleton-shimmer {
          background: linear-gradient(90deg, #EDE8DA 0px, #F6F2E8 40px, #EDE8DA 80px);
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <Nav go={go} cartCount={cart.reduce((s, i) => s + i.qty, 0)} role={role} setRole={setRole} currentMerchantId={merchantId} />

      <div key={view + JSON.stringify(params)} className="animate-page">
        {view === "home" && <Home go={go} query={query} setQuery={setQuery} />}
        {view === "category" && <CategoryPage params={params} go={go} query={query} setQuery={setQuery} />}
        {view === "storefront" && <Storefront params={params} go={go} addToCart={addToCart} role={role} toast={toast} />}
        {view === "cart" && <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} go={go} />}
        {view === "checkout" && <Checkout cart={cart} go={go} placeOrder={placeOrder} />}
        {view === "confirmation" && <Confirmation order={lastOrder} go={go} />}
        {view === "customerDashboard" && <CustomerDashboard orders={orders} go={go} addReview={addReview} />}
        {view === "merchantDashboard" && <MerchantDashboard orders={orders} merchantId={merchantId} setMerchantId={setMerchantId} />}
        {view === "signup" && <Signup go={go} setRole={setRole} toast={toast} />}
      </div>

      <footer className="mt-16 border-t border-[#D8D0BE] py-8 text-center text-xs text-[#8A8468]">
        Parade — a prototype marketplace. Payment form is a demo; no real transactions are processed.
      </footer>

      {toastMsg && <Toast text={toastMsg} onDone={() => setToastMsg(null)} />}
    </div>
  );
}
