/* ==========================================================
   PRO CLEAN MOBILE KENITRA — script.js (JavaScript natif)
   1. Header & menu mobile      4. Animations au scroll
   2. Navigation (scroll lisse) 5. Avant / Après (images absentes)
   3. Langue FR / AR            6. Divers
   ========================================================== */
(function () {
  'use strict';

  var WA_NUMBER = '212720433639';           // format international, sans « + »
  var HEADER_H = 64;                        // hauteur du header après défilement (px)

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var overlay = document.getElementById('navOverlay');
  var links = document.querySelectorAll('.nav__link');
  var currentLang = 'fr';

  /* ======================================================
     3. TRADUCTIONS (le français = le texte déjà présent dans le HTML)
     ====================================================== */
  var BDI = '<bdi dir="ltr">PRO CLEAN MOBILE KENITRA</bdi>';
  var AR = {
    /* Navigation */
    'logo.aria': 'PRO CLEAN MOBILE KENITRA - الرئيسية',
    'logo.img.alt': 'شعار PRO CLEAN MOBILE KENITRA',
    'nav.aria': 'التنقل الرئيسي',
    'lang.aria': 'اللغة',
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.gallery': 'المعرض',
    'nav.reviews': 'التقييمات',
    'nav.contact': 'اتصل بنا',
    'cta.wa': 'الحجز عبر واتساب',
    'cta.reserve': 'احجز',
    'wa.aria': 'احجز عبر واتساب',

    /* Hero */
    'hero.eyebrow': '[ غسيل السيارات في المنزل · القنيطرة ]',
    'hero.title': 'سيارتك تستحق تنظيفاً استثنائياً.',
    'hero.sub': 'تقدم لك ' + BDI + ' غسيلاً احترافياً مباشرة عند منزلك في القنيطرة.',
    'hero.btn1': 'احجز الآن',
    'hero.btn2': 'اكتشف خدماتنا',
    'hero.alt': 'غسيل احترافي للسيارات في المنزل بالقنيطرة',

    /* Services */
    'sv.eyebrow': '[ خدماتنا ]',
    'sv.title': 'الخدمات التي نقدمها',
    'sv.sub': 'خدمات احترافية للحفاظ على نظافة سيارتك وحسن صيانتها.',
    'sv1.t': 'غسيل السيارات في المنزل',
    'sv1.d': 'تنظيف شامل لسيارتك يتم مباشرة عند منزلك في القنيطرة.',
    'sv1.alt': 'غسيل السيارات في المنزل بالقنيطرة',
    'sv2.t': 'التوصيل',
    'sv2.d': 'خدمة عملية تصلك أينما كنت، دون الحاجة إلى التنقل.',
    'sv2.alt': 'خدمة التوصيل من PRO CLEAN MOBILE KENITRA',
    'sv3.t': 'تلميع هيكل السيارة',
    'sv3.d': 'تلميع متقن يعيد اللمعان والبريق إلى طلاء سيارتك.',
    'sv3.alt': 'تلميع هيكل السيارة',
    'sv4.t': 'تنظيف داخل السيارة بالمكنسة الكهربائية',
    'sv4.d': 'تنظيف عميق للمقاعد والسجاد والمقصورة للحصول على داخل منعش ونظيف.',
    'sv4.alt': 'تنظيف داخل السيارة بالمكنسة الكهربائية',
    'sv5.t': 'تمرير المكنسة الكهربائية',
    'sv5.d': 'تمرير فعّال للمكنسة الكهربائية لإزالة الغبار والأوساخ من السيارة.',
    'sv5.alt': 'تمرير المكنسة الكهربائية',
    'sv6.t': 'الصقل',
    'sv6.d': 'صقل احترافي لتحسين مظهر هيكل سيارتك.',
    'sv6.alt': 'صقل السيارات',
    'sv7.t': 'التجديد الجمالي للسيارات',
    'sv7.d': 'امنح سيارتك مظهراً أنيقاً بفضل إعادة تأهيلها جمالياً.',
    'sv7.alt': 'التجديد الجمالي للسيارات',
    'sv.cta.t': 'هل تحتاج إلى غسيل لسيارتك؟',
    'sv.cta.d': 'تواصل معنا لترتيب التدخل في منزلك.',
    'sv.cta.btn': 'اتصل على <span class="num" dir="ltr">+212 720-433639</span>',

    /* Avant / Après */
    'ba.eyebrow': '[ نتائجنا ]',
    'ba.title': 'قبل وبعد',
    'ba.sub': 'اكتشف الفرق والنتيجة بعد خدمات التنظيف الاحترافية.',
    'ba.alt1': 'مقارنة قبل وبعد التنظيف، المثال 1',
    'ba.alt2': 'مقارنة قبل وبعد التنظيف، المثال 2',
    'ba.alt3': 'مقارنة قبل وبعد التنظيف، المثال 3',
    'ba.ph': 'صورة قبل / بعد يجب إضافتها:',

    /* À propos */
    'ab.eyebrow': '[ من نحن ]',
    'ab.title': 'متخصصكم في غسيل السيارات بالقنيطرة',
    'ab.text': 'في ' + BDI + ' نضع خبرتنا في خدمة سيارتك. استفد من تنظيف احترافي وصيانة عالية الجودة لسيارتك، مباشرة عند منزلك.',
    'ab.l1.t': 'غسيل في المنزل',
    'ab.l1.d': 'نتنقل إليك مباشرة في منزلك بالقنيطرة.',
    'ab.l2.t': 'عناية عالية الجودة',
    'ab.l2.d': 'تنظيف متقن للسيارة من الخارج ومن الداخل.',
    'ab.btn': 'تواصل معنا',
    'ab.alt': 'PRO CLEAN MOBILE KENITRA - متخصص في غسيل السيارات بالقنيطرة',

    /* Process */
    'pr.eyebrow': '[ كيف نعمل ]',
    'pr.title': 'غسيل سيارتك في ثلاث خطوات',
    'pr.s1.t': 'الحجز',
    'pr.s1.d': 'تواصل معنا عبر الهاتف أو واتساب.',
    'pr.s2.t': 'التدخل',
    'pr.s2.d': 'ننظم تنظيف سيارتك عند منزلك.',
    'pr.s3.t': 'النتيجة',
    'pr.s3.d': 'استمتع بسيارة نظيفة وبحالة ممتازة.',

    /* Why */
    'wy.eyebrow': '[ لماذا تختارنا ]',
    'wy.title': 'لماذا تختار ' + BDI + '؟',
    'wy.1.t': 'غسيل في المنزل',
    'wy.1.d': 'نأتي إليك حيث توجد سيارتك.',
    'wy.2.t': 'تنظيف احترافي',
    'wy.2.d': 'عمل متقن للداخل والخارج.',
    'wy.3.t': 'صيانة السيارات',
    'wy.3.d': 'عناية عالية الجودة للحفاظ على مظهر سيارتك.',
    'wy.4.t': 'خدمات مناسبة',
    'wy.4.d': 'خدمات تلبي احتياجات كل زبون.',

    /* Galerie */
    'ga.eyebrow': '[ المعرض ]',
    'ga.title': 'خبرتنا في صور',
    'ga.sub': 'لمحة عن خدماتنا.',
    'ga.c1': 'غسيل خارجي',
    'ga.c2': 'تنظيف داخلي',
    'ga.c3': 'الصقل',
    'ga.c4': 'عناية احترافية بالتفاصيل',
    'ga.c5': 'سيارة لامعة',
    'ga.a1': 'غسيل خارجي لسيارة',
    'ga.a2': 'تنظيف داخلي لسيارة',
    'ga.a3': 'صقل هيكل السيارة',
    'ga.a4': 'عناية احترافية بتفاصيل السيارة',
    'ga.a5': 'سيارة نظيفة ولامعة',

    /* Avis */
    'rv.eyebrow': '[ آراء الزبناء ]',
    'rv.title': 'ما يقوله زبناؤنا على Google',
    'rv.count': 'تقييمات Google',
    'rv.label': 'اكتشف آراء زبنائنا',
    'rv.btn': 'عرض جميع التقييمات على Google',
    'rv.q1': '« خدمة جيدة 👍 »',
    'rv.q3': '« بارك الله فيه، خدمته ممتازة ولا غبار عليها 👌 »',
    'rv.g': 'تقييم على Google',

    /* Contact */
    'ct.eyebrow': '[ اتصل بنا ]',
    'ct.title': 'احجز غسيل سيارتك في المنزل',
    'ct.phone': 'الهاتف',
    'ct.wa': 'واتساب',
    'ct.loc': 'الموقع',
    'ct.loc.v': 'القنيطرة، المغرب<br><small>عرض على خرائط Google</small>',
    'ct.insta': 'إنستغرام',
    'ct.btn1': 'احجز عبر واتساب',
    'ct.btn2': 'اتصل الآن',

    /* Footer */
    'ft.about': '<bdi dir="ltr">PRO CLEAN MOBILE KENITRA</bdi>: غسيل احترافي للسيارات في المنزل بالقنيطرة.',
    'ft.nav': 'التنقل',
    'ft.services': 'الخدمات',
    'ft.s4': 'تنظيف الداخل',
    'ft.s6': 'التجديد الجمالي',
    'ft.contact': 'اتصل بنا',
    'ft.loc': 'القنيطرة، المغرب',
    'ft.maps': 'خرائط Google',
    'ft.copy': '© <span id="year">2026</span> <bdi dir="ltr">PRO CLEAN MOBILE KENITRA</bdi>. جميع الحقوق محفوظة.'
  };
  var META = {
    fr: {
      title: 'PRO CLEAN MOBILE KENITRA | Lavage auto à domicile',
      desc: 'PRO CLEAN MOBILE KENITRA : lavage automobile professionnel et detailing directement à domicile à Kénitra. Réservez par téléphone ou WhatsApp.',
      wa: 'Bonjour PRO CLEAN MOBILE KENITRA, je souhaite réserver un lavage à domicile.',
      open: 'Ouvrir le menu', close: 'Fermer le menu'
    },
    ar: {
      title: 'PRO CLEAN MOBILE KENITRA | غسيل السيارات في المنزل بالقنيطرة',
      desc: 'PRO CLEAN MOBILE KENITRA: غسيل احترافي للسيارات والعناية بالتفاصيل مباشرة عند منزلك في القنيطرة. احجز عبر الهاتف أو واتساب.',
      wa: 'مرحباً PRO CLEAN MOBILE KENITRA، أرغب في حجز غسيل لسيارتي في المنزل.',
      open: 'فتح القائمة', close: 'إغلاق القائمة'
    }
  };

  /* Mémorise le texte français d'origine de chaque élément traduisible */
  var i18nNodes = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var attrNodes = [].slice.call(document.querySelectorAll('[data-i18n-attr]'));
  i18nNodes.forEach(function (el) { el._fr = el.innerHTML; });
  attrNodes.forEach(function (el) {
    el._frAttr = {};
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var p = pair.split('=');
      if (p.length === 2) el._frAttr[p[0].trim()] = { key: p[1].trim(), fr: el.getAttribute(p[0].trim()) };
    });
  });
  var metaDesc = document.querySelector('meta[name="description"]');

  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function updateBurgerLabel() {
    if (!burger) return;
    var open = nav && nav.classList.contains('open');
    burger.setAttribute('aria-label', open ? META[currentLang].close : META[currentLang].open);
  }

  function applyLang(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'fr';
    var isAr = currentLang === 'ar';
    var root = document.documentElement;
    root.lang = currentLang;
    root.dir = isAr ? 'rtl' : 'ltr';

    i18nNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = (isAr && AR[key] !== undefined) ? AR[key] : el._fr;
    });
    attrNodes.forEach(function (el) {
      Object.keys(el._frAttr).forEach(function (name) {
        var d = el._frAttr[name];
        el.setAttribute(name, (isAr && AR[d.key] !== undefined) ? AR[d.key] : d.fr);
      });
    });

    /* Liens WhatsApp : même numéro, message dans la langue choisie */
    var href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(META[currentLang].wa);
    [].forEach.call(document.querySelectorAll('[data-wa]'), function (a) { a.setAttribute('href', href); });

    document.title = META[currentLang].title;
    if (metaDesc) metaDesc.setAttribute('content', META[currentLang].desc);

    [].forEach.call(document.querySelectorAll('.lang__btn'), function (b) {
      var on = b.getAttribute('data-lang') === currentLang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    setYear();
    updateBurgerLabel();
    try { localStorage.setItem('pcm-lang', currentLang); } catch (e) { /* stockage indisponible */ }
  }

  [].forEach.call(document.querySelectorAll('.lang__btn'), function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ======================================================
     1. HEADER COLLANT + MENU MOBILE
     ====================================================== */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    if (!burger || !nav) return;
    nav.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    updateBurgerLabel();
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1000) setMenu(false); });

  /* ======================================================
     2. NAVIGATION : défilement lisse vers la bonne section
     Le titre de la section arrive toujours sous le header, jamais caché derrière.
     ====================================================== */
  function revealIn(el) {
    [].forEach.call(el.querySelectorAll('.reveal'), function (r) { r.classList.add('visible'); });
    if (el.classList.contains('reveal')) el.classList.add('visible');
  }

  function scrollToTarget(target, smooth) {
    var top;
    if (target.id === 'accueil') {
      top = 0;
    } else {
      var padTop = parseFloat(getComputedStyle(target).paddingTop) || 0;
      /* place le début du contenu à ~24px sous le header */
      top = target.getBoundingClientRect().top + window.pageYOffset + padTop - HEADER_H - 24;
      if (padTop === 0) top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_H - 8;
    }
    window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    setMenu(false);                       // ferme le menu mobile et rend le scroll au body
    revealIn(target);                     // la section est visible dès l'arrivée
    scrollToTarget(target, true);
    try { history.pushState(null, '', id); } catch (err) { /* ignoré (ex. aperçu isolé) */ }
  });

  /* Lien actif selon la section affichée */
  var sections = [];
  links.forEach(function (l) {
    var id = l.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var s = document.querySelector(id);
      if (s) sections.push({ link: l, el: s });
    }
  });
  function setActive() {
    var pos = window.scrollY + HEADER_H + 80;
    var current = sections[0];
    sections.forEach(function (s) { if (s.el.offsetTop <= pos) current = s; });
    /* bas de page : Contact actif */
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ======================================================
     4. ANIMATIONS D'APPARITION AU SCROLL
     ====================================================== */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ======================================================
     5. AVANT / APRÈS : cadre de remplacement si l'image est absente
     (aucune image n'est générée : vous déposez vos fichiers dans /images)
     ====================================================== */
  [].forEach.call(document.querySelectorAll('.ba__card img'), function (img) {
    var card = img.closest('.ba__card');
    function missing() { card.classList.add('is-missing'); }
    function present() { card.classList.remove('is-missing'); }
    img.addEventListener('error', missing);
    img.addEventListener('load', present);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) missing();
  });

  /* ======================================================
     6. DIVERS : effet ripple léger sur les boutons
     ====================================================== */
  [].forEach.call(document.querySelectorAll('.btn'), function (btn) {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect();
      var d = Math.max(r.width, r.height);
      var s = document.createElement('span');
      s.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;background:rgba(255,255,255,.35);' +
        'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px;' +
        'transform:scale(0);opacity:1;transition:transform .5s ease,opacity .6s ease;';
      btn.appendChild(s);
      requestAnimationFrame(function () { s.style.transform = 'scale(2.2)'; s.style.opacity = '0'; });
      setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 650);
    });
  });

  /* ---- Initialisation : français par défaut, sinon dernier choix du visiteur ---- */
  setYear();
  var saved = null;
  try { saved = localStorage.getItem('pcm-lang'); } catch (e) { saved = null; }
  if (saved === 'ar') applyLang('ar');

  /* Lien direct (ex. index.html#contact) : arrive au bon endroit, titre visible */
  if (location.hash.length > 1) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) { revealIn(t); window.addEventListener('load', function () { scrollToTarget(t, false); }); }
  }
})();