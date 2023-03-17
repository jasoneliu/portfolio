import { tags, type Tag } from '$lib/tags';

import agentAssistImageAvif from '$lib/assets/projects/agent-assist.png?avif';
import agentAssistImageWebp from '$lib/assets/projects/agent-assist.png?webp';
import agentAssistImageFallback from '$lib/assets/projects/agent-assist.png';
import arcXpImageAvif from '$lib/assets/projects/arc-xp.png?avif';
import arcXpImageWebp from '$lib/assets/projects/arc-xp.png?webp';
import arcXpImageFallback from '$lib/assets/projects/arc-xp.png';
import bitcampImageAvif from '$lib/assets/projects/bitcamp.png?avif';
import bitcampImageWebp from '$lib/assets/projects/bitcamp.png?webp';
import bitcampImageFallback from '$lib/assets/projects/bitcamp.png';
import technicaImageAvif from '$lib/assets/projects/technica.png?avif';
import technicaImageWebp from '$lib/assets/projects/technica.png?webp';
import technicaImageFallback from '$lib/assets/projects/technica.png';

export interface Project {
  name: string;
  description: string;
  role: string;
  timeline: string;
  skills: string[];
  tags: Tag[];
  image: {
    avif: string;
    webp: string;
    fallback: string;
  };
  slug: string;
  head?: {
    title?: string;
    description?: string;
  };
}

const google: Project = {
  name: 'Google — Agent Assist',
  description: 'Deliver AI-powered conversations with human agents.',
  role: 'Software Engineering Internship',
  timeline: 'Sept. – Dec. 2022',
  skills: [
    'Frontend Development',
    'Solution Design',
    'Unit and Integration Testing',
  ],
  tags: [tags.typescript, tags.angular, tags.ngrx, tags.jasmine],
  image: {
    avif: agentAssistImageAvif,
    webp: agentAssistImageWebp,
    fallback: agentAssistImageFallback,
  },
  slug: 'google',
  head: {
    title: 'Agent Assist',
  },
};

const arcxp: Project = {
  name: 'Arc XP',
  description:
    'The Washington Post’s cloud-native digital experience platform.',
  role: 'Software Engineering Internship',
  timeline: 'Jun. – Aug. 2022',
  skills: ['Full-Stack Development'],
  tags: [
    tags.typescript,
    tags.react,
    tags.nextjs,
    tags.storybook,
    tags.aws,
    tags.jest,
  ],
  image: {
    avif: arcXpImageAvif,
    webp: arcXpImageWebp,
    fallback: arcXpImageFallback,
  },
  slug: 'arc-xp',
};

const bitcamp: Project = {
  name: 'Bitcamp',
  description: 'The University of Maryland’s premier hackathon.',
  role: 'Tech Co-Director',
  timeline: 'Dec. 2021 – Apr. 2023',
  skills: ['Full-Stack Development', 'Product Management'],
  tags: [tags.typescript, tags.reactnative, tags.vue, tags.nuxt, tags.aws],
  image: {
    avif: bitcampImageAvif,
    webp: bitcampImageWebp,
    fallback: bitcampImageFallback,
  },
  slug: 'bitcamp',
};

const technica: Project = {
  name: 'Technica',
  description: 'The world’s largest hackathon for underrepresented genders.',
  role: 'Tech Organizer',
  timeline: 'Apr. – Oct. 2022',
  skills: ['Frontend Development'],
  tags: [tags.javascript, tags.vue, tags.nuxt, tags.aws],
  image: {
    avif: technicaImageAvif,
    webp: technicaImageWebp,
    fallback: technicaImageFallback,
  },
  slug: 'technica',
};

export const projects = { google, 'arc-xp': arcxp, bitcamp, technica };

export type ProjectSlug = keyof typeof projects;
