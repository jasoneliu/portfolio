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
  image: string;
  tags: Tag[];
}

const google: Project = {
  name: 'Google — Agent Assist',
  description: 'Deliver AI-powered conversations with human agents.',
  position: 'Software Engineering Internship',
  date: 'Fall 2022',
  image: agentAssistImage,
  tags: [tags.typescript, tags.angular, tags.ngrx, tags.jasmine]
};

const arcxp: Project = {
  name: 'Arc XP',
  description:
    'The Washington Post’s cloud-native digital experience platform.',
  position: 'Software Engineering Internship',
  date: 'Summer 2022',
  image: arcXpImage,
  tags: [
    tags.typescript,
    tags.react,
    tags.nextjs,
    tags.storybook,
    tags.aws,
    tags.jest
  ]
};

const bitcamp: Project = {
  name: 'Bitcamp',
  description: 'The University of Maryland’s premier hackathon.',
  position: 'Tech Co-director',
  date: '',
  image: bitcampImage,
  tags: [tags.typescript, tags.reactnative, tags.vue, tags.nuxt, tags.aws]
};

const technica: Project = {
  name: 'Technica',
  description: 'The world’s largest hackathon for underrepresented genders.',
  position: 'Tech Organizer',
  date: '',
  image: technicaImage,
  tags: [tags.javascript, tags.vue, tags.nuxt, tags.aws]
};

export const projects: Project[] = [google, arcxp, bitcamp, technica];
