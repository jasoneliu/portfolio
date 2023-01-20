import { tags, type Tag } from '$lib/tags';

import agentAssistImage from '$lib/assets/agent-assist.png';
import arcXpImage from '$lib/assets/arc-xp.png';
import bitcampImage from '$lib/assets/bitcamp.png';
import technicaImage from '$lib/assets/technica.png';

export interface Project {
  name: string;
  description: string;
  position: string;
  date: string;
  tags: Tag[];
  image: string;
  slug: string;
}

export const google: Project = {
  name: 'Google — Agent Assist',
  description: 'Deliver AI-powered conversations with human agents.',
  position: 'Software Engineering Internship',
  date: 'Fall 2022',
  tags: [tags.typescript, tags.angular, tags.ngrx, tags.jasmine],
  image: agentAssistImage,
  slug: 'google',
};

export const arcxp: Project = {
  name: 'Arc XP',
  description:
    'The Washington Post’s cloud-native digital experience platform.',
  position: 'Software Engineering Internship',
  date: 'Summer 2022',
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

export const bitcamp: Project = {
  name: 'Bitcamp',
  description: 'The University of Maryland’s premier hackathon.',
  position: 'Tech Co-director',
  date: 'Fall 2021 – Present',
  tags: [tags.typescript, tags.reactnative, tags.vue, tags.nuxt, tags.aws],
  image: bitcampImage,
  slug: 'bitcamp',
};

export const technica: Project = {
  name: 'Technica',
  description: 'The world’s largest hackathon for underrepresented genders.',
  position: 'Tech Organizer',
  date: 'Spring – Fall 2022',
  tags: [tags.javascript, tags.vue, tags.nuxt, tags.aws],
  image: technicaImage,
  slug: 'technica',
};

export const projects: Project[] = [google, arcxp, bitcamp, technica];
