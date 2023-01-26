import { tags, type Tag } from '$lib/tags';

import agentAssistImage from '$lib/assets/agent-assist.png';
import arcXpImage from '$lib/assets/arc-xp.png';
import bitcampImage from '$lib/assets/bitcamp.png';
import technicaImage from '$lib/assets/technica.png';

export interface Project {
  name: string;
  description: string;
  role: string;
  timeline: string;
  skills: string[];
  tags: Tag[];
  image: string;
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
  skills: ['Frontend development', 'Writing design documents', 'Testing'],
  tags: [tags.typescript, tags.angular, tags.ngrx, tags.jasmine],
  image: agentAssistImage,
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
  skills: [],
  tags: [
    tags.typescript,
    tags.react,
    tags.nextjs,
    tags.storybook,
    tags.aws,
    tags.jest,
  ],
  image: arcXpImage,
  slug: 'arc-xp',
};

const bitcamp: Project = {
  name: 'Bitcamp',
  description: 'The University of Maryland’s premier hackathon.',
  role: 'Tech Co-director',
  timeline: 'Dec. 2021 – Present',
  skills: [],
  tags: [tags.typescript, tags.reactnative, tags.vue, tags.nuxt, tags.aws],
  image: bitcampImage,
  slug: 'bitcamp',
};

const technica: Project = {
  name: 'Technica',
  description: 'The world’s largest hackathon for underrepresented genders.',
  role: 'Tech Organizer',
  timeline: 'Apr. – Oct. 2022',
  skills: [],
  tags: [tags.javascript, tags.vue, tags.nuxt, tags.aws],
  image: technicaImage,
  slug: 'technica',
};

export const projects = { google, 'arc-xp': arcxp, bitcamp, technica };

export type ProjectSlug = keyof typeof projects;
