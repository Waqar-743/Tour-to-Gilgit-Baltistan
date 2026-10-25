export const imageUrl = (name) =>
  `${import.meta.env.BASE_URL}images/${name}.webp`;

// Original editorial copy, grounded in the primary sources linked on each entry.
export const places = [
  {
    id: "hunza",
    name: "Hunza",
    region: "Hunza Valley",
    category: "heritage",
    icon: "fort",
    image: "baltit-fort",
    alt: "Baltit Fort above the mountain village of Karimabad in Hunza",
    label: "Fort paths & orchard villages",
    summary:
      "Follow village lanes to Baltit and Altit, where timber, stone and living traditions tell the valley’s story.",
    heading: "A valley with a story at every turn.",
    paragraphs: [
      "Above Karimabad, Baltit Fort brings more than seven centuries of Hunza’s history into view. Its rooms and balconies now welcome visitors as a museum and cultural centre. Nearby, Altit’s cliffside walls offer another perspective on the valley’s royal past.",
      "Leave time for the places between the landmarks: village paths, shops and orchard edges. Community involvement has been central to the conservation of these settlements. A local guide can help connect the architecture with the lives around it.",
    ],
    highlights: [
      "Baltit Fort & Karimabad",
      "Altit Fort & village paths",
      "Local makers & orchard landscapes",
    ],
    season:
      "April–October for many valley visits; blossom and autumn timing vary.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/baltit-fort",
  },
  {
    id: "skardu",
    name: "Skardu",
    region: "Baltistan",
    category: "valleys",
    icon: "lake",
    image: "skardu-valley",
    alt: "Skardu valley with mountain slopes and the broad Indus river basin",
    label: "River, town & mountain routes",
    summary:
      "Look beyond the famous lakes to a town of Balti stories, an Indus-side fortress and routes into the wider valley.",
    heading: "Begin with the river. Stay for the stories.",
    paragraphs: [
      "Skardu brings the scale of Baltistan into focus: the Indus, a broad mountain basin and a town that connects journeys across the region. Kharpocho Fort looks out over the city and river, while the bazaar returns the view to everyday life.",
      "Use Skardu as a place to settle into the region, with time for its heritage, food and nearby lakes. Shigar and Khaplu extend the story into neighbouring valleys. Build space into a visit so the town becomes more than a stop on the way elsewhere.",
    ],
    highlights: [
      "Kharpocho Fort",
      "Balti food & town walks",
      "Kachura & Satpara landscapes",
    ],
    season:
      "Late spring–early autumn is a common window; confirm local conditions.",
    source: "https://e-tourism.visitgilgitbaltistan.gov.pk/districts/skardu",
  },
  {
    id: "shigar",
    name: "Shigar",
    region: "Shigar Valley · Baltistan",
    category: "heritage",
    icon: "fort",
    image: "shigar-fort",
    alt: "The stone and timber facade of historic Shigar Fort in Baltistan",
    label: "A palace built into the rock",
    summary:
      "Step into Fong Khar, where Balti building traditions connect a restored palace with the village around it.",
    heading: "Read a valley in stone and timber.",
    paragraphs: [
      "Shigar Fort is known as Fong Khar, the Palace on the Rock. The seventeenth-century residence stands beside fields and traditional village buildings, its earth, stone and timber offering a close view of Balti architecture.",
      "Careful restoration gave the palace a new life as a heritage hotel with museum spaces. Look closely at the carved details, then explore the surrounding village respectfully. The interest lies as much in the workmanship as in the monument itself.",
    ],
    highlights: [
      "Shigar Fort / Fong Khar",
      "Traditional Balti architecture",
      "Village lanes & local craftsmanship",
    ],
    season:
      "May–October is a broad planning window; weather can change quickly.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/shigar-fort",
  },
  {
    id: "khaplu",
    name: "Khaplu",
    region: "Ghanche · Baltistan",
    category: "heritage",
    icon: "village",
    image: "khaplu-palace",
    alt: "The white facade and carved timber balconies of Khaplu Palace viewed from its garden",
    label: "Courtyards & living Balti heritage",
    summary:
      "Follow the Shyok toward wooden architecture, palace courtyards and the everyday rhythms of a Balti town.",
    heading: "A place to linger between the landmarks.",
    paragraphs: [
      "Along the Shyok River, Khaplu holds a rich architectural story. The palace and Chaqchan Mosque are landmarks of a town where timber houses, fields and mountain slopes share the view. Local guidance adds context to these places of history and worship.",
      "Leave room for the table as well as the tour. Ask about Balti dishes such as mamtu and prapu, or sit down for butter tea. The most thoughtful visit gives both the monuments and the people around them time and attention.",
    ],
    highlights: [
      "Khaplu Palace",
      "Chaqchan Mosque",
      "Balti food & valley life",
    ],
    season: "Spring–autumn for valley travel; exact conditions vary by route.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/khaplu-valley",
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer · Nanga Parbat",
    category: "trails",
    icon: "mountain",
    image: "fairy-meadows",
    alt: "Meadows and forest below the snow-covered north face of Nanga Parbat",
    label: "Known locally as Joot",
    summary:
      "Walk into an alpine meadow beneath Nanga Parbat, with local knowledge guiding the way.",
    heading: "Let the mountain set the pace.",
    paragraphs: [
      "Known locally as Joot, Fairy Meadows opens toward Nanga Parbat’s north face in the Raikot valley. Forest, grassland and glacier views bring the immense Himalayan landscape close without making it feel any smaller.",
      "The approach requires a locally operated journey on a steep mountain track followed by a hike. Plan with an experienced local operator, allow for changing conditions and choose walks that match your ability. This is a place to arrive prepared and move thoughtfully.",
    ],
    highlights: [
      "Nanga Parbat north-face views",
      "Meadow & forest walks",
      "Locally guided mountain travel",
    ],
    season:
      "May–September is a broad window; confirm track, trail and weather access.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/fairymeadows",
  },
  {
    id: "phander",
    name: "Phander",
    region: "Ghizer region",
    category: "valleys",
    icon: "lake",
    image: "phander-valley",
    alt: "Phander’s river and lake landscape bordered by farmland and mountain slopes",
    label: "River bends & a slower rhythm",
    summary:
      "Lake reflections, broad river bends and cultivated fields invite a quieter kind of mountain journey.",
    heading: "Stay a little longer by the water.",
    paragraphs: [
      "In Phander, water shapes the valley’s character. The lake and winding Ghizer River sit among meadows, villages and fertile fields along the route toward Shandur. The landscape rewards an unhurried visit.",
      "Take a walk on public paths, buy locally and leave working fields and orchards to their owners unless invited. A visit here can be simple: time beside the lake, a conversation with a host and an appreciation of the work behind the green valley floor.",
    ],
    highlights: [
      "Phander Lake",
      "Ghizer River landscapes",
      "Village paths & cultivated fields",
    ],
    season: "Spring–autumn for many visits; Shandur access is seasonal.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/phander",
  },
  {
    id: "deosai",
    name: "Deosai",
    region: "Skardu–Astore plateau",
    category: "trails",
    icon: "leaf",
    image: "deosai-plains",
    alt: "Open alpine grassland and rolling hills across the Deosai plateau",
    label: "Wide skies & a fragile wild",
    summary:
      "Enter an alpine plateau of summer flowers, rolling grassland and protected Himalayan brown bear habitat.",
    heading: "A different kind of mountain horizon.",
    paragraphs: [
      "Beyond the narrow valleys, Deosai opens into a high alpine plateau of rolling plains and mountain horizons. Its national park was established in 1993 with the conservation of Himalayan brown bears as a central purpose.",
      "Summer brings a short season of flowers and activity to this demanding environment. Travel on authorised routes, keep your distance from wildlife and leave flowers where they grow. The park’s value reaches far beyond the view from a photograph.",
    ],
    highlights: [
      "High alpine grasslands",
      "Sheosar Lake landscape",
      "Wildlife conservation",
    ],
    season:
      "June–September is a broad planning window; confirm park and road access.",
    source: "https://whc.unesco.org/en/tentativelists/6115",
  },
];

