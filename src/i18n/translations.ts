import type { Locale } from "@site/i18n/config";

export interface SiteCopy {
  meta: {
    homeTitle: string;
    homeDescription: string;
    featuresTitle: string;
    featuresDescription: string;
    downloadTitle: string;
    downloadDescription: string;
    webTitle: string;
    webDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
  nav: {
    home: string;
    features: string;
    download: string;
    webIde: string;
    about: string;
    privacy: string;
    github: string;
    docs: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaDownload: string;
    ctaWeb: string;
    badges: string[];
  };
  home: {
    webCardTitle: string;
    webCardBody: string;
    webCardAction: string;
  };
  features: {
    heading: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  download: {
    heading: string;
    intro: string;
    recommended: string;
    detecting: string;
    allPlatforms: string;
  };
  web: {
    heading: string;
    intro: string;
    note: string;
    openFull: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  privacy: {
    heading: string;
    paragraphs: string[];
  };
  footer: {
    tagline: string;
    latestRelease: string;
  };
  lang: {
    label: string;
  };
}

const en: SiteCopy = {
  meta: {
    homeTitle: "Pulse IDE — Fast, private, cross-platform",
    homeDescription:
      "Ultra-lightweight, telemetry-free, open-source IDE for macOS, Linux, Windows, and the web.",
    featuresTitle: "Features — Pulse IDE",
    featuresDescription: "Explore the Pulse workbench, extensions, terminal, and editor.",
    downloadTitle: "Download — Pulse IDE",
    downloadDescription: "Install Pulse for macOS, Linux, and Windows.",
    webTitle: "Pulse Web — Browser IDE",
    webDescription: "Use the same Pulse workbench in your browser.",
    aboutTitle: "About — Pulse IDE",
    aboutDescription: "Mission and principles behind Pulse IDE.",
    privacyTitle: "Privacy — Pulse IDE",
    privacyDescription: "No telemetry. Your code stays on your machine.",
  },
  nav: {
    home: "Home",
    features: "Features",
    download: "Download",
    webIde: "Web IDE",
    about: "About",
    privacy: "Privacy",
    github: "GitHub",
    docs: "Docs",
  },
  hero: {
    title: "Code at full speed. Zero telemetry.",
    subtitle:
      "Pulse is a native IDE built with Tauri and Rust, with a matching web workbench. Fast startup, low memory, and installers for every major platform.",
    ctaDownload: "Download",
    ctaWeb: "Open Web IDE",
    badges: ["MIT / Apache-2.0", "Open Source", "Cross Platform", "No Telemetry"],
  },
  home: {
    webCardTitle: "Same UI in the browser",
    webCardBody:
      "The web edition mirrors the desktop workbench: explorer, Monaco editor, extensions panel, and a limited in-browser terminal.",
    webCardAction: "Launch Pulse Web",
  },
  features: {
    heading: "Built for daily development",
    intro: "Everything you expect from a modern editor, without the bloat.",
    items: [
      {
        title: "Modern workbench",
        body: "Activity bar, resizable panels, tabs, and a focused dark theme tuned for long sessions.",
      },
      {
        title: "Monaco editor",
        body: "Syntax highlighting, formatting helpers, and language workers for TS, JSON, CSS, and HTML.",
      },
      {
        title: "Extensions host",
        body: "Bundled themes and formatters with a worker-based extension model ready to grow.",
      },
      {
        title: "Integrated terminal",
        body: "Full PTY on desktop; helpful shell hints in the browser edition.",
      },
      {
        title: "Git overview",
        body: "Branch and status views when working on a local repository (desktop).",
      },
      {
        title: "Auto updates",
        body: "On startup, Pulse checks GitHub releases and offers to download the latest installer.",
      },
    ],
  },
  download: {
    heading: "Downloads",
    intro: "Choose the build for your operating system and architecture.",
    recommended: "Recommended for your system",
    detecting: "Detecting platform…",
    allPlatforms: "All platforms",
  },
  web: {
    heading: "Pulse Web IDE",
    intro:
      "Grant folder access in a Chromium-based browser to edit files with the same layout as the desktop app.",
    note: "Language servers, debugging, and the full shell require the desktop build.",
    openFull: "Enter full screen workbench",
  },
  about: {
    heading: "About Pulse",
    paragraphs: [
      "Pulse IDE is an open-source project from the Pulse-IDE organization. We optimize for speed, predictability, and respect for your privacy.",
      "Desktop builds combine a React workbench with a Rust/Tauri backend for filesystem, terminal, and tooling integration.",
      "The website ships the same frontend for the web so you can try Pulse anywhere.",
    ],
  },
  privacy: {
    heading: "Privacy",
    paragraphs: [
      "Pulse does not include analytics, crash reporters, or hidden network calls in the workbench.",
      "Update checks call the public GitHub Releases API once at startup on desktop; you choose whether to download an installer.",
      "Web IDE folder access stays inside your browser; nothing is uploaded to Pulse servers.",
    ],
  },
  footer: {
    tagline: "Pulse IDE · Open Source · Pulse-IDE Organization",
    latestRelease: "Latest release",
  },
  lang: { label: "Language" },
};

const it: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Veloce, privato, multipiattaforma",
    homeDescription:
      "IDE open source leggero, senza telemetria, per macOS, Linux, Windows e web.",
    featuresTitle: "Funzionalità — Pulse IDE",
    featuresDescription: "Scopri workbench, estensioni, terminale ed editor di Pulse.",
    downloadTitle: "Download — Pulse IDE",
    downloadDescription: "Installa Pulse per macOS, Linux e Windows.",
    webTitle: "Pulse Web — IDE nel browser",
    webDescription: "Lo stesso workbench Pulse direttamente nel browser.",
    aboutTitle: "Informazioni — Pulse IDE",
    aboutDescription: "Missione e principi di Pulse IDE.",
    privacyTitle: "Privacy — Pulse IDE",
    privacyDescription: "Nessuna telemetria. Il tuo codice resta sul tuo dispositivo.",
  },
  nav: {
    home: "Home",
    features: "Funzionalità",
    download: "Download",
    webIde: "IDE Web",
    about: "Info",
    privacy: "Privacy",
    github: "GitHub",
    docs: "Documentazione",
  },
  hero: {
    title: "Codice alla massima velocità. Zero telemetria.",
    subtitle:
      "Pulse è un IDE nativo con Tauri e Rust, con un workbench web identico. Avvio rapido, poca memoria e installer per ogni piattaforma.",
    ctaDownload: "Scarica",
    ctaWeb: "Apri IDE Web",
    badges: ["MIT / Apache-2.0", "Open Source", "Multipiattaforma", "Senza telemetria"],
  },
  home: {
    webCardTitle: "La stessa interfaccia nel browser",
    webCardBody:
      "L’edizione web replica il desktop: explorer, editor Monaco, pannello estensioni e terminale limitato.",
    webCardAction: "Avvia Pulse Web",
  },
  features: {
    heading: "Pensato per lo sviluppo quotidiano",
    intro: "Tutto ciò che serve in un editor moderno, senza appesantire.",
    items: en.features.items.map((item, i) =>
      i === 0
        ? { title: "Workbench moderno", body: "Barra attività, pannelli ridimensionabili, schede e tema scuro." }
        : i === 1
          ? { title: "Editor Monaco", body: "Evidenziazione, formattazione e worker per TS, JSON, CSS e HTML." }
          : i === 2
            ? { title: "Host estensioni", body: "Temi e formatter inclusi con modello worker estendibile." }
            : i === 3
              ? { title: "Terminale integrato", body: "PTY completo su desktop; shell guidata nel browser." }
              : i === 4
                ? { title: "Panoramica Git", body: "Branch e stato su repository locali (desktop)." }
                : { title: "Aggiornamenti", body: "All’avvio controlla GitHub Releases e propone il download." },
    ),
  },
  download: {
    heading: "Download",
    intro: "Scegli la build per il tuo sistema operativo e architettura.",
    recommended: "Consigliato per il tuo sistema",
    detecting: "Rilevamento piattaforma…",
    allPlatforms: "Tutte le piattaforme",
  },
  web: {
    heading: "Pulse Web IDE",
    intro:
      "Concedi l’accesso alla cartella in un browser Chromium per modificare file con lo stesso layout del desktop.",
    note: "LSP, debug e shell completa richiedono l’app desktop.",
    openFull: "Workbench a schermo intero",
  },
  about: {
    heading: "Informazioni su Pulse",
    paragraphs: [
      "Pulse IDE è open source dal team Pulse-IDE. Privilegiamo velocità, prevedibilità e privacy.",
      "Il desktop unisce workbench React e backend Rust/Tauri per filesystem, terminale e tooling.",
      "Il sito include lo stesso frontend web per provare Pulse ovunque.",
    ],
  },
  privacy: {
    heading: "Privacy",
    paragraphs: [
      "Nessuna analitica, crash reporter o chiamate di rete nascoste nel workbench.",
      "Il controllo aggiornamenti usa l’API GitHub Releases all’avvio; decidi tu se scaricare.",
      "L’accesso alle cartelle nel browser resta locale; nulla viene caricato su server Pulse.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Ultima release" },
  lang: { label: "Lingua" },
};

const es: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Rápido, privado, multiplataforma",
    homeDescription: "IDE open source ligero, sin telemetría, para macOS, Linux, Windows y web.",
    featuresTitle: "Funciones — Pulse IDE",
    downloadTitle: "Descargar — Pulse IDE",
    webTitle: "Pulse Web — IDE en el navegador",
    aboutTitle: "Acerca de — Pulse IDE",
    privacyTitle: "Privacidad — Pulse IDE",
  },
  nav: {
    home: "Inicio",
    features: "Funciones",
    download: "Descargar",
    webIde: "IDE Web",
    about: "Acerca de",
    privacy: "Privacidad",
    github: "GitHub",
    docs: "Docs",
  },
  hero: {
    title: "Código a máxima velocidad. Cero telemetría.",
    subtitle:
      "Pulse es un IDE nativo con Tauri y Rust, con el mismo workbench en web. Arranque rápido e instaladores para cada plataforma.",
    ctaDownload: "Descargar",
    ctaWeb: "Abrir IDE Web",
    badges: ["MIT / Apache-2.0", "Código abierto", "Multiplataforma", "Sin telemetría"],
  },
  home: {
    webCardTitle: "La misma interfaz en el navegador",
    webCardBody: "La edición web replica el escritorio: explorador, Monaco, extensiones y terminal limitado.",
    webCardAction: "Iniciar Pulse Web",
  },
  features: {
    heading: "Hecho para el desarrollo diario",
    intro: "Todo lo esencial de un editor moderno, sin peso extra.",
    items: en.features.items,
  },
  download: {
    heading: "Descargas",
    intro: "Elige la build para tu sistema y arquitectura.",
    recommended: "Recomendado para tu sistema",
    detecting: "Detectando plataforma…",
    allPlatforms: "Todas las plataformas",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Concede acceso a carpetas en Chromium para editar con el mismo layout que el escritorio.",
    note: "LSP, depuración y shell completa requieren la app de escritorio.",
    openFull: "Workbench a pantalla completa",
  },
  about: {
    heading: "Acerca de Pulse",
    paragraphs: [
      "Pulse IDE es open source de Pulse-IDE. Priorizamos velocidad, previsibilidad y privacidad.",
      "El escritorio combina workbench React y backend Rust/Tauri.",
      "El sitio incluye el mismo frontend web.",
    ],
  },
  privacy: {
    heading: "Privacidad",
    paragraphs: [
      "Sin analítica ni informes ocultos en el workbench.",
      "Las actualizaciones consultan GitHub Releases al inicio; tú decides si descargar.",
      "El acceso a carpetas en web permanece en tu navegador.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Última versión" },
  lang: { label: "Idioma" },
};

const fr: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Rapide, privé, multiplateforme",
    homeDescription: "IDE open source léger, sans télémétrie, pour macOS, Linux, Windows et le web.",
    featuresTitle: "Fonctionnalités — Pulse IDE",
    downloadTitle: "Télécharger — Pulse IDE",
    webTitle: "Pulse Web — IDE navigateur",
    aboutTitle: "À propos — Pulse IDE",
    privacyTitle: "Confidentialité — Pulse IDE",
  },
  nav: {
    home: "Accueil",
    features: "Fonctionnalités",
    download: "Télécharger",
    webIde: "IDE Web",
    about: "À propos",
    privacy: "Confidentialité",
    github: "GitHub",
    docs: "Docs",
  },
  hero: {
    title: "Coder à pleine vitesse. Zéro télémétrie.",
    subtitle:
      "Pulse est un IDE natif Tauri/Rust avec le même workbench sur le web. Démarrage rapide et installeurs pour chaque plateforme.",
    ctaDownload: "Télécharger",
    ctaWeb: "Ouvrir l’IDE Web",
    badges: ["MIT / Apache-2.0", "Open Source", "Multiplateforme", "Sans télémétrie"],
  },
  home: {
    webCardTitle: "La même interface dans le navigateur",
    webCardBody: "L’édition web reproduit le bureau : explorateur, Monaco, extensions et terminal limité.",
    webCardAction: "Lancer Pulse Web",
  },
  features: {
    heading: "Conçu pour le quotidien",
    intro: "L’essentiel d’un éditeur moderne, sans surcharge.",
    items: en.features.items,
  },
  download: {
    heading: "Téléchargements",
    intro: "Choisissez la build pour votre OS et architecture.",
    recommended: "Recommandé pour votre système",
    detecting: "Détection de la plateforme…",
    allPlatforms: "Toutes les plateformes",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Autorisez l’accès aux dossiers dans Chromium pour éditer avec le même layout que le bureau.",
    note: "LSP, débogage et shell complet nécessitent l’application desktop.",
    openFull: "Workbench plein écran",
  },
  about: {
    heading: "À propos de Pulse",
    paragraphs: [
      "Pulse IDE est open source par Pulse-IDE. Vitesse, prévisibilité et respect de la vie privée.",
      "Le desktop combine workbench React et backend Rust/Tauri.",
      "Le site embarque le même frontend web.",
    ],
  },
  privacy: {
    heading: "Confidentialité",
    paragraphs: [
      "Pas d’analytique ni d’appels réseau cachés dans le workbench.",
      "Les mises à jour vérifient GitHub Releases au démarrage ; vous choisissez de télécharger.",
      "L’accès aux dossiers web reste dans votre navigateur.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Dernière version" },
  lang: { label: "Langue" },
};

