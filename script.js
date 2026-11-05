(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const PAGE_SIZE = 9;
  const PHONE_DISPLAY = "+998 90 200 77 00";
  const KEYS = {
    favorites: "samauto_favorites_v1",
    user: "samauto_user_v1",
    session: "samauto_session_v1",
    listings: "samauto_listings_v1",
    requests: "samauto_requests_v1",
    messages: "samauto_messages_v1",
    subscribers: "samauto_subscribers_v1",
  };

  const BRANDS = ["BMW", "Mercedes-Benz", "BYD", "Chevrolet", "Audi", "Kia", "Hyundai"];
  const BRAND_MARKS = {
    BMW: "BMW",
    "Mercedes-Benz": "MB",
    BYD: "BYD",
    Chevrolet: "CV",
    Audi: "A",
    Kia: "KIA",
    Hyundai: "HY",
  };
  const BRAND_FALLBACK = {
    BMW: "public/cars/bmw-x5.jpg",
    "Mercedes-Benz": "public/cars/mercedes-gle.jpg",
    BYD: "public/cars/byd-seal.jpg",
    Chevrolet: "public/cars/camaro.jpg",
    Audi: "public/cars/q8.jpg",
    Kia: "public/cars/ev6.jpg",
    Hyundai: "public/cars/ioniq5.jpg",
  };
  const DEFAULT_FILTERS = {
    brand: "all",
    body: "all",
    year: "all",
    transmission: "all",
    fuel: "all",
    price: "all",
  };

  const CARS = [
    {
      id: "corvette-c8",
      brand: "Chevrolet",
      model: "Corvette C8 Stingray",
      year: 2021,
      price: 1250000000,
      oldPrice: null,
      mileage: 12000,
      body: "Kupe",
      fuel: "Benzin",
      transmission: "Avtomat",
      drive: "Orqa",
      engine: "V8 6.2L",
      power: "495 o.k.",
      color: "Qizil",
      location: "Toshkent · Yunusobod",
      image: "public/cars/corvette.jpg",
      badge: "premium",
      views: 1840,
      description:
        "Hafta tanlovi. Corvette C8 Stingray to‘liq texnik diagnostikadan o‘tgan, yuridik tarixi toza. Avtomobil original bo‘yoq qoplamasida, salon holati yangidek saqlangan. Barcha xizmatlar SAM AUTO showroom’ida bajarilgan.",
      features: [
        "Kamera 360°",
        "Adaptiv kruiz-kontrol",
        "Bose audio tizimi",
        "Terini qoplama",
        "Isitiladigan o‘rindiqlar",
        "Apple CarPlay",
        "Sport rejim",
        "Panoramik tom",
      ],
    },
    {
      id: "bmw-m4",
      brand: "BMW",
      model: "M4 Competition",
      year: 2022,
      price: 895000000,
      oldPrice: 940000000,
      mileage: 18000,
      body: "Kupe",
      fuel: "Benzin",
      transmission: "Avtomat",
      drive: "Orqa",
      engine: "3.0L TwinPower",
      power: "510 o.k.",
      color: "Yashil",
      location: "Toshkent · Mirzo Ulug‘bek",
      image: "public/cars/bmw-m4.jpg",
      badge: "sale",
      views: 1420,
      description:
        "BMW M4 Competition — kuch va qulaylik uyg‘unlashgan kupe. Avtomobil rasmiy servisda xizmat ko‘rsatilgan, barcha texnik suyuqliklar yangilangan. Karbon-paket va M Sport o‘rindiqlari bilan.",
      features: [
        "M Sport paket",
        "Kamera 360°",
        "Head-Up display",
        "Harman Kardon audio",
        "Karbon interyer",
        "Isitiladigan rul",
        "Adaptiv yorug‘lik",
        "Apple CarPlay",
      ],
    },
    {
      id: "mercedes-gle",
      brand: "Mercedes-Benz",
      model: "GLE 450 4MATIC",
      year: 2022,
      price: 940000000,
      oldPrice: null,
      mileage: 29000,
      body: "SUV",
      fuel: "Gibrid",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "3.0L + EQ Boost",
      power: "381 o.k.",
      color: "Qora",
      location: "Toshkent · Yunusobod",
      image: "public/cars/mercedes-gle.jpg",
      badge: "premium",
      views: 967,
      description:
        "Premium sinf SUV. GLE 450 4MATIC yumshoq gibrid tizimi bilan tejamkor va dinamik. Salon massajli o‘rindiqlar, panoramik lyuk va MBUX multimedia tizimi bilan jihozlangan.",
      features: [
        "MBUX multimedia",
        "Massajli o‘rindiqlar",
        "Panoramik lyuk",
        "Burmester audio",
        "Kamera 360°",
        "Havo osma",
        "Isitiladigan o‘rindiqlar",
        "Elektr bagaj",
      ],
    },
    {
      id: "bmw-x5",
      brand: "BMW",
      model: "X5 xDrive40i",
      year: 2021,
      price: 780000000,
      oldPrice: 820000000,
      mileage: 46000,
      body: "SUV",
      fuel: "Benzin",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "3.0L TwinPower",
      power: "340 o.k.",
      color: "Oq",
      location: "Toshkent · Chilonzor",
      image: "public/cars/bmw-x5.jpg",
      badge: "sale",
      views: 2210,
      description:
        "Oila uchun ideal premium SUV. To‘liq xizmat tarixi, bitta egasi. xDrive tizimi har qanday yo‘lda ishonchli boshqaruvni ta’minlaydi. Avtomobil ko‘rikdan o‘tgan va kafolatga ega.",
      features: [
        "xDrive to‘liq tortish",
        "Panoramik lyuk",
        "Kamera 360°",
        "Harman Kardon audio",
        "Elektr bagaj",
        "Adaptiv kruiz-kontrol",
        "Isitiladigan o‘rindiqlar",
        "Apple CarPlay",
      ],
    },
    {
      id: "byd-seal",
      brand: "BYD",
      model: "Seal AWD",
      year: 2024,
      price: 385000000,
      oldPrice: null,
      mileage: 6000,
      body: "Sedan",
      fuel: "Elektro",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "Elektr motor",
      power: "530 o.k.",
      color: "Ko‘k",
      location: "Toshkent · Yakkasaroy",
      image: "public/cars/byd-seal.jpg",
      badge: "new",
      views: 512,
      description:
        "Yangi avlod elektromobil. BYD Seal AWD 0 dan 100 km/soatgacha 3.8 soniyada tezlashadi. Blade batareyasi xavfsiz va uzoq muddatli. Tezkor quvvatlash qo‘llab-quvvatlanadi.",
      features: [
        "530 o.k. quvvat",
        "Blade batareya",
        "Tezkor quvvatlash",
        "Kamera 360°",
        "Panoramik tom",
        "Adaptiv kruiz-kontrol",
        "Dynaudio audio",
        "Simsiz quvvatlash",
      ],
    },
    {
      id: "audi-etron-gt",
      brand: "Audi",
      model: "e-tron GT quattro",
      year: 2022,
      price: 1180000000,
      oldPrice: 1280000000,
      mileage: 21000,
      body: "Sedan",
      fuel: "Elektro",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "2 elektr motor",
      power: "530 o.k.",
      color: "Kulrang",
      location: "Toshkent · Yunusobod",
      image: "public/cars/etron-gt.jpg",
      badge: "sale",
      views: 1284,
      description:
        "Audi e-tron GT quattro — sport dizayn va elektrik quvvat. 93 kWh batareya, 800V arxitektura va tezkor quvvatlash. Avtomobil to‘liq diagnostikadan o‘tgan, batareya holati 96%.",
      features: [
        "800V tezkor quvvatlash",
        "Matrix LED faralar",
        "Kamera 360°",
        "Bang & Olufsen audio",
        "Havo osma",
        "Panoramik tom",
        "Massajli o‘rindiqlar",
        "Head-Up display",
      ],
    },
    {
      id: "kia-ev6",
      brand: "Kia",
      model: "EV6 GT-Line",
      year: 2023,
      price: 540000000,
      oldPrice: null,
      mileage: 15000,
      body: "Krossover",
      fuel: "Elektro",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "Elektr motor",
      power: "325 o.k.",
      color: "Oq",
      location: "Toshkent · Sergeli",
      image: "public/cars/ev6.jpg",
      badge: "new",
      views: 733,
      description:
        "Zamonaviy elektrokrossover. Kia EV6 GT-Line 800V platformasida qurilgan, 18 daqiqada 10% dan 80% gacha quvvatlanadi. Katta salon va yuqori darajadagi xavfsizlik tizimlari.",
      features: [
        "800V quvvatlash",
        "Kamera 360°",
        "Meridian audio",
        "Isitiladigan o‘rindiqlar",
        "Adaptiv kruiz-kontrol",
        "Elektr bagaj",
        "Panoramik tom",
        "Simsiz quvvatlash",
      ],
    },
    {
      id: "hyundai-ioniq5",
      brand: "Hyundai",
      model: "Ioniq 5 Premium",
      year: 2023,
      price: 465000000,
      oldPrice: 485000000,
      mileage: 19000,
      body: "Krossover",
      fuel: "Elektro",
      transmission: "Avtomat",
      drive: "Orqa",
      engine: "Elektr motor",
      power: "229 o.k.",
      color: "Kumush",
      location: "Toshkent · Olmazor",
      image: "public/cars/ioniq5.jpg",
      badge: "sale",
      views: 880,
      description:
        "Ioniq 5 Premium — futuristik dizayn va amaliy elektromobil. 77.4 kWh batareya, V2L funksiyasi va keng interyer. Avtomobil birinchi egasida, rasmiy servis tarixi bilan.",
      features: [
        "V2L funksiyasi",
        "77.4 kWh batareya",
        "Kamera 360°",
        "Panoramik tom",
        "Isitiladigan o‘rindiqlar",
        "Adaptiv kruiz-kontrol",
        "Simsiz quvvatlash",
        "Elektr bagaj",
      ],
    },
    {
      id: "mercedes-c300",
      brand: "Mercedes-Benz",
      model: "C300 AMG Line",
      year: 2021,
      price: 520000000,
      oldPrice: 550000000,
      mileage: 38000,
      body: "Sedan",
      fuel: "Gibrid",
      transmission: "Avtomat",
      drive: "Orqa",
      engine: "2.0L + EQ Boost",
      power: "258 o.k.",
      color: "Qora",
      location: "Toshkent · Yunusobod",
      image: "public/cars/mercedes-c300.jpg",
      badge: "sale",
      views: 1105,
      description:
        "Mercedes-Benz C300 AMG Line — elegant sedan va sport xarakter. Yumshoq gibrid tizim yoqilg‘i sarfini kamaytiradi. Salon to‘liq teri, AMG uslubidagi detallar va zamonaviy MBUX tizimi.",
      features: [
        "AMG Line paket",
        "MBUX multimedia",
        "Terini qoplama",
        "Kamera 360°",
        "Isitiladigan o‘rindiqlar",
        "Burmester audio",
        "Adaptiv yorug‘lik",
        "Apple CarPlay",
      ],
    },
    {
      id: "chevrolet-camaro",
      brand: "Chevrolet",
      model: "Camaro SS",
      year: 2020,
      price: 610000000,
      oldPrice: 655000000,
      mileage: 34000,
      body: "Kupe",
      fuel: "Benzin",
      transmission: "Mexanika",
      drive: "Orqa",
      engine: "V8 6.2L",
      power: "453 o.k.",
      color: "Sariq",
      location: "Toshkent · Yakkasaroy",
      image: "public/cars/camaro.jpg",
      badge: "sale",
      views: 1543,
      description:
        "Amerika muscle avtomobili. Camaro SS 6.2L V8 dvigateli va 6 pog‘onali mexanika uzatish qutisi bilan. To‘liq texnik ko‘rikdan o‘tgan, dvigatel va transmissiya kafolat ostida.",
      features: [
        "V8 6.2L dvigatel",
        "Brembo tormozlar",
        "Sport egzoz",
        "Bose audio",
        "Isitiladigan o‘rindiqlar",
        "Kamera orqa ko‘rinish",
        "Apple CarPlay",
        "Sport rejim",
      ],
    },
    {
      id: "byd-song-plus",
      brand: "BYD",
      model: "Song Plus Champion",
      year: 2024,
      price: 340000000,
      oldPrice: null,
      mileage: 9000,
      body: "SUV",
      fuel: "Elektro",
      transmission: "Avtomat",
      drive: "Old",
      engine: "Elektr motor",
      power: "204 o.k.",
      color: "Oq",
      location: "Toshkent · Chilonzor",
      image: "public/cars/byd-song.jpg",
      badge: "new",
      views: 448,
      description:
        "Amaliy va tejamkor elektroSUV. BYD Song Plus Champion katta batareyasi bilan shahar va shahar tashqarisida qulay. Salon keng, bagaj hajmi oila uchun yetarli.",
      features: [
        "Katta batareya",
        "Tezkor quvvatlash",
        "Kamera 360°",
        "Panoramik tom",
        "Isitiladigan o‘rindiqlar",
        "Adaptiv kruiz-kontrol",
        "Elektr bagaj",
        "Simsiz quvvatlash",
      ],
    },
    {
      id: "audi-q8",
      brand: "Audi",
      model: "Q8 55 TFSI quattro",
      year: 2022,
      price: 990000000,
      oldPrice: 1065000000,
      mileage: 41000,
      body: "SUV",
      fuel: "Benzin",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "3.0L TFSI",
      power: "340 o.k.",
      color: "Qora",
      location: "Toshkent · Yunusobod",
      image: "public/cars/q8.jpg",
      badge: "sale",
      views: 1196,
      description:
        "Audi Q8 — flagman SUV dizayni va quattro ishonchliligi. Virtual kokpit, keng salon va panoramik tom. Avtomobil to‘liq servis tarixi bilan, hech qanday nuqsoni yo‘q.",
      features: [
        "quattro to‘liq tortish",
        "Virtual kokpit",
        "Bang & Olufsen audio",
        "Kamera 360°",
        "Havo osma",
        "Panoramik tom",
        "Massajli o‘rindiqlar",
        "Head-Up display",
      ],
    },
    {
      id: "kia-telluride",
      brand: "Kia",
      model: "Telluride SX",
      year: 2022,
      price: 590000000,
      oldPrice: 620000000,
      mileage: 52000,
      body: "SUV",
      fuel: "Benzin",
      transmission: "Avtomat",
      drive: "To‘liq",
      engine: "V6 3.8L",
      power: "291 o.k.",
      color: "To‘q ko‘k",
      location: "Toshkent · Sergeli",
      image: "public/cars/telluride.jpg",
      badge: "sale",
      views: 672,
      description:
        "7 o‘rinli oilaviy SUV. Kia Telluride SX katta salon, qulay uchinchi qator va boy jihozlar bilan. Avtomobil texnik ko‘rikdan o‘tgan, yuridik tarixi toza.",
      features: [
        "7 o‘rinli salon",
        "Kamera 360°",
        "Panoramik tom",
        "Isitiladigan o‘rindiqlar",
        "Harman Kardon audio",
        "Adaptiv kruiz-kontrol",
        "Elektr bagaj",
        "Apple CarPlay",
      ],
    },
  ];

  const siteHeader = $("#siteHeader");
  const overlay = $("#overlay");
  const menuBtn = $("#menuBtn");
  const mobileNav = $("#mobileNav");
  const favoritesBtn = $("#favoritesBtn");
  const favoritesBadge = $("#favoritesBadge");
  const favoritesDrawer = $("#favoritesDrawer");
  const favoritesList = $("#favoritesList");
  const favoritesDrawerCount = $("#favoritesDrawerCount");
  const favoritesFooter = $("#favoritesFooter");
  const viewFavoritesBtn = $("#viewFavoritesBtn");
  const clearFavoritesBtn = $("#clearFavoritesBtn");
  const accountBtn = $("#accountBtn");
  const accountLabel = $("#accountLabel");
  const accountModal = $("#accountModal");
  const accountName = $("#accountName");
  const accountContact = $("#accountContact");
  const accountFavCount = $("#accountFavCount");
  const accountListingCount = $("#accountListingCount");
  const accountFavoritesBtn = $("#accountFavoritesBtn");
  const logoutBtn = $("#logoutBtn");
  const authModal = $("#authModal");
  const authTitle = $("#authTitle");
  const authSubtitle = $("#authSubtitle");
  const loginTab = $("#loginTab");
  const registerTab = $("#registerTab");
  const loginForm = $("#loginForm");
  const registerForm = $("#registerForm");
  const loginContact = $("#loginContact");
  const loginPassword = $("#loginPassword");
  const loginError = $("#loginError");
  const registerName = $("#registerName");
  const registerContact = $("#registerContact");
  const registerPassword = $("#registerPassword");
  const registerError = $("#registerError");
  const filterPanel = $("#filterPanel");
  const filterToggle = $("#filterToggle");
  const filterCountPill = $("#filterCountPill");
  const filterCount = $("#filterCount");
  const priceFilter = $("#priceFilter");
  const applyFilters = $("#applyFilters");
  const clearFilters = $("#clearFilters");
  const catalogSearch = $("#catalogSearch");
  const sortSelect = $("#sortSelect");
  const resultCount = $("#resultCount");
  const activeFilters = $("#activeFilters");
  const carsGrid = $("#carsGrid");
  const emptyState = $("#emptyState");
  const emptyResetBtn = $("#emptyResetBtn");
  const loadMoreWrap = $("#loadMoreWrap");
  const loadMoreBtn = $("#loadMoreBtn");
  const loadMoreLabel = $("#loadMoreLabel");
  const brandGrid = $("#brandGrid");
  const headerSearch = $("#headerSearch");
  const headerSearchInput = $("#headerSearchInput");
  const heroSearch = $("#heroSearch");
  const heroQuery = $("#heroQuery");
  const heroBrand = $("#heroBrand");
  const heroBudget = $("#heroBudget");
  const detailModal = $("#detailModal");
  const detailImage = $("#detailImage");
  const detailBadge = $("#detailBadge");
  const detailFavBtn = $("#detailFavBtn");
  const detailBrandYear = $("#detailBrandYear");
  const detailTitle = $("#detailTitle");
  const detailLocation = $("#detailLocation");
  const detailViews = $("#detailViews");
  const detailSpecs = $("#detailSpecs");
  const detailDesc = $("#detailDesc");
  const detailFeatures = $("#detailFeatures");
  const detailPrice = $("#detailPrice");
  const detailOld = $("#detailOld");
  const detailInstallment = $("#detailInstallment");
  const revealPhoneBtn = $("#revealPhoneBtn");
  const callBtn = $("#callBtn");
  const testDriveBtn = $("#testDriveBtn");
  const sellModal = $("#sellModal");
  const sellForm = $("#sellForm");
  const sellPhoto = $("#sellPhoto");
  const sellPreview = $("#sellPreview");
  const sellBrand = $("#sellBrand");
  const sellModel = $("#sellModel");
  const sellYear = $("#sellYear");
  const sellPrice = $("#sellPrice");
  const sellMileage = $("#sellMileage");
  const sellBody = $("#sellBody");
  const sellTransmission = $("#sellTransmission");
  const sellFuel = $("#sellFuel");
  const sellPhone = $("#sellPhone");
  const sellDesc = $("#sellDesc");
  const sellError = $("#sellError");
  const testDriveModal = $("#testDriveModal");
  const testDriveTitle = $("#testDriveTitle");
  const testDriveForm = $("#testDriveForm");
  const tdName = $("#tdName");
  const tdPhone = $("#tdPhone");
  const tdDate = $("#tdDate");
  const tdTime = $("#tdTime");
  const tdError = $("#tdError");
  const contactForm = $("#contactForm");
  const contactName = $("#contactName");
  const contactPhone = $("#contactPhone");
  const contactTopic = $("#contactTopic");
  const contactMessage = $("#contactMessage");
  const contactError = $("#contactError");
  const contactSuccess = $("#contactSuccess");
  const newsletterForm = $("#newsletterForm");
  const newsletterEmail = $("#newsletterEmail");
  const newsletterNote = $("#newsletterNote");
  const footerYear = $("#footerYear");
  const toastStack = $("#toastStack");
  const backToTop = $("#backToTop");

  const state = {
    filters: { ...DEFAULT_FILTERS },
    query: "",
    sort: "recommended",
    visible: PAGE_SIZE,
    favoritesOnly: false,
    favorites: new Set(),
    user: null,
    currentCarId: null,
    testDriveCar: null,
    sellImage: "",
  };

  let allCars = [];
  let activeLayer = null;
  let lastFocused = null;
  let overlayTimer = 0;
  let scrollTicking = false;

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[character];
    });
  }

  function formatNumber(value) {
    const number = Math.round(Number(value) || 0);
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function money(value) {
    return `${formatNumber(value)} so‘m`;
  }

  function monthlyMillions(price) {
    return Math.max(1, Math.round((price * 0.8) / 36 / 1000000));
  }

  function todayISO(offset = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(value).trim());
  }

  function isPhone(value) {
    const digits = String(value).replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  function isContact(value) {
    return isEmail(value) || isPhone(value);
  }

  function telHref(value) {
    const raw = String(value || "").trim();
    const digits = raw.replace(/[^\d+]/g, "");
    return `tel:${digits || "+998902007700"}`;
  }

  function firstName(name) {
    return String(name || "").trim().split(/\s+/)[0] || "Hisobim";
  }

  function nameFromContact(contact) {
    if (!isEmail(contact)) return "Foydalanuvchi";
    const local = String(contact).split("@")[0].replace(/[._-]+/g, " ").trim();
    if (!local) return "Foydalanuvchi";
    return local
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function carById(id) {
    return allCars.find((car) => car.id === id);
  }

  function fallbackImage(brand) {
    return BRAND_FALLBACK[brand] || "public/cars/bmw-x5.jpg";
  }

  function userListings() {
    return allCars.filter((car) => car.owner === "user");
  }

  function loadUserListings() {
    const stored = loadJSON(KEYS.listings, []);
    if (!Array.isArray(stored)) return [];
    return stored
      .filter((car) => car && car.id && car.brand && car.model)
      .map((car) => ({
        ...car,
        price: Number(car.price) || 0,
        year: Number(car.year) || new Date().getFullYear(),
        mileage: Number(car.mileage) || 0,
        owner: "user",
        image: car.image || fallbackImage(car.brand),
        badge: car.badge || "new",
        views: Number(car.views) || 0,
        features: Array.isArray(car.features) && car.features.length ? car.features : ["Yangi e’lon"],
      }));
  }

  function persistUserListings() {
    const stored = userListings().map((car) => ({
      ...car,
      image: car.image && car.image.startsWith("data:") ? "" : car.image,
    }));
    saveJSON(KEYS.listings, stored);
  }

  function setError(element, message) {
    if (!element) return;
    element.textContent = message || "";
    element.hidden = !message;
  }

  function markInvalid(element, invalid = true) {
    if (element) element.classList.toggle("is-invalid", invalid);
  }

  function clearFormState(form, errorElement) {
    if (form) $$(".is-invalid", form).forEach((field) => field.classList.remove("is-invalid"));
    setError(errorElement, "");
  }

  function bump(element) {
    if (!element) return;
    element.classList.remove("is-bump");
    void element.offsetWidth;
    element.classList.add("is-bump");
    window.setTimeout(() => element.classList.remove("is-bump"), 420);
  }

  function toast(message, type = "success") {
    if (!toastStack) return;
    while (toastStack.children.length >= 4) toastStack.firstElementChild.remove();
    const icon = type === "error" ? "i-alert" : type === "default" ? "i-heart" : "i-check-circle";
    const element = document.createElement("div");
    element.className = `toast toast-${type}`;
    element.innerHTML = `
      <span class="toast-icon"><svg class="icon"><use href="#${icon}"/></svg></span>
      <span class="toast-message">${escapeHTML(message)}</span>
    `;
    toastStack.appendChild(element);
    window.setTimeout(() => {
      element.classList.add("is-removing");
      window.setTimeout(() => element.remove(), 230);
    }, 3400);
  }

  function showOverlay() {
    if (!overlay) return;
    window.clearTimeout(overlayTimer);
    overlay.hidden = false;
    void overlay.offsetWidth;
    overlay.classList.add("is-visible");
  }

  function hideOverlay() {
    if (!overlay) return;
    overlay.classList.remove("is-visible");
    window.clearTimeout(overlayTimer);
    overlayTimer = window.setTimeout(() => {
      if (!activeLayer) overlay.hidden = true;
    }, 270);
  }

  function focusableElements(layer) {
    return $$(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      layer
    ).filter(
      (element) =>
        element.getClientRects().length > 0 &&
        getComputedStyle(element).visibility !== "hidden" &&
        !element.hidden
    );
  }

  function focusLayer(layer) {
    const elements = focusableElements(layer);
    if (!elements.length) return;
    const field = elements.find((element) => ["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName));
    const target = field || elements.find((element) => !element.classList.contains("modal-close")) || elements[0];
    try {
      target.focus({ preventScroll: true });
    } catch {
      target.focus();
    }
  }

  function openLayer(layer) {
    if (!layer) return;
    if (activeLayer === layer) return;
    const hadActive = Boolean(activeLayer);

    if (activeLayer) teardownLayer(activeLayer, false);
    if (!hadActive) {
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    activeLayer = layer;

    if (layer === filterPanel) {
      layer.classList.add("is-open");
      if (filterToggle) filterToggle.setAttribute("aria-expanded", "true");
    } else {
      layer.hidden = false;
      layer.setAttribute("aria-hidden", "false");
      void layer.offsetWidth;
      layer.classList.add("is-open");
    }

    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(layer === mobileNav));
    showOverlay();
    document.body.classList.add("no-scroll");
    window.setTimeout(() => focusLayer(layer), 70);
  }

  function teardownLayer(layer, restoreFocus = true) {
    if (!layer) return;

    if (layer === filterPanel) {
      layer.classList.remove("is-open");
      if (filterToggle) filterToggle.setAttribute("aria-expanded", "false");
    } else {
      layer.classList.remove("is-open");
      layer.setAttribute("aria-hidden", "true");
      window.setTimeout(() => {
        if (!layer.classList.contains("is-open")) layer.hidden = true;
      }, 320);
    }

    if (layer === mobileNav && menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    if (activeLayer === layer) activeLayer = null;

    if (!activeLayer) {
      hideOverlay();
      document.body.classList.remove("no-scroll");
      if (restoreFocus && lastFocused && document.contains(lastFocused)) {
        try {
          lastFocused.focus({ preventScroll: true });
        } catch {
          return;
        }
      }
      lastFocused = null;
    }
  }

  function closeLayer(layer = activeLayer) {
    if (!layer || layer !== activeLayer) return;
    teardownLayer(layer, true);
  }

  function trapFocus(event) {
    if (!activeLayer) return;
    const elements = focusableElements(activeLayer);
    if (!elements.length) return;
    const first = elements[0];
    const last = elements[elements.length - 1];

    if (!activeLayer.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function brandCounts() {
    return BRANDS.reduce((accumulator, brand) => {
      accumulator[brand] = allCars.filter((car) => car.brand === brand).length;
      return accumulator;
    }, {});
  }

  function renderBrandCards() {
    if (!brandGrid) return;
    const counts = brandCounts();
    brandGrid.innerHTML = BRANDS.map((brand) => {
      const count = counts[brand];
      const active = state.filters.brand === brand;
      return `
        <button class="brand-card${active ? " is-active" : ""}" type="button" data-brand="${escapeHTML(brand)}" aria-pressed="${active}">
          <span class="brand-mark"><span>${escapeHTML(BRAND_MARKS[brand] || brand)}</span></span>
          <span class="brand-info">
            <strong>${escapeHTML(brand)}</strong>
            <span>${count} ta avtomobil</span>
          </span>
          <span class="brand-arrow"><svg class="icon"><use href="#i-arrow-up-right"/></svg></span>
        </button>
      `;
    }).join("");
  }

  function updateBrandOptionCounts() {
    const counts = brandCounts();
    $$('[data-filter-group="brand"] [data-filter="brand"]').forEach((button) => {
      const value = button.dataset.value;
      const count = value === "all" ? allCars.length : counts[value] || 0;
      const counter = $(".filter-option-count", button);
      if (counter) counter.textContent = String(count);
    });
  }

  function syncBrandControls() {
    $$(".brand-card").forEach((card) => {
      const active = card.dataset.brand === state.filters.brand;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });
  }

  function updateFilterIndicators() {
    const count = Object.values(state.filters).filter((value) => value !== "all").length;
    [filterCountPill, filterCount].forEach((pill) => {
      if (!pill) return;
      pill.textContent = String(count);
      pill.hidden = count === 0;
    });
  }

  function syncFilters() {
    $$(".filter-option").forEach((button) => {
      const group = button.dataset.filter;
      const value = button.dataset.value;
      const active = state.filters[group] === value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (priceFilter) priceFilter.value = state.filters.price;
    updateFilterIndicators();
    syncBrandControls();
  }

  function matchesFilters(car) {
    if (state.favoritesOnly && !state.favorites.has(car.id)) return false;

    const filters = state.filters;
    if (filters.brand !== "all" && car.brand !== filters.brand) return false;
    if (filters.body !== "all" && car.body !== filters.body) return false;
    if (filters.year !== "all" && car.year < Number(filters.year)) return false;
    if (filters.transmission !== "all" && car.transmission !== filters.transmission) return false;
    if (filters.fuel !== "all" && car.fuel !== filters.fuel) return false;

    if (filters.price !== "all") {
      const [minRaw, maxRaw] = filters.price.split("-");
      const min = Number(minRaw);
      const max = maxRaw === "Infinity" ? Infinity : Number(maxRaw);
      if (car.price < min || car.price >= max) return false;
    }

    if (state.query) {
      const haystack = [car.brand, car.model, car.body, car.fuel, car.transmission, car.color, car.year, car.description]
        .join(" ")
        .toLowerCase();
      const tokens = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      if (!tokens.every((token) => haystack.includes(token))) return false;
    }

    return true;
  }

  function getFilteredCars() {
    const list = allCars.filter(matchesFilters);
    switch (state.sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "year-desc":
        return [...list].sort((a, b) => b.year - a.year || a.price - b.price);
      case "mileage-asc":
        return [...list].sort((a, b) => a.mileage - b.mileage);
      default:
        return list;
    }
  }

  function badgeMarkup(car) {
    if (!car.badge) return "";
    const labels = { sale: "Chegirma", new: "Yangi", premium: "Premium" };
    return `<span class="badge badge-${escapeHTML(car.badge)}">${labels[car.badge] || "Tanlangan"}</span>`;
  }

  function carCardMarkup(car) {
    const favorite = state.favorites.has(car.id);
    const monthly = monthlyMillions(car.price);
    return `
      <article class="car-card">
        <button class="car-media" type="button" data-detail="${escapeHTML(car.id)}" aria-label="${escapeHTML(car.brand)} ${escapeHTML(car.model)} batafsil">
          <img src="${escapeHTML(car.image)}" alt="${escapeHTML(car.brand)} ${escapeHTML(car.model)}" loading="lazy" width="800" height="513" />
          <span class="car-badges">${badgeMarkup(car)}</span>
        </button>
        <button class="car-fav${favorite ? " is-active" : ""}" type="button" data-fav="${escapeHTML(car.id)}" aria-label="${favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish"}" aria-pressed="${favorite}">
          <svg class="icon"><use href="#i-heart"/></svg>
        </button>
        <div class="car-body">
          <span class="car-kicker">${escapeHTML(car.brand)}<span class="kicker-dot"></span>${car.year}<span class="kicker-dot"></span>${escapeHTML(car.location)}</span>
          <button class="car-title" type="button" data-detail="${escapeHTML(car.id)}">${escapeHTML(car.model)}</button>
          <div class="car-specs">
            <span class="car-spec"><svg class="icon"><use href="#i-gauge"/></svg><span>${formatNumber(car.mileage)} km</span></span>
            <span class="car-spec"><svg class="icon"><use href="#i-gear"/></svg><span>${escapeHTML(car.transmission)}</span></span>
            <span class="car-spec"><svg class="icon"><use href="#i-fuel"/></svg><span>${escapeHTML(car.fuel)}</span></span>
            <span class="car-spec"><svg class="icon"><use href="#i-car"/></svg><span>${escapeHTML(car.body)}</span></span>
          </div>
          <div class="car-footer">
            <div class="car-price">
              <span class="car-price-main">${formatNumber(car.price)} <span>so‘m</span></span>
              <span class="car-monthly"><b>${monthly} mln</b> so‘m/oy</span>
            </div>
            <button class="car-detail-btn" type="button" data-detail="${escapeHTML(car.id)}" aria-label="Batafsil ko‘rish">
              <svg class="icon"><use href="#i-arrow-up-right"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function filterChipMarkup(key, label) {
    return `
      <span class="active-filter">
        <span class="active-filter-label">${escapeHTML(label)}</span>
        <button type="button" data-remove-filter="${escapeHTML(key)}" aria-label="${escapeHTML(label)} filtrini olib tashlash">
          <svg class="icon"><use href="#i-close"/></svg>
        </button>
      </span>
    `;
  }

  function renderActiveFilterChips() {
    if (!activeFilters) return;
    const chips = [];

    if (state.query) chips.push(filterChipMarkup("query", `Qidiruv: “${state.query}”`));
    if (state.favoritesOnly) chips.push(filterChipMarkup("favorites", "Faqat sevimlilar"));
    if (state.filters.brand !== "all") chips.push(filterChipMarkup("brand", `Brend: ${state.filters.brand}`));
    if (state.filters.body !== "all") chips.push(filterChipMarkup("body", `Kuzov: ${state.filters.body}`));
    if (state.filters.price !== "all") {
      const selected = priceFilter ? priceFilter.options[priceFilter.selectedIndex] : null;
      chips.push(filterChipMarkup("price", `Narx: ${selected ? selected.textContent : state.filters.price}`));
    }
    if (state.filters.year !== "all") chips.push(filterChipMarkup("year", `Yil: ${state.filters.year}+`));
    if (state.filters.transmission !== "all") {
      chips.push(filterChipMarkup("transmission", `Uzatish: ${state.filters.transmission}`));
    }
    if (state.filters.fuel !== "all") chips.push(filterChipMarkup("fuel", `Yoqilg‘i: ${state.filters.fuel}`));

    activeFilters.innerHTML = chips.join("");
  }

  function syncFavoriteButtons() {
    $$("[data-fav]").forEach((button) => {
      const active = state.favorites.has(button.dataset.fav);
      button.setAttribute("aria-pressed", String(active));
      if (button.classList.contains("car-fav")) {
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-label", active ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish");
      }
    });

    if (state.currentCarId && detailFavBtn) {
      const active = state.favorites.has(state.currentCarId);
      detailFavBtn.classList.toggle("is-active", active);
      detailFavBtn.setAttribute("aria-pressed", String(active));
      detailFavBtn.setAttribute("aria-label", active ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish");
    }
  }

  function updateFavoriteCounters(animate = false) {
    const count = state.favorites.size;
    if (favoritesBadge) {
      favoritesBadge.textContent = String(count);
      favoritesBadge.hidden = count === 0;
      if (animate && count > 0) bump(favoritesBadge);
    }
    if (favoritesDrawerCount) favoritesDrawerCount.textContent = String(count);
    if (favoritesFooter) favoritesFooter.hidden = count === 0;
    if (accountFavCount) accountFavCount.textContent = String(count);
  }

  function renderFavoritesDrawer() {
    if (!favoritesList) return;
    const cars = [...state.favorites].map(carById).filter(Boolean);

    if (!cars.length) {
      favoritesList.innerHTML = `
        <div class="drawer-empty">
          <span class="drawer-empty-icon"><svg class="icon"><use href="#i-heart"/></svg></span>
          <h3>Hali sevimlilar yo‘q</h3>
          <p>Yoqqan avtomobillaringizni saqlang — ular shu yerda paydo bo‘ladi.</p>
          <button class="btn btn-primary" type="button" data-catalog>Katalogga o‘tish</button>
        </div>
      `;
      return;
    }

    favoritesList.innerHTML = cars.map((car) => `
      <article class="fav-item">
        <button class="fav-item-media" type="button" data-detail="${escapeHTML(car.id)}" aria-label="${escapeHTML(car.brand)} ${escapeHTML(car.model)} batafsil">
          <img src="${escapeHTML(car.image)}" alt="${escapeHTML(car.brand)} ${escapeHTML(car.model)}" loading="lazy" />
        </button>
        <div class="fav-item-info">
          <span class="car-kicker">${escapeHTML(car.brand)}<span class="kicker-dot"></span>${car.year}</span>
          <button class="fav-item-title" type="button" data-detail="${escapeHTML(car.id)}">${escapeHTML(car.model)}</button>
          <span class="fav-item-price">${formatNumber(car.price)} so‘m</span>
        </div>
        <div class="fav-item-actions">
          <button class="icon-button fav-remove" type="button" data-fav="${escapeHTML(car.id)}" aria-label="Sevimlilardan olib tashlash">
            <svg class="icon"><use href="#i-trash"/></svg>
          </button>
        </div>
      </article>
    `).join("");
  }

  function renderCars() {
    if (!carsGrid) return;
    const filtered = getFilteredCars();
    const visibleCars = filtered.slice(0, state.visible);

    carsGrid.innerHTML = visibleCars.map(carCardMarkup).join("");
    carsGrid.hidden = filtered.length === 0;
    if (emptyState) emptyState.hidden = filtered.length !== 0;

    if (resultCount) {
      const suffix = state.favoritesOnly ? "ta sevimli avtomobil" : "ta avtomobil topildi";
      resultCount.innerHTML = `<strong>${filtered.length}</strong> ${suffix}`;
    }

    if (loadMoreWrap) {
      const remaining = Math.max(0, filtered.length - visibleCars.length);
      loadMoreWrap.hidden = filtered.length === 0 || remaining === 0;
      if (loadMoreLabel) loadMoreLabel.textContent = `${remaining} ta avtomobil qoldi`;
    }

    renderActiveFilterChips();
    syncFavoriteButtons();
  }

  function resetFilters(options = {}) {
    const { keepFavorites = false } = options;
    state.filters = { ...DEFAULT_FILTERS };
    state.query = "";
    state.visible = PAGE_SIZE;
    if (!keepFavorites) state.favoritesOnly = false;

    [heroQuery, headerSearchInput, catalogSearch].forEach((input) => {
      if (input) input.value = "";
    });
    if (heroBrand) heroBrand.value = "all";
    if (heroBudget) heroBudget.value = "all";
    if (sortSelect) {
      state.sort = "recommended";
      sortSelect.value = "recommended";
    }

    syncFilters();
    renderCars();
  }

  function scrollToCatalog(focusSearch = false) {
    const section = $("#cars");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    if (focusSearch && catalogSearch) {
      try {
        catalogSearch.focus({ preventScroll: true });
      } catch {
        catalogSearch.focus();
      }
    }
  }

  function applySearch({ query = "", brand = "all", price = "all" }) {
    state.filters = { ...DEFAULT_FILTERS, brand, price };
    state.query = query.trim();
    state.favoritesOnly = false;
    state.visible = PAGE_SIZE;
    state.sort = "recommended";

    if (heroQuery) heroQuery.value = state.query;
    if (heroBrand) heroBrand.value = brand;
    if (heroBudget) heroBudget.value = price;
    if (headerSearchInput) headerSearchInput.value = state.query;
    if (catalogSearch) catalogSearch.value = state.query;
    if (sortSelect) sortSelect.value = "recommended";

    syncFilters();
    renderCars();
    scrollToCatalog();
  }

  function selectBrand(brand) {
    const next = state.filters.brand === brand ? "all" : brand;
    state.filters = { ...DEFAULT_FILTERS, brand: next };
    state.query = "";
    state.favoritesOnly = false;
    state.visible = PAGE_SIZE;
    state.sort = "recommended";

    [heroQuery, headerSearchInput, catalogSearch].forEach((input) => {
      if (input) input.value = "";
    });
    if (heroBrand) heroBrand.value = next;
    if (heroBudget) heroBudget.value = "all";
    if (sortSelect) sortSelect.value = "recommended";

    syncFilters();
    renderCars();
    scrollToCatalog();
  }

  function removeFilter(key) {
    if (key === "query") {
      state.query = "";
      [heroQuery, headerSearchInput, catalogSearch].forEach((input) => {
        if (input) input.value = "";
      });
    } else if (key === "favorites") {
      state.favoritesOnly = false;
    } else if (key === "price") {
      state.filters.price = "all";
    } else if (key in state.filters) {
      state.filters[key] = "all";
    } else {
      return;
    }

    state.visible = PAGE_SIZE;
    syncFilters();
    renderCars();
  }

  function toggleFavorite(id) {
    const car = carById(id);
    if (!car) return;

    const adding = !state.favorites.has(id);
    if (adding) state.favorites.add(id);
    else state.favorites.delete(id);

    saveJSON(KEYS.favorites, [...state.favorites]);
    syncFavoriteButtons();
    updateFavoriteCounters(true);
    renderFavoritesDrawer();
    updateAccountUI();

    if (state.favoritesOnly) renderCars();

    toast(
      adding ? `${car.brand} ${car.model} sevimlilarga qo‘shildi.` : `${car.brand} ${car.model} sevimlilardan olib tashlandi.`,
      adding ? "success" : "default"
    );
  }

  function setDetailPhone(car) {
    if (!callBtn || !revealPhoneBtn) return;
    const phone = car.phone || PHONE_DISPLAY;
    callBtn.href = telHref(phone);
    callBtn.innerHTML = `<svg class="icon"><use href="#i-phone"/></svg> Qo‘ng‘iroq: ${escapeHTML(phone)}`;
    callBtn.hidden = true;
    revealPhoneBtn.hidden = false;
  }

  function openDetail(id) {
    const car = carById(id);
    if (!car) return;

    state.currentCarId = car.id;
    car.views = (Number(car.views) || 0) + 1;

    if (detailImage) {
      detailImage.src = car.image;
      detailImage.alt = `${car.brand} ${car.model}`;
    }
    if (detailBadge) {
      if (car.badge) {
        const labels = { sale: "Chegirma", new: "Yangi", premium: "Premium" };
        detailBadge.className = `badge badge-${car.badge}`;
        detailBadge.textContent = labels[car.badge] || "Tanlangan";
        detailBadge.hidden = false;
      } else {
        detailBadge.hidden = true;
        detailBadge.textContent = "";
      }
    }
    if (detailBrandYear) detailBrandYear.textContent = `${car.brand} · ${car.year}`;
    if (detailTitle) detailTitle.textContent = `${car.brand} ${car.model}`;
    if (detailLocation) detailLocation.textContent = car.location;
    if (detailViews) detailViews.textContent = `${formatNumber(car.views)} marta ko‘rildi`;

    if (detailSpecs) {
      const specs = [
        ["i-calendar", "Yil", String(car.year)],
        ["i-gauge", "Yurgan masofa", `${formatNumber(car.mileage)} km`],
        ["i-gear", "Uzatish qutisi", car.transmission],
        ["i-fuel", "Yoqilg‘i", car.fuel],
        ["i-bolt", "Dvigatel", `${car.engine} · ${car.power}`],
        ["i-car", "Yetakchi g‘ildirak", car.drive],
      ];
      detailSpecs.innerHTML = specs.map(([icon, label, value]) => `
        <div class="detail-spec">
          <span class="detail-spec-icon"><svg class="icon"><use href="#${icon}"/></svg></span>
          <div><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong></div>
        </div>
      `).join("");
    }

    if (detailDesc) detailDesc.textContent = car.description;
    if (detailFeatures) {
      detailFeatures.innerHTML = car.features.map((feature) => `
        <span class="feature-chip"><svg class="icon"><use href="#i-check"/></svg>${escapeHTML(feature)}</span>
      `).join("");
    }

    if (detailPrice) detailPrice.innerHTML = `${formatNumber(car.price)} <span>so‘m</span>`;
    if (detailOld) {
      if (car.oldPrice) {
        detailOld.textContent = `Eski narx: ${money(car.oldPrice)}`;
        detailOld.hidden = false;
      } else {
        detailOld.textContent = "";
        detailOld.hidden = true;
      }
    }
    if (detailInstallment) {
      detailInstallment.innerHTML = `20% boshlang‘ich to‘lov · 36 oy · <strong>${monthlyMillions(car.price)} mln so‘m</strong>/oy`;
    }

    setDetailPhone(car);
    syncFavoriteButtons();
    openLayer(detailModal);
  }

  function updateAccountUI() {
    const user = state.user;
    if (accountBtn) {
      accountBtn.classList.toggle("is-authed", Boolean(user));
      accountBtn.setAttribute("aria-label", user ? `${user.name} hisobi` : "Hisobga kirish");
    }
    if (accountLabel) accountLabel.textContent = user ? firstName(user.name) : "Kirish";
    if (accountName) accountName.textContent = user ? user.name : "Foydalanuvchi";
    if (accountContact) accountContact.textContent = user ? user.contact : "";
    if (accountFavCount) accountFavCount.textContent = String(state.favorites.size);
    if (accountListingCount) accountListingCount.textContent = String(userListings().length);
  }

  function setAuthTab(tab) {
    const loginActive = tab !== "register";
    if (loginTab) {
      loginTab.classList.toggle("is-active", loginActive);
      loginTab.setAttribute("aria-selected", String(loginActive));
    }
    if (registerTab) {
      registerTab.classList.toggle("is-active", !loginActive);
      registerTab.setAttribute("aria-selected", String(!loginActive));
    }
    if (loginForm) loginForm.hidden = !loginActive;
    if (registerForm) registerForm.hidden = loginActive;
    if (authTitle) authTitle.textContent = loginActive ? "Xush kelibsiz" : "Hisob yaratish";
    if (authSubtitle) {
      authSubtitle.textContent = loginActive
        ? "Hisobingizga kirib sevimlilar va e’lonlaringizni boshqaring."
        : "E’lon joylash va sevimlilarni saqlash uchun ro‘yxatdan o‘ting.";
    }
    setError(loginError, "");
    setError(registerError, "");
    if (loginForm) $$(".is-invalid", loginForm).forEach((field) => field.classList.remove("is-invalid"));
    if (registerForm) $$(".is-invalid", registerForm).forEach((field) => field.classList.remove("is-invalid"));
  }

  function openAuthModal() {
    if (state.user) {
      updateAccountUI();
      openLayer(accountModal);
      return;
    }
    setAuthTab("login");
    if (loginPassword) loginPassword.value = "";
    openLayer(authModal);
  }

  function openAccountModal() {
    if (!state.user) {
      openAuthModal();
      return;
    }
    updateAccountUI();
    openLayer(accountModal);
  }

  function openFavoritesDrawer() {
    renderFavoritesDrawer();
    updateFavoriteCounters(false);
    openLayer(favoritesDrawer);
  }

  function openSellModal() {
    clearFormState(sellForm, sellError);
    if (state.user && isPhone(state.user.contact) && !sellPhone.value) {
      sellPhone.value = state.user.contact;
    }
    openLayer(sellModal);
  }

  function openTestDriveModal(car) {
    if (!car) return;
    state.testDriveCar = car;
    if (testDriveTitle) testDriveTitle.textContent = `Sinov drayvi — ${car.brand} ${car.model}`;
    clearFormState(testDriveForm, tdError);
    if (tdDate) {
      tdDate.min = todayISO();
      tdDate.value = todayISO(1);
    }
    if (state.user) {
      if (isPhone(state.user.contact)) tdPhone.value = state.user.contact;
      if (!tdName.value) tdName.value = state.user.name;
    }
    openLayer(testDriveModal);
  }

  function addUserListing(car) {
    allCars.unshift(car);
    persistUserListings();
    updateBrandOptionCounts();
    renderBrandCards();
    syncFilters();
    updateTotalListings();
    updateAccountUI();
  }

  function updateTotalListings() {
    $$("[data-total-listings]").forEach((element) => {
      element.textContent = String(allCars.length);
    });
  }

  function handleFilterClick(button) {
    const group = button.dataset.filter;
    const value = button.dataset.value;
    if (!(group in state.filters)) return;
    state.filters[group] = value;
    state.visible = PAGE_SIZE;
    syncFilters();
    renderCars();
  }

  function handleSellSubmit(event) {
    event.preventDefault();
    if (!sellForm) return;
    clearFormState(sellForm, sellError);

    const brand = sellBrand.value;
    const model = sellModel.value.trim();
    const year = Number(sellYear.value);
    const price = Number(sellPrice.value);
    const mileage = Number(sellMileage.value);
    const phone = sellPhone.value.trim();
    const description = sellDesc.value.trim();
    const currentYear = new Date().getFullYear();

    let invalidField = null;
    let message = "";

    if (!model || model.length < 2) {
      invalidField = sellModel;
      message = "Avtomobil modelini kiriting (kamida 2 belgi).";
    } else if (!Number.isInteger(year) || year < 1990 || year > currentYear) {
      invalidField = sellYear;
      message = `Ishlab chiqarilgan yilni 1990–${currentYear} oralig‘ida kiriting.`;
    } else if (!Number.isFinite(price) || price <= 0) {
      invalidField = sellPrice;
      message = "Avtomobil narxini to‘g‘ri kiriting.";
    } else if (!Number.isFinite(mileage) || mileage < 0) {
      invalidField = sellMileage;
      message = "Yurgan masofani to‘g‘ri kiriting.";
    } else if (!isPhone(phone)) {
      invalidField = sellPhone;
      message = "To‘g‘ri telefon raqam kiriting.";
    }

    if (message) {
      setError(sellError, message);
      markInvalid(invalidField);
      if (invalidField) invalidField.focus();
      return;
    }

    const car = {
      id: `user-${Date.now()}`,
      brand,
      model,
      year,
      price,
      oldPrice: null,
      mileage,
      body: sellBody.value,
      fuel: sellFuel.value,
      transmission: sellTransmission.value,
      drive: "Old",
      engine: "Ko‘rsatilmagan",
      power: "—",
      color: "Ko‘rsatilmagan",
      location: "Toshkent · SAM AUTO",
      image: state.sellImage || fallbackImage(brand),
      badge: "new",
      views: 0,
      phone,
      owner: "user",
      description:
        description ||
        "Foydalanuvchi tomonidan joylangan e’lon. Avtomobil haqida to‘liq ma’lumot uchun sotuvchi bilan bog‘laning.",
      features: ["Yangi e’lon", "SAM AUTO tekshiruvi kutilmoqda", "Sotuvchi bilan to‘g‘ridan-to‘g‘ri aloqa"],
    };

    addUserListing(car);
    sellForm.reset();
    if (sellPreview) {
      sellPreview.hidden = true;
      sellPreview.removeAttribute("src");
    }
    const uploadBox = sellPhoto ? sellPhoto.closest(".upload-box") : null;
    if (uploadBox) uploadBox.classList.remove("has-image");
    state.sellImage = "";

    state.filters = { ...DEFAULT_FILTERS };
    state.query = "";
    state.favoritesOnly = false;
    state.visible = PAGE_SIZE;
    if (sortSelect) {
      state.sort = "recommended";
      sortSelect.value = "recommended";
    }
    [heroQuery, headerSearchInput, catalogSearch].forEach((input) => {
      if (input) input.value = "";
    });
    if (heroBrand) heroBrand.value = "all";
    if (heroBudget) heroBudget.value = "all";

    syncFilters();
    renderCars();
    closeLayer(sellModal);
    window.setTimeout(() => scrollToCatalog(), 120);
    toast("E’loningiz katalogga qo‘shildi. Tez orada moderator tekshiradi.", "success");
  }

  function handleTestDriveSubmit(event) {
    event.preventDefault();
    clearFormState(testDriveForm, tdError);

    const car = state.testDriveCar;
    if (!car) {
      setError(tdError, "Avtomobil tanlanmagan. Iltimos, katalogdan qayta tanlang.");
      return;
    }

    const name = tdName.value.trim();
    const phone = tdPhone.value.trim();
    const date = tdDate.value;
    const time = tdTime.value;

    let invalidField = null;
    let message = "";

    if (!name || name.length < 2) {
      invalidField = tdName;
      message = "Ismingizni kiriting.";
    } else if (!isPhone(phone)) {
      invalidField = tdPhone;
      message = "To‘g‘ri telefon raqam kiriting.";
    } else if (!date || date < todayISO()) {
      invalidField = tdDate;
      message = "Qulay sanani tanlang.";
    }

    if (message) {
      setError(tdError, message);
      markInvalid(invalidField);
      if (invalidField) invalidField.focus();
      return;
    }

    const requests = loadJSON(KEYS.requests, []);
    const list = Array.isArray(requests) ? requests : [];
    list.push({
      carId: car.id,
      car: `${car.brand} ${car.model}`,
      name,
      phone,
      date,
      time,
      createdAt: new Date().toISOString(),
    });
    saveJSON(KEYS.requests, list);

    if (state.user) {
      tdName.value = state.user.name;
      tdPhone.value = isPhone(state.user.contact) ? state.user.contact : phone;
    }

    closeLayer(testDriveModal);
    toast(`${car.brand} ${car.model} uchun sinov drayvi so‘rovi qabul qilindi.`, "success");
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    clearFormState(contactForm, contactError);
    if (contactSuccess) contactSuccess.hidden = true;

    const name = contactName.value.trim();
    const phone = contactPhone.value.trim();
    const message = contactMessage.value.trim();

    let invalidField = null;
    let errorMessage = "";

    if (!name || name.length < 2) {
      invalidField = contactName;
      errorMessage = "Ismingizni kiriting.";
    } else if (!isPhone(phone)) {
      invalidField = contactPhone;
      errorMessage = "To‘g‘ri telefon raqam kiriting.";
    } else if (!message || message.length < 10) {
      invalidField = contactMessage;
      errorMessage = "Xabaringizni kiriting (kamida 10 belgi).";
    }

    if (errorMessage) {
      setError(contactError, errorMessage);
      markInvalid(invalidField);
      if (invalidField) invalidField.focus();
      return;
    }

    const messages = loadJSON(KEYS.messages, []);
    const list = Array.isArray(messages) ? messages : [];
    list.push({
      name,
      phone,
      topic: contactTopic.value,
      message,
      createdAt: new Date().toISOString(),
    });
    saveJSON(KEYS.messages, list);

    contactForm.reset();
    if (contactSuccess) contactSuccess.hidden = false;
    toast("Xabaringiz yuborildi. Tez orada bog‘lanamiz.", "success");
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    if (!newsletterEmail || !newsletterNote) return;
    newsletterEmail.classList.remove("is-invalid");
    newsletterNote.className = "newsletter-note";

    const email = newsletterEmail.value.trim();
    if (!isEmail(email)) {
      newsletterEmail.classList.add("is-invalid");
      newsletterNote.classList.add("is-error");
      newsletterNote.textContent = "To‘g‘ri email manzil kiriting.";
      newsletterEmail.focus();
      return;
    }

    const subscribers = loadJSON(KEYS.subscribers, []);
    const list = Array.isArray(subscribers) ? subscribers : [];
    const exists = list.some((item) => String(item).toLowerCase() === email.toLowerCase());
    if (!exists) {
      list.push(email);
      saveJSON(KEYS.subscribers, list);
    }

    newsletterNote.classList.add("is-success");
    newsletterNote.textContent = exists ? "Siz allaqachon obuna bo‘lgansiz." : "Obuna tasdiqlandi. Rahmat!";
    newsletterForm.reset();
    toast(exists ? "Siz allaqachon obunachisiz." : "Yangiliklarga obuna bo‘ldingiz.", "success");
  }

  function initEvents() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const favoriteButton = target.closest("[data-fav]");
      if (favoriteButton) {
        event.preventDefault();
        toggleFavorite(favoriteButton.dataset.fav);
        bump(favoriteButton);
        return;
      }

      const detailButton = target.closest("[data-detail]");
      if (detailButton) {
        event.preventDefault();
        openDetail(detailButton.dataset.detail);
        return;
      }

      const closeButton = target.closest("[data-close]");
      if (closeButton) {
        event.preventDefault();
        closeLayer();
        return;
      }

      const closeFilterButton = target.closest("[data-close-filters]");
      if (closeFilterButton) {
        event.preventDefault();
        if (activeLayer === filterPanel) closeLayer(filterPanel);
        return;
      }

      const filterButton = target.closest("[data-filter]");
      if (filterButton) {
        event.preventDefault();
        handleFilterClick(filterButton);
        return;
      }

      const removeButton = target.closest("[data-remove-filter]");
      if (removeButton) {
        event.preventDefault();
        removeFilter(removeButton.dataset.removeFilter);
        return;
      }

      const authTab = target.closest("[data-auth-tab]");
      if (authTab) {
        event.preventDefault();
        setAuthTab(authTab.dataset.authTab);
        return;
      }

      const openSell = target.closest("[data-open-sell]");
      if (openSell) {
        event.preventDefault();
        openSellModal();
        return;
      }

      const brandButton = target.closest("[data-brand]");
      if (brandButton) {
        event.preventDefault();
        closeLayer(mobileNav);
        selectBrand(brandButton.dataset.brand);
        return;
      }

      const footerBrand = target.closest("[data-footer-brand]");
      if (footerBrand) {
        event.preventDefault();
        selectBrand(footerBrand.dataset.footerBrand);
        return;
      }

      const catalogButton = target.closest("[data-catalog]");
      if (catalogButton) {
        event.preventDefault();
        closeLayer();
        window.setTimeout(() => scrollToCatalog(), 120);
        return;
      }

      const searchJump = target.closest("[data-focus-search]");
      if (searchJump) {
        event.preventDefault();
        scrollToCatalog(true);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (activeLayer) {
          event.preventDefault();
          closeLayer();
        }
        return;
      }
      if (event.key === "Tab") trapFocus(event);
    });

    document.addEventListener("input", (event) => {
      if (event.target instanceof Element && event.target.classList.contains("is-invalid")) {
        event.target.classList.remove("is-invalid");
      }
      if (contactSuccess && !contactSuccess.hidden) contactSuccess.hidden = true;
    });

    if (overlay) overlay.addEventListener("click", () => closeLayer());

    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        if (activeLayer === mobileNav) closeLayer(mobileNav);
        else openLayer(mobileNav);
      });
    }

    if (mobileNav) {
      mobileNav.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest("a[href]")) closeLayer(mobileNav);
      });
    }

    if (favoritesBtn) favoritesBtn.addEventListener("click", openFavoritesDrawer);
    if (accountBtn) accountBtn.addEventListener("click", openAccountModal);

    if (accountFavoritesBtn) {
      accountFavoritesBtn.addEventListener("click", () => {
        closeLayer(accountModal);
        window.setTimeout(openFavoritesDrawer, 120);
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        state.user = null;
        saveJSON(KEYS.session, false);
        updateAccountUI();
        closeLayer(accountModal);
        toast("Hisobdan chiqdingiz.", "success");
      });
    }

    if (viewFavoritesBtn) {
      viewFavoritesBtn.addEventListener("click", () => {
        state.filters = { ...DEFAULT_FILTERS };
        state.query = "";
        state.favoritesOnly = true;
        state.visible = PAGE_SIZE;
        [heroQuery, headerSearchInput, catalogSearch].forEach((input) => {
          if (input) input.value = "";
        });
        if (heroBrand) heroBrand.value = "all";
        if (heroBudget) heroBudget.value = "all";
        syncFilters();
        renderCars();
        closeLayer(favoritesDrawer);
        window.setTimeout(() => scrollToCatalog(), 150);
      });
    }

    if (clearFavoritesBtn) {
      clearFavoritesBtn.addEventListener("click", () => {
        state.favorites.clear();
        saveJSON(KEYS.favorites, []);
        updateFavoriteCounters(false);
        renderFavoritesDrawer();
        updateAccountUI();
        syncFavoriteButtons();
        if (state.favoritesOnly) renderCars();
        toast("Sevimlilar tozalandi.", "success");
      });
    }

    if (detailFavBtn) {
      detailFavBtn.addEventListener("click", () => {
        if (!state.currentCarId) return;
        toggleFavorite(state.currentCarId);
        bump(detailFavBtn);
      });
    }

    if (revealPhoneBtn) {
      revealPhoneBtn.addEventListener("click", () => {
        const car = carById(state.currentCarId);
        if (!car) return;
        const phone = car.phone || PHONE_DISPLAY;
        if (callBtn) {
          callBtn.href = telHref(phone);
          callBtn.hidden = false;
        }
        revealPhoneBtn.hidden = true;
        toast(`Sotuvchi raqami: ${phone}`, "success");
      });
    }

    if (testDriveBtn) {
      testDriveBtn.addEventListener("click", () => {
        const car = carById(state.currentCarId);
        if (car) openTestDriveModal(car);
      });
    }

    if (filterToggle) {
      filterToggle.addEventListener("click", () => {
        if (activeLayer === filterPanel) closeLayer(filterPanel);
        else openLayer(filterPanel);
      });
    }

    if (applyFilters) applyFilters.addEventListener("click", () => {
      if (activeLayer === filterPanel) closeLayer(filterPanel);
    });

    if (clearFilters) {
      clearFilters.addEventListener("click", () => {
        resetFilters();
      });
    }

    if (priceFilter) {
      priceFilter.addEventListener("change", () => {
        state.filters.price = priceFilter.value;
        state.visible = PAGE_SIZE;
        syncFilters();
        renderCars();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        state.visible = PAGE_SIZE;
        renderCars();
      });
    }

    if (catalogSearch) {
      catalogSearch.addEventListener("input", () => {
        state.query = catalogSearch.value.trim();
        state.visible = PAGE_SIZE;
        renderCars();
      });
    }

    if (headerSearch) {
      headerSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        applySearch({ query: headerSearchInput.value });
      });
    }

    if (heroSearch) {
      heroSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        applySearch({
          query: heroQuery ? heroQuery.value : "",
          brand: heroBrand ? heroBrand.value : "all",
          price: heroBudget ? heroBudget.value : "all",
        });
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        state.visible += PAGE_SIZE;
        renderCars();
      });
    }

    if (emptyResetBtn) emptyResetBtn.addEventListener("click", () => resetFilters());

    if (sellPhoto) {
      sellPhoto.addEventListener("change", () => {
        const file = sellPhoto.files && sellPhoto.files[0];
        if (!file) return;
        setError(sellError, "");

        if (!file.type.startsWith("image/")) {
          setError(sellError, "Faqat JPG, PNG yoki WebP formatidagi rasm yuklang.");
          sellPhoto.value = "";
          return;
        }
        if (file.size > 6 * 1024 * 1024) {
          setError(sellError, "Rasm hajmi 6 MB dan oshmasligi kerak.");
          sellPhoto.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          state.sellImage = String(reader.result || "");
          if (sellPreview) {
            sellPreview.src = state.sellImage;
            sellPreview.hidden = false;
          }
          const uploadBox = sellPhoto.closest(".upload-box");
          if (uploadBox) uploadBox.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      });
    }

    if (sellForm) sellForm.addEventListener("submit", handleSellSubmit);
    if (testDriveForm) testDriveForm.addEventListener("submit", handleTestDriveSubmit);
    if (contactForm) contactForm.addEventListener("submit", handleContactSubmit);
    if (newsletterForm) newsletterForm.addEventListener("submit", handleNewsletterSubmit);

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearFormState(loginForm, loginError);

        const contact = loginContact.value.trim();
        const password = loginPassword.value;

        if (!isContact(contact)) {
          setError(loginError, "Telefon raqam yoki email manzilni to‘g‘ri kiriting.");
          markInvalid(loginContact);
          loginContact.focus();
          return;
        }
        if (password.length < 4) {
          setError(loginError, "Parol kamida 4 belgidan iborat bo‘lishi kerak.");
          markInvalid(loginPassword);
          loginPassword.focus();
          return;
        }

        const saved = loadJSON(KEYS.user, null);
        const matchesSaved =
          saved && saved.contact && String(saved.contact).toLowerCase() === contact.toLowerCase();
        const user = {
          name: matchesSaved ? saved.name : nameFromContact(contact),
          contact,
          createdAt: matchesSaved && saved.createdAt ? saved.createdAt : new Date().toISOString(),
        };
        state.user = user;
        saveJSON(KEYS.user, user);
        saveJSON(KEYS.session, true);
        loginPassword.value = "";
        updateAccountUI();
        closeLayer(authModal);
        toast(`Xush kelibsiz, ${firstName(user.name)}!`, "success");
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearFormState(registerForm, registerError);

        const name = registerName.value.trim();
        const contact = registerContact.value.trim();
        const password = registerPassword.value;

        if (!name || name.length < 2) {
          setError(registerError, "Ismingizni kiriting (kamida 2 belgi).");
          markInvalid(registerName);
          registerName.focus();
          return;
        }
        if (!isPhone(contact)) {
          setError(registerError, "To‘g‘ri telefon raqam kiriting.");
          markInvalid(registerContact);
          registerContact.focus();
          return;
        }
        if (password.length < 4) {
          setError(registerError, "Parol kamida 4 belgidan iborat bo‘lishi kerak.");
          markInvalid(registerPassword);
          registerPassword.focus();
          return;
        }

        const user = {
          name,
          contact,
          createdAt: new Date().toISOString(),
        };
        state.user = user;
        saveJSON(KEYS.user, user);
        saveJSON(KEYS.session, true);
        registerForm.reset();
        updateAccountUI();
        closeLayer(authModal);
        toast(`Hisobingiz yaratildi. Xush kelibsiz, ${firstName(name)}!`, "success");
      });
    }

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    $$(".faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const item = question.closest(".faq-item");
        if (!item) return;
        const willOpen = !item.classList.contains("is-open");
        $$(".faq-item.is-open").forEach((openItem) => {
          openItem.classList.remove("is-open");
          const openQuestion = $(".faq-question", openItem);
          if (openQuestion) openQuestion.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-open", willOpen);
        question.setAttribute("aria-expanded", String(willOpen));
      });
    });

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", requestScrollUpdate);
  }

  function updateScrollUI() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (siteHeader) siteHeader.classList.toggle("is-scrolled", scrollY > 10);
    if (backToTop) backToTop.classList.toggle("is-visible", scrollY > 640);

    const links = $$("[data-nav]")
      .map((link) => ({ link, section: $(link.getAttribute("href")) }))
      .filter((item) => item.section);

    if (links.length) {
      let current = null;
      links.forEach(({ link, section }) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 170 && (!current || top > current.top)) current = { link, top };
      });
      const activeLink = current ? current.link : links[0].link;
      links.forEach(({ link }) => link.classList.toggle("is-active", link === activeLink));
    }
  }

  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScrollUI();
      scrollTicking = false;
    });
  }

  function handleResize() {
    if (window.innerWidth > 1080 && activeLayer === filterPanel) closeLayer(filterPanel);
    if (window.innerWidth > 1180 && activeLayer === mobileNav) closeLayer(mobileNav);
  }

  function initReveal() {
    const items = $$(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  function populateSellBrands() {
    if (!sellBrand) return;
    sellBrand.innerHTML = BRANDS.map(
      (brand) => `<option value="${escapeHTML(brand)}">${escapeHTML(brand)}</option>`
    ).join("");
  }

  function init() {
    allCars = [...loadUserListings(), ...CARS];

    const savedFavorites = loadJSON(KEYS.favorites, []);
    state.favorites = new Set(
      Array.isArray(savedFavorites)
        ? savedFavorites.filter((id) => typeof id === "string" && allCars.some((car) => car.id === id))
        : []
    );

    const savedUser = loadJSON(KEYS.session, false) ? loadJSON(KEYS.user, null) : null;
    if (savedUser && typeof savedUser === "object" && savedUser.name && savedUser.contact) {
      state.user = {
        name: String(savedUser.name),
        contact: String(savedUser.contact),
        createdAt: savedUser.createdAt || new Date().toISOString(),
      };
    }

    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
    if (tdDate) tdDate.min = todayISO();

    populateSellBrands();
    updateBrandOptionCounts();
    renderBrandCards();
    syncFilters();
    renderCars();
    updateFavoriteCounters(false);
    renderFavoritesDrawer();
    updateAccountUI();
    updateTotalListings();
    setAuthTab("login");

    initEvents();
    initReveal();
    updateScrollUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
