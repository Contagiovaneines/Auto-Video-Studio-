import { Project, ViralClip, SocialAccount } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WImB4xdll6ygqv6sDZuQC8o3zXI6Hcf8o2Ekbsy0bmMFUDx66L4WKIWFmIOSfJnYZuYKDpt2HYkY_Yy_G5TbM-soQg2Rfz3-BMgqaMTO_bBnNmLYNaoS1mU2eDLzypyVMVffbklYE2PNe2QFDCT88JYb7-XyJ1WYmuSUn3flXmI73XssHA-mIpW-oCSvLX19ErKzuUh7bKqVMbETAXvCnrQtR1ARWsNYZvENFENHrTThWJtNLouHLTEw',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjPGyDj-npd2wn1qTj0XfNGBFQK7PDvuz8UpnA87QGqlhTtoWQ41b3wJRdK1Cde1o47W1wMu1m0RsYHvBS0LzzAr0zwCpK2hLPvq-lOb2N_z1fwhypKX1cFcmjE589syZ9iB7r1Rw8IS_IIq3owUK3yFxAPDHhOghhFMlWkjzDZrvfuq9IrTVuxv1J6t98seOOHGLzENFn2GCEeoKgY1urFk3zxYeLtcJ6F38KCy_J1YyRSMhk7J5k',
  
  // Publicador / Publisher
  publisherVideoActive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAogq81QydWz6rJiMjC4KKRa3y7Cvzs1TlA0sSWhWrcLFL-BXkmQ44Dhvk6z6kfVXyDF1pRrzLGXT6HB_alBOBWHDO-Wv_cXrBX-yH9TCVHOEfXq4MLY6KqQ8pM9FUiDKuvzvuQF2f_fltgm9kOqSCDKNCl6iR7O6fHomNryj4CAJlUyvBqK3pQS0U9eoL9YZ-qKwmrmGGyDVe1Unel592Fddi7cX9kg75AqJfmIVGn3pncDSXXXICM',
  frame01: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFXKQ-1zbSCZtXjr_C3B4ni8ZgBFQ2VF-Tr-YnW50MvT6QRFiePk-ZB7E8_eGkbkVwe3frrBDOqXhxDIbQpATwzpXx_289G4HNkbKc6ynL7dehPgq_fqZQMtOEYJE0JLDkCdhWG00Ape9QYm4z_Op4RuOhGYnuG2lGhVef3zNNCBLc4o2cUeOj0ktZtHQ6jtRZaROhL0QsUOCffV4YdZJ9LY6iYK4betuVwSoqE211MJSRko3s9ecu',
  frame02: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-pBJeT0yA-G93EvkyEgepNmv_aRu61U9XJuOJ3caTaoqT_zboXVgoRoMfpmDFareKOWNUo2VWW0cbeuEEmZp2vz9IU0LBOJLlIIitenB3Oz2XipDkMSTybfrF_PcSMbTu8udRt77b9_7zf-zYLdYtvB_r0ZzRPQ3wKPxBEceyUKy1mrZnLlnVD7O82leNNa4a37BduvSoznBAQi58rLp_cAjkDeExD-MwBajDmVNNKOol-uuyETMm',
  frame03: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATrlDENhNrel_ay_6WZNCFuZRaJgOWskPa4Bw0cBTYxwErS57GeZXaW1NGeTpoctHPxKt1RhV3oQoKyj5FqsCrOQR8E7Q-Uj0BL5_up1u2YlqY7BNLKVYQEdePU6ahdLc6Nu3feaFISPPMveEXx_YObsb31i0nBZmOwnd8mnJCNeYVGkywUPSRplI2KUd_8i7uNtKg5CHeDtHUD4nnb0xPZgR9GORzwkhJrtucEGXRp2xWUc0oDPf7',
  phoneVideoBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCQn4v5Jzsv6Bukw0PXJum3qEJznaJl55y3dSHNV8O0msHMH70bJG5kA3bFqqUF7VYoUtHuVFtbi2T8zkjSXYPkmvRWVJWPWYkCjzK9xZhD_nCpVwJFGRF38kXhTDyIolS2nFqG6UX-RehhXCSLQgQWORwYjT8tShu62J7RZTHGk0oZPb9ufB8gBFdIG2OF3Uzpc9owPEBDPFyHSrYywyVQtIKOBaXJeSU67z_zghOC3GQX1zQArYd',
  creatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFYKCG7ADitcQGqyJ6E9ZisY4QwPs9NZVvnQviI29wWtIsgkQmteSk0Fk1CaL8BojWT4yaI8llO5YNlOtQlGI4hx4K4tQMmglPw3kSqNHo-ufh65-1vsmmrlv4F6OffzT9LmQSvdimVpWhHn1zVyiP0Y9YVfqZKUc_gSMBta-2bZTWBQ6JGIHfbFp0AWY-KIHIHrnutzI6gCAwuvnxSzrNkvhbG1xzsx5c7QAbscUYssQ6y7V5PUrx',

  // Dashboard Projects
  project01: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhQiclG1E8IodCdLbVECpYUorcn8aEUMnt2nsW3kyuP4P5ZWyaTSszq3fyKNa8lxyKrXvY5yaZLZuqM1GtlO7zA4eACrwUf38cn8y5UasEbh8ZCdIxERFtWdFkNZ6oEAgNV20GrP4Di9vMoWyxxEZcPmO8iTGlmCt3z4OHLUmY-9tukDBdnuW7M1FWKGEp3iER92Ch4dCq4HHwjWFI4hzsGmuU-W4r_Hherq7m2WmmvDiSuRME1t2C',
  project02: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5kMmhxSj_1W28O5sfyb1_46_l06Lb8ossl75GMOWEi5eHorym-OH_IeuePBNnblTd8H_UsLxo7RlBwFIzz6SROiWXIz-qureQolbPqUNH5vh3N-rFOxfQefeGVxz7sCCZwqg-myCYTVDIkyYXG3vDS01CL0B-xavHSF9KpXLlmUAE-sm_pGW83j0JfFHyTu4nWWFKK5_cF1JU9kGhLAY2fxI9xsWOdiV4gRcWERKt_cZVWOqQ5hJ',
  project03: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGc6yuzBj5PHOYd95bET6mNPdkiIzhJC43B0TSoWuTWWfwg6O91FRAEYgIdpvZnp1CwmIpulH_wny_befnLcI8uzDZg2I7fC__Zc5cCjuhI0RRM7Vf7W1NEplk8sW5mNGP8dkXthxCSvFvVZ6QzWPOAQXdAg2Yimto7FgqphyYOW6ytAkfAbjg2NbeVCR3HYILLYuir4loc8LZ1FNzFFyKFKmn3qH-JivRJ761oRN5Z-JZkFexI-ja',

  // Cortes com IA
  podcastMasterStage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5imUBEQO6hfiE24unDM2kly1KXX3Xf1fjXxwqT3b3NwEc0egxNPhHoWk1jRWEfVkHnT5kAf8M-I2SB467JsOa6XM4mgYNVW1LztkYdQoMTaRe97mTOkQmxuSzZfzFv_dQvIHJmoneM4oENlLOCypALH1Ss9Wm3H1ycRt0kypkm1f3vBC29TdIlVLTG5PGZPTMxHf5wRG6S_Hx9vKtG_xJg7F6l3IaT7AjuoHEe1x9yB7_9SGhOdry',
  clip01: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiKgT3AVunxRfOQDMzavSj4kwUJUKqFq3ix2EAEPqL3kd5JKsPEVjk_UHu_snp2RrqRq6q1hBdqio3Ps2wtLkeIj6q8LaKYjGvcwxQiqNamwK7SDEnhFNo0PLoSmQ_p8bZ2hBqPQatXqAcZ0QkhBH9MZPPYqH6J1yMDatYyBtjJ4PCBSKpXcgRm4eENm5rZLx6ytd1c3z3EojAZy7em8dnXuG9G_aKlRGO0pHw73loOH6IQlTU6_oF',
  clip02: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD71x_SxjJgaaeF3hrPctWSh-VPunvfvGulCcK5AWnIMSwhIeFALz6r2jE3_shX5IX0eSJ7qnZArTWHf2ReSkjSqELLxxZINoP-xJSEIQlFjOQ0t1_ARW74iwJJnJ8eb15kLjwwy-J0xtlSW7LeXbXDglElupAkBgx0Q2i6hTGvnKQV5v1hbH28PKa9Lc_4OqOWYVRvC5ES_7qe7dm5if5i7UWAoG0sv9VHsk2njEVpc3i6qQ5oMnii',
  clip03: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSqcMh9xNtokM9Ze0GLLtkj36YAz7yIjmvg4aPAOuUoReK-5p5eV_a8h0pdVxvQAJZS5PAzouElM6TUjhjy-nRLpm82GRkDITz67Pu32eygFp8-XCEiL4zorMGpo6Vx0VZ-tej3BAe0EkHUzh9Dyl4CcZ3452Vk2Ggz6Ztz1p4cLZHl5Ou9QMsRAPyGyNg0m2K3ufVR5wICpnBfPh57382O2jNHhtcCS5-sfXLd2jGgizyXkEMO0wz',
  clip04: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR1C7MQk_DfeLrdKtYQ921MIbMzQIWWX0ns7K0ruMNAiQDru1wZ-lJonA55gKsulg0qs81A_Ok3-2jOm0hWHqbqJaT-LJlazJVZQXfPAUDn4V8apXzplpR_K_3xelFGT7vNWIENI9RPlR8CtSasLYXzhtmHDgjFqw1l5oxDBoegSNVwuOLIlaN7b91ZQImmwg8nx-KEe1BFnWtPQTOYn1pUhYJRMt6Pl7PYsU_xZ1w9qfmQOlzeOgr',

  // Editor NLE
  brollStock: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEb6j-CjLZ29Dzk3WXabno34KBL0y8LsXv7uNVaGs7OxvlVso9O9bmaqF_tVCRLAkwDzSQd3RAAE07go8-hhrfWRXvj21bgryRYPIjeShTq3QO3LOUHzqEgYk-snBp60KcELP6c4ES6A7ZNlfRHmrBy80Y-miQXHmKkgFK_CD_HJ93B3C4KnolYOpm_hXHEKiAlgRBp-tnddYfQ6-8FL_yjHp4gkuwmJCwaYT2Y2Nqr7YC-mj6UPg7',
  editorViewport: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnB-U7BBWGNnHD4H5AXqVplDYHQg-YgOJVM6wDrUNr_JNm0W2bgQAZIvT7fxWoDgnbC85BoCbHPnbW5FU1EJVVExAKn-wILokgObe3lfo6k5l4g1D_-hIFicgkJ5sk1beX2kqI17NT1BQ59f0Nyv7KqkNYJYwn2mjvrO461RDoTMRu8-xlPSEvveM-fuv6RwbqoRIIIOP_b7Vp7CtMjeH-DSv6AR7yZipg6FdPUuuQxnZyMY-lnlng',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Podcast Tech Insider #42',
    subtitle: 'Cortes Virais Automáticos',
    thumbnail: ASSETS.project01,
    resolution: '1080x1920',
    fps: 60,
    status: 'concluido',
    shortsCount: 18,
    timeAgo: 'há 2h',
    aspectRatio: '9:16',
  },
  {
    id: 'proj-2',
    title: 'Curso Marketing Digital 2025',
    subtitle: 'Módulo 3 - Geração em Lote',
    thumbnail: ASSETS.project02,
    resolution: '1080x1920',
    fps: 60,
    status: 'renderizando',
    statusProgress: 74,
    shortsCount: 12,
    timeAgo: 'há 15m',
    aspectRatio: '9:16',
  },
  {
    id: 'proj-3',
    title: 'Daily Vlog React & IA',
    subtitle: 'Highlights Semanal #12',
    thumbnail: ASSETS.project03,
    resolution: '1080x1920',
    fps: 60,
    status: 'agendado',
    shortsCount: 6,
    timeAgo: 'Amanhã',
    aspectRatio: '9:16',
  },
];