const de: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Schnell, privat, plattformübergreifend",
    homeDescription: "Leichtes Open-Source-IDE ohne Telemetrie für macOS, Linux, Windows und Web.",
    featuresTitle: "Funktionen — Pulse IDE",
    downloadTitle: "Download — Pulse IDE",
    webTitle: "Pulse Web — Browser-IDE",
    aboutTitle: "Über — Pulse IDE",
    privacyTitle: "Datenschutz — Pulse IDE",
  },
  nav: {
    home: "Start",
    features: "Funktionen",
    download: "Download",
    webIde: "Web-IDE",
    about: "Über",
    privacy: "Datenschutz",
    github: "GitHub",
    docs: "Docs",
  },
  hero: {
    title: "Code mit voller Geschwindigkeit. Keine Telemetrie.",
    subtitle:
      "Pulse ist ein natives IDE mit Tauri und Rust, inklusive identischem Web-Workbench. Schneller Start, Installer für alle Plattformen.",
    ctaDownload: "Herunterladen",
    ctaWeb: "Web-IDE öffnen",
    badges: ["MIT / Apache-2.0", "Open Source", "Plattformübergreifend", "Keine Telemetrie"],
  },
  home: {
    webCardTitle: "Gleiche Oberfläche im Browser",
    webCardBody: "Die Web-Edition spiegelt Desktop: Explorer, Monaco, Erweiterungen und begrenztes Terminal.",
    webCardAction: "Pulse Web starten",
  },
  features: {
    heading: "Für den Alltag gebaut",
    intro: "Alles Wichtige eines modernen Editors, ohne Ballast.",
    items: en.features.items,
  },
  download: {
    heading: "Downloads",
    intro: "Wähle Build für Betriebssystem und Architektur.",
    recommended: "Empfohlen für dein System",
    detecting: "Plattform wird erkannt…",
    allPlatforms: "Alle Plattformen",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Ordnerzugriff in Chromium erlauben und mit dem gleichen Layout wie Desktop arbeiten.",
    note: "LSP, Debugging und volle Shell benötigen die Desktop-App.",
    openFull: "Vollbild-Workbench",
  },
  about: {
    heading: "Über Pulse",
    paragraphs: [
      "Pulse IDE ist Open Source von Pulse-IDE. Fokus auf Geschwindigkeit, Vorhersagbarkeit und Privatsphäre.",
      "Desktop verbindet React-Workbench mit Rust/Tauri-Backend.",
      "Die Website liefert dasselbe Web-Frontend.",
    ],
  },
  privacy: {
    heading: "Datenschutz",
    paragraphs: [
      "Keine Analytik oder versteckte Netzwerkaufrufe im Workbench.",
      "Updates prüfen GitHub Releases beim Start; du entscheidest über Downloads.",
      "Web-Ordnerzugriff bleibt im Browser.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Neueste Version" },
  lang: { label: "Sprache" },
};

