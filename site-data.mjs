const bookingUrl = "https://mst.link/studiya_krasoty_asnails/services?cid=p3nnavuopi6gfto7gqmed9fpqk";
const service = (name, price, time = "") => ({ name, price, time, description: "", url: bookingUrl });

export default {
  brand: {
    name: "A. S. NAILS",
    subtitle: "Nail studio",
    monogram: "A",
  },

  master: {
    name: "Тахмина",
    dative: "Тахмине",
    genitive: "Тахмины",
    monogram: "T",
    profession: "мастер маникюра, педикюра и подологии",
    heroTitle: "Тахмина — мастер маникюра, педикюра и подологии",
    heroCopy: "Маникюр, педикюр и подология с аккуратной обработкой, вниманием к состоянию ногтей и индивидуальным подходом.",
    experienceYears: "3+",
    experienceAria: "Более трёх лет опыта",
    aboutTitle: "Тахмина — мастер A. S. NAILS",
    aboutLead: "Я Тахмина — мастер маникюра, педикюра и подологии.",
    aboutParagraphs: [
      "Работаю с маникюром, педикюром, наращиванием и сложными случаями ногтей и стоп. Клиенты отдельно отмечают аккуратность, стойкость покрытия и внимательное отношение.",
      "Перед процедурой обсуждаем желаемый результат и подбираем подходящий формат ухода. Также провожу индивидуальные занятия и обучение мастеров ногтевого сервиса.",
    ],
    skills: ["Маникюр и педикюр", "Подология", "Индивидуальное обучение"],
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
    personalTelegramUrl: "https://t.me/+79090967222?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F.",
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
    beforeAfter: [],
    gallery: Array.from({ length: 13 }, (_, index) => ({
      src: `/assets/tahmina/portfolio/${String(index + 1).padStart(2, "0")}.jpg`,
      alt: `Работа Тахмины — фото ${index + 1}`,
    })),
  },

  services: {
    manicure: [
      service("Luxe Shine + маникюр", "от 2 600 ₽", "1 ч"),
      service("Дизайн 1-го ногтя", "от 150 ₽", "5 мин"),
      service("Коррекция наращенных ногтей", "от 4 500 ₽", "2 ч"),
      service("Маникюр без покрытия", "от 1 800 ₽", "1 ч"),
      service("Маникюр всё включено (выравнивание, укрепление гелем)", "от 3 500 ₽", "1 ч 30 мин"),
      service("Маникюр детский", "от 1 000 ₽", "30 мин"),
      service("Маникюр мужской", "от 2 000 ₽", "1 ч"),
      service("Наращивание гель/акрил", "от 5 500 ₽", "2 ч 30 мин"),
      service("Покрытие ногтей лаком (без маникюра)", "от 1 200 ₽", "20 мин"),
      service("Ремонт 1-го ногтя", "от 200 ₽", "10 мин"),
      service("Снятие без последующего покрытия", "от 700 ₽", "15 мин"),
      service("Френч", "от 500 ₽", "15 мин"),
    ],

    pedicure: [
      service("Luxe Shine + Smart педикюр", "от 3 800 ₽", "1 ч 15 мин"),
      service("Luxe Shine + педикюр пальчики", "от 2 800 ₽", "1 ч"),
      service("Обработка пальчиков без покрытия", "от 2 000 ₽", "1 ч"),
      service("Педикюр детский (обработка ногтей)", "от 1 000 ₽", "30 мин"),
      service("Педикюр комби/аппаратный без покрытия", "от 3 200 ₽", "1 ч"),
      service("Педикюр комби/аппаратный + гель-лак (всё включено)", "от 4 000 ₽", "1 ч 30 мин"),
      service("Педикюр комби/аппаратный с покрытием гель-лак (пальчики)", "от 3 000 ₽", "1 ч"),
      service("Педикюр мужской", "от 3 500 ₽", "1 ч"),
      service("Снятие гель-лака на ногах без последующего покрытия", "от 500 ₽", "20 мин"),
    ],

    podology: [
      service("Обработка вросшего ногтя", "от 1 500 ₽", "1 ч"),
      service("Педикюр медицинский", "от 3 700 ₽", "1 ч 30 мин"),
      service("Протезирование ногтя", "от 1 000 ₽", "15 мин"),
      service("Удаление мозоли", "от 800 ₽", "30 мин"),
      service("Установка Лайт системы", "от 3 000 ₽", "30 мин"),
      service("Установка титановой нити", "от 3 000 ₽", "30 мин"),
    ],

    training: [
      service("Индивидуальные занятия", "от 18 000 ₽", "6 ч"),
      service("Курс «Мастер с нуля»", "от 35 000 ₽", "12 ч"),
      service("Курс по наращиванию ногтей", "от 18 000 ₽", "12 ч"),
      service("Курс повышения квалификации", "от 15 000 ₽", "12 ч"),
    ],
  },

  reviews: [
    { text: "Тахмина — настоящий профессионал своего дела. Внимательная, аккуратная, быстрая, тактичная.", author: "Белова Ирина" },
    { text: "Хожу на маникюр и педикюр к Тахмине около года. Покрытие держится долго, большая палитра цветов, в студии очень уютно.", author: "Светлана К." },
    { text: "Мой любимый инструктор Тахмина Джабарова. Благодарю за курс «Смарт-педикюр».", author: "Жусупова А." },
  ],

  promotions: [],

  amenities: [
    { title: "Подология", text: "Работа со сложными случаями ногтей и стоп" },
    { title: "Большая палитра", text: "Много оттенков и вариантов дизайна" },
    { title: "Обучение", text: "Индивидуальные занятия для мастеров" },
  ],

  seo: {
    title: "Тахмина | A. S. NAILS — маникюр, педикюр и подология",
    description: "Маникюр, педикюр и подология у Тахмины в Москве, метро Молодёжная.",
    keywords: ["маникюр Молодёжная", "педикюр Молодёжная", "подолог Молодёжная", "Тахмина маникюр", "A. S. NAILS"],
    locale: "ru_RU",
  },

  analytics: {
    yandexMetrikaId: "111617452",
  },
};
