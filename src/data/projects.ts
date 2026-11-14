// Projects. To add a future app: add an entry here plus its images in src/assets/<slug>/.
// It gets a home block and its own /en/<slug>/ and /pt/<slug>/ page automatically.
import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n';
import fdIcon from '../assets/fruidoku/icon.png';
import fd1 from '../assets/fruidoku/01-home.png';
import fd2 from '../assets/fruidoku/02-playing.png';
import fd3 from '../assets/fruidoku/03-where.png';
import fd4 from '../assets/fruidoku/04-solved-star.png';
import fd5 from '../assets/fruidoku/05-rules.png';
import fmIcon from '../assets/formly/icon.png';
import fmEn1 from '../assets/formly/en/1-dashboard.png';
import fmEn2 from '../assets/formly/en/2-goal.png';
import fmEn3 from '../assets/formly/en/3-share.png';
import fmEn4 from '../assets/formly/en/4-history.png';
import fmEn5 from '../assets/formly/en/5-log.png';
import fmPt1 from '../assets/formly/pt/1-dashboard.png';
import fmPt2 from '../assets/formly/pt/2-goal.png';
import fmPt3 from '../assets/formly/pt/3-share.png';
import fmPt4 from '../assets/formly/pt/4-history.png';
import fmPt5 from '../assets/formly/pt/5-log.png';
import { SITE } from './site';

export interface Shot { src: ImageMetadata; alt: L10n }
export interface Project {
  slug: string;
  name: string;
  storeName: string;
  status: 'live' | 'review';
  icon: ImageMetadata;
  theme: 'fruidoku' | 'formly';
  desc: L10n;
  facts: { value: L10n | string; label: L10n }[];
  stack: L10n;
  links: { kind: 'appstore' | 'support' | 'privacy' | 'legal'; url: string }[];
  /** Screenshots per language; the first three appear on the home page. */
  shots: { en: Shot[]; pt: Shot[] };
  hasDemo: boolean;
  appStoreId?: string;
  /** schema.org applicationCategory, used once the app is live */
  category: 'GameApplication' | 'HealthApplication' | string;
  seo: { title: L10n; desc: L10n };
  /** Case-study page */
  intro: L10n;
  sections: { h: L10n; body: L10n[]; list?: L10n[] }[];
  spec: { term: L10n; detail: L10n | string }[];
}

const fdShots: Shot[] = [
  { src: fd1, alt: { en: 'Fruidoku home screen with the wordmark, a Continue button and the daily streak', pt: 'Ecrã inicial do Fruidoku com o logótipo, o botão Continuar e a sequência diária' } },
  { src: fd2, alt: { en: 'A Fruidoku level in progress, with crosses marked and two fruits planted', pt: 'Um nível do Fruidoku a meio, com cruzes marcadas e duas frutas plantadas' } },
  { src: fd4, alt: { en: 'The Solved screen with a star earned for no mistakes', pt: 'O ecrã de nível resolvido, com a estrela ganha por não haver erros' } },
  { src: fd3, alt: { en: 'The "where?" hint outlining the patch to look at', pt: 'A ajuda "onde?" a destacar o canteiro onde procurar' } },
  { src: fd5, alt: { en: 'The rules screen explaining the four rules', pt: 'O ecrã de regras com as quatro regras do jogo' } },
];

const fmAlt = {
  dash: { en: 'Formly dashboard with weight trend, BMI and body fat cards', pt: 'Painel do Formly com a tendência do peso, o IMC e a gordura corporal' },
  goal: { en: 'Formly weight chart with a goal and its forecast', pt: 'Gráfico de peso do Formly com um objetivo e a sua estimativa' },
  share: { en: 'Formly share card showing a reached goal without numbers', pt: 'Cartão de partilha do Formly com um objetivo atingido, sem números' },
  hist: { en: 'Formly history with the change from each previous entry', pt: 'Histórico do Formly com a diferença para cada registo anterior' },
  log: { en: 'Formly log form, where only the measured values are filled in', pt: 'Formulário de registo do Formly, só com os valores medidos' },
};