const pt: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Rápido, privado, multiplataforma",
    homeDescription: "IDE open source leve, sem telemetria, para macOS, Linux, Windows e web.",
    featuresTitle: "Recursos — Pulse IDE",
    downloadTitle: "Download — Pulse IDE",
    webTitle: "Pulse Web — IDE no navegador",
    aboutTitle: "Sobre — Pulse IDE",
    privacyTitle: "Privacidade — Pulse IDE",
  },
  nav: {
    home: "Início",
    features: "Recursos",
    download: "Download",
    webIde: "IDE Web",
    about: "Sobre",
    privacy: "Privacidade",
    github: "GitHub",
    docs: "Docs",
  },
  hero: {
    title: "Código na velocidade máxima. Zero telemetria.",
    subtitle:
      "Pulse é um IDE nativo com Tauri e Rust, com o mesmo workbench na web. Início rápido e instaladores para cada plataforma.",
    ctaDownload: "Baixar",
    ctaWeb: "Abrir IDE Web",
    badges: ["MIT / Apache-2.0", "Código aberto", "Multiplataforma", "Sem telemetria"],
  },
  home: {
    webCardTitle: "A mesma interface no navegador",
    webCardBody: "A edição web replica o desktop: explorador, Monaco, extensões e terminal limitado.",
    webCardAction: "Iniciar Pulse Web",
  },
  features: {
    heading: "Feito para o dia a dia",
    intro: "Tudo que você espera de um editor moderno, sem peso.",
    items: en.features.items,
  },
  download: {
    heading: "Downloads",
    intro: "Escolha a build para seu sistema e arquitetura.",
    recommended: "Recomendado para seu sistema",
    detecting: "Detectando plataforma…",
    allPlatforms: "Todas as plataformas",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Conceda acesso a pastas no Chromium para editar com o mesmo layout do desktop.",
    note: "LSP, debug e shell completa exigem o app desktop.",
    openFull: "Workbench em tela cheia",
  },
  about: {
    heading: "Sobre o Pulse",
    paragraphs: [
      "Pulse IDE é open source da Pulse-IDE. Priorizamos velocidade, previsibilidade e privacidade.",
      "O desktop combina workbench React e backend Rust/Tauri.",
      "O site inclui o mesmo frontend web.",
    ],
  },
  privacy: {
    heading: "Privacidade",
    paragraphs: [
      "Sem analítica ou chamadas ocultas no workbench.",
      "Atualizações consultam GitHub Releases na inicialização; você decide baixar.",
      "Acesso a pastas na web fica no navegador.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Última versão" },
  lang: { label: "Idioma" },
};