export const cultureStories = [
  {
    id: "table",
    icon: "bowl",
    title: "A place at the table",
    subtitle: "Food & shared moments",
    text: "Ask what’s cooking in the valley you’re visiting. Every meal is a chance to listen.",
    detail:
      "In Baltistan, look for mamtu, prapu and butter tea. Dishes and preparations vary, so let a local cook introduce their version and the ingredients behind it.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/khaplu-valley",
  },
  {
    id: "craft",
    icon: "craft",
    title: "Heritage in the making",
    subtitle: "Craft & new livelihoods",
    text: "A carved window holds more than a pattern. It holds skill, practice and a future.",
    detail:
      "At CIQAM, a women’s social enterprise in Hunza, skilled work includes carpentry, surveys and heritage restoration. Look for the people carrying building traditions into contemporary life.",
    source: "https://ciqam.com.pk/about-2/",
  },
  {
    id: "music",
    icon: "music",
    title: "The sound of a valley",
    subtitle: "Music & living traditions",
    text: "Across valleys with many languages and musical traditions, a new generation is finding its voice.",
    detail:
      "Altit’s Leif Larsen Music Centre teaches young people instruments including rubab, xighini and dadang. Its work treats music as both a living cultural resource and a possible livelihood.",
    source:
      "https://images.the.akdn/how-we-work/our-agencies/aga-khan-trust-culture/aga-khan-music-programme/music-curriculum-development-centres-and-schools",
  },
  {
    id: "life",
    icon: "village",
    title: "Life follows the land",
    subtitle: "Orchards & everyday life",
    text: "Behind a beautiful valley is the everyday work of growing, building and caring.",
    detail:
      "Fields and orchards are livelihoods as well as landscapes. Stay on public paths, buy from local growers and ask before entering private land or photographing someone.",
    source:
      "https://e-tourism.visitgilgitbaltistan.gov.pk/tourist-destinations/phander",
  },
];

