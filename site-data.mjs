const bookingUrl = "https://mst.link/studiya_krasoty_asnails";
const service = (name, price, time, description = "") => ({ name, price, time, description, url: bookingUrl });

export default {
  brand: {
    name: "A.S. Nails",
    subtitle: "Nail studio",
    monogram: "A",
  },

  master: {
    name: "Тахмина",
    dative: "Тахмине",
    genitive: "Тахмины",
    monogram: "T",
    profession: "мастер ногтевого сервиса и подолог",
    heroTitle: "Тахмина — мастер ногтевого сервиса и подолог",
    heroCopy: "Маникюр, педикюр, подология и наращивание с аккуратной обработкой и вниманием к состоянию ногтей.",
    experienceYears: "3+",
    experienceAria: "Более трёх лет опыта",
    aboutTitle: "Тахмина — мастер A.S. Nails",
    aboutLead: "Я Тахмина — мастер ногтевого сервиса, педикюра и подологии.",
    aboutParagraphs: [
      "Работаю с маникюром, педикюром, наращиванием и сложными случаями ногтей и стоп. Клиенты отдельно отмечают аккуратность, стойкость покрытия и внимательное отношение.",
      "Перед процедурой обсуждаем желаемый результат и подбираем подходящий формат ухода. Также провожу обучение мастеров ногтевого сервиса.",
    ],
    skills: ["Маникюр и педикюр", "Подология", "Наращивание и обучение"],
  },

  location: {
    city: "Москва",
    metro: "м. Молодёжная",
    cityMetro: "Москва · м. Молодёжная",
    address: "Москва, Оршанская улица, 5, 3 этаж, кабинет 317",
    mapCardAddress: "Оршанская улица, 5, кабинет 317",
    schedule: "пн–пт 09:00–21:00 · сб 10:00–21:00 · вс 11:00–21:00",
    scheduleCapitalized: "Пн–пт 09:00–21:00 · сб 10:00–21:00 · вс 11:00–21:00",
    latitude: 55.740568,
    longitude: 37.408390,
  },

  contacts: {
    phoneDisplay: "+7 909 096-72-22",
    phoneHref: "tel:+79090967222",
    personalTelegramUrl: "https://t.me/A_S_Nails22kuntsevo",
    channelTelegramUrl: "https://t.me/A_S_Nails22kuntsevo",
  },

  links: {
    bookingUrl,
    bookingWidgetScriptUrl: "/noop.js",
    reviewsUrl: "https://yandex.com/maps/org/nogtevaya_studiya/46030914484/reviews/",
    mapUrl: "https://yandex.com/maps/org/nogtevaya_studiya/46030914484/?ll=37.408390%2C55.740568&z=17",
    routeUrl: "https://yandex.ru/maps/?mode=routes&rtext=~55.740568%2C37.408390&rtt=auto",
    mobileMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.408390%2C55.740568&mode=search&oid=46030914484&ol=biz&z=17",
    desktopMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.408390%2C55.740568&mode=search&oid=46030914484&ol=biz&z=17",
    yandexMapHrefMatch: "yandex.com/maps/org/nogtevaya_studiya",
  },

  reputation: {
    rating: "4,9",
    reviewCount: "38",
  },

  images: {
    portrait: "/assets/tahmina/master.jpg",
    about: "/assets/tahmina/master.jpg",
    favicon: "/assets/tahmina/logo.jpg",
    beforeAfter: [
      { src: "/assets/tahmina/portfolio/01.jpg", alt: "Работа Тахмины — аккуратный маникюр" },
      { src: "/assets/tahmina/portfolio/02.jpg", alt: "Работа Тахмины — ногтевой сервис" },
    ],
    gallery: Array.from({ length: 13 }, (_, index) => ({
      src: `/assets/tahmina/portfolio/${String(index + 1).padStart(2, "0")}.jpg`,
      alt: `Работа Тахмины — фото ${index + 1}`,
    })),
  },

  services: {
    manicure: [
      service("Маникюр", "от 1 800 ₽", "по записи", "Аккуратная обработка ногтей и кутикулы."),
      service("Маникюр — всё включено", "3 500 ₽", "по записи", "Комплексная процедура с покрытием."),
      service("Luxe Shine + маникюр", "2 600 ₽", "по записи", "Маникюр и уход Luxe Shine."),
      service("Наращивание ногтей", "5 500 ₽", "по записи", "Моделирование длины и формы ногтей."),
      service("Мужской маникюр", "по записи", "по записи"),
      service("Детский маникюр", "по записи", "по записи"),
    ],
    pedicure: [
      service("Педикюр", "от 3 200 ₽", "по записи", "Обработка пальцев и стоп."),
      service("Педикюр с покрытием", "4 000 ₽", "по записи", "Педикюр и покрытие."),
      service("Медицинский педикюр", "3 700 ₽", "по записи", "Профессиональная обработка стоп и ногтей."),
      service("Обработка вросшего ногтя", "по записи", "по записи"),
      service("Обработка мозолей", "по записи", "по записи"),
      service("Протезирование ногтя", "по записи", "по записи"),
      service("Титановая нить", "по записи", "по записи"),
    ],
  },

  reviews: [
    { text: "Тахмина — настоящий профессионал своего дела. Внимательная, аккуратная, быстрая, тактичная.", author: "Белова Ирина" },
    { text: "Хожу на маникюр и педикюр к Тахмине около года. Покрытие держится долго, большая палитра цветов, в студии очень уютно.", author: "Светлана К." },
    { text: "Мой любимый инструктор Тахмина Джабарова. Благодарю за курс «Смарт-педикюр».", author: "Жусупова А." },
  ],

  promotions: [
    {
      title: "Онлайн-запись",
      highlight: "Выберите удобное время",
      description: "Актуальное расписание и свободные окна доступны в онлайн-записи.",
      period: "доступно онлайн",
      image: "/assets/tahmina/portfolio/03.jpg",
      alt: "Работа Тахмины",
    },
    {
      title: "Обучение мастеров",
      highlight: "Практические курсы",
      description: "Тахмина также проводит обучение мастеров ногтевого сервиса и педикюра.",
      period: "по предварительной записи",
      image: "/assets/tahmina/portfolio/04.jpg",
      alt: "Работа Тахмины",
    },
  ],

  amenities: [
    { title: "Подология", text: "Работа со сложными случаями ногтей и стоп" },
    { title: "Большая палитра", text: "Много оттенков и вариантов дизайна" },
    { title: "Онлайн-запись", text: "Свободное время можно выбрать самостоятельно" },
  ],

  seo: {
    title: "Тахмина | A.S. Nails — маникюр, педикюр и подология",
    description: "Маникюр, педикюр и подология у Тахмины в Москве, метро Молодёжная.",
    keywords: ["маникюр Молодёжная", "педикюр Молодёжная", "подолог Молодёжная", "Тахмина маникюр", "A.S. Nails"],
    locale: "ru_RU",
  },

  analytics: {
    yandexMetrikaId: "111617452",
  },
};
