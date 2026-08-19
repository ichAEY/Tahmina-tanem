(() => {
  const data = window.SITE_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const renderServiceItems = (items) => items.map((item) => `
    <div class="service-row">
      <span class="service-name">${item.name}</span>
      <span class="service-dots" aria-hidden="true"></span>
      <strong class="service-price">${item.price}</strong>
    </div>
  `).join("");

  const render = () => {
    document.title = `${data.brand.master} — ${data.brand.profession}`;
    const app = $("#app");

    app.innerHTML = `
      <header class="site-header" id="top">
        <div class="container header-inner">
          <a class="brand" href="#top" aria-label="На главную">
            <span class="brand-logo-wrap"><img class="brand-logo" src="${data.brand.logo}" alt="${data.brand.name}"></span>
            <span class="brand-copy">
              <strong>${data.brand.name}</strong>
              <small>${data.brand.master}</small>
            </span>
          </a>
          <nav class="desktop-nav" aria-label="Основная навигация">
            <a href="#services">Услуги и цены</a>
            <a href="#works">Работы</a>
            <a href="#about">О мастере</a>
            <a href="#reviews">Отзывы</a>
            <a href="#visit">Визит</a>
          </nav>
          <a class="header-phone" href="${data.contacts.phoneHref}">${data.contacts.phone}</a>
          <a class="button button-dark header-cta" href="${data.contacts.booking}" target="_blank" rel="noopener">Записаться</a>
          <button class="menu-button" type="button" aria-label="Открыть меню" aria-expanded="false">
            <span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" aria-hidden="true">
          <div class="container mobile-menu-inner">
            <a href="#services">Услуги и цены</a>
            <a href="#works">Работы</a>
            <a href="#about">О мастере</a>
            <a href="#reviews">Отзывы</a>
            <a href="#visit">Визит и контакты</a>
            <a class="mobile-menu-phone" href="${data.contacts.phoneHref}">${data.contacts.phone}</a>
            <a class="button button-dark" href="${data.contacts.booking}" target="_blank" rel="noopener">Записаться онлайн</a>
          </div>
        </div>
      </header>

      <main>
        <section class="hero section-shell">
          <div class="container hero-grid">
            <div class="hero-copy reveal">
              <p class="eyebrow">${data.hero.eyebrow}</p>
              <h1>${data.hero.title}</h1>
              <p class="hero-text">${data.hero.text}</p>
              <div class="hero-actions">
                <a class="button button-dark button-large" href="${data.contacts.booking}" target="_blank" rel="noopener">${data.hero.primaryCta}</a>
                <a class="text-link" href="#services">${data.hero.secondaryCta}<span aria-hidden="true">↘</span></a>
              </div>
              <div class="reputation-strip" aria-label="Рейтинг">
                <div class="rating-badge"><span class="star">★</span><strong>${data.reputation.rating}</strong></div>
                <div>
                  <strong>${data.reputation.source}</strong>
                  <span>${data.reputation.reviews} · ${data.reputation.photos}</span>
                </div>
              </div>
            </div>
            <div class="hero-visual reveal">
              <div class="hero-image-frame">
                <img src="${data.hero.image}" alt="Работа мастера Тахмины" class="hero-image">
                <div class="hero-caption">A.S. Nails · Москва</div>
              </div>
              <div class="floating-card floating-card-top">
                <span class="floating-kicker">Запись</span>
                <strong>Онлайн 24/7</strong>
              </div>
              <div class="floating-card floating-card-bottom">
                <span class="floating-kicker">Направления</span>
                <strong>Маникюр · Педикюр · Подология</strong>
              </div>
            </div>
          </div>
        </section>

        <section class="trust-line">
          <div class="container trust-grid">
            <div><strong>4,9</strong><span>рейтинг на Яндекс Картах</span></div>
            <div><strong>Месяц+</strong><span>стойкость отмечают клиенты</span></div>
            <div><strong>Подология</strong><span>работа с проблемными ногтями</span></div>
            <div><strong>Обучение</strong><span>курсы для мастеров</span></div>
          </div>
        </section>

        <section class="section" id="services">
          <div class="container">
            <div class="section-heading reveal">
              <div>
                <p class="eyebrow">Прайс</p>
                <h2>Услуги и цены</h2>
              </div>
              <p>Основные услуги. Полный список, длительность и доступное время — в онлайн-записи.</p>
            </div>
            <div class="services-layout reveal">
              <div class="service-tabs" role="tablist" aria-label="Категории услуг">
                ${data.services.map((group, i) => `<button class="service-tab ${i === 0 ? "active" : ""}" type="button" data-service-index="${i}" role="tab" aria-selected="${i === 0}">${group.title}</button>`).join("")}
              </div>
              <div class="service-panel">
                <div class="service-panel-head">
                  <h3 id="service-title">${data.services[0].title}</h3>
                  <span>Стоимость</span>
                </div>
                <div id="service-items">${renderServiceItems(data.services[0].items)}</div>
                <a class="button button-outline service-book" href="${data.contacts.booking}" target="_blank" rel="noopener">Открыть полный прайс и запись</a>
              </div>
            </div>
          </div>
        </section>

        <section class="section works-section" id="works">
          <div class="container">
            <div class="section-heading reveal">
              <div>
                <p class="eyebrow">Портфолио</p>
                <h2>Работы Тахмины</h2>
              </div>
              <p>Реальные работы мастера. Нажмите на фотографию, чтобы посмотреть крупнее.</p>
            </div>
            <div class="gallery-grid reveal">
              ${data.gallery.map((image, i) => `
                <button class="gallery-item gallery-item-${(i % 6) + 1}" type="button" data-gallery-index="${i}" aria-label="Открыть фото ${i + 1}">
                  <img src="${image.src}" alt="${image.alt}" loading="lazy">
                </button>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="section about-section" id="about">
          <div class="container about-grid">
            <div class="about-image-wrap reveal">
              <img src="${data.master.image}" alt="${data.master.title}" class="about-image" loading="lazy">
              <div class="about-image-label">${data.brand.name}</div>
            </div>
            <div class="about-copy reveal">
              <p class="eyebrow">О мастере</p>
              <h2>${data.master.title}</h2>
              <p class="about-lead">${data.master.lead}</p>
              ${data.master.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <div class="tag-list">${data.master.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
              <a class="button button-dark" href="${data.contacts.booking}" target="_blank" rel="noopener">Выбрать услугу и время</a>
            </div>
          </div>
        </section>

        <section class="section reviews-section" id="reviews">
          <div class="container">
            <div class="section-heading reveal">
              <div>
                <p class="eyebrow">Отзывы</p>
                <h2>Что отмечают клиенты</h2>
              </div>
              <a class="text-link" href="${data.contacts.yandex}" target="_blank" rel="noopener">Все отзывы на Яндекс Картах<span aria-hidden="true">↗</span></a>
            </div>
            <div class="reviews-grid reveal">
              ${data.reviews.map((review) => `
                <article class="review-card">
                  <div class="review-stars" aria-label="5 звёзд">★★★★★</div>
                  <p>${review.text}</p>
                  <footer>${review.author} <span>· Яндекс Карты</span></footer>
                </article>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="section visit-section" id="visit">
          <div class="container visit-grid">
            <div class="visit-copy reveal">
              <p class="eyebrow">Визит</p>
              <h2>Кабинет у м. Молодёжная</h2>
              <div class="visit-address">
                <strong>${data.location.address}</strong>
                <span>${data.location.details}</span>
                <span>${data.location.metro}</span>
              </div>
              <div class="schedule-list">
                ${data.location.schedule.map((line) => `<span>${line}</span>`).join("")}
              </div>
              <div class="contact-actions">
                <a class="button button-dark" href="${data.contacts.booking}" target="_blank" rel="noopener">Записаться онлайн</a>
                <a class="button button-outline" href="${data.contacts.phoneHref}">Позвонить</a>
              </div>
              <div class="social-links">
                <a href="${data.contacts.telegram}" target="_blank" rel="noopener">Telegram <span>↗</span></a>
                <a href="${data.contacts.yandex}" target="_blank" rel="noopener">Яндекс Карты <span>↗</span></a>
              </div>
            </div>
            <div class="map-card reveal">
              <iframe src="${data.location.mapEmbed}" title="A.S. Nails на карте" loading="lazy" allowfullscreen></iframe>
            </div>
          </div>
        </section>

        <section class="final-cta">
          <div class="container final-cta-inner reveal">
            <div>
              <p class="eyebrow">A.S. Nails</p>
              <h2>Выберите удобное время</h2>
              <p>Онлайн-запись покажет актуальные услуги, стоимость и свободные окна.</p>
            </div>
            <a class="button button-light button-large" href="${data.contacts.booking}" target="_blank" rel="noopener">Записаться к Тахмине</a>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-brand">
            <strong>${data.brand.name}</strong>
            <span>${data.brand.master} · ${data.brand.profession}</span>
          </div>
          <a href="${data.contacts.phoneHref}">${data.contacts.phone}</a>
        </div>
        <div class="container tanem-badge-wrap">
          <a class="tanem-badge" href="${data.footer.tanemUrl}" target="_blank" rel="noopener">
            <span class="tanem-mark">T</span>
            <span><strong>TANEM</strong><small>${data.footer.text}</small></span>
            <span class="tanem-arrow">↗</span>
          </a>
        </div>
      </footer>

      <div class="lightbox" aria-hidden="true" role="dialog" aria-label="Просмотр фотографии">
        <button class="lightbox-close" type="button" aria-label="Закрыть">×</button>
        <button class="lightbox-prev" type="button" aria-label="Предыдущее фото">←</button>
        <img class="lightbox-image" alt="Работа Тахмины">
        <button class="lightbox-next" type="button" aria-label="Следующее фото">→</button>
        <span class="lightbox-counter"></span>
      </div>

      <a class="mobile-sticky-book" href="${data.contacts.booking}" target="_blank" rel="noopener">Записаться онлайн</a>
    `;
  };

  const initNavigation = () => {
    const button = $(".menu-button");
    const menu = $(".mobile-menu");
    if (!button || !menu) return;

    const close = () => {
      button.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    };

    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      if (open) close();
      else {
        button.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
      }
    });

    $$(".mobile-menu a").forEach((link) => link.addEventListener("click", close));
  };

  const initServices = () => {
    const tabs = $$(".service-tab");
    const title = $("#service-title");
    const items = $("#service-items");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const index = Number(tab.dataset.serviceIndex || 0);
        const group = data.services[index];
        tabs.forEach((item) => {
          item.classList.toggle("active", item === tab);
          item.setAttribute("aria-selected", String(item === tab));
        });
        title.textContent = group.title;
        items.innerHTML = renderServiceItems(group.items);
      });
    });
  };

  const initLightbox = () => {
    const lightbox = $(".lightbox");
    const image = $(".lightbox-image");
    const counter = $(".lightbox-counter");
    let current = 0;

    const show = (index) => {
      current = (index + data.gallery.length) % data.gallery.length;
      image.src = data.gallery[current].src;
      image.alt = data.gallery[current].alt;
      counter.textContent = `${current + 1} / ${data.gallery.length}`;
    };

    const open = (index) => {
      show(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };

    const close = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    };

    $$(".gallery-item").forEach((item) => item.addEventListener("click", () => open(Number(item.dataset.galleryIndex || 0))));
    $(".lightbox-close").addEventListener("click", close);
    $(".lightbox-prev").addEventListener("click", () => show(current - 1));
    $(".lightbox-next").addEventListener("click", () => show(current + 1));
    lightbox.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  };

  const initReveal = () => {
    const nodes = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
  };

  const initHeader = () => {
    const header = $(".site-header");
    const sync = () => header.classList.toggle("scrolled", window.scrollY > 16);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
  };

  render();
  initNavigation();
  initServices();
  initLightbox();
  initReveal();
  initHeader();
})();