const ja: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — 高速・プライベート・マルチプラットフォーム",
    homeDescription: "macOS、Linux、Windows、Web 向けの軽量 OSS IDE。テレメトリなし。",
    featuresTitle: "機能 — Pulse IDE",
    downloadTitle: "ダウンロード — Pulse IDE",
    webTitle: "Pulse Web — ブラウザ IDE",
    aboutTitle: "概要 — Pulse IDE",
    privacyTitle: "プライバシー — Pulse IDE",
  },
  nav: {
    home: "ホーム",
    features: "機能",
    download: "ダウンロード",
    webIde: "Web IDE",
    about: "概要",
    privacy: "プライバシー",
    github: "GitHub",
    docs: "ドキュメント",
  },
  hero: {
    title: "全速力でコーディング。テレメトリゼロ。",
    subtitle:
      "Tauri と Rust のネイティブ IDE。Web でも同じワークベンチ。高速起動と各プラットフォーム向けインストーラ。",
    ctaDownload: "ダウンロード",
    ctaWeb: "Web IDE を開く",
    badges: ["MIT / Apache-2.0", "オープンソース", "マルチプラットフォーム", "テレメトリなし"],
  },
  home: {
    webCardTitle: "ブラウザでも同じ UI",
    webCardBody: "Web 版はデスクトップと同じエクスプローラー、Monaco、拡張、限定ターミナル。",
    webCardAction: "Pulse Web を起動",
  },
  features: {
    heading: "日常開発のため",
    intro: "モダンエディタの要点を、無駄なく。",
    items: en.features.items,
  },
  download: {
    heading: "ダウンロード",
    intro: "OS とアーキテクチャに合うビルドを選択。",
    recommended: "お使いの環境向け",
    detecting: "プラットフォームを検出中…",
    allPlatforms: "すべてのプラットフォーム",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Chromium 系ブラウザでフォルダアクセスを許可し、デスクトップと同じレイアウトで編集。",
    note: "LSP・デバッグ・完全シェルはデスクトップ版が必要です。",
    openFull: "全画面ワークベンチ",
  },
  about: {
    heading: "Pulse について",
    paragraphs: [
      "Pulse IDE は Pulse-IDE の OSS プロジェクト。速度・予測可能性・プライバシーを重視。",
      "デスクトップは React ワークベンチと Rust/Tauri バックエンド。",
      "サイトは同じ Web フロントエンドを同梱。",
    ],
  },
  privacy: {
    heading: "プライバシー",
    paragraphs: [
      "ワークベンチに分析や隠し通信はありません。",
      "更新確認は起動時に GitHub Releases API のみ。ダウンロードは任意。",
      "Web のフォルダアクセスはブラウザ内に留まります。",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "最新リリース" },
  lang: { label: "言語" },
};

