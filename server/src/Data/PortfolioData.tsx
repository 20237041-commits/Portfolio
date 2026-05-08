import Ako from '../assets/Ako.jpg'; 
import Cable from '../assets/Cable.jpg'; 
import School from '../assets/School.png'; 
import feedback from '../assets/feedback.png'; 
import facebook from '../assets/facebook.avif'; 
import instagram from '../assets/instagram.avif'; 
import linkin from '../assets/linkin.avif';
import web from '../assets/web.jpg';
import ui from '../assets/ui.avif';
import develop from '../assets/develop.jpg';
import networkin from '../assets/networkin.jpg';




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

// ── PROFILE ──────────────────────────────────────────────────
// ↓ Replace every value with your own info
export const PROFILE: Profile = {
  name     : 'Jr Aclibon',
  tagline  : 'Networking & Web Designer',
  avatar   : Ako,
  heroImage: Ako,
  // Words that cycle in the typing animation on Home
  typingWords: ['Networking', 'Web Designer', 'Developer'],
  info: {
    birthday : 'Febuary 12, 2007',
    age      : '19 years old',
    location : 'Baguio City, Benguet',
    email    : '20237041@.ubaguio.edu',
    phone    : '63+ 09274866505',
    freelance: true,              // true → shows "Available"
  },
  bio: [
    'Hi, I\'m Jr  A dedicated Bachelor of Science in Information Technology (BSIT) student at the University of Baguio, with a strong interest in developing technical skills and practical knowledge in the field of IT. Eager to learn, adaptable, and committed to continuous growth, with a focus on applying academic knowledge to real-world challenges.',
    
  ],
};

// ── SOCIAL LINKS ──────────────────────────────────────────────
export const SOCIALS: Social[] = [
  { icon: facebook ,  href: 'https://facebook.com',  label: 'Facebook'  },
  { icon: instagram,   href: 'https://instagram.com', label: 'Instagram' },
  { icon: linkin, href: 'https://linkedin.com',  label: 'LinkedIn'  },
];

// ── SKILL BARS (About page) ───────────────────────────────────
export const SKILLS: Skill[] = [
  { label: 'Web Design',    percent: 85 },
  { label: 'Front-End Dev', percent: 78 },
  { label: 'UI/UX Design',  percent: 88 },
];

// ── TECH TAGS (Resume page) ───────────────────────────────────
export const TECH_TAGS: string[] = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React',
  'Vite', 'Node.js', 'Git',
];

// ── WORK EXPERIENCE (Resume page) ────────────────────────────
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

// ── EDUCATION (Resume page) ───────────────────────────────────
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

// ── PORTFOLIO PROJECTS ────────────────────────────────────────
// cat must be: 'web' | 'photo' | 'brand'
export const PROJECTS: Project[] = [
  { cat:'web',   title:'University Enrollment System',  label:'Web Design',  img:School, link:'https://20237041-commits.github.io/MG_LAB5_Aclibonn/' },
  { cat:'network', title:'Ethernet Crimping',       label:'Networking', img:Cable, link:'#' },
  { cat:'web',   title:'Feed Back System',        label:'Web Design',  img:feedback, link:'https://20237041-commits.github.io/Finals-1/' },
  
];

// ── SERVICES ──────────────────────────────────────────────────
export const SERVICES: Service[] = [
  { icon: web,    title:'Web Design',      desc:'Pixel-perfect, responsive websites designed with user experience and brand identity at the forefront.' },
  { icon: develop,           title:'Web Development', desc:'Clean, semantic front-end code bringing your designs to life with smooth interactions.' },
  { icon: ui,     title:'UI/UX Design',    desc:'Research-driven interface design for mobile and web applications with intuitive user flows.' },
  { icon: networkin,     title:'Networking',  desc:'Basic network setup, configuration, and troubleshooting for reliable connectivity.' },
];

// ── CONTACT INFO ──────────────────────────────────────────────
export const CONTACT_INFO: ContactItem[] = [
  { icon:'fas fa-map-marker-alt', label:'Location',     value:'Baguio City, Benguet' },
  { icon:'fas fa-envelope',       label:'Email',        value:'20237041@s.ubaguio.edu'               },
  { icon:'fas fa-phone',          label:'Phone',        value:'+63 09274866505'                   },
  { icon:'fas fa-clock',          label:'Availability', value:'Mon – Fri, 9am – 6pm'          },
];

// ── ROUTE CONFIG ──────────────────────────────────────────────
// Drives both the Sidebar nav AND the Route declarations in App.tsx.
// path values must match the <Route path="..."> in App.tsx.
export const ROUTES: RouteConfig[] = [
  { path:'/',          label:'Home',      icon:'fas fa-house'       },
  { path:'/about',     label:'About',     icon:'fas fa-user'        },
  { path:'/resume',    label:'Resume',    icon:'fas fa-file-alt'    },
  { path:'/portfolio', label:'Projects', icon:'fas fa-images'      },
  { path:'/services',  label:'Services',  icon:'fas fa-layer-group' },
  { path:'/contact',   label:'Contact',   icon:'fas fa-envelope'    },
];
