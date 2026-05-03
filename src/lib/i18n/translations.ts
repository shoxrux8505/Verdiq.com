export type Lang = "en" | "ru" | "uz";

interface Item { t: string; d: string }
interface Phase { p: string; t: string; items: string[] }
interface Stage { t: string; d: string; status: string }
interface Stat { v: string; t: string; d: string }
interface Role { role: string; name: string }
interface ProtoLink { t: string; d: string; href?: string }

export interface Translation {
  nav: { home: string; solution: string; team: string; roadmap: string; demo: string; contact: string };
  cta: { viewDemo: string; exploreSolution: string; watchDemo: string; contactTeam: string; backHome: string; getStarted: string };
  hero: { eyebrow: string; title: string; subtitle: string; badges: string[] };
  problem: { title: string; subtitle: string; items: Item[] };
  solution: { title: string; subtitle: string; items: Item[] };
  compare: { title: string; headers: string[]; rows: string[][] };
  product: { title: string; subtitle: string; items: Item[] };
  team: { title: string; subtitle: string; strengths: Item[]; coreTitle: string; roles: Role[]; links: { github: string; linkedin: string; portfolio: string } };
  stack: { title: string; subtitle: string };
  standards: { title: string };
  roadmap: { title: string; subtitle: string; stages: Stage[] };
  plan: { title: string; subtitle: string; phases: Phase[] };
  value: { title: string; subtitle: string; stats: Stat[] };
  contact: { title: string; subtitle: string; name: string; email: string; message: string; send: string; sent: string };
  finalCta: { title: string; subtitle: string };
  footer: { mission: string; links: string; contact: string; social: string; rights: string };
  demo: {
    heroTitle: string; heroSubtitle: string;
    videoTitle: string; videoNote: string;
    aboutTitle: string; aboutText: string;
    protoTitle: string; protoLinks: ProtoLink[];
    chatTitle: string; chatSubtitle: string; chatPlaceholder: string; chatSamples: string[];
    chatGreeting: string; chatError: string;
    apiTitle: string; apiSubtitle: string;
    finalTitle: string; finalSubtitle: string;
    calcEyebrow: string; calcTitle: string; calcSubtitle: string;
    calcStart: string; calcSubmit: string; calcRestart: string; calcLoading: string;
    calcResultTitle: string; calcOverall: string; calcRecs: string;
    calcPillarE: string; calcPillarS: string; calcPillarG: string;
    calcQuestion: string; calcOf: string;
    calcQs: { q: string; opts: { label: string; value: string }[] }[];
    calcStatic: {
      overall: number;
      environmental: number;
      social: number;
      governance: number;
      tier: string;
      summary: string;
      isDemo: boolean;
      readonly recommendations: readonly {
        readonly pillar: "E" | "S" | "G";
        readonly title: string;
        readonly detail: string;
        readonly impact: "high" | "medium" | "low";
      }[];
    };
    calcDemoBadge: string;
    calcDemoToast: string;
  };
  chatbot: Record<string, string>;
}