const zh: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — 快速、私密、跨平台",
    homeDescription: "适用于 macOS、Linux、Windows 和 Web 的轻量开源 IDE，无遥测。",
    featuresTitle: "功能 — Pulse IDE",
    downloadTitle: "下载 — Pulse IDE",
    webTitle: "Pulse Web — 浏览器 IDE",
    aboutTitle: "关于 — Pulse IDE",
    privacyTitle: "隐私 — Pulse IDE",
  },
  nav: {
    home: "首页",
    features: "功能",
    download: "下载",
    webIde: "Web IDE",
    about: "关于",
    privacy: "隐私",
    github: "GitHub",
    docs: "文档",
  },
  hero: {
    title: "全速写代码。零遥测。",
    subtitle: "基于 Tauri 和 Rust 的原生 IDE，Web 端同款工作台。快速启动，全平台安装包。",
    ctaDownload: "下载",
    ctaWeb: "打开 Web IDE",
    badges: ["MIT / Apache-2.0", "开源", "跨平台", "无遥测"],
  },
  home: {
    webCardTitle: "浏览器同款界面",
    webCardBody: "Web 版复刻桌面：资源管理器、Monaco、扩展与受限终端。",
    webCardAction: "启动 Pulse Web",
  },
  features: {
    heading: "为日常开发打造",
    intro: "现代编辑器该有的，没有多余负担。",
    items: en.features.items,
  },
  download: {
    heading: "下载",
    intro: "选择适合你的系统与架构的版本。",
    recommended: "推荐（当前系统）",
    detecting: "正在检测平台…",
    allPlatforms: "所有平台",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "在 Chromium 浏览器中授权文件夹访问，布局与桌面版一致。",
    note: "语言服务、调试与完整终端需使用桌面版。",
    openFull: "全屏工作台",
  },
  about: {
    heading: "关于 Pulse",
    paragraphs: [
      "Pulse IDE 是 Pulse-IDE 的开源项目，注重速度、可预期与隐私。",
      "桌面版结合 React 工作台与 Rust/Tauri 后端。",
      "网站内置相同 Web 前端。",
    ],
  },
  privacy: {
    heading: "隐私",
    paragraphs: [
      "工作台无分析或隐藏网络请求。",
      "启动时通过 GitHub Releases API 检查更新，是否下载由你决定。",
      "Web 文件夹访问仅在浏览器内。",
    ],
  },
  footer: { tagline: "Pulse IDE · 开源 · Pulse-IDE Organization", latestRelease: "最新版本" },
  lang: { label: "语言" },
};