export const INITIAL_VIRAL_CLIPS: ViralClip[] = [
  {
    id: 'clip-1',
    title: 'O erro fatal que 99% cometem ao usar ChatGPT',
    thumbnail: ASSETS.clip01,
    score: 98,
    duration: '00:46s',
    timeframe: '14:12 - 14:58',
    retentionEstimate: 84,
    subtitleHighlight: 'QUE 99%',
    subtitleFull: '"O ERRO FATAL QUE 99% COMETEM" ⚠️',
    aiRationale: 'Gancho emocional de abertura com alta densidade de palavras-chave provocativas nos primeiros 3s.',
    category: 'reflexao',
  },
  {
    id: 'clip-2',
    title: 'Como faturei 6 dígitos trabalhando sozinho',
    thumbnail: ASSETS.clip02,
    score: 94,
    duration: '00:38s',
    timeframe: '28:04 - 28:42',
    retentionEstimate: 79,
    subtitleHighlight: '6 DÍGITOS',
    subtitleFull: '"FATURANDO 6 DÍGITOS SOZINHO" 💸',
    aiRationale: 'História pessoal com quebra de padrão nos primeiros 3s e prova social irresistível.',
    category: 'historia',
  },
  {
    id: 'clip-3',
    title: 'A ferramenta secreta que ninguém te conta',
    thumbnail: ASSETS.clip03,
    score: 91,
    duration: '00:52s',
    timeframe: '45:10 - 46:02',
    retentionEstimate: 76,
    subtitleHighlight: 'SECRETA',
    subtitleFull: '"A FERRAMENTA SECRETA" 🤫',
    aiRationale: 'Curiosidade aguçada com call-to-action natural e retenção sustentada até o último segundo.',
    category: 'dica',
  },
  {
    id: 'clip-4',
    title: 'Por que programadores não serão substituídos',
    thumbnail: ASSETS.clip04,
    score: 88,
    duration: '00:59s',
    timeframe: '01:02:15 - 01:03:14',
    retentionEstimate: 72,
    subtitleHighlight: 'SUMIR!',
    subtitleFull: '"DEV NÃO VAI SUMIR!" 💻',
    aiRationale: 'Opinião polarizadora com alto volume de comentários e debates orgânicos projetados.',
    category: 'reflexao',
  },
];

export const OTHER_CLIPS_QUEUE = [
  { title: 'A verdade sobre AGI até 2026', score: 85, duration: '00:33s', tag: 'Gancho Filosófico' },
  { title: 'Setup de 10k vs Computador comum', score: 83, duration: '00:41s', tag: 'Comparativo Direto' },
  { title: '3 Livros que mudaram meu mindset', score: 81, duration: '00:29s', tag: 'Lista Dinâmica' },
  { title: 'Como negociar com clientes gringos', score: 78, duration: '00:48s', tag: 'Dica Prática' },
  { title: 'Por que larguei meu emprego CLT', score: 76, duration: '00:55s', tag: 'História Pessoal' },
];

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { id: 'yt', name: 'YouTube Shorts', handle: '@TechStudioBR', followers: '142k', connected: true, type: 'youtube' },
  { id: 'tt', name: 'TikTok', handle: '@autovideo_oficial', followers: '89k', connected: true, type: 'tiktok' },
  { id: 'ig', name: 'Instagram Reels', handle: '@rafael.criativo', followers: '45k', connected: true, type: 'instagram' },
  { id: 'fb', name: 'Facebook Reels', handle: 'Página Tech Master', followers: '12k', connected: false, type: 'facebook' },
];
