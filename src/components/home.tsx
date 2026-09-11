"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  content,
  images,
  navigation,
  partners,
  siteConfig,
  testimonial,
} from "@/lib/site";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "↖"}
    </span>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [22, 0], opacity: [0.6, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Label({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      {children}
    </div>
  );
}
function Destination({
  url,
  children,
  className = "",
  kind = "contact",
}: {
  url: string;
  children: ReactNode;
  className?: string;
  kind?: "store" | "contact";
}) {
  const [notice, setNotice] = useState(false);
  if (url)
    return (
      <a
        className={className}
        href={url}
        target={url.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> — يفتح في نافذة جديدة</span>
      </a>
    );
  return (
    <span className="destination">
      <button
        className={className}
        onClick={() => setNotice(!notice)}
        aria-expanded={notice}
      >
        {children}
      </button>
      {notice && (
        <span role="status" className="destination-notice">
          {kind === "store"
            ? "رابط المتجر غير متاح حاليًا. يرجى العودة لاحقًا."
            : "قنوات التواصل غير متاحة حاليًا. يرجى العودة لاحقًا."}
        </span>
      )}
    </span>
  );
}
function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${light ? "light" : ""}`}
      aria-label="فائض — الرئيسية"
    >
      <Image src="/images/mark-transparent.png" width={47} height={48} alt="" />
      <span>
        فائض<span className="brand-en">FAYID</span>
      </span>
    </a>
  );
}
function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }),
      { rootMargin: "-20% 0px -55% 0px" },
    );
    navigation.forEach((item) => {
      const node = document.querySelector(item.href);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (open) {
      menu.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      menu.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner">
        <Brand />
        <nav aria-label="التنقل الرئيسي" className="desktop-nav">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact">تواصل معنا</a>
        </nav>
        <Destination
          url={siteConfig.storeUrl}
          className="header-store"
          kind="store"
        >
          تسوّق الآن <Arrow diagonal />
        </Destination>
        <button
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-label="فتح القائمة"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </div>
      <dialog
        ref={menu}
        id="mobile-menu"
        className="mobile-menu"
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="drawer">
          <div className="drawer-top">
            <Brand />
            <button onClick={() => setOpen(false)} aria-label="إغلاق القائمة">
              ×
            </button>
          </div>
          <nav aria-label="التنقل على الجوال">
            {[...navigation, { label: "تواصل معنا", href: "#contact" }].map(
              (item, i) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                  <Arrow />
                </a>
              ),
            )}
          </nav>
          <p>من فائض إلى قيمة.</p>
        </div>
      </dialog>
    </header>
  );
}
function Hero() {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <section
      id="home"
      className="hero"
      ref={target}
      aria-labelledby="hero-title"
    >
      <div className="hero-top">
        <span>
          من المملكة العربية السعودية
        </span>
        <span dir="ltr">A NEW CYCLE OF VALUE</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 id="hero-title">
            <span>{content.hero.line1}</span>
            <span className="hero-last">
              {content.hero.line2}
            </span>
          </h1>
          <p className="hero-description">{content.hero.description}</p>
          <a className="text-link" href="#about">
            اكتشف الحكاية{" "}
            <span className="circle-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
        <motion.div className="hero-image" style={{ y: reduced ? 0 : y }}>
          <Image
            src={images.rack.src}
            alt={images.rack.alt}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 52vw"
          />
          <div className="image-shade" />
          <div className="image-caption">
            <span dir="ltr">01 — A SECOND CHANCE</span>
          </div>
          <div className="hanging-tag">
            <span dir="ltr">FAYID / فائض</span>
            <b>
              فرصة
              <br />
              جديدة.
            </b>
            <span className="tag-rule" />
            <span>للأشياء الجيّدة بقية.</span>
            <div className="barcode" />
          </div>
        </motion.div>
        <span className="hero-side" aria-hidden="true" dir="ltr">
          SURPLUS IS ONLY THE BEGINNING.
        </span>
      </div>
      <div className="hero-bottom">
        <span>المخزون يتغيّر. القيمة تستمر.</span>
        <a href="#journey">
          دورة جديدة تبدأ هنا <span aria-hidden="true">↓</span>
        </a>
        <span dir="ltr">EST. IN SAUDI ARABIA</span>
      </div>
    </section>
  );
}
function Journey() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStep(Math.min(3, Math.max(0, Math.floor(v * 4)))),
  );
  return (
    <section id="journey" className="journey section-shell" ref={ref}>
      <div className="journey-heading">
        <Label number="02">كيف نعمل</Label>
        <div className="journey-heading-copy">
          <h2>
            نفس القطعة.
            <br />
            <span>احتمال جديد.</span>
          </h2>
          <p>
            نصل بين المخزون غير المباع
            <br />
            وفرصته التالية في السوق.
          </p>
        </div>
      </div>
      <div className="journey-layout">
        <div className="journey-sticky">
          <div className="journey-photo">
            <Image
              src={images.rack.src}
              alt="أزياء جاهزة لفرصة جديدة في السوق"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
            <motion.div
              className="journey-overlay"
              animate={{ opacity: step === 1 || step === 3 ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.65 }}
            >
              <Image
                src={images.folded.src}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
              />
            </motion.div>
            <span className="journey-word" aria-hidden="true">
              {content.journey[step].word}
              <span>.</span>
            </span>
            <div className="journey-caption">
              <span>{content.journey[step].caption}</span>
              <span dir="ltr">0{step + 1} / 04</span>
            </div>
          </div>
          <div className="journey-progress" aria-hidden="true">
            {content.journey.map((_, index) => (
              <span key={index} className={index <= step ? "filled" : ""} />
            ))}
          </div>
        </div>
        <div className="journey-steps">
          {content.journey.map((item, index) => (
            <article
              key={item.title}
              className={`journey-step ${step === index ? "current" : ""}`}
            >
              <span className="step-index" dir="ltr">
                0{index + 1}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="step-arrow" aria-hidden="true">
                ↓
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        تخطّ إلى المحتوى
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <section id="about" className="about section-shell">
          <Label number="01">الفائض، بنظرة مختلفة</Label>
          <div className="about-grid">
            <Reveal>
              <h2>
                {content.about.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <div className="about-note">
                <span className="small-mark" aria-hidden="true">
                  ↖
                </span>
                <span>
                  الفائض ليس نهاية المنتج.
                  <br />
                  بل بداية دورنا.
                </span>
              </div>
            </Reveal>
            <div>
              <p className="large-body">{content.about.text}</p>
              <div className="problem-list">
                {content.about.problems.map((problem, i) => (
                  <div key={problem}>
                    <span dir="ltr">0{i + 1}</span>
                    <p>{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Journey />
        <section className="audience section-shell" id="audience">
          <Label number="03">قيمة نتشاركها</Label>
          <div className="audience-layout">
            <Reveal>
              <h2>
                فرصة واحدة.
                <br />
                قيمة لأكثر
                <br />
                من طرف.
              </h2>
              <p>
                من يملك المخزون، ومن يحتاج المنتج.
                <br />
                نجمعهما في دورة تصنع الفرق.
              </p>
            </Reveal>
            <div className="audience-list">
              {content.audiences.map((item, i) => (
                <Reveal key={item.title}>
                  <article>
                    <span className="audience-index" dir="ltr">
                      0{i + 1}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <Arrow />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="impact" id="impact">
          <div className="impact-image">
            <Image
              src={images.folded.src}
              alt={images.folded.alt}
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
            <div className="impact-image-label">
              ما صُنع بعناية،
              <br />
              يستحق أن يستمر.
            </div>
          </div>
          <div className="impact-copy">
            <Label number="04">أثر يمتد</Label>
            <Reveal>
              <h2>
                قيمة اقتصادية.
                <br />
                <span>هدر أقل.</span>
              </h2>
            </Reveal>
            <p className="impact-intro">
              تصريف الفائض يعني هدرًا أقل، وقيمة اقتصادية أكبر من نفس
              الموارد.
            </p>
            <div className="impact-list">
              {content.impact.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            {siteConfig.impactMetrics.length > 0 && (
              <div className="metrics">
                {siteConfig.impactMetrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                    <small>{metric.source}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="partners section-shell" id="partners">
          <div className="partners-heading">
            <Label number="05">شركاء النجاح</Label>
            <p>جهات شاركت فائض خطواته الأولى.</p>
          </div>
          <div className="partners-rail">
            <div className="partners-track">
              {[...partners, ...partners].map((partner, i) => (
                <div className="partner-mark" key={`${partner.name}-${i}`}>
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={160}
                      height={80}
                    />
                  ) : (
                    <span className="partner-type">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="testimonial section-shell" id="testimonial">
          <Label number="06">آراء وإشادات</Label>
          <Reveal>
            <h2 className="testimonial-heading">قالوا عن فائض</h2>
          </Reveal>
          <Reveal>
            <blockquote className="testimonial-quote">
              <span className="quote-mark" aria-hidden="true">
                ”
              </span>
              <p>{testimonial.quote}</p>
              <footer>
                <cite>{testimonial.name}</cite>
                <Destination url={testimonial.url} className="testimonial-link">
                  عرض المنشور <Arrow diagonal />
                </Destination>
              </footer>
            </blockquote>
          </Reveal>
        </section>
        <section className="supplier section-shell" id="suppliers">
          <Label number="07">انضم إلينا</Label>
          <div className="supplier-layout">
            <Reveal>
              <h2>
                لديك مخزون فائض؟
                <br />
                <span>لا تترك قيمته معلّقة.</span>
              </h2>
              <p>
                سواء كنت علامة تجارية، مصنعًا أو موردًا،
                <br />
                لنتحدث عن الفرصة الموجودة في مخزونك.
              </p>
            </Reveal>
            <Destination
              url={
                siteConfig.supplierUrl ||
                (siteConfig.contact.email
                  ? `mailto:${siteConfig.contact.email}`
                  : "")
              }
              className="supplier-link"
            >
              <span>تواصل معنا</span>
              <Arrow diagonal />
            </Destination>
          </div>
        </section>
        <section id="store" className="store section-shell">
          <div>
            <span className="eyebrow">الفرصة التالية، قد تكون لك.</span>
            <h2>
              قطع تستحق
              <br />
              فرصة في خزانتك.
            </h2>
            <p>تسوّق فائض الأزياء والمنسوجات عبر متجر فائض الإلكتروني.</p>
            <Destination
              url={siteConfig.storeUrl}
              kind="store"
              className="solid-button"
            >
              تسوّق من فائض <Arrow diagonal />
            </Destination>
          </div>
          <div className="store-visual">
            <Image
              src={images.rack.src}
              alt="أزياء متنوعة على حوامل خشبية"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
            <div className="store-label">
              <span>اختيار أذكى.</span>
              <span>قيمة أبقى.</span>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="footer section-shell">
        <div className="footer-top">
          <div>
            <Brand light />
            <p>من فائض إلى قيمة.</p>
          </div>
          <div className="footer-nav">
            <span>اكتشف فائض</span>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="footer-social">
            <span>نبقى على تواصل</span>
            {siteConfig.socialLinks
              .filter((link) => link.url)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} ↗
                  <span className="sr-only"> — يفتح في نافذة جديدة</span>
                </a>
              ))}
            {siteConfig.contact.email && (
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email} ↗
              </a>
            )}
          </div>
          <a
            href="#home"
            className="back-top"
            aria-label="العودة إلى أعلى الصفحة"
          >
            ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} فائض. جميع الحقوق محفوظة.</span>
          <span>
            المملكة العربية السعودية
          </span>
          <span dir="ltr">MADE FOR A NEW CYCLE.</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