const ko: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — 빠르고, 사적이며, 크로스 플랫폼",
    homeDescription: "macOS, Linux, Windows, Web용 경량 OSS IDE. 원격 측정 없음.",
    featuresTitle: "기능 — Pulse IDE",
    downloadTitle: "다운로드 — Pulse IDE",
    webTitle: "Pulse Web — 브라우저 IDE",
    aboutTitle: "소개 — Pulse IDE",
    privacyTitle: "개인정보 — Pulse IDE",
  },
  nav: {
    home: "홈",
    features: "기능",
    download: "다운로드",
    webIde: "Web IDE",
    about: "소개",
    privacy: "개인정보",
    github: "GitHub",
    docs: "문서",
  },
  hero: {
    title: "최고 속도로 코딩. 원격 측정 제로.",
    subtitle:
      "Tauri와 Rust 네이티브 IDE, Web에서도 동일 워크벤치. 빠른 시작과 전 플랫폼 설치 프로그램.",
    ctaDownload: "다운로드",
    ctaWeb: "Web IDE 열기",
    badges: ["MIT / Apache-2.0", "오픈 소스", "크로스 플랫폼", "원격 측정 없음"],
  },
  home: {
    webCardTitle: "브라우저에서도 같은 UI",
    webCardBody: "Web 버전은 탐색기, Monaco, 확장, 제한 터미널까지 데스크톱과 동일.",
    webCardAction: "Pulse Web 실행",
  },
  features: {
    heading: "일상 개발을 위해",
    intro: "현대 에디터의 핵심만, 무겁지 않게.",
    items: en.features.items,
  },
  download: {
    heading: "다운로드",
    intro: "OS와 아키텍처에 맞는 빌드를 선택하세요.",
    recommended: "현재 시스템 권장",
    detecting: "플랫폼 감지 중…",
    allPlatforms: "모든 플랫폼",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Chromium 브라우저에서 폴더 접근을 허용하고 데스크톱과 같은 레이아웃으로 편집.",
    note: "LSP, 디버깅, 전체 셸은 데스크톱 앱이 필요합니다.",
    openFull: "전체 화면 워크벤치",
  },
  about: {
    heading: "Pulse 소개",
    paragraphs: [
      "Pulse IDE는 Pulse-IDE의 OSS 프로젝트입니다. 속도, 예측 가능성, 프라이버시를 중시합니다.",
      "데스크톱은 React 워크벤치와 Rust/Tauri 백엔드를 결합합니다.",
      "사이트는 동일 Web 프론트엔드를 포함합니다.",
    ],
  },
  privacy: {
    heading: "개인정보",
    paragraphs: [
      "워크벤치에 분석이나 숨은 네트워크 호출이 없습니다.",
      "시작 시 GitHub Releases API로 업데이트 확인; 다운로드는 선택.",
      "Web 폴더 접근은 브라우저 안에만 있습니다.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "최신 릴리스" },
  lang: { label: "언어" },
};

const ru: SiteCopy = {
  ...en,
  meta: {
    ...en.meta,
    homeTitle: "Pulse IDE — Быстро, приватно, кроссплатформенно",
    homeDescription: "Лёгкая IDE с открытым кодом без телеметрии для macOS, Linux, Windows и Web.",
    featuresTitle: "Возможности — Pulse IDE",
    downloadTitle: "Скачать — Pulse IDE",
    webTitle: "Pulse Web — IDE в браузере",
    aboutTitle: "О проекте — Pulse IDE",
    privacyTitle: "Конфиденциальность — Pulse IDE",
  },
  nav: {
    home: "Главная",
    features: "Возможности",
    download: "Скачать",
    webIde: "Web IDE",
    about: "О проекте",
    privacy: "Конфиденциальность",
    github: "GitHub",
    docs: "Документация",
  },
  hero: {
    title: "Код на полной скорости. Ноль телеметрии.",
    subtitle:
      "Нативная IDE на Tauri и Rust с тем же workbench в браузере. Быстрый запуск и установщики для всех платформ.",
    ctaDownload: "Скачать",
    ctaWeb: "Открыть Web IDE",
    badges: ["MIT / Apache-2.0", "Open Source", "Кроссплатформа", "Без телеметрии"],
  },
  home: {
    webCardTitle: "Тот же интерфейс в браузере",
    webCardBody: "Web-версия повторяет desktop: проводник, Monaco, расширения и ограниченный терминал.",
    webCardAction: "Запустить Pulse Web",
  },
  features: {
    heading: "Для ежедневной разработки",
    intro: "Всё нужное от современного редактора, без лишнего веса.",
    items: en.features.items,
  },
  download: {
    heading: "Загрузки",
    intro: "Выберите сборку для вашей ОС и архитектуры.",
    recommended: "Рекомендуется для вашей системы",
    detecting: "Определение платформы…",
    allPlatforms: "Все платформы",
  },
  web: {
    heading: "Pulse Web IDE",
    intro: "Разрешите доступ к папке в Chromium и работайте с тем же layout, что на desktop.",
    note: "LSP, отладка и полноценная shell требуют desktop-приложения.",
    openFull: "Workbench на весь экран",
  },
  about: {
    heading: "О Pulse",
    paragraphs: [
      "Pulse IDE — open source проект Pulse-IDE. Скорость, предсказуемость и приватность.",
      "Desktop объединяет React workbench и backend Rust/Tauri.",
      "Сайт включает тот же Web frontend.",
    ],
  },
  privacy: {
    heading: "Конфиденциальность",
    paragraphs: [
      "Нет аналитики и скрытых сетевых вызовов в workbench.",
      "При запуске проверка GitHub Releases; скачивание по вашему выбору.",
      "Доступ к папкам в Web остаётся в браузере.",
    ],
  },
  footer: { tagline: "Pulse IDE · Open Source · Pulse-IDE Organization", latestRelease: "Последний релиз" },
  lang: { label: "Язык" },
};

const table: Record<Locale, SiteCopy> = {
  en,
  it,
  es,
  fr,
  de,
  pt,
  ja,
  zh,
  ko,
  ru,
};

export function getTranslations(locale: Locale): SiteCopy {
  return table[locale] ?? en;
}