const _translations = {
  en: {
    nav: { home: "Home", solution: "Solution", team: "Team", roadmap: "Roadmap", demo: "Demo", contact: "Contact" },
    cta: { viewDemo: "View Demo", exploreSolution: "Explore Solution", watchDemo: "Watch Demo", contactTeam: "Contact Team", backHome: "Back to Home", getStarted: "Get Started" },
    hero: {
      eyebrow: "Verdiq · Pitch Day 2025",
      title: "AI-Powered ESG Intelligence for Smarter Investment Decisions",
      subtitle: "Verdiq helps startups, businesses, and investors measure ESG readiness, identify risks, and generate actionable sustainability insights with AI.",
      badges: ["ESG Scoring", "AI Recommendations", "Investor Dashboard", "Report Generator"],
    },
    problem: {
      title: "The Problem We're Solving",
      subtitle: "ESG is becoming mandatory — but the tools haven't kept up.",
      items: [
        { t: "Opaque requirements", d: "Companies struggle to understand what ESG actually requires of them." },
        { t: "Slow investor diligence", d: "Investors lack fast, reliable tools to evaluate ESG readiness at scale." },
        { t: "Expensive reporting", d: "ESG reporting is manual, complex, and out of reach for most teams." },
        { t: "Inaccessible to emerging markets", d: "Global ESG tooling skips the markets where it matters most." },
      ],
    },
    solution: {
      title: "Why Verdiq",
      subtitle: "One AI-native platform from score to strategy.",
      items: [
        { t: "AI-based ESG scoring", d: "A scoring engine trained on global ESG frameworks, tuned for context." },
        { t: "Automated insights", d: "Plain-language recommendations on what to fix and why." },
        { t: "Reports founders & investors love", d: "Beautiful, defensible PDF reports generated in seconds." },
        { t: "Scalable for any team", d: "From early-stage startups to enterprise sustainability teams." },
      ],
    },
    compare: {
      title: "Traditional ESG vs. Verdiq",
      headers: ["Challenge", "Traditional way", "Verdiq way"],
      rows: [
        ["ESG evaluation", "8–12 weeks of consultants", "Minutes, AI-powered"],
        ["Cost", "$25k–$150k per cycle", "Subscription-based"],
        ["Insights", "Static spreadsheet", "Live dashboard + AI advisor"],
        ["Investor sharing", "Email a 60-page PDF", "Shareable live report"],
      ],
    },
    product: {
      title: "What Verdiq Does",
      subtitle: "Every tool an ESG-conscious team needs, in one platform.",
      items: [
        { t: "ESG Score Engine", d: "Real-time scoring across Environmental, Social and Governance pillars." },
        { t: "AI ESG Advisor", d: "Conversational guidance on improving your sustainability profile." },
        { t: "Risk Detection", d: "Surface red flags before investors or regulators do." },
        { t: "Sustainability Dashboard", d: "Track KPIs, trends and benchmarks in one view." },
        { t: "PDF Report Generator", d: "Investor-grade reports tailored to your audience." },
        { t: "API Access", d: "Embed Verdiq scoring into your own products and workflows." },
      ],
    },
    team: {
      title: "Why Our Team",
      subtitle: "Builders who ship — across AI, product, and ESG.",
      strengths: [
        { t: "Fullstack & AI engineering", d: "Years shipping production AI systems and modern web platforms." },
        { t: "Product instincts", d: "We build for users, not for slides." },
        { t: "Startup execution", d: "Real-world experience taking products from zero to launch." },
        { t: "AI × Business × ESG", d: "Rare combination of technical depth and ESG domain literacy." },
      ],
      coreTitle: "Core Team Structure",
      roles: [
        { role: "Founder · Product & Tech Lead", name: "Vision, strategy, architecture" },
        { role: "Frontend Developer", name: "Premium UI, dashboards, motion" },
        { role: "Backend Developer", name: "Scoring API, integrations, scale" },
        { role: "AI Engineer", name: "Advisor, anomaly detection, RAG" },
        { role: "ESG Analyst", name: "Methodology, benchmarks, frameworks" },
        { role: "UI/UX Designer", name: "Investor-grade design system" },
      ],
      links: { github: "GitHub", linkedin: "LinkedIn", portfolio: "Portfolio" },
    },
    stack: {
      title: "Technology Stack",
      subtitle: "Modern, fast, AI-native — chosen to scale from prototype to platform.",
    },
    standards: {
      title: "Standards & Frameworks We Rely On",
    },
    roadmap: {
      title: "Roadmap",
      subtitle: "From idea to launch — clear stages, real milestones.",
      stages: [
        { t: "Idea", d: "Research and concept validation across founders, investors and ESG experts.", status: "Complete" },
        { t: "Prototype", d: "ESG model architecture, scoring logic and first interface drafts.", status: "Complete" },
        { t: "MVP", d: "Scoring engine, sustainability dashboard, AI advisor, investor report.", status: "In progress" },
        { t: "Launched", d: "Public SaaS platform, public API, investor-facing integrations.", status: "Q3 2025" },
      ],
    },
    plan: {
      title: "How We Will Build Verdiq",
      subtitle: "A focused five-phase plan from research to scale.",
      phases: [
        { p: "Phase 1", t: "Research & ESG Framework", items: ["Define scoring methodology", "Map global standards & logic", "Build question architecture"] },
        { p: "Phase 2", t: "AI & Backend", items: ["Build scoring engine", "AI recommendation logic", "Public API development"] },
        { p: "Phase 3", t: "Frontend & Dashboard", items: ["User flows & onboarding", "Sustainability dashboard UI", "Reports and visual charts"] },
        { p: "Phase 4", t: "Testing & Demo", items: ["QA and refinement", "Demo-ready prototype", "Pitch presentation deployment"] },
        { p: "Phase 5", t: "Scale", items: ["API access for partners", "Investor tools & analytics", "B2B SaaS features"] },
      ],
    },
    value: {
      title: "Why Verdiq Matters",
      subtitle: "Real outcomes for founders, investors, and the planet.",
      stats: [
        { v: "10x", t: "Faster ESG evaluation", d: "From months to minutes." },
        { v: "−85%", t: "Lower reporting cost", d: "Replace consulting cycles." },
        { v: "+3.2x", t: "Investor readiness", d: "Pass diligence with confidence." },
        { v: "100%", t: "Smarter decisions", d: "AI-driven, data-backed action." },
      ],
    },
    contact: {
      title: "Get in touch",
      subtitle: "Tell us about your team and we'll reach out within 48 hours.",
      name: "Your name",
      email: "t3859061@gmail.com",
      message: "How can we help?",
      send: "Send message",
      sent: "Thanks — we'll be in touch shortly.",
    },
    finalCta: {
      title: "Ready to Reimagine ESG with AI?",
      subtitle: "Join the founders, investors and operators building the sustainable future with Verdiq.",
    },
    footer: {
      mission: "Verdiq is building the AI operating system for ESG — making sustainability measurable, actionable and accessible for every company on Earth.",
      links: "Quick links",
      contact: "Contact",
      social: "Social",
      rights: "All rights reserved.",
    },
    demo: {
      heroTitle: "Verdiq Demo",
      heroSubtitle: "Explore our prototype and see how Verdiq transforms ESG evaluation with AI.",
      videoTitle: "Product Demo Video",
      videoNote: "1–5 minute walkthrough of the Verdiq prototype.",
      aboutTitle: "About This Demo",
      aboutText: "This demo showcases the core Verdiq experience, including ESG scoring, AI-generated recommendations, and the first version of our sustainability dashboard.",
      protoTitle: "Prototype & Access",
      protoLinks: [
        { t: "Live Prototype", d: "Interact with the Verdiq prototype" },
        { t: "Project Concept", d: "Download the official PDF concept", href: "https://drive.google.com/file/d/1djI5bsQANg_6eoLTA7Vyl5g7mOlZcLu0/view?usp=sharing" },
        { t: "Figma Design", d: "Browse the full design system" },
        { t: "API Access", d: "Read the REST API documentation" },
        { t: "GitHub Repository", d: "View source and contribute" },
      ],
      chatTitle: "AI ESG Assistant",
      chatSubtitle: "Try the AI advisor with a few sample questions.",
      chatPlaceholder: "Ask about ESG…",
      chatSamples: [
        "What is ESG?",
        "How can I improve my ESG score?",
        "What are the biggest risks in my profile?",
      ],
      apiTitle: "API Access",
      apiSubtitle: "Embed Verdiq scoring with three core endpoints.",
      finalTitle: "Interested in Verdiq?",
      finalSubtitle: "Let's talk about what an AI-native ESG platform can do for your team.",
      chatGreeting: "Hi — I'm the Verdiq ESG advisor. Ask me anything about Environmental, Social, or Governance topics.",
      chatError: "Sorry, I couldn't reach the AI service. Please try again.",
      calcEyebrow: "ESG Calculator",
      calcTitle: "Get your live ESG readiness score",
      calcSubtitle: "Answer 10 quick questions. Our AI computes your score and personalized recommendations in seconds.",
      calcStart: "Start the assessment",
      calcSubmit: "Calculate my score",
      calcRestart: "Run another assessment",
      calcLoading: "Analyzing your ESG profile…",
      calcResultTitle: "Your ESG Assessment",
      calcOverall: "Overall score",
      calcRecs: "AI Recommendations",
      calcPillarE: "Environmental",
      calcPillarS: "Social",
      calcPillarG: "Governance",
      calcQuestion: "Question",
      calcOf: "of",
      calcQs: [
        { q: "Do you measure your Scope 1 & 2 carbon emissions?", opts: [
          { label: "Yes — measured & reported annually", value: "fully measured and reported" },
          { label: "Partially — some data tracked", value: "partial tracking" },
          { label: "No — not yet measured", value: "not measured" },
        ]},
        { q: "What share of your energy comes from renewable sources?", opts: [
          { label: ">75% renewable", value: "more than 75% renewable" },
          { label: "25–75% renewable", value: "25-75% renewable" },
          { label: "<25% renewable", value: "less than 25% renewable" },
        ]},
        { q: "Do you have a documented waste reduction or circular economy policy?", opts: [
          { label: "Yes — formally documented", value: "documented and active" },
          { label: "Informal practices only", value: "informal practices" },
          { label: "No policy in place", value: "no policy" },
        ]},
        { q: "What is the gender diversity ratio in your leadership team?", opts: [
          { label: "40–60% balanced", value: "40-60% balanced" },
          { label: "20–40% representation", value: "20-40% representation" },
          { label: "<20% representation", value: "less than 20% representation" },
        ]},
        { q: "Do you have a formal DEI (Diversity, Equity & Inclusion) policy?", opts: [
          { label: "Yes — published & enforced", value: "published and enforced" },
          { label: "Drafted but not enforced", value: "drafted only" },
          { label: "No DEI policy", value: "no DEI policy" },
        ]},
        { q: "How do you screen suppliers for human-rights and ESG compliance?", opts: [
          { label: "Formal vetting + audits", value: "formal vetting and audits" },
          { label: "Basic checks only", value: "basic checks only" },
          { label: "No screening process", value: "no screening" },
        ]},
        { q: "Does your company have an independent board or advisory committee?", opts: [
          { label: "Independent board with charter", value: "independent board with charter" },
          { label: "Informal advisors", value: "informal advisors" },
          { label: "No board structure", value: "no board" },
        ]},
        { q: "Do you have a whistleblower or anonymous reporting channel?", opts: [
          { label: "Yes — anonymous & active", value: "active anonymous channel" },
          { label: "Open-door policy only", value: "open-door only" },
          { label: "No channel exists", value: "no channel" },
        ]},
        { q: "How do you handle data privacy and security compliance?", opts: [
          { label: "Certified (SOC 2/ISO 27001)", value: "certified SOC 2 or ISO 27001" },
          { label: "Internal policies in place", value: "internal policies only" },
          { label: "Ad-hoc handling", value: "ad-hoc" },
        ]},
        { q: "Do you publish an annual sustainability or impact report?", opts: [
          { label: "Yes — published annually", value: "published annually" },
          { label: "Internal report only", value: "internal only" },
          { label: "Not produced", value: "not produced" },
        ]},
      ],
      calcStatic: {
        overall: 72,
        environmental: 68,
        social: 75,
        governance: 73,
        tier: "B",
        summary: "Your company shows strong ESG foundations with particular strength in Social initiatives, but there is clear room for improvement in Environmental data tracking.",
        isDemo: true,
        recommendations: [
          { pillar: "E", title: "Carbon Footprint Baseline", detail: "Begin tracking Scope 1 and 2 emissions to establish a baseline for future reduction targets.", impact: "high" },
          { pillar: "S", title: "DEI Policy Formalization", detail: "Document your existing diversity and inclusion practices into a formal policy to attract top talent.", impact: "medium" },
          { pillar: "G", title: "Board ESG Oversight", detail: "Assign a specific board member or committee to oversee ESG risks and opportunities.", impact: "high" },
          { pillar: "E", title: "Supply Chain Audit", detail: "Review your top 5 suppliers for their environmental commitments to reduce Scope 3 risks.", impact: "low" }
        ] as const
      },
      calcDemoBadge: "Demo Mode · Static Example Result",
      calcDemoToast: "Using demo mode: AI service is currently unavailable.",
    },
    chatbot: {
      "esg": "ESG stands for **Environmental, Social, and Governance**. It is a framework used to assess a company's impact on the world and its sustainability. At Verdiq, we help you simplify this complex world through automation.",
      "cost": "Verdiq is currently in its **BETA phase**. You can use our ESG Calculator and AI Advisor for free to explore how we can help your business grow sustainably.",
      "team": "The Verdiq team is composed of ESG specialists, data scientists, and engineers dedicated to making sustainability reporting accessible for everyone.",
      "roadmap": "Our roadmap includes deep integration with supply chain data, automated carbon footprint calculations, and official certification preparation modules.",
      "security": "We take your data seriously. All ESG assessments are handled securely, and our AI is designed to help you organize data without exposing sensitive corporate secrets.",
      "calculator": "Our ESG Calculator uses the **GRI and SASB frameworks** to give you a readiness score. You can find it right here on the landing page!",
      "compliance": "Verdiq helps you prepare for global regulations like the **CSRD (EU)** and **SEC climate disclosures (US)** by identifying gaps in your current reporting.",
      "benefit": "Companies with high ESG scores often see **lower capital costs**, better talent retention, and higher operational efficiency.",
      "verdiq": "Verdiq is your **AI-powered ESG co-pilot**. We automate the heavy lifting of sustainability reporting so you can focus on building a better company.",
      "startup": "For startups, ESG is a competitive advantage. It helps you attract VC funding and meet the procurement requirements of large enterprise clients."
    },
  },

  ru: {
    nav: { home: "Главная", solution: "Решение", team: "Команда", roadmap: "Дорожная карта", demo: "Демо", contact: "Контакты" },
    cta: { viewDemo: "Смотреть демо", exploreSolution: "Изучить решение", watchDemo: "Смотреть демо", contactTeam: "Связаться", backHome: "На главную", getStarted: "Начать" },
    hero: {
      eyebrow: "Verdiq · Pitch Day 2025",
      title: "ESG-аналитика на базе ИИ для умных инвестиционных решений",
      subtitle: "Verdiq помогает стартапам, бизнесу и инвесторам оценивать ESG-готовность, выявлять риски и получать практические инсайты по устойчивому развитию с помощью искусственного интеллекта.",
      badges: ["ESG-скоринг", "ИИ-рекомендации", "Дашборд инвестора", "Генератор отчётов"],
    },
    problem: {
      title: "Какую проблему мы решаем",
      subtitle: "ESG становится обязательным — но инструменты не успевают.",
      items: [
        { t: "Непрозрачные требования", d: "Компании плохо понимают, что именно от них требует ESG." },
        { t: "Медленная оценка для инвесторов", d: "У инвесторов нет быстрых и надёжных инструментов оценки ESG." },
        { t: "Дорогая отчётность", d: "ESG-отчётность — это ручной, сложный и дорогой процесс." },
        { t: "Недоступность на развивающихся рынках", d: "Глобальные ESG-инструменты обходят рынки, где они нужны больше всего." },
      ],
    },
    solution: {
      title: "Почему Verdiq",
      subtitle: "Одна ИИ-платформа: от скоринга до стратегии.",
      items: [
        { t: "ESG-скоринг на базе ИИ", d: "Движок скоринга, обученный на глобальных ESG-фреймворках." },
        { t: "Автоматические инсайты", d: "Понятные рекомендации: что и почему улучшать." },
        { t: "Отчёты для основателей и инвесторов", d: "Красивые и аргументированные PDF-отчёты за секунды." },
        { t: "Масштабируется под любую команду", d: "От стартапов на ранней стадии до корпоративных команд." },
      ],
    },
    compare: {
      title: "Классический ESG против Verdiq",
      headers: ["Задача", "Как раньше", "С Verdiq"],
      rows: [
        ["Оценка ESG", "8–12 недель консультантов", "Минуты, на базе ИИ"],
        ["Стоимость", "$25k–$150k за цикл", "По подписке"],
        ["Инсайты", "Статичная таблица", "Живой дашборд + ИИ-советник"],
        ["Шеринг с инвестором", "PDF на 60 страниц по почте", "Живой шаринг отчёта"],
      ],
    },
    product: {
      title: "Что делает Verdiq",
      subtitle: "Все инструменты ESG-команды в одной платформе.",
      items: [
        { t: "ESG-движок скоринга", d: "Реальный скоринг по экологическим, социальным и управленческим критериям." },
        { t: "ИИ-советник по ESG", d: "Диалоговые подсказки по улучшению устойчивости." },
        { t: "Детекция рисков", d: "Находит красные флаги до инвесторов и регуляторов." },
        { t: "Дашборд устойчивости", d: "KPI, тренды и бенчмарки в одном экране." },
        { t: "Генератор PDF-отчётов", d: "Отчёты инвесторского уровня под вашу аудиторию." },
        { t: "API-доступ", d: "Встройте скоринг Verdiq в свои продукты." },
      ],
    },
    team: {
      title: "Почему наша команда",
      subtitle: "Инженеры, которые шипят — на стыке ИИ, продукта и ESG.",
      strengths: [
        { t: "Fullstack и AI-инжиниринг", d: "Годы работы с продакшн-ИИ и современными веб-платформами." },
        { t: "Продуктовое мышление", d: "Строим для пользователей, а не для слайдов." },
        { t: "Стартап-экзекьюшн", d: "Опыт запуска продуктов с нуля до выпуска." },
        { t: "AI × Бизнес × ESG", d: "Редкое сочетание технической глубины и доменных знаний ESG." },
      ],
      coreTitle: "Структура команды",
      roles: [
        { role: "Основатель · Лидер продукта и технологий", name: "Стратегия, архитектура, видение" },
        { role: "Frontend-разработчик", name: "Премиум-UI, дашборды, анимации" },
        { role: "Backend-разработчик", name: "API скоринга, интеграции, масштаб" },
        { role: "AI-инженер", name: "Советник, детекция аномалий, RAG" },
        { role: "ESG-аналитик", name: "Методология, бенчмарки, фреймворки" },
        { role: "UI/UX-дизайнер", name: "Дизайн-система инвесторского уровня" },
      ],
      links: { github: "GitHub", linkedin: "LinkedIn", portfolio: "Портфолио" },
    },
    stack: {
      title: "Технологический стек",
      subtitle: "Современный, быстрый, AI-native — чтобы расти от прототипа до платформы.",
    },
    standards: {
      title: "На какие стандарты мы опираемся",
    },
    roadmap: {
      title: "Дорожная карта",
      subtitle: "От идеи к запуску — чёткие этапы и реальные вехи.",
      stages: [
        { t: "Идея", d: "Исследование и валидация концепции с основателями, инвесторами и экспертами.", status: "Готово" },
        { t: "Прототип", d: "Архитектура ESG-модели, скоринг и первые наброски интерфейса.", status: "Готово" },
        { t: "MVP", d: "Движок скоринга, дашборд устойчивости, ИИ-советник, отчёт инвестору.", status: "В работе" },
        { t: "Запуск", d: "Публичная SaaS-платформа, публичный API, интеграции для инвесторов.", status: "Q3 2025" },
      ],
    },
    plan: {
      title: "Как мы построим Verdiq",
      subtitle: "Сфокусированный пятиэтапный план: от исследования до масштаба.",
      phases: [
        { p: "Этап 1", t: "Исследование и ESG-фреймворк", items: ["Определить методологию скоринга", "Связать глобальные стандарты", "Построить структуру вопросов"] },
        { p: "Этап 2", t: "ИИ и бэкенд", items: ["Движок скоринга", "Логика ИИ-рекомендаций", "Разработка публичного API"] },
        { p: "Этап 3", t: "Фронтенд и дашборд", items: ["Пользовательские флоу", "UI дашборда устойчивости", "Отчёты и графики"] },
        { p: "Этап 4", t: "Тестирование и демо", items: ["QA и доработка", "Готовый к демо прототип", "Деплой питч-презентации"] },
        { p: "Этап 5", t: "Масштаб", items: ["API для партнёров", "Инструменты инвестора", "B2B SaaS-функции"] },
      ],
    },
    value: {
      title: "Почему Verdiq важен",
      subtitle: "Реальные результаты для основателей, инвесторов и планеты.",
      stats: [
        { v: "10x", t: "Быстрее оценка ESG", d: "От месяцев к минутам." },
        { v: "−85%", t: "Дешевле отчётность", d: "Заменяем циклы консалтинга." },
        { v: "+3.2x", t: "Готовность к инвесторам", d: "Проходите дью дилидженс уверенно." },
        { v: "100%", t: "Умнее решения", d: "На основе данных и ИИ." },
      ],
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Расскажите о команде — ответим в течение 48 часов.",
      name: "Ваше имя",
      email: "t3859061@gmail.com",
      message: "Чем мы можем помочь?",
      send: "Отправить",
      sent: "Спасибо — скоро свяжемся.",
    },
    finalCta: {
      title: "Готовы переосмыслить ESG с ИИ?",
      subtitle: "Присоединяйтесь к основателям, инвесторам и операторам, строящим устойчивое будущее с Verdiq.",
    },
    footer: {
      mission: "Verdiq строит AI-операционную систему для ESG — делая устойчивое развитие измеримым, действенным и доступным для каждой компании на Земле.",
      links: "Быстрые ссылки",
      contact: "Контакты",
      social: "Соцсети",
      rights: "Все права защищены.",
    },
    demo: {
      heroTitle: "Демо Verdiq",
      heroSubtitle: "Посмотрите, как Verdiq трансформирует ESG-оценку с помощью ИИ.",
      videoTitle: "Видео-демо продукта",
      videoNote: "Обзор прототипа Verdiq на 1–5 минут.",
      aboutTitle: "Об этом демо",
      aboutText: "Это демо показывает ключевой опыт Verdiq: ESG-скоринг, ИИ-рекомендации и первую версию дашборда устойчивости.",
      protoTitle: "Прототип и доступ",
      protoLinks: [
        { t: "Живой прототип", d: "Взаимодействуйте с прототипом Verdiq" },
        { t: "Концепция проекта", d: "Скачать официальный PDF концепт", href: "https://drive.google.com/file/d/1djI5bsQANg_6eoLTA7Vyl5g7mOlZcLu0/view?usp=sharing" },
        { t: "Дизайн в Figma", d: "Изучите дизайн-систему" },
        { t: "API-доступ", d: "Документация REST API" },
        { t: "GitHub-репозиторий", d: "Исходный код и контрибьюшны" },
      ],
      chatTitle: "ИИ-советник по ESG",
      chatSubtitle: "Попробуйте советника на примерах.",
      chatPlaceholder: "Спросите про ESG…",
      chatSamples: [
        "Что такое ESG?",
        "Как улучшить мой ESG-скор?",
        "Какие самые большие риски у моего профиля?",
      ],
      apiTitle: "API-доступ",
      apiSubtitle: "Встройте скоринг Verdiq через три ключевых эндпоинта.",
      finalTitle: "Интересно?",
      finalSubtitle: "Давайте обсудим, что AI-native ESG-платформа может дать вашей команде.",
      chatGreeting: "Привет — я ESG-советник Verdiq. Спросите меня о любом аспекте Environmental, Social или Governance.",
      chatError: "Не удалось получить ответ от ИИ. Попробуйте ещё раз.",
      calcEyebrow: "ESG-калькулятор",
      calcTitle: "Получите живой ESG-балл готовности",
      calcSubtitle: "Ответьте на 10 быстрых вопросов. ИИ рассчитает ваш балл и персональные рекомендации за секунды.",
      calcStart: "Начать оценку",
      calcSubmit: "Рассчитать мой балл",
      calcRestart: "Пройти ещё раз",
      calcLoading: "Анализируем ваш ESG-профиль…",
      calcResultTitle: "Ваша ESG-оценка",
      calcOverall: "Общий балл",
      calcRecs: "Рекомендации ИИ",
      calcPillarE: "Экология",
      calcPillarS: "Социальное",
      calcPillarG: "Управление",
      calcQuestion: "Вопрос",
      calcOf: "из",
      calcQs: [
        { q: "Измеряете ли вы выбросы Scope 1 и 2?", opts: [
          { label: "Да — измеряем и отчитываемся ежегодно", value: "fully measured and reported" },
          { label: "Частично — часть данных", value: "partial tracking" },
          { label: "Нет — пока не измеряем", value: "not measured" },
        ]},
        { q: "Какая доля энергии из возобновляемых источников?", opts: [
          { label: ">75% возобновляемой", value: "more than 75% renewable" },
          { label: "25–75% возобновляемой", value: "25-75% renewable" },
          { label: "<25% возобновляемой", value: "less than 25% renewable" },
        ]},
        { q: "Есть ли у вас политика по сокращению отходов или экономике замкнутого цикла?", opts: [
          { label: "Да — формально задокументирована", value: "documented and active" },
          { label: "Только неформальные практики", value: "informal practices" },
          { label: "Политики нет", value: "no policy" },
        ]},
        { q: "Какова гендерная диверсификация в руководстве?", opts: [
          { label: "40–60% сбалансировано", value: "40-60% balanced" },
          { label: "20–40% представительства", value: "20-40% representation" },
          { label: "<20% представительства", value: "less than 20% representation" },
        ]},
        { q: "Есть ли формальная политика DEI?", opts: [
          { label: "Да — опубликована и применяется", value: "published and enforced" },
          { label: "Подготовлена, но не применяется", value: "drafted only" },
          { label: "Политики DEI нет", value: "no DEI policy" },
        ]},
        { q: "Как вы проверяете поставщиков на ESG-комплаенс?", opts: [
          { label: "Формальная проверка + аудит", value: "formal vetting and audits" },
          { label: "Только базовые проверки", value: "basic checks only" },
          { label: "Не проверяем", value: "no screening" },
        ]},
        { q: "Есть ли независимый совет директоров или консультативный комитет?", opts: [
          { label: "Независимый совет с уставом", value: "independent board with charter" },
          { label: "Неформальные советники", value: "informal advisors" },
          { label: "Совета нет", value: "no board" },
        ]},
        { q: "Есть ли канал whistleblower / анонимных сообщений?", opts: [
          { label: "Да — анонимный и активный", value: "active anonymous channel" },
          { label: "Только политика открытых дверей", value: "open-door only" },
          { label: "Канала нет", value: "no channel" },
        ]},
        { q: "Как вы работаете с приватностью данных и безопасностью?", opts: [
          { label: "Сертифицировано (SOC 2/ISO 27001)", value: "certified SOC 2 or ISO 27001" },
          { label: "Внутренние политики", value: "internal policies only" },
          { label: "Ad-hoc", value: "ad-hoc" },
        ]},
        { q: "Публикуете ли вы ежегодный отчёт об устойчивом развитии?", opts: [
          { label: "Да — ежегодно", value: "published annually" },
          { label: "Только внутренний отчёт", value: "internal only" },
          { label: "Не публикуем", value: "not produced" },
        ]},
      ],
      calcStatic: {
        overall: 72,
        environmental: 68,
        social: 75,
        governance: 73,
        tier: "B",
        summary: "Ваша компания демонстрирует прочный ESG-фундамент, особенно в социальных инициативах, однако есть возможности для улучшения в отслеживании экологических данных.",
        isDemo: true,
        recommendations: [
          { pillar: "E", title: "Базовый уровень углеродного следа", detail: "Начните отслеживать выбросы Scope 1 и 2, чтобы установить базу для будущих целей по сокращению.", impact: "high" },
          { pillar: "S", title: "Формализация политики DEI", detail: "Оформите существующие практики инклюзивности в официальную политику для привлечения лучших талантов.", impact: "medium" },
          { pillar: "G", title: "ESG-надзор на уровне совета", detail: "Назначьте ответственного члена совета или комитет для мониторинга ESG-рисков.", impact: "high" },
          { pillar: "E", title: "Аудит цепочки поставок", detail: "Проверьте топ-5 поставщиков на соответствие экологическим нормам для снижения рисков Scope 3.", impact: "low" }
        ] as const
      },
      calcDemoBadge: "Демо-режим · Пример результата",
      calcDemoToast: "Используется демо-режим: ИИ-сервис временно недоступен.",
    },
    chatbot: {
      "esg": "ESG означает **Экология (Environmental), Социальная ответственность (Social) и Корпоративное управление (Governance)**. Это система оценки устойчивости компании. В Verdiq мы помогаем упростить этот процесс с помощью автоматизации.",
      "стоимость": "Verdiq сейчас находится в стадии **БЕТА-тестирования**. Вы можете бесплатно использовать наш ESG-калькулятор и ИИ-советника.",
      "команда": "Команда Verdiq состоит из экспертов по ESG, аналитиков данных и инженеров, стремящихся сделать ESG-отчетность доступной для всех.",
      "планы": "Наша дорожная карта включает глубокую интеграцию с цепочками поставок, автоматический расчет углеродного следа и модули подготовки к сертификации.",
      "безопасность": "Мы серьезно относимся к вашим данным. Все оценки ESG проводятся безопасно, а наш ИИ помогает организовать данные, не раскрывая корпоративные секреты.",
      "калькулятор": "Наш ESG-калькулятор использует фреймворки **GRI и SASB** для оценки вашей готовности. Вы можете найти его прямо на этой странице!",
      "комплаенс": "Verdiq помогает подготовиться к глобальным нормам, таким как **CSRD (ЕС)** и раскрытие климатических данных **SEC (США)**.",
      "выгода": "Компании с высокими показателями ESG часто получают **более дешевый капитал**, лучше удерживают таланты и работают эффективнее.",
      "verdiq": "Verdiq — это ваш **ИИ-помощник по ESG**. Мы берем на себя сложную работу по отчетности, чтобы вы могли сосредоточиться на развитии бизнеса.",
      "стартап": "Для стартапов ESG — это конкурентное преимущество. Это помогает привлекать инвестиции и соответствовать требованиям крупных клиентов."
    },
  },

  uz: {
    nav: { home: "Bosh sahifa", solution: "Yechim", team: "Jamoa", roadmap: "Yo'l xaritasi", demo: "Demo", contact: "Aloqa" },
    cta: { viewDemo: "Demoni ko'rish", exploreSolution: "Yechimni o'rganish", watchDemo: "Demoni ko'rish", contactTeam: "Aloqaga chiqish", backHome: "Bosh sahifaga", getStarted: "Boshlash" },
    hero: {
      eyebrow: "Verdiq · Pitch Day 2025",
      title: "Aqlli investitsion qarorlar uchun AI-asosli ESG tahlili",
      subtitle: "Verdiq startaplar, biznes va investorlarga ESG tayyorgarligini o'lchash, risklarni aniqlash va sun'iy intellekt yordamida amaliy barqarorlik yechimlarini olishga yordam beradi.",
      badges: ["ESG baholash", "AI tavsiyalar", "Investor paneli", "Hisobot generatori"],
    },
    problem: {
      title: "Qaysi muammoni hal qilamiz",
      subtitle: "ESG majburiyga aylanmoqda — lekin asboblar yetarli emas.",
      items: [
        { t: "Noaniq talablar", d: "Kompaniyalar ESG aslida nimani talab qilishini tushunmaydi." },
        { t: "Sekin investor baholash", d: "Investorlarda ESG tayyorgarligini tezda baholash uchun ishonchli vositalar yo'q." },
        { t: "Qimmat hisobot", d: "ESG hisobot — qo'lda, murakkab va ko'pchilik uchun qimmat." },
        { t: "Rivojlanayotgan bozorlar uchun yopiq", d: "Global ESG asboblari aynan kerak bo'lgan bozorlarni chetlab o'tadi." },
      ],
    },
    solution: {
      title: "Nega Verdiq",
      subtitle: "Bitta AI-platforma: balldan strategiyagacha.",
      items: [
        { t: "AI asosidagi ESG baholash", d: "Global ESG standartlarida o'qitilgan baholash dvigateli." },
        { t: "Avtomatik tahlil", d: "Nimani va nega yaxshilash kerakligi haqida tushunarli tavsiyalar." },
        { t: "Ta'sischilar va investorlar uchun hisobotlar", d: "Soniyalar ichida chiroyli va ishonchli PDF hisobotlar." },
        { t: "Har qanday jamoa uchun masshtablanadi", d: "Ilk bosqichdagi startapdan korporativ barqarorlik jamoasigacha." },
      ],
    },
    compare: {
      title: "An'anaviy ESG va Verdiq",
      headers: ["Vazifa", "An'anaviy yo'l", "Verdiq yo'li"],
      rows: [
        ["ESG baholash", "8–12 hafta konsultantlar", "Daqiqalar, AI-asosli"],
        ["Narx", "Sikl uchun $25k–$150k", "Obuna asosida"],
        ["Tahlil", "Statik jadval", "Jonli panel + AI maslahatchi"],
        ["Investor bilan ulashish", "60-sahifali PDF pochta orqali", "Jonli hisobotni ulashish"],
      ],
    },
    product: {
      title: "Verdiq nima qiladi",
      subtitle: "ESG jamoasi uchun zarur bo'lgan barcha asboblar bitta platformada.",
      items: [
        { t: "ESG ball dvigateli", d: "Ekologik, ijtimoiy va boshqaruv ustunlari bo'yicha real baholash." },
        { t: "AI ESG maslahatchisi", d: "Barqarorlikni yaxshilash bo'yicha suhbat shaklidagi yo'riqnoma." },
        { t: "Risklarni aniqlash", d: "Investor yoki regulyatordan oldin qizil bayroqlarni topadi." },
        { t: "Barqarorlik paneli", d: "KPI, tendentsiyalar va bench-marklar bitta ekranda." },
        { t: "PDF hisobot generatori", d: "Auditoriyangizga moslashtirilgan investor darajasidagi hisobotlar." },
        { t: "API kirish", d: "Verdiq baholashini o'z mahsulotingizga joylashtiring." },
      ],
    },
    team: {
      title: "Nega bizning jamoa",
      subtitle: "Yetkazib beruvchilar — AI, mahsulot va ESG kesishmasida.",
      strengths: [
        { t: "Fullstack va AI muhandisligi", d: "Production AI tizimlari va zamonaviy veb-platformalar bilan ko'p yillik tajriba." },
        { t: "Mahsulot sezgisi", d: "Slaydlar uchun emas, foydalanuvchilar uchun quramiz." },
        { t: "Startap ijrosi", d: "Mahsulotlarni noldan ishga tushirgunga qadar olib borish tajribasi." },
        { t: "AI × Biznes × ESG", d: "Texnik chuqurlik va ESG sohasi bilimining noyob uyg'unligi." },
      ],
      coreTitle: "Asosiy jamoa tuzilishi",
      roles: [
        { role: "Asoschi · Mahsulot va Texnologiya rahbari", name: "Strategiya, arxitektura, vizyon" },
        { role: "Frontend dasturchi", name: "Premium UI, panellar, animatsiya" },
        { role: "Backend dasturchi", name: "Baholash API, integratsiyalar, masshtab" },
        { role: "AI muhandis", name: "Maslahatchi, anomaliya aniqlash, RAG" },
        { role: "ESG tahlilchi", name: "Metodologiya, benchmarklar, frameworklar" },
        { role: "UI/UX dizayner", name: "Investor darajasidagi dizayn-tizim" },
      ],
      links: { github: "GitHub", linkedin: "LinkedIn", portfolio: "Portfolio" },
    },
    stack: {
      title: "Texnologiya steki",
      subtitle: "Zamonaviy, tezkor, AI-native — prototipdan platformagacha o'sish uchun.",
    },
    standards: {
      title: "Biz tayanadigan standartlar",
    },
    roadmap: {
      title: "Yo'l xaritasi",
      subtitle: "Goyadan ishga tushirishgacha — aniq bosqichlar, real vehalar.",
      stages: [
        { t: "G'oya", d: "Asoschilar, investorlar va ESG ekspertlari bilan tadqiqot va validatsiya.", status: "Tayyor" },
        { t: "Prototip", d: "ESG model arxitekturasi, baholash mantiqi va birinchi interfeyslar.", status: "Tayyor" },
        { t: "MVP", d: "Baholash dvigateli, barqarorlik paneli, AI maslahatchi, investor hisoboti.", status: "Jarayonda" },
        { t: "Ishga tushirildi", d: "Ommaviy SaaS platforma, ommaviy API, investor integratsiyalari.", status: "Q3 2025" },
      ],
    },
    plan: {
      title: "Verdiqni qanday quramiz",
      subtitle: "Tadqiqotdan masshtabgacha besh bosqichli rejas.",
      phases: [
        { p: "Bosqich 1", t: "Tadqiqot va ESG asoslari", items: ["Baholash metodologiyasini aniqlash", "Global standartlarni xaritalash", "Savollar arxitekturasini qurish"] },
        { p: "Bosqich 2", t: "AI va Backend", items: ["Baholash dvigateli", "AI tavsiya mantiqi", "Ommaviy API ishlab chiqish"] },
        { p: "Bosqich 3", t: "Frontend va Panel", items: ["Foydalanuvchi oqimlari", "Barqarorlik paneli UI", "Hisobotlar va vizuallar"] },
        { p: "Bosqich 4", t: "Test va Demo", items: ["QA va sozlash", "Demo uchun tayyor prototip", "Pitch prezentatsiyasi deploy"] },
        { p: "Bosqich 5", t: "Masshtab", items: ["Hamkorlar uchun API", "Investor asboblari", "B2B SaaS funksiyalari"] },
      ],
    },
    value: {
      title: "Nega Verdiq muhim",
      subtitle: "Asoschilar, investorlar va sayyora uchun real natijalar.",
      stats: [
        { v: "10x", t: "Tezroq ESG baholash", d: "Oylardan daqiqalarga." },
        { v: "−85%", t: "Arzonroq hisobot", d: "Konsalting sikllarini almashtiring." },
        { v: "+3.2x", t: "Investor tayyorgarligi", d: "Due diligence-ni ishonch bilan o'ting." },
        { v: "100%", t: "Aqlliroq qarorlar", d: "AI va ma'lumotlarga asoslangan." },
      ],
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle: "Jamoangiz haqida ayting — 48 soat ichida javob beramiz.",
      name: "Ismingiz",
      email: "t3859061@gmail.com",
      message: "Qanday yordam bera olamiz?",
      send: "Yuborish",
      sent: "Rahmat — tez orada bog'lanamiz.",
    },
    finalCta: {
      title: "AI bilan ESG-ni qayta tasavvur qilishga tayyormisiz?",
      subtitle: "Verdiq bilan barqaror kelajakni quruvchi asoschilar, investorlar va operatorlarga qo'shiling.",
    },
    footer: {
      mission: "Verdiq ESG uchun AI operatsion tizimini quradi — barqarorlikni har bir kompaniya uchun o'lchanadigan, amaliy va kirish mumkin qiladi.",
      links: "Tezkor havolalar",
      contact: "Aloqa",
      social: "Ijtimoiy",
      rights: "Barcha huquqlar himoyalangan.",
    },
    demo: {
      heroTitle: "Verdiq Demo",
      heroSubtitle: "Verdiq AI yordamida ESG baholashini qanday o'zgartirishini ko'ring.",
      videoTitle: "Mahsulot Demo Video",
      videoNote: "Verdiq prototipining 1–5 daqiqalik ko'rib chiqish.",
      aboutTitle: "Ushbu demo haqida",
      aboutText: "Bu demo Verdiq-ning asosiy tajribasini namoyish etadi: ESG baholash, AI tavsiyalari va barqarorlik panelining birinchi versiyasi.",
      protoTitle: "Prototip va kirish",
      protoLinks: [
        { t: "Jonli prototip", d: "Verdiq prototipi bilan ishlang" },
        { t: "Loyiha konsepsiyasi", d: "Rasmiy PDF konsepsiyani yuklab oling", href: "https://drive.google.com/file/d/1djI5bsQANg_6eoLTA7Vyl5g7mOlZcLu0/view?usp=sharing" },
        { t: "Figma dizayn", d: "Dizayn-tizimni ko'rib chiqing" },
        { t: "API kirish", d: "REST API hujjatlari" },
        { t: "GitHub repozitoriy", d: "Manba kod va hissa qo'shish" },
      ],
      chatTitle: "AI ESG yordamchisi",
      chatSubtitle: "Maslahatchini namuna savollar bilan sinab ko'ring.",
      chatPlaceholder: "ESG haqida so'rang…",
      chatSamples: [
        "ESG nima?",
        "ESG ballimni qanday yaxshilash mumkin?",
        "Mening profilimning eng katta risklari nimada?",
      ],
      apiTitle: "API kirish",
      apiSubtitle: "Verdiq baholashini uchta asosiy endpoint orqali joylashtiring.",
      finalTitle: "Qiziqasizmi?",
      finalSubtitle: "AI-native ESG platformasi jamoangizga nima berishi mumkinligini muhokama qilaylik.",
      chatGreeting: "Salom — men Verdiq ESG maslahatchisiman. Environmental, Social yoki Governance haqida xohlagan savolingizni bering.",
      chatError: "Kechirasiz, AI xizmatiga ulana olmadim. Qaytadan urinib ko'ring.",
      calcEyebrow: "ESG kalkulyator",
      calcTitle: "Jonli ESG tayyorgarlik balingizni oling",
      calcSubtitle: "10 ta tez savolga javob bering. AI sizning balingizni va shaxsiy tavsiyalaringizni soniyalar ichida hisoblab beradi.",
      calcStart: "Baholashni boshlash",
      calcSubmit: "Balimni hisoblash",
      calcRestart: "Yana baholash",
      calcLoading: "ESG profilingiz tahlil qilinmoqda…",
      calcResultTitle: "Sizning ESG bahongiz",
      calcOverall: "Umumiy ball",
      calcRecs: "AI tavsiyalari",
      calcPillarE: "Ekologik",
      calcPillarS: "Ijtimoiy",
      calcPillarG: "Boshqaruv",
      calcQuestion: "Savol",
      calcOf: "/",
      calcQs: [
        { q: "Scope 1 va 2 uglerod chiqindilarini o'lchaysizmi?", opts: [
          { label: "Ha — har yili o'lchanadi va hisobot beriladi", value: "fully measured and reported" },
          { label: "Qisman — ba'zi ma'lumotlar", value: "partial tracking" },
          { label: "Yo'q — hali o'lchanmagan", value: "not measured" },
        ]},
        { q: "Energiyangizning qanchasi qayta tiklanadigan manbalardan?", opts: [
          { label: ">75% qayta tiklanadigan", value: "more than 75% renewable" },
          { label: "25–75% qayta tiklanadigan", value: "25-75% renewable" },
          { label: "<25% qayta tiklanadigan", value: "less than 25% renewable" },
        ]},
        { q: "Chiqindilarni kamaytirish yoki dumaloq iqtisodiyot siyosatingiz bormi?", opts: [
          { label: "Ha — rasmiy hujjatlashtirilgan", value: "documented and active" },
          { label: "Faqat norasmiy amaliyotlar", value: "informal practices" },
          { label: "Siyosat yo'q", value: "no policy" },
        ]},
        { q: "Rahbariyatingizdagi gender muvozanati qanday?", opts: [
          { label: "40–60% muvozanatli", value: "40-60% balanced" },
          { label: "20–40% vakillik", value: "20-40% representation" },
          { label: "<20% vakillik", value: "less than 20% representation" },
        ]},
        { q: "Rasmiy DEI siyosatingiz bormi?", opts: [
          { label: "Ha — chop etilgan va qo'llaniladi", value: "published and enforced" },
          { label: "Tayyorlangan, lekin qo'llanmaydi", value: "drafted only" },
          { label: "DEI siyosati yo'q", value: "no DEI policy" },
        ]},
        { q: "Yetkazib beruvchilarni ESG bo'yicha qanday tekshirasiz?", opts: [
          { label: "Rasmiy tekshiruv + audit", value: "formal vetting and audits" },
          { label: "Faqat asosiy tekshiruvlar", value: "basic checks only" },
          { label: "Tekshirilmaydi", value: "no screening" },
        ]},
        { q: "Mustaqil kengash yoki maslahat qo'mitasi bormi?", opts: [
          { label: "Mustaqil kengash + nizom", value: "independent board with charter" },
          { label: "Norasmiy maslahatchilar", value: "informal advisors" },
          { label: "Kengash yo'q", value: "no board" },
        ]},
        { q: "Whistleblower / anonim xabar berish kanali bormi?", opts: [
          { label: "Ha — anonim va faol", value: "active anonymous channel" },
          { label: "Faqat ochiq eshik siyosati", value: "open-door only" },
          { label: "Kanal yo'q", value: "no channel" },
        ]},
        { q: "Ma'lumotlar maxfiyligi va xavfsizligini qanday boshqarasiz?", opts: [
          { label: "Sertifikatlangan (SOC 2/ISO 27001)", value: "certified SOC 2 or ISO 27001" },
          { label: "Ichki siyosatlar", value: "internal policies only" },
          { label: "Ad-hoc", value: "ad-hoc" },
        ]},
        { q: "Yillik barqarorlik hisoboti chop etasizmi?", opts: [
          { label: "Ha — har yili", value: "published annually" },
          { label: "Faqat ichki hisobot", value: "internal only" },
          { label: "Chop etilmaydi", value: "not produced" },
        ]},
      ],
      calcStatic: {
        overall: 72,
        environmental: 68,
        social: 75,
        governance: 73,
        tier: "B",
        summary: "Sizning kompaniyangiz kuchli ESG poydevorini ko'rsatmoqda, ayniqsa ijtimoiy tashabbuslarda, lekin ekologik ma'lumotlarni kuzatishda yaxshilanish imkoniyatlari mavjud.",
        isDemo: true,
        recommendations: [
          { pillar: "E", title: "Uglerod chiqindilari asosi", detail: "Kelajakdagi emissiyalarni kamaytirish maqsadlarini belgilash uchun Scope 1 va 2 emissiyalarini kuzatishni boshlang.", impact: "high" },
          { pillar: "S", title: "DEI siyosatini rasmiylashtirish", detail: "Eng yaxshi iqtidorlarni jalb qilish uchun mavjud inklyuzivlik amaliyotlarini rasmiy siyosatga aylantiring.", impact: "medium" },
          { pillar: "G", title: "Kengash darajasidagi ESG nazorati", detail: "ESG risklarini kuzatish uchun kengashning maxsus a'zosi yoki qo'mitasini tayinlang.", impact: "high" },
          { pillar: "E", title: "Ta'minot zanjiri auditi", detail: "Scope 3 risklarini kamaytirish uchun asosiy 5 ta yetkazib beruvchingizning ekologik majburiyatlarini tekshiring.", impact: "low" }
        ] as const
      },
      calcDemoBadge: "Demo rejimi · Namuna natija",
      calcDemoToast: "Demo rejimi ishlatilmoqda: AI xizmati vaqtincha ishlamayapti.",
    },
    chatbot: {
      "esg": "ESG — **Environmental (Atrof-muhit), Social (Ijtimoiy) va Governance (Boshqaruv)** deganidir. Bu kompaniyaning barqarorligini baholash tizimi. Verdiq-da biz buni avtomatlashtirish orqali soddalashtiramiz.",
      "narx": "Verdiq hozirda **BETA bosqichida**. Siz bizning ESG kalkulyatorimiz va AI maslahatchimizdan bepul foydalanishingiz mumkin.",
      "jamoa": "Verdiq jamoasi ESG mutaxassislari, ma'lumotlar tahlilchilari va muhandislardan iborat bo'lib, ESG hisobotlarini hamma uchun ochiq qilishga intiladi.",
      "rejalar": "Bizning yo'l xaritamiz ta'minot zanjiri integratsiyasi, uglerod chiqindilarini avtomatik hisoblash va sertifikatlash modullarini o'z ichiga oladi.",
      "xavfsizlik": "Biz sizning ma'lumotlaringizga jiddiy qaraymiz. Barcha ESG baholashlari xavfsiz amalga oshiriladi va korporativ sirlarni ochmagan holda ishlaydi.",
      "kalkulyator": "Bizning ESG kalkulyatorimiz **GRI va SASB** standartlaridan foydalanadi. Uni aynan shu sahifada topishingiz mumkin!",
      "komplayens": "Verdiq sizni **CSRD (Yevropa)** va **SEC (AQSH)** kabi global qoidalarga tayyorlanishingizga yordam beradi.",
      "foyda": "Yuqori ESG balliga ega kompaniyalar ko'pincha **arzonroq kapital** oladilar, xodimlarni yaxshiroq ushlab turadilar va samaraliroq ishlaydilar.",
      "verdiq": "Verdiq — bu sizning **AI-yordamchingiz**. Biz hisobot berishning murakkab ishlarini o'z bo'ynimizga olamiz, shunda siz biznesni rivojlantirishga e'tibor qaratishingiz mumkin.",
      "startap": "Startaplar uchun ESG — bu raqobatbardosh ustunlik. Bu investitsiyalarni jalb qilishga va yirik mijozlar talablariga javob berishga yordam beradi."
    },
  },
};

export const translations: Record<Lang, Translation> = _translations;

