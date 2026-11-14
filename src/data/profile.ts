import type { L10n } from '../i18n';

// Taken from Rui's LinkedIn. Do not add responsibilities or technologies he hasn't stated.
export interface Job { company: string; start: string; end: string | null; text: L10n; kind: 'work' | 'education'; years?: string }
export const experience: Job[] = [
  { company: 'Bosch Portugal', start: '2023-12', end: null, kind: 'work',
    text: { en: 'iOS developer. Aveiro.', pt: 'Programador iOS. Aveiro.' } },
  { company: 'Olisipo', start: '2023-04', end: '2023-12', kind: 'work',
    text: { en: 'iOS developer, placed at Bosch. Aveiro, remote.', pt: 'Programador iOS, alocado à Bosch. Aveiro, remoto.' } },
  { company: 'ITSector', start: '2021-09', end: '2023-04', kind: 'work',
    text: { en: 'iOS developer on the Millennium BCP and ActivoBank apps. Porto.', pt: 'Programador iOS nas apps do Millennium BCP e do ActivoBank. Porto.' } },
  { company: 'ITSector', start: '2021-03', end: '2021-06', kind: 'work',
    text: { en: 'iOS internship on the Banco Montepio app. Braga.', pt: 'Estágio em iOS na app do Banco Montepio. Braga.' } },
  { company: 'IPCA', start: '2018-09', end: '2021-07', kind: 'education', years: '2018 – 2021',
    text: { en: 'BSc in Computer Systems Engineering. Instituto Politécnico do Cávado e do Ave.', pt: 'Licenciatura em Engenharia de Sistemas Informáticos. Instituto Politécnico do Cávado e do Ave.' } },
];

export interface Skill { name: L10n | string; usedIn: L10n | string }
export const skills: Skill[] = [
  { name: 'Swift', usedIn: { en: 'At work since 2021, and in both of my apps', pt: 'No trabalho desde 2021 e nas minhas duas apps' } },
  { name: 'Objective-C', usedIn: { en: 'Professional iOS work', pt: 'Trabalho profissional em iOS' } },
  { name: 'SwiftUI', usedIn: 'Fruidoku, Formly' },
  { name: 'SwiftData, CloudKit', usedIn: { en: 'Fruidoku (iCloud sync), Formly (on device)', pt: 'Fruidoku (sincronização iCloud), Formly (no dispositivo)' } },
  { name: 'StoreKit 2', usedIn: { en: 'Fruidoku purchases', pt: 'Compras no Fruidoku' } },
  { name: 'WidgetKit, HealthKit', usedIn: 'Formly' },
  { name: 'XCTest, Swift Testing', usedIn: { en: "Fruidoku's engine tests, Formly's 151 tests", pt: 'Testes do motor do Fruidoku, 151 testes do Formly' } },
  { name: 'Python, C', usedIn: { en: "Fruidoku's level generator and verifier", pt: 'Gerador e verificador de níveis do Fruidoku' } },
  { name: { en: 'AI-assisted development', pt: 'Desenvolvimento assistido por IA' }, usedIn: { en: 'Building Fruidoku and Formly', pt: 'Na construção do Fruidoku e do Formly' } },
  { name: { en: 'Localisation', pt: 'Localização' }, usedIn: { en: 'String Catalogs, five languages', pt: 'String Catalogs, cinco idiomas' } },
];

export const principles: { title: L10n; text: L10n }[] = [
  { title: { en: 'Check it twice', pt: 'Verificar duas vezes' },
    text: { en: 'Every Fruidoku level is generated, then verified again by a separate solver and by the tests.', pt: 'Cada nível do Fruidoku é gerado e depois verificado outra vez por um solver independente e pelos testes.' } },
  { title: { en: 'Colour is never the only cue', pt: 'A cor nunca é a única pista' },
    text: { en: "I design for people who can't tell the colours apart: every element has its own shape too.", pt: 'Desenho para quem não distingue as cores: cada elemento tem também a sua forma.' } },
  { title: { en: 'Your data stays yours', pt: 'Os teus dados são teus' },
    text: { en: 'Formly has no account, no server and no analytics. Nothing leaves the iPhone unless you export it.', pt: 'O Formly não tem conta, servidor nem análises. Nada sai do iPhone a não ser que o exportes.' } },
  { title: { en: 'AI in the loop, my call', pt: 'IA no processo, decisão minha' },
    text: { en: 'I use AI to move faster. What ships is still reviewed and tested by me.', pt: 'Uso IA para ir mais depressa. O que é publicado continua a ser revisto e testado por mim.' } },
];

// AI copy rules: generic only. Never name an AI product or vendor; never imply the apps contain AI features.
export const aiPoints: { title: L10n; text: L10n }[] = [
  { title: { en: 'I build with it', pt: 'Faço com ela' },
    text: { en: 'AI-assisted development is part of how I make Fruidoku and Formly.', pt: 'O desenvolvimento assistido por IA faz parte da forma como construo o Fruidoku e o Formly.' } },
  { title: { en: 'I decide', pt: 'Decido eu' },
    text: { en: 'It speeds the work up. The decisions and the testing stay with me.', pt: 'Acelera o trabalho. As decisões e os testes continuam a ser meus.' } },
  { title: { en: 'I keep learning', pt: 'Continuo a aprender' },
    text: { en: 'I enjoy learning about AI and following how it changes.', pt: 'Gosto de aprender sobre IA e de acompanhar o que vai mudando.' } },
];
