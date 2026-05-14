import Ako from '../assets/Ako.jpg'; 
import Pogi from '../assets/Pogi.jpg'; 
import Track from '../assets/Track.png'; 
import networkme from '../assets/networkme.png'; 
import School from '../assets/School.png'; 
import feedback from '../assets/feedback.png'; 
import facebook from '../assets/facebook.avif'; 
import instagram from '../assets/instagram.avif'; 
import linkin from '../assets/linkin.avif';
import web from '../assets/web.jpg';
import ui from '../assets/ui.avif';
import develop from '../assets/develop.jpg';
import networkin from '../assets/networkin.jpg';

import Controlled from '../assets/Controlled.png';
import InfoSystem from '../assets/InfoSystem.png';
import Props from '../assets/Props.png';
import Sample from '../assets/Sample.png';
import StudentInfoSystem from '../assets/StudentInfoSystem.png';
import Registration from '../assets/Registration.png';





export interface ProfileInfo {
  birthday : string;
  age      : string;
  location : string;
  email    : string;
  phone    : string;
  freelance: boolean;
}

export interface Profile {
  name        : string;
  tagline     : string;
  avatar      : string;
  heroImage   : string;
  typingWords : string[];
  info        : ProfileInfo;
  bio         : string[];
}

export interface Social {
  icon : string;
  href : string;
  label: string;
}

export interface Skill {
  label  : string;
  percent: number;       
}

export interface TimelineItem {
  date : string;
  role : string;
  place: string;
  desc : string;
}

export type ProjectCategory = 'web' | 'network';

export interface Project {
  cat  : ProjectCategory;
  title: string;
  label: string;
  img  : string;
  link : string;
}

export interface Service {
  icon : string;
  title: string;
  desc : string;
}

export interface ContactItem {
  icon : string;
  label: string;
  value: string;
}

export interface RouteConfig {
  path : string;
  label: string;
  icon : string;
}


export const PROFILE: Profile = {
  name     : 'Jr Aclibon',
  tagline  : 'Networking & Web Designer',
  avatar   : Ako,
  heroImage: Pogi,
  typingWords: ['Networking', 'Web Designer', 'Developer'],
  info: {
    birthday : 'Febuary 12, 2007',
    age      : '19 years old',
    location : 'Baguio City, Benguet',
    email    : '20237041@.ubaguio.edu',
    phone    : '63+ 09274866505',
    freelance: true,              
  },
  bio: [
    'Hi, I\'m Jr  A dedicated Bachelor of Science in Information Technology (BSIT) student at the University of Baguio, with a strong interest in developing technical skills and practical knowledge in the field of IT. Eager to learn, adaptable, and committed to continuous growth, with a focus on applying academic knowledge to real-world challenges.',
    
  ],
};

