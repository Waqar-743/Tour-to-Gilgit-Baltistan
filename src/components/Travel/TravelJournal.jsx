import { useEffect, useState } from "react";
import { places, cultureStories, seasons, imageUrl } from "../../data/journal";
import Icon, { MountainMark } from "./Icon";
import JournalDialog from "./JournalDialog";
import TripPlanner from "./TripPlanner";
import "./TravelJournal.css";

const categories = [
  { id: "all", label: "All places", icon: "compass" },
  { id: "heritage", label: "Living heritage", icon: "fort" },
  { id: "valleys", label: "Lakes & valleys", icon: "lake" },
  { id: "trails", label: "Highland trails", icon: "mountain" },
];
const navItems = [
  ["Places to go", "#places"],
  ["Culture & life", "#culture"],
  ["When to visit", "#seasons"],
  ["The journal", "#journal"],
];
const loadSaved = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("gb-saved-places") || "[]");
    return Array.isArray(saved)
      ? saved.filter((id) => places.some((place) => place.id === id))
      : [];
  } catch {
    return [];
  }
};
const matchesPlace = (place, query) =>
  `${place.name} ${place.region} ${place.summary} ${place.highlights.join(" ")}`
    .toLowerCase()
    .includes(query.toLowerCase().trim());

function Photo({ name, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`photo-fallback ${className}`} role="img" aria-label={alt}>
      <Icon name="mountain" size={48} />
      <span>Gilgit-Baltistan</span>
    </div>
  ) : (
    <img
      className={className}
      src={imageUrl(name)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function PlaceCard({ place, saved, toggleSave, onOpen }) {
  return (
    <article className="place-card">
      <div className="place-image-wrap">
        <button
          className="place-image-button"
          onClick={() => onOpen(place)}
          aria-label={`Explore ${place.name}`}
        >
          <Photo name={place.image} alt={place.alt} />
        </button>
        <span className="place-region">
          <Icon name="pin" size={12} />
          {place.region}
        </span>
        <button
          className={`save-place ${saved ? "is-saved" : ""}`}
          onClick={() => toggleSave(place.id)}
          aria-label={`${saved ? "Unsave" : "Save"} ${place.name}`}
          aria-pressed={saved}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div className="place-heading">
        <h3>
          <button onClick={() => onOpen(place)}>{place.name}</button>
        </h3>
        <Icon name={place.icon} size={25} />
      </div>
      <p>{place.summary}</p>
      <button className="place-link" onClick={() => onOpen(place)}>
        Discover the story <Icon name="arrow-up-right" size={17} />
      </button>
    </article>
  );
}

export default function TravelJournal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState(loadSaved);
  const [storageMessage, setStorageMessage] = useState("");
  const [savedOpen, setSavedOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [cultureId, setCultureId] = useState("table");
  const [seasonId, setSeasonId] = useState("autumn");
  const [article, setArticle] = useState(null);
  const [credits, setCredits] = useState(null);
  const culture =
    cultureStories.find((story) => story.id === cultureId) || cultureStories[0];
  const season = seasons.find((item) => item.id === seasonId) || seasons[0];
  const filtered = places.filter(
    (place) =>
      (category === "all" || place.category === category) &&
      matchesPlace(place, query),
  );
  const visible =
    category === "all" && !showAll && !query ? filtered.slice(0, 4) : filtered;
  const toggleSave = (id) =>
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id],
    );
  useEffect(() => {
    try {
      localStorage.setItem("gb-saved-places", JSON.stringify(saved));
    } catch {
      setStorageMessage(
        "Your places are saved for this visit. Browser storage is unavailable.",
      );
    }
  }, [saved]);
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);
  const chooseCategory = (id) => {
    setCategory(id);
    setShowAll(true);
    document
      .getElementById("places")
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  const openCredits = async () => {
    setArticle("credits");
    setCredits(null);
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}images/credits.json`,
      );
      if (!response.ok) throw new Error();
      setCredits(await response.json());
    } catch {
      setCredits({ error: true });
    }
  };
  return (
    <div className="travel-journal">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-container">
          <a
            className="brand"
            href={import.meta.env.BASE_URL}
            aria-label="Gilgit-Baltistan home"
          >
            <MountainMark />
            <span>
              gilgit<span className="brand-dash">—</span>baltistan
              <small>A little closer to life.</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button search-toggle"
              onClick={() => setSearchOpen(true)}
              aria-label="Search destinations"
            >
              <Icon name="search" size={20} />
            </button>
            <button
              className="icon-button saved-toggle"
              onClick={() => setSavedOpen(true)}
              aria-label={`Saved places (${saved.length})`}
            >
              <Icon name="heart" size={20} />
              {saved.length > 0 && <span>{saved.length}</span>}
            </button>
            <button
              className="primary-button nav-plan"
              onClick={() => setPlannerOpen(true)}
            >
              Plan your journey <Icon name="arrow-up-right" size={17} />
            </button>
            <button
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navItems.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                {label}
                <Icon name="arrow-up-right" size={19} />
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setPlannerOpen(true);
              }}
            >
              Plan your journey <Icon name="route" size={19} />
            </button>
          </nav>
        )}
      </header>
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-photo">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet={imageUrl("river-valley-mobile")}
              />
              <img
                src={imageUrl("river-valley-hero")}
                alt="Turquoise river and a suspension bridge below autumn trees in Ghizer Valley"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span />
              GILGIT-BALTISTAN, PAKISTAN
            </span>
            <h1 id="hero-title">
              Beyond the peaks.
              <br />
              <em>Into the stories.</em>
            </h1>
            <p>
              Come for the mountains. Stay for the stories,
              <br className="desktop-break" /> the shared tables, and the life
              in between.
            </p>
            <a className="cream-button" href="#places">
              Find your kind of wonder <Icon name="arrow-up-right" size={19} />
            </a>
          </div>
          <div className="hero-bottom">
            <a href="#introduction">
              <span className="scroll-circle">
                <Icon name="arrow-right" size={17} />
              </span>
              Take the slower road
            </a>
            <span className="hero-location">
              <Icon name="pin" size={15} />
              Ghizer Valley, Gilgit-Baltistan
            </span>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="stamp-circle"
                  d="M60,60m-44,0a44,44 0 1,1 88,0a44,44 0 1,1 -88,0"
                />
              </defs>
              <text>
                <textPath href="#stamp-circle">
                  GO SLOW · LOOK CLOSER · GO SLOW · LOOK CLOSER ·{" "}
                </textPath>
              </text>
            </svg>
            <Icon name="compass" size={43} />
          </div>
        </section>
        <div className="discovery-strip wrap">
          <span className="strip-intro">
            A place. Many ways
            <br />
            <strong>to feel a little more.</strong>
          </span>
          <button onClick={() => chooseCategory("heritage")}>
            <Icon name="fort" size={30} />
            <span>
              Living history<small>Forts, stories & old streets</small>
            </span>
            <Icon className="strip-arrow" name="arrow-up-right" size={17} />
          </button>
          <button onClick={() => chooseCategory("valleys")}>
            <Icon name="lake" size={31} />
            <span>
              Nature, unhurried<small>Lakes, valleys & quiet paths</small>
            </span>
            <Icon className="strip-arrow" name="arrow-up-right" size={17} />
          </button>
          <a href="#culture">
            <Icon name="teapot" size={31} />
            <span>
              Culture, up close<small>People, food & everyday life</small>
            </span>
            <Icon className="strip-arrow" name="arrow-up-right" size={17} />
          </a>
        </div>
        <section id="introduction" className="introduction wrap section-space">
          <div>
            <span className="eyebrow">
              <span className="tiny-rule" />A different kind of north
            </span>
            <h2>
              The mountains draw you in.
              <br />
              <em>The people make you stay.</em>
            </h2>
          </div>
          <div className="intro-text">
            <p>
              A carved doorway. An orchard at harvest. A melody carried into the
              next generation. Here, the landscape and the lives within it
              belong to the same story.
            </p>
            <p>
              From the valleys of Hunza to the courtyards of Baltistan, travel
              slowly enough to notice both.
            </p>
            <a className="text-link" href="#culture">
              Meet the life between the peaks{" "}
              <Icon name="arrow-up-right" size={17} />
            </a>
          </div>
        </section>
        <section id="places" className="places-section wrap section-space">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Places with a story</span>
              <h2>
                Find a place that <em>stays with you.</em>
              </h2>
            </div>
            <button
              className="text-link"
              onClick={() => {
                setCategory("all");
                setQuery("");
                setShowAll(!showAll);
              }}
            >
              {showAll ? "Show the highlights" : "Explore all places"}
              <Icon name="arrow-right" size={19} />
            </button>
          </div>
          <div className="places-toolbar">
            <div className="category-tabs" aria-label="Filter places">
              {categories.map((item) => (
                <button
                  key={item.id}
                  className={category === item.id ? "active" : ""}
                  aria-pressed={category === item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setShowAll(true);
                  }}
                >
                  <Icon name={item.icon} size={17} />
                  {item.label}
                </button>
              ))}
            </div>
            <label className="inline-search">
              <Icon name="search" size={17} />
              <span className="sr-only">Filter destinations</span>
              <input
                type="search"
                placeholder="Find your place"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <div className="place-grid" aria-live="polite">
            {visible.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                saved={saved.includes(place.id)}
                toggleSave={toggleSave}
                onOpen={setSelectedPlace}
              />
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <Icon name="compass" size={38} />
              <h3>No places along this trail.</h3>
              <p>Try another name or explore every destination.</p>
              <button
                className="text-link"
                onClick={() => {
                  setCategory("all");
                  setQuery("");
                  setShowAll(true);
                }}
              >
                Show all places <Icon name="arrow-right" size={17} />
              </button>
            </div>
          )}
          <p className="storage-note" role="status">
            {storageMessage}
          </p>
        </section>
        <section id="culture" className="culture-section">
          <div className="wrap culture-layout">
            <div className="culture-visual">
              <Photo
                name="spring-blossom"
                alt="Pink spring blossoms beside the Karakoram Highway in Hunza"
              />
              <div className="culture-photo-caption">
                <Icon name="leaf" size={24} />
                <span>
                  Life grows here.
                  <small>
                    In orchards, in workshops, in shared traditions.
                  </small>
                </span>
              </div>
              <div className="culture-number" aria-hidden="true">
                Life, at
                <br />
                <em>its own pace.</em>
              </div>
            </div>
            <div className="culture-content">
              <span className="eyebrow">The heart of the journey</span>
              <h2>
                A culture you don’t just see.
                <br />
                <em>You sit down with.</em>
              </h2>
              <p className="culture-deck">
                Many valleys. Many languages. A thousand small ways to feel
                welcome. Get to know the life beyond the landscape.
              </p>
              <div
                className="culture-tabs"
                aria-label="Explore cultural stories"
              >
                {cultureStories.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={cultureId === item.id}
                    className={cultureId === item.id ? "active" : ""}
                    onClick={() => setCultureId(item.id)}
                  >
                    <Icon name={item.icon} size={22} />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
              <article className="culture-story" key={culture.id}>
                <span className="culture-story-label">{culture.subtitle}</span>
                <p>{culture.text}</p>
                <button
                  className="light-link"
                  onClick={() => setArticle(culture)}
                >
                  A closer look <Icon name="arrow-up-right" size={17} />
                </button>
              </article>
            </div>
          </div>
        </section>
        <section id="seasons" className="seasons-section wrap section-space">
          <div className="season-intro">
            <span className="eyebrow">Every season, a new story</span>
            <h2>
              Choose your
              <br />
              <em>kind of beautiful.</em>
            </h2>
            <p>
              Blossom or golden leaves? Long summer days or winter quiet? Let
              the season shape your journey.
            </p>
            <button className="text-link" onClick={() => setPlannerOpen(true)}>
              Make a little plan <Icon name="arrow-up-right" size={18} />
            </button>
          </div>
          <div className="season-explorer">
            <div className="season-tabs" aria-label="Explore seasons">
              {seasons.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={seasonId === item.id}
                  className={seasonId === item.id ? "active" : ""}
                  onClick={() => setSeasonId(item.id)}
                >
                  <Icon name={item.icon} size={24} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <div className="season-story" key={season.id}>
              <span className="eyebrow">{season.months}</span>
              <h3>{season.heading}</h3>
              <p>{season.text}</p>
              <div className="season-tip">
                <Icon name="compass" size={24} />
                <p>{season.tip}</p>
              </div>
            </div>
            <p className="small-note">
              Seasons are a guide, not an access guarantee. Confirm roads,
              weather and local guidance before travel.
            </p>
          </div>
        </section>
        <section id="journal" className="journal-section wrap section-space">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Notes from the north</span>
              <h2>
                A little reading.
                <br />
                <em>A different perspective.</em>
              </h2>
            </div>
            <p>
              For the curious, the unhurried,
              <br />
              and the ones who look a little closer.
            </p>
          </div>
          <div className="journal-grid">
            <button
              className="journal-feature"
              onClick={() => setArticle("heritage")}
            >
              <Photo
                name="baltit-fort"
                alt="Baltit Fort’s historic stone and timber architecture in Hunza"
              />
              <div>
                <span className="eyebrow">Living heritage · 3 min read</span>
                <h3>
                  Old walls.
                  <br />
                  <em>Stories still being written.</em>
                </h3>
                <span className="journal-read">
                  Read the story <Icon name="arrow-up-right" size={20} />
                </span>
              </div>
            </button>
            <button
              className="journal-side"
              onClick={() => setArticle("guest")}
            >
              <Photo
                name="khaplu-autumn"
                alt="Carved wooden arches at Khaplu Palace frame autumn trees and mountains"
              />
              <div>
                <span className="eyebrow">
                  Travel thoughtfully · 2 min read
                </span>
                <h3>
                  How to be
                  <br />
                  <em>a good guest.</em>
                </h3>
                <p>Small choices that make a journey more generous.</p>
                <span className="text-link">
                  Take a closer look <Icon name="arrow-up-right" size={19} />
                </span>
              </div>
            </button>
          </div>
        </section>
        <section className="journey-cta wrap">
          <div className="cta-icon">
            <Icon name="route" size={42} />
          </div>
          <div>
            <span className="eyebrow">Your story starts with a small step</span>
            <h2>
              Take the road <em>that means more.</em>
            </h2>
            <p>
              A few places, a little curiosity, and room for the unexpected.
            </p>
          </div>
          <button
            className="primary-button"
            onClick={() => setPlannerOpen(true)}
          >
            Plan your journey <Icon name="arrow-up-right" size={19} />
          </button>
        </section>
      </main>
      <footer className="site-footer wrap">
        <div className="footer-top">
          <a className="brand" href={import.meta.env.BASE_URL}>
            <MountainMark />
            <span>
              gilgit<span className="brand-dash">—</span>baltistan
              <small>A little closer to life.</small>
            </span>
          </a>
          <p>
            A thoughtful field guide to the places,
            <br />
            people and everyday wonders of the north.
          </p>
          <a
            className="text-link"
            href="https://e-tourism.visitgilgitbaltistan.gov.pk/"
            target="_blank"
            rel="noreferrer"
          >
            Official tourism information <Icon name="external" size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Gilgit-Baltistan travel journal
          </span>
          <span>Travel slowly. Ask kindly. Leave lightly.</span>
          <div>
            <button onClick={() => setArticle("sources")}>Our sources</button>
            <button onClick={openCredits}>Photo credits</button>
            <button onClick={() => setArticle("privacy")}>Privacy</button>
          </div>
        </div>
      </footer>
      {plannerOpen && <TripPlanner onClose={() => setPlannerOpen(false)} />}
      {searchOpen && (
        <JournalDialog
          title="Where does your curiosity lead?"
          onClose={() => setSearchOpen(false)}
        >
          <label className="dialog-search">
            <Icon name="search" size={21} />
            <span className="sr-only">Search by place or interest</span>
            <input
              autoFocus
              type="search"
              value={query}
              placeholder="Try Hunza, forts, lakes…"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="search-results">
            {places
              .filter((place) => matchesPlace(place, query))
              .map((place) => (
                <button
                  key={place.id}
                  onClick={() => {
                    setSearchOpen(false);
                    setSelectedPlace(place);
                  }}
                >
                  <Icon name={place.icon} size={24} />
                  <span>
                    {place.name}
                    <small>{place.label}</small>
                  </span>
                  <Icon name="arrow-up-right" size={19} />
                </button>
              ))}
          </div>
          {!places.some((place) => matchesPlace(place, query)) && (
            <p className="empty-state">
              No matching places. Try “Hunza”, “lake” or “heritage”.
            </p>
          )}
        </JournalDialog>
      )}
      {savedOpen && (
        <JournalDialog
          title="Places for your next chapter."
          onClose={() => setSavedOpen(false)}
        >
          <p className="dialog-intro">Your collection, saved on this device.</p>
          {saved.length ? (
            <div className="saved-list">
              {places
                .filter((place) => saved.includes(place.id))
                .map((place) => (
                  <div key={place.id}>
                    <Photo name={place.image} alt={place.alt} />
                    <button
                      onClick={() => {
                        setSavedOpen(false);
                        setSelectedPlace(place);
                      }}
                    >
                      {place.name}
                      <small>{place.region}</small>
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Remove ${place.name} from saved places`}
                      onClick={() => toggleSave(place.id)}
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="heart" size={35} />
              <h3>A little room for wonder.</h3>
              <p>Tap the heart on a place to keep it here for later.</p>
              <button
                className="text-link"
                onClick={() => {
                  setSavedOpen(false);
                  chooseCategory("all");
                }}
              >
                Explore the places <Icon name="arrow-right" size={17} />
              </button>
            </div>
          )}
        </JournalDialog>
      )}
      {selectedPlace && (
        <JournalDialog
          title={selectedPlace.name}
          onClose={() => setSelectedPlace(null)}
          wide
        >
          <Photo
            className="detail-image"
            name={selectedPlace.image}
            alt={selectedPlace.alt}
          />
          <div className="detail-label">
            <Icon name={selectedPlace.icon} size={22} />
            {selectedPlace.label}
          </div>
          <h3 className="story-title">{selectedPlace.heading}</h3>
          {selectedPlace.paragraphs.map((paragraph) => (
            <p className="story-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="highlights">
            {selectedPlace.highlights.map((highlight) => (
              <span key={highlight}>
                <Icon name="pin" size={15} />
                {highlight}
              </span>
            ))}
          </div>
          <p className="planner-notice">
            <Icon name="calendar" size={20} />
            {selectedPlace.season}
          </p>
          <div className="dialog-actions">
            <button
              className="primary-button"
              onClick={() => toggleSave(selectedPlace.id)}
            >
              <Icon
                name={saved.includes(selectedPlace.id) ? "check" : "heart"}
                size={18}
              />
              {saved.includes(selectedPlace.id)
                ? "Saved to my places"
                : "Save this place"}
            </button>
            <a
              className="text-link"
              href={selectedPlace.source}
              target="_blank"
              rel="noreferrer"
            >
              Read the source <Icon name="external" size={16} />
            </a>
          </div>
          <button
            className="photo-credit-link"
            onClick={() => {
              setSelectedPlace(null);
              openCredits();
            }}
          >
            Photography & credits
          </button>
        </JournalDialog>
      )}
      {article && (
        <JournalDialog
          title={
            typeof article === "object"
              ? article.subtitle
              : {
                  heritage: "Old walls. Stories still being written.",
                  guest: "How to be a good guest.",
                  sources: "Curiosity, with good sources.",
                  credits: "The people behind the pictures.",
                  privacy: "A little privacy, by design.",
                }[article]
          }
          onClose={() => setArticle(null)}
          wide
        >
          {typeof article === "object" && (
            <>
              <div className="article-icon">
                <Icon name={article.icon} size={40} />
              </div>
              <p className="story-paragraph">{article.text}</p>
              <p className="story-paragraph">{article.detail}</p>
              <a
                className="text-link"
                href={article.source}
                target="_blank"
                rel="noreferrer"
              >
                Read the source <Icon name="external" size={16} />
              </a>
            </>
          )}
          {article === "heritage" && (
            <>
              <Photo
                className="detail-image"
                name="baltit-fort"
                alt="Baltit Fort in Hunza"
              />
              <p className="story-paragraph">
                A fort is more than a view from the top. In Hunza and Baltistan,
                stone walls and worked timber hold histories of rule, exchange
                and skilled building. What happens after restoration matters
                just as much.
              </p>
              <p className="story-paragraph">
                Baltit’s museum and cultural role, Shigar’s renewed use and
                Khaplu’s conserved palace show different ways to keep
                architecture part of contemporary life. These places reward a
                guide who can explain what you are looking at, beyond the
                photograph.
              </p>
              <p className="story-paragraph">
                In Hunza, CIQAM’s women work in skilled trades including
                carpentry and restoration. Heritage is also the work of the
                present: training, livelihoods and decisions about what to carry
                forward.
              </p>
              <a
                className="text-link"
                href="https://ciqam.com.pk/about-2/"
                target="_blank"
                rel="noreferrer"
              >
                Meet CIQAM <Icon name="external" size={17} />
              </a>
              <p className="small-note">
                Sources: GB Tourism’s Baltit and Shigar profiles; CIQAM.
                Editorial feature, researched October 2026.
              </p>
            </>
          )}
          {article === "guest" && (
            <>
              <p className="dialog-intro">
                The landscape is someone’s home, workplace and everyday route. A
                few small choices can make your visit better for everyone.
              </p>
              <div className="guest-list">
                {[
                  [
                    "Ask before you photograph",
                    "People, homes and places of worship deserve consent and local guidance. A camera is an invitation to ask, not permission to enter.",
                  ],
                  [
                    "Buy closer to the source",
                    "Choose local guides, growers and makers where possible. Ask about a piece of craft and the person who made it.",
                  ],
                  [
                    "Give working land its space",
                    "Keep to public paths. Ask before stepping into a field or orchard, even when it looks like the perfect photograph.",
                  ],
                  [
                    "Leave wildlife wild",
                    "Watch from a distance, never feed animals and take all your rubbish back. Follow park rules and your guide’s advice.",
                  ],
                  [
                    "Let the mountains set the pace",
                    "Build in buffer days and confirm conditions locally. A flexible itinerary is a more considerate one.",
                  ],
                ].map(([title, text], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {article === "sources" && (
            <>
              <p className="dialog-intro">
                This journal uses original writing informed by primary sources.
                Seasonal guidance is broad, and should be checked locally.
                Research reviewed 25 October 2026.
              </p>
              <div className="source-list">
                {places.map((place) => (
                  <a
                    href={place.source}
                    key={place.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name={place.icon} size={22} />
                    <span>
                      {place.name}
                      <small>
                        {place.id === "deosai"
                          ? "UNESCO Tentative Lists"
                          : "Government of Gilgit-Baltistan Tourism"}
                      </small>
                    </span>
                    <Icon name="external" size={17} />
                  </a>
                ))}
                <a
                  href="https://ciqam.com.pk/about-2/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="craft" size={22} />
                  <span>
                    CIQAM<small>Women’s enterprise, craft & restoration</small>
                  </span>
                  <Icon name="external" size={17} />
                </a>
                <a
                  href={
                    cultureStories.find((item) => item.id === "music").source
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="music" size={22} />
                  <span>
                    Aga Khan Music Programme
                    <small>Music education in Altit</small>
                  </span>
                  <Icon name="external" size={17} />
                </a>
              </div>
              <p className="small-note">
                Custom SVGs are illustrative interpretations, not architectural
                surveys. Deosai is on UNESCO’s Tentative List, not the World
                Heritage List.
              </p>
            </>
          )}
          {article === "credits" && <Credits credits={credits} />}
          {article === "privacy" && (
            <>
              <p className="story-paragraph">
                Saved places are stored in this browser on your device. You can
                remove them using the hearts or the saved-places collection. If
                browser storage is unavailable, your collection lasts for the
                current visit.
              </p>
              <p className="story-paragraph">
                The trip planner runs in your browser. It does not ask for
                personal information or send your choices to a booking service.
                Downloads are created on your device.
              </p>
              <p className="story-paragraph">
                Google Fonts provides the typefaces and may receive your IP
                address when they load. Source links open external websites with
                their own privacy policies. This journal does not add analytics
                or advertising trackers.
              </p>
            </>
          )}
        </JournalDialog>
      )}
    </div>
  );
}

function Credits({ credits }) {
  if (!credits)
    return (
      <div className="credits-loading" role="status">
        <span />
        <span />
        <span />
        <p>Loading photography credits…</p>
      </div>
    );
  if (credits.error)
    return (
      <p role="alert">
        Credits could not be loaded.{" "}
        <a
          className="text-link"
          href={`${import.meta.env.BASE_URL}images/credits.json`}
        >
          Open the credits file <Icon name="external" size={17} />
        </a>
      </p>
    );
  const items = Array.isArray(credits)
    ? credits
    : credits.images ||
      credits.assets ||
      Object.values(credits).filter(
        (item) =>
          typeof item === "object" && item !== null && !Array.isArray(item),
      );
  return (
    <>
      <p className="dialog-intro">
        Photography brings the valleys closer. Credits, original sources and
        licensing details are preserved below.
      </p>
      <div className="credits-list">
        {items.map((item, index) => (
          <article key={item.file || item.filename || index}>
            <h3>
              {item.title ||
                item.alt ||
                item.file ||
                item.filename ||
                "Gilgit-Baltistan photograph"}
            </h3>
            <p>
              {item.author ||
                item.creator ||
                item.credit ||
                "Photograph from the original repository"}
            </p>
            <p>
              {typeof item.license === "string"
                ? item.license
                : item.license?.name}
              {item.note || item.notes ? ` · ${item.note || item.notes}` : ""}
            </p>
            {(item.source || item.sourceUrl || item.source_url) && (
              <a
                className="text-link"
                href={item.source || item.sourceUrl || item.source_url}
                target="_blank"
                rel="noreferrer"
              >
                Original source <Icon name="external" size={15} />
              </a>
            )}
            {(item.licenseUrl || item.license_url) && (
              <a
                className="text-link"
                href={item.licenseUrl || item.license_url}
                target="_blank"
                rel="noreferrer"
              >
                License <Icon name="external" size={15} />
              </a>
            )}
          </article>
        ))}
      </div>
      <a
        className="text-link"
        href={`${import.meta.env.BASE_URL}images/credits.json`}
        target="_blank"
        rel="noreferrer"
      >
        Full attribution file <Icon name="external" size={16} />
      </a>
    </>
  );
}
