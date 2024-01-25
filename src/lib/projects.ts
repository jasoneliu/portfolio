import type { Image } from '$lib/image';
import { tags, type Tag } from '$lib/tags';

import lookerStudioImageAvif from '$lib/assets/projects/looker-studio/looker-studio.png?avif';
import lookerStudioImageWebp from '$lib/assets/projects/looker-studio/looker-studio.png?webp';
import lookerStudioImageFallback from '$lib/assets/projects/looker-studio/looker-studio.png';
import agentAssistImageAvif from '$lib/assets/projects/agent-assist/agent-assist.png?avif';
import agentAssistImageWebp from '$lib/assets/projects/agent-assist/agent-assist.png?webp';
import agentAssistImageFallback from '$lib/assets/projects/agent-assist/agent-assist.png';
import arcXpImageAvif from '$lib/assets/projects/arc-xp/arc-xp.png?avif';
import arcXpImageWebp from '$lib/assets/projects/arc-xp/arc-xp.png?webp';
import arcXpImageFallback from '$lib/assets/projects/arc-xp/arc-xp.png';
import bitcampImageAvif from '$lib/assets/projects/bitcamp/bitcamp.png?avif';
import bitcampImageWebp from '$lib/assets/projects/bitcamp/bitcamp.png?webp';
import bitcampImageFallback from '$lib/assets/projects/bitcamp/bitcamp.png';
import technicaImageAvif from '$lib/assets/projects/technica/technica.png?avif';
import technicaImageWebp from '$lib/assets/projects/technica/technica.png?webp';
import technicaImageFallback from '$lib/assets/projects/technica/technica.png';

const lookerStudioImage: Image = {
  avif: lookerStudioImageAvif,
  webp: lookerStudioImageWebp,
  fallback: lookerStudioImageFallback,
};

const agentAssistImage: Image = {
  avif: agentAssistImageAvif,
  webp: agentAssistImageWebp,
  fallback: agentAssistImageFallback,
};

const arcXpImage: Image = {
  avif: arcXpImageAvif,
  webp: arcXpImageWebp,
  fallback: arcXpImageFallback,
};

const bitcampImage: Image = {
  avif: bitcampImageAvif,
  webp: bitcampImageWebp,
  fallback: bitcampImageFallback,
};

const technicaImage: Image = {
  avif: technicaImageAvif,
  webp: technicaImageWebp,
  fallback: technicaImageFallback,
};

export interface Project {
  name: string;
  description: string;
  role: string | string[];
  timeline: string;
  skills: string[];
  tags: Tag[];
  image: Image;
  slug: string;
  head?: {
    title?: string;
    description?: string;
  };
}

const lookerStudio: Project = {
  name: 'Google — Looker Studio',
  description:
    'Unlock the power of your data with interactive dashboards and beautiful reports.',
  role: 'Software Engineering Intern',
  timeline: 'May – Aug. 2023',
  skills: [
    'Frontend Development',
    'Solution Design',
    'Unit and Integration Testing',
  ],
  tags: [
    tags.typescript,
    tags.angular,
    tags.angularjs,
    tags.jasmine,
    tags.java,
    tags.junit,
  ],
  image: lookerStudioImage,
  slug: 'looker-studio',
  head: {
    title: 'Looker Studio',
  },
};

const agentAssist: Project = {
  name: 'Google — Agent Assist',
  description: 'Deliver AI-powered conversations with human agents.',
  role: 'Software Engineering Intern',
  timeline: 'Sept. – Dec. 2022',
  skills: [
    'Frontend Development',
    'Solution Design',
    'Unit and Integration Testing',
  ],
  tags: [tags.typescript, tags.angular, tags.ngrx, tags.jasmine],
  image: agentAssistImage,
  slug: 'agent-assist',
  head: {
    title: 'Agent Assist',
  },
};

const arcXp: Project = {
  name: 'Arc XP',
  description:
    'The Washington Post’s cloud-native digital experience platform.',
  role: 'Software Engineering Intern',
  timeline: 'Jun. – Aug. 2022',
  skills: [
    'Full-Stack Development',
    'Microservices Architectures',
    'Design Systems',
  ],
  tags: [tags.typescript, tags.react, tags.storybook, tags.aws, tags.jest],
  image: arcXpImage,
  slug: 'arc-xp',
};

const bitcamp: Project = {
  name: 'Bitcamp',
  description: 'The University of Maryland’s annual 36-hour hackathon.',
  role: ['Co-Executive Director ’24', 'Tech Co-Director ’23'],
  timeline: 'Dec. 2021 – Present',
  skills: [
    'Full-Stack Development',
    'Mobile Development',
    'Product Management',
  ],
  tags: [
    tags.typescript,
    tags.reactnative,
    tags.expo,
    tags.vue,
    tags.nuxt,
    tags.aws,
  ],
  image: bitcampImage,
  slug: 'bitcamp',
};

const technica: Project = {
  name: 'Technica',
  description: 'The world’s largest hackathon for underrepresented genders.',
  role: 'Tech Organizer',
  timeline: 'Apr. 2022 – Present',
  skills: ['Frontend Development'],
  tags: [tags.typescript, tags.vue, tags.nuxt, tags.aws],
  image: technicaImage,
  slug: 'technica',
};

export const projects = {
  'looker-studio': lookerStudio,
  'agent-assist': agentAssist,
  'arc-xp': arcXp,
  bitcamp,
  technica,
};

export type ProjectSlug = keyof typeof projects;