export const SOCIALS: Social[] = [
  { icon: facebook ,  href: 'https://www.facebook.com/jr.aclibon.54',  label: 'Facebook'  },
  { icon: instagram,   href: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fjr_aclibon584620%3Figsh%3DMWJkNDlucmlsMWtydg%253D%253D%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEyZnpHN2lwcU9aclp5MktiaXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4j1Zg-qgMT5GLTLWzL0rsrK6Ep1AzqGXjXodp8aFiDDTcF6AnYFfe1DHhMpA_aem_qIb9760WfalT6_ui4uT1xg&h=AUCHkHRuGIBv-MQlbLJfnZvXBQshvyJj1IbiKGOHbYQ8Mkdh6Pnx2YdIPQ4AfPXu11Ri4TV3EUKvNOd7XPtCCMbxWAJhzuK88PN7kn_YR3NEJvjAf4BClNPiha1Ei-0z02Px0g', label: 'Instagram' },
  { icon: linkin, href: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjr-aclibon-3182b62b9%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEyZnpHN2lwcU9aclp5MktiaXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5DpxBMK4L5PC6BWRfL86MSDcdWCJPfmMV0yK5uWKTBj2ypCACcUjG4exhNdg_aem_LNrmzfzGLxgI9SK5PJBkcg&h=AUCHkHRuGIBv-MQlbLJfnZvXBQshvyJj1IbiKGOHbYQ8Mkdh6Pnx2YdIPQ4AfPXu11Ri4TV3EUKvNOd7XPtCCMbxWAJhzuK88PN7kn_YR3NEJvjAf4BClNPiha1Ei-0z02Px0g',  label: 'LinkedIn'  },
];

export const SKILLS: Skill[] = [
  { label: 'Web Design',    percent: 85 },
  { label: 'Front-End Dev', percent: 78 },
  { label: 'UI/UX Design',  percent: 88 },
];

export const TECH_TAGS: string[] = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React',
  'Vite', 'Node.js', 'Git',
];

export const EXPERIENCE: TimelineItem[] = [
  {
    date: '2026 – Present',
    role: 'UI/UX Designer',
    place: 'Self-Employed',
    desc: 'Designs user-friendly interfaces and improves user experience for web projects.',
  },
  {
    date: '2026',
    role: 'Web Designer & Developer',
    place: 'Self-Employed',
    desc: 'Builds responsive websites using modern web technologies and frameworks.',
  },
  {
    date: '2025 – 2026',
    role: 'Networking',
    place: 'Self-Employed',
    desc: 'Applies basic networking concepts including configuration and troubleshooting.',
  },
];

export const EDUCATION: TimelineItem[] = [
  {
  date: '2026',
  role: 'BSIT Student',
  place: 'University of Baguio',
  desc: 'Pursuing a degree in Information Technology.',
  },
  {
    date: '2024 – 2025',
    role: 'Humanities and Social Sciences',
    place: 'University of Baguio',
    desc: 'Completed senior high studies under the HUMSS strand.',
  },
];



export const PROJECTS: Project[] = [
  { cat:'web',   title:'University Enrollment System',  label:'Web Design',  img:School, link:'https://20237041-commits.github.io/MG_LAB5_Aclibonn/' },
  { cat:'web',   title:'Workout Tracker',        label:'Web Design',  img:Track, link:'https://20237041-commits.github.io/TrackThatGain/' },
  { cat:'web',   title:'Feed Back System',        label:'Web Design',  img:feedback, link:'https://20237041-commits.github.io/Finals-1/' },
  { cat:'network', title:'Networking Profile',       label:'Networking', img:networkme, link:'https://20237041-commits.github.io/networking/' },

  { cat:'web',   title:'Student Information Management System',        label:'Web Design',  img:StudentInfoSystem, link:'https://20237041-commits.github.io/StudentInfoSystem/' },
  { cat:'web',   title:'Controlled Form / Uncontrolled Form',        label:'Web Design',  img:Controlled, link:'https://20237041-commits.github.io/MG_Lab_3/?authuser=0' },
  { cat:'web',   title:'University Event Dashboard',        label:'Web Design',  img:Registration, link:'https://20237041-commits.github.io/MG_Lab4_Aclibon/' },
  { cat:'web',   title:'TypeScript Props',        label:'Web Design',  img:Props, link:'https://20237041-commits.github.io/FGB_LAB_2/?authuser=0' },
  { cat:'web',   title:'Student  Information System',        label:'Web Design',  img:InfoSystem, link:'https://20237041-commits.github.io/FGB_LAB_3/?authuser=0' },
  { cat:'web',   title:'Sample Resume',        label:'Web Design',  img:Sample, link:'https://20237041-commits.github.io/UNIT1_LESSON1_A_Acclibonnnn/?authuser=0' },

];

export const SERVICES: Service[] = [
  { icon: web,    title:'Web Design',      desc:'Pixel-perfect, responsive websites designed with user experience and brand identity at the forefront.' },
  { icon: develop,           title:'Web Development', desc:'Clean, semantic front-end code bringing your designs to life with smooth interactions.' },
  { icon: ui,     title:'UI/UX Design',    desc:'Research-driven interface design for mobile and web applications with intuitive user flows.' },
  { icon: networkin,     title:'Networking',  desc:'Basic network setup, configuration, and troubleshooting for reliable connectivity.' },
];

export const CONTACT_INFO: ContactItem[] = [
  { icon:'fas fa-map-marker-alt', label:'Location',     value:'Baguio City, Benguet' },
  { icon:'fas fa-envelope',       label:'Email',        value:'20237041@s.ubaguio.edu'               },
  { icon:'fas fa-phone',          label:'Phone',        value:'+63 09274866505'                   },
  { icon:'fas fa-clock',          label:'Availability', value:'Mon – Fri, 9am – 6pm'          },
];

export const ROUTES: RouteConfig[] = [
  { path:'/',          label:'Home',      icon:'fas fa-house'       },
  { path:'/about',     label:'About',     icon:'fas fa-user'        },
  { path:'/resume',    label:'Resume',    icon:'fas fa-file-alt'    },
  { path:'/portfolio', label:'Projects', icon:'fas fa-images'      },
  { path:'/services',  label:'Services',  icon:'fas fa-layer-group' },
  { path:'/contact',   label:'Contact',   icon:'fas fa-envelope'    },
];