export const projects: Project[] = [
  {
    slug: 'fruidoku',
    name: 'Fruidoku',
    storeName: 'Fruidoku: Fruit Logic Puzzle',
    status: 'live',
    icon: fdIcon,
    theme: 'fruidoku',
    appStoreId: '6829816279',
    category: 'GameApplication',
    desc: {
      en: 'A fruit logic puzzle for iPhone. Plant one fruit in every row, column and coloured patch, with no two fruits touching. Every level has exactly one solution, and logic alone will find it.',
      pt: 'Um puzzle de lógica com frutas para iPhone. Planta uma fruta em cada linha, coluna e canteiro colorido, sem que duas frutas se toquem. Cada nível tem exatamente uma solução, e a lógica chega para a encontrar.',
    },
    facts: [
      { value: { en: '1,500', pt: '1500' }, label: { en: 'verified levels', pt: 'níveis verificados' } },
      { value: { en: '5×5 to 10×10', pt: '5×5 a 10×10' }, label: { en: 'board sizes', pt: 'tamanhos de tabuleiro' } },
      { value: '5', label: { en: 'languages', pt: 'idiomas' } },
      { value: 'Offline', label: { en: 'progress synced through iCloud', pt: 'progresso sincronizado pelo iCloud' } },
    ],
    stack: {
      en: 'Swift and SwiftUI, SwiftData mirrored to CloudKit, StoreKit 2, AdMob, a pure Swift engine package with its own tests, and a level generator in C and Python.',
      pt: 'Swift e SwiftUI, SwiftData espelhado no CloudKit, StoreKit 2, AdMob, um motor de jogo em Swift puro com os seus testes e um gerador de níveis em C e Python.',
    },
    links: [
      { kind: 'appstore', url: 'https://apps.apple.com/app/id6829816279' },
      { kind: 'legal', url: SITE.legal.fruidoku },
    ],
    shots: { en: fdShots, pt: fdShots },
    hasDemo: true,
    seo: {
      title: { en: 'Fruidoku: Fruit Logic Puzzle, by Rui Costa', pt: 'Fruidoku: puzzle de lógica com frutas, por Rui Costa' },
      desc: {
        en: 'Fruidoku is a calm logic puzzle for iPhone with 1,500 levels, each with exactly one solution. Designed and built by Rui Costa. Play a level here.',
        pt: 'O Fruidoku é um puzzle de lógica calmo para iPhone, com 1500 níveis e uma única solução em cada um. Desenhado e programado por Rui Costa. Joga um nível aqui.',
      },
    },
    intro: {
      en: 'Plant one fruit in every row, every column and every coloured patch. Two fruits can never touch, not even diagonally. It sounds easy, then the boards grow to 10×10.',
      pt: 'Planta uma fruta em cada linha, em cada coluna e em cada canteiro colorido. Duas frutas nunca se podem tocar, nem na diagonal. Parece fácil, até os tabuleiros chegarem a 10×10.',
    },
    sections: [
      {
        h: { en: 'The rules', pt: 'As regras' },
        body: [{ en: 'On an N × N board split into N coloured patches:', pt: 'Num tabuleiro N × N dividido em N canteiros coloridos:' }],
        list: [
          { en: 'Each row holds exactly one fruit.', pt: 'Cada linha tem exatamente uma fruta.' },
          { en: 'Each column holds exactly one fruit.', pt: 'Cada coluna tem exatamente uma fruta.' },
          { en: 'Each patch holds exactly one fruit.', pt: 'Cada canteiro tem exatamente uma fruta.' },
          { en: 'Fruits never touch, including diagonally.', pt: 'As frutas nunca se tocam, nem na diagonal.' },
        ],
      },
      {
        h: { en: 'How it plays', pt: 'Como se joga' },
        body: [
          { en: 'Tap a cell to mark it with ×, drag to mark several, and double-tap to plant a fruit. A fruit in the wrong place costs one of three lives. Solve a level without a mistake and you earn its star.', pt: 'Toca numa casa para a marcar com ×, arrasta para marcar várias e dá dois toques para plantar uma fruta. Uma fruta no sítio errado custa uma de três vidas. Resolve um nível sem erros e ganhas a estrela.' },
          { en: 'When you are stuck there are three kinds of hint: rule out a cell, see where to look, or plant the next fruit. A daily streak rewards playing seven days in a row.', pt: 'Quando estás encravado há três tipos de ajuda: excluir uma casa, ver onde procurar ou plantar a próxima fruta. Uma sequência diária dá um prémio a cada sete dias seguidos.' },
        ],
      },
      {
        h: { en: 'Decisions I made', pt: 'Decisões que tomei' },
        body: [
          { en: 'Every level must have exactly one solution, reachable by logic alone. Levels come from a generator written in C and are then re-verified in Python by an independent solver, graded by the same deduction engine the app uses, and checked again by the Swift tests.', pt: 'Cada nível tem de ter exatamente uma solução, a que se chega só com lógica. Os níveis saem de um gerador escrito em C e depois são verificados outra vez em Python por um solver independente, classificados pelo mesmo motor de dedução que a app usa e testados de novo pelos testes em Swift.' },
          { en: 'The × marks are always placed by hand. Auto-marking would make the game easier, but it would also make players less attentive, so I left it out.', pt: 'As marcas × são sempre postas à mão. Marcá-las automaticamente tornaria o jogo mais fácil, mas também deixaria os jogadores menos atentos, por isso deixei isso de fora.' },
          { en: 'Released levels never change place: progress is stored per level, so the catalogue only ever grows. When 11 × 11 boards turned out too small to tap on a phone, each was replaced by a 10 × 10 board of the same difficulty in the same spot, and players keep their progress.', pt: 'Os níveis publicados nunca mudam de lugar: o progresso é guardado por nível, por isso o catálogo só cresce. Quando os tabuleiros 11 × 11 se revelaram pequenos demais para tocar num telemóvel, cada um foi substituído por um 10 × 10 da mesma dificuldade no mesmo lugar, e os jogadores mantêm o progresso.' },
          { en: 'For colour-vision accessibility, each patch can show its own pattern, so colour is never the only cue.', pt: 'Para quem tem dificuldade em distinguir cores, cada canteiro pode mostrar o seu próprio padrão, para que a cor nunca seja a única pista.' },
        ],
      },
    ],
    spec: [
      { term: { en: 'Platform', pt: 'Plataforma' }, detail: { en: 'iPhone, iOS 17 or later', pt: 'iPhone, iOS 17 ou mais recente' } },
      { term: { en: 'Levels', pt: 'Níveis' }, detail: { en: '1,500, from 5 × 5 to 10 × 10, with Hard and Super hard levels', pt: '1500, de 5 × 5 a 10 × 10, com níveis Difícil e Super difícil' } },
      { term: { en: 'Languages', pt: 'Idiomas' }, detail: { en: 'English, Portuguese, French, Spanish, German', pt: 'Inglês, português, francês, espanhol, alemão' } },
      { term: { en: 'Interface', pt: 'Interface' }, detail: 'Swift, SwiftUI, Observation' },
      { term: { en: 'Engine', pt: 'Motor' }, detail: { en: 'A pure Swift package: solver, deducer, hints, with an XCTest suite', pt: 'Um pacote em Swift puro: solver, dedução e ajudas, com testes XCTest' } },
      { term: { en: 'Data', pt: 'Dados' }, detail: { en: 'SwiftData, mirrored to the player’s private iCloud', pt: 'SwiftData, espelhado no iCloud privado do jogador' } },
      { term: { en: 'Purchases and ads', pt: 'Compras e anúncios' }, detail: { en: 'StoreKit 2 (hint packs, Remove ads), AdMob with consent', pt: 'StoreKit 2 (packs de ajudas, Remover anúncios), AdMob com consentimento' } },
      { term: { en: 'Tooling', pt: 'Ferramentas' }, detail: { en: 'Level generator in C, verifier and catalogue builder in Python', pt: 'Gerador de níveis em C, verificador e construtor do catálogo em Python' } },
      { term: { en: 'Backend', pt: 'Backend' }, detail: { en: 'None. No login, works offline.', pt: 'Nenhum. Sem login, funciona sem internet.' } },
    ],
  },
  {
    slug: 'formly',
    name: 'Formly',
    storeName: 'Formly: Body Progress Tracker',
    status: 'review',
    category: 'HealthApplication',
    icon: fmIcon,
    theme: 'formly',
    desc: {
      en: "A private tracker for body measurements and progress photos. Log only what you measured, see the trend, and get an estimate of when you'll reach your goal. No account, no cloud, no ads.",
      pt: 'Uma app privada para registar medidas corporais e fotos de progresso. Regista só o que mediste, vê a tendência e fica a saber quando podes atingir o teu objetivo. Sem conta, sem nuvem, sem anúncios.',
    },
    facts: [
      { value: { en: 'On device', pt: 'No iPhone' }, label: { en: 'no network access at all', pt: 'sem qualquer acesso à rede' } },
      { value: { en: 'Forecasts', pt: 'Estimativas' }, label: { en: 'goal dates from your own trend', pt: 'datas a partir da tua tendência' } },
      { value: 'Widgets', label: { en: 'Home Screen and Lock Screen', pt: 'Ecrã Principal e Ecrã Bloqueado' } },
      { value: '151', label: { en: 'unit tests in 28 suites', pt: 'testes unitários em 28 suites' } },
    ],
    stack: {
      en: 'SwiftUI and SwiftData for iOS 18, widgets, optional Apple Health import, and CSV and JSON export.',
      pt: 'SwiftUI e SwiftData para iOS 18, widgets, importação opcional do Apple Saúde e exportação em CSV e JSON.',
    },
    links: [
      { kind: 'support', url: SITE.legal.formly },
      { kind: 'privacy', url: SITE.legal.formlyPrivacy },
    ],
    shots: {
      en: [{ src: fmEn1, alt: fmAlt.dash }, { src: fmEn2, alt: fmAlt.goal }, { src: fmEn3, alt: fmAlt.share }, { src: fmEn4, alt: fmAlt.hist }, { src: fmEn5, alt: fmAlt.log }],
      pt: [{ src: fmPt1, alt: fmAlt.dash }, { src: fmPt2, alt: fmAlt.goal }, { src: fmPt3, alt: fmAlt.share }, { src: fmPt4, alt: fmAlt.hist }, { src: fmPt5, alt: fmAlt.log }],
    },
    hasDemo: false,
    seo: {
      title: { en: 'Formly: Body Progress Tracker, by Rui Costa', pt: 'Formly: registo de progresso corporal, por Rui Costa' },
      desc: {
        en: 'Formly is a private, offline iPhone app for body measurements and progress photos, with goal forecasts and widgets. Designed and built by Rui Costa.',
        pt: 'O Formly é uma app privada e offline para iPhone para medidas corporais e fotos de progresso, com estimativas de objetivos e widgets. Desenhada e programada por Rui Costa.',
      },
    },
    intro: {
      en: 'Track weight, body fat and tape measurements, compare progress photos and see when you may reach your goal. Everything stays on your iPhone.',
      pt: 'Regista o peso, a gordura corporal e as medidas, compara fotos de progresso e vê quando podes atingir o teu objetivo. Tudo fica no teu iPhone.',
    },
    sections: [
      {
        h: { en: 'What it does', pt: 'O que faz' },
        body: [],
        list: [
          { en: 'Log weight, body fat, visceral fat, height and tape measurements such as waist, chest and hips. Skip what you didn’t measure: nothing is ever recorded as zero.', pt: 'Regista peso, gordura corporal, gordura visceral, altura e medidas como cintura, peito e anca. Salta o que não mediste: nada fica registado como zero.' },
          { en: 'Charts for every measurement over the time range you choose, and a history with the change from each previous entry.', pt: 'Gráficos de cada medida no período que escolheres, e um histórico com a diferença para cada registo anterior.' },
          { en: 'Goals for any measurement, with an estimate of when you may reach them based on your recent trend.', pt: 'Objetivos para qualquer medida, com uma estimativa de quando os podes atingir com base na tendência recente.' },
          { en: 'A dashboard you arrange yourself: trend cards, latest values and BMI with the WHO categories.', pt: 'Um painel organizado por ti: cartões de tendência, últimos valores e IMC com as categorias da OMS.' },
          { en: 'Progress photos, compared side by side, chosen with the system picker.', pt: 'Fotos de progresso, comparadas lado a lado, escolhidas com o seletor do sistema.' },
          { en: 'Shareable progress cards, with or without your numbers.', pt: 'Cartões de progresso para partilhar, com ou sem os teus números.' },
          { en: 'Optional Apple Health import and export, CSV export and a JSON backup you can restore.', pt: 'Importação e exportação opcional do Apple Saúde, exportação em CSV e uma cópia de segurança em JSON que podes restaurar.' },
        ],
      },
      {
        h: { en: 'Private by design', pt: 'Privada de raiz' },
        body: [
          { en: 'Formly has no account, no server, no analytics, no ads and no tracking. It works fully offline, and nothing leaves the iPhone unless you export or share it.', pt: 'O Formly não tem conta, servidor, análises, anúncios nem rastreio. Funciona totalmente offline, e nada sai do iPhone a não ser que o exportes ou partilhes.' },
          { en: 'Photos are picked with the system picker, so the app never asks for access to the photo library. Even the goal widget reads a small, already formatted summary and never touches the measurement store.', pt: 'As fotos são escolhidas com o seletor do sistema, por isso a app nunca pede acesso à fototeca. Até o widget de objetivos lê um pequeno resumo já formatado e nunca mexe nos registos.' },
        ],
      },
    ],
    spec: [
      { term: { en: 'Status', pt: 'Estado' }, detail: { en: 'In App Store review', pt: 'Em revisão na App Store' } },
      { term: { en: 'Platform', pt: 'Plataforma' }, detail: { en: 'iPhone, iOS 18 or later', pt: 'iPhone, iOS 18 ou mais recente' } },
      { term: { en: 'Languages', pt: 'Idiomas' }, detail: { en: 'English, Portuguese, Spanish, French', pt: 'Inglês, português, espanhol, francês' } },
      { term: { en: 'Interface', pt: 'Interface' }, detail: { en: 'SwiftUI, Light and Dark appearance', pt: 'SwiftUI, aspeto claro e escuro' } },
      { term: { en: 'Data', pt: 'Dados' }, detail: { en: 'SwiftData on device, no network access', pt: 'SwiftData no dispositivo, sem acesso à rede' } },
      { term: { en: 'Extensions', pt: 'Extensões' }, detail: { en: 'Goal widget for the Home Screen and Lock Screen, Apple Health', pt: 'Widget de objetivos no Ecrã Principal e no Ecrã Bloqueado, Apple Saúde' } },
      { term: { en: 'Tests', pt: 'Testes' }, detail: { en: '151 unit tests in 28 suites (Swift Testing)', pt: '151 testes unitários em 28 suites (Swift Testing)' } },
      { term: { en: 'Business model', pt: 'Modelo' }, detail: { en: 'Free, with optional Formly Plus. No ads.', pt: 'Gratuita, com Formly Plus opcional. Sem anúncios.' } },
    ],
  },
];
