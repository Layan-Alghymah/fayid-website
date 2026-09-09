export const ZID_STORE_URL = "https://ao3epl.zid.store/";
export const X_URL = "https://x.com/Fayidco_sa";
export const CONTACT_EMAIL = "Fayid.comp@gmail.com";
export const SUPPLIER_FORM_URL = "";
export const CANONICAL_URL = "";
export const TESTIMONIAL_URL =
  "https://x.com/Fayidco_sa/status/2053796307425231013?s=20";

export const siteConfig = {
  name: "فائض | Fayid",
  title: "فائض | تحويل الفائض إلى قيمة",
  description:
    "فائض منصة رقمية سعودية متخصصة في فائض قطاع الأزياء والمنسوجات، تحوّل المخزون الراكد إلى قيمة اقتصادية مستدامة للموردين والمستهلكين.",
  storeUrl: ZID_STORE_URL,
  supplierUrl: SUPPLIER_FORM_URL,
  contact: { email: CONTACT_EMAIL },
  socialLinks: [
    { label: "@Fayidco_sa", url: X_URL },
  ],
  impactMetrics: [] as { value: string; label: string; source: string }[],
};
export const navigation = [
  { label: "عن فائض", href: "#about" },
  { label: "كيف نعمل", href: "#journey" },
  { label: "الأثر", href: "#impact" },
  { label: "للموردين", href: "#suppliers" },
];
export const content = {
  hero: {
    eyebrow: "فائض الأزياء والمنسوجات. قيمة جديدة في السوق.",
    line1: "نحوّل الفائض",
    line2: "إلى قيمة.",
    description:
      "ما لم يُبع، ما زالت له فرصة. منصة متخصصة في فائض الأزياء والمنسوجات، تصل بين المورّد والمشتري.",
  },
  about: {
    title: "ليس كل ما لم يُبع،\nبلا قيمة.",
    text: "نحن فائض، منصة سعودية متخصصة في فائض الأزياء والمنسوجات. نحوّل المخزون الراكد إلى فرصة تجارية، بدلًا من أن يبقى على الرفوف.",
    problems: [
      "مخزون موسم يتراكم دون تصريف",
      "رأس مال ينتظر أن يتحرّك",
      "فائض يفقد قيمته مع مرور الوقت",
    ],
  },
  journey: [
    {
      title: "فائض لدى المورّد",
      text: "مواسم انتهت، كميات زائدة، أو قطع لم تجد فرصتها. البداية هي التعرّف على المخزون وحالته.",
      word: "مخزون",
      caption: "قيمة موجودة. تنتظر فرصة.",
      image: "rack",
    },
    {
      title: "قناة بيع جديدة",
      text: "نفتح للمخزون قناة بيع إضافية، ونقدّم المنتجات بوضوح وشفافية في حالتها.",
      word: "فرصة",
      caption: "نظرة مختلفة إلى ما هو موجود.",
      image: "folded",
    },
    {
      title: "وصول إلى المستهلك",
      text: "عبر متجر فائض، تصل القطع إلى من يحتاجها ويقدّر قيمتها، بخيارات ذات قيمة أفضل.",
      word: "وصول",
      caption: "القطعة المناسبة. لمن يقدّرها.",
      image: "rack",
    },
    {
      title: "قيمة مستعادة",
      text: "يتحرّر جزء من قيمة المخزون، وتستمر المنتجات في دورتها بدل أن تبقى على الرفوف.",
      word: "قيمة",
      caption: "دورة تستمر. وقيمة تعود.",
      image: "folded",
    },
  ],
  audiences: [
    {
      title: "العلامات التجارية",
      text: "فرصة للمخزون خارج الموسم، وقناة إضافية لاستعادة قيمته.",
    },
    {
      title: "المصانع والموردون",
      text: "مسار للكميات الزائدة والمخزون غير المباع، يحوّله إلى فرصة تجارية.",
    },
    {
      title: "المستهلكون",
      text: "منتجات بقيمة أفضل، مع وضوح في حالتها قبل الشراء.",
    },
  ],
  impact: [
    {
      title: "عمر أطول للمنتج",
      text: "فرصة للاستخدام، بدل البقاء في التخزين.",
    },
    {
      title: "هدر أقل",
      text: "الاستفادة مما صُنع بالفعل، قبل أن يصبح فاقدًا.",
    },
    {
      title: "استهلاك مسؤول",
      text: "قيمة أكبر من الموارد المُستثمَرة في صنع كل قطعة.",
    },
  ],
};
export const partners = [
  { name: "دنتيل للأقمشة", logo: "/partners/dantel.png" },
  { name: "نيلا عباية", logo: "/partners/nila.png" },
  { name: "أقمشة اللمدان", logo: "/partners/allamdan.png" },
  { name: "مفنون للأقمشة", logo: "/partners/mafnoon.png" },
  { name: "مشغل غرزة نورة", logo: null },
];
export const testimonial = {
  quote:
    "فائض فكرة ذكية تعالج مشكلة حقيقية في قطاع الأزياء — تسييل المخزون الراكد بطريقة مستدامة ومنظّمة.",
  name: "د. نادر المطيري",
  initials: "ن.م",
  platform: "X",
  url: TESTIMONIAL_URL,
};
export const images = {
  rack: {
    src: "/images/rack.webp",
    alt: "قطع أزياء معلقة على رف عرض، تنتظر دورة جديدة",
    credit: "Unsplash — photo-1445205170230-053b83016050",
    placeholder: true,
  },
  folded: {
    src: "/images/garments.webp",
    alt: "مجموعة من الملابس المعلّقة بتفاصيلها وألوانها المتنوعة",
    credit: "Unsplash — photo-1489987707025-afc232f7ea0f",
    placeholder: true,
  },
};