export const seasons = [
  {
    id: "spring",
    name: "Spring",
    months: "April–May",
    icon: "leaf",
    heading: "The valleys begin again.",
    text: "Blossom and new growth bring colour to many inhabited valleys. Orchard paths and heritage visits make a gentle focus.",
    tip: "Blossom dates change with altitude and weather. Confirm timing with a local host.",
  },
  {
    id: "summer",
    name: "Summer",
    months: "June–August",
    icon: "sun",
    heading: "Follow the season upward.",
    text: "Longer days open possibilities for higher meadows and seasonal routes, alongside the busy life of the valleys below.",
    tip: "Check each road and trail locally. Pack warm layers even in summer.",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "September–October",
    icon: "leaf",
    heading: "A slower, golden chapter.",
    text: "Harvest landscapes and changing foliage draw attention back to villages, orchards and the detail of everyday life.",
    tip: "Higher routes can close earlier than valley roads. Keep plans flexible.",
  },
  {
    id: "winter",
    name: "Winter",
    months: "November–March",
    icon: "snow",
    heading: "A season for careful planning.",
    text: "Snow and deep cold reshape travel across the region. Some valley experiences remain possible with informed local planning.",
    tip: "Confirm access, heating and services before travelling; allow extra time.",
  },
];

// Flexible editorial drafts, not bookable products or promised travel schedules.
export const journeys = {
  hunza: {
    title: "Hunza, one story at a time",
    days: [
      [
        "Arrive & settle in",
        "Make room for your journey to Gilgit or Hunza, rest and confirm the week’s local conditions.",
      ],
      [
        "Karimabad & Baltit",
        "Explore Baltit Fort with a local guide, then spend time in Karimabad’s lanes and shops.",
      ],
      [
        "Altit at a slower pace",
        "Visit Altit Fort and its surroundings; ask locally about available craft or music experiences.",
      ],
      [
        "An orchard-side day",
        "Choose a public village walk and a locally prepared meal. Visit farms only with permission.",
      ],
      [
        "Follow the upper valley",
        "If conditions allow, plan an excursion toward Gojal with a local driver and unhurried stops.",
      ],
      [
        "Leave a little space",
        "Return to a favourite place, meet a maker or keep this day free for weather and rest.",
      ],
      [
        "A flexible return",
        "Begin your onward journey with a buffer for mountain roads and weather-dependent travel.",
      ],
    ],
  },
  baltistan: {
    title: "Through Balti stories",
    days: [
      [
        "Arrive in Skardu",
        "Settle in, rest and discuss the latest conditions with your host before finalising the route.",
      ],
      [
        "The town & the Indus",
        "Explore Skardu’s bazaar and consider Kharpocho with a local guide if the walk suits you.",
      ],
      [
        "Shigar’s living heritage",
        "Give Shigar Fort and nearby village lanes a full, unhurried day.",
      ],
      [
        "Along the Shyok",
        "Travel toward Khaplu when conditions allow, with space to pause and settle into the valley.",
      ],
      [
        "Courtyards & the table",
        "Explore Khaplu’s heritage respectfully and ask a local cook about Balti dishes.",
      ],
      [
        "A flexible valley day",
        "Stay longer in Khaplu or return toward Skardu with a local driver. Give onward travel room rather than adding a distant stop.",
      ],
      [
        "Return with room to spare",
        "Keep the final day flexible for your return to Skardu and onward travel arrangements.",
      ],
    ],
  },
  ghizer: {
    title: "Ghizer, by the water",
    days: [
      [
        "Begin in Gilgit",
        "Rest after arrival, meet your host or driver and shape the route around current conditions.",
      ],
      [
        "Into the Ghizer valleys",
        "Head toward Gahkuch at a comfortable pace, with stops agreed with your local driver.",
      ],
      [
        "Gupis & the river",
        "Spend time around Gupis and its river landscapes, using local advice to choose walks.",
      ],
      [
        "Arrive in Phander",
        "Continue to Phander when roads allow and leave the afternoon open for the lake and rest.",
      ],
      [
        "A day without rushing",
        "Walk public village paths, buy locally and enjoy time by the water without a busy checklist.",
      ],
      [
        "Follow local advice",
        "Choose a nearby outing or another quiet day. Any Shandur extension depends on seasonal access.",
      ],
      [
        "Return along the valley",
        "Allow a flexible return toward Gilgit, with room for road changes and onward connections.",
      ],
    ],
  },
};
