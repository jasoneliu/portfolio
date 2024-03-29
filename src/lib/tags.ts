import type { Color } from '$lib/colors';

export interface Tag {
  text: string;
  color: Color;
}

const angular: Tag = {
  text: 'Angular',
  color: 'red',
};

const angularjs: Tag = {
  text: 'AngularJS',
  color: 'red',
};

const aws: Tag = {
  text: 'AWS',
  color: 'peach',
};

const expo: Tag = {
  text: 'Expo',
  color: 'text',
};

const jasmine: Tag = {
  text: 'Jasmine',
  color: 'mauve',
};

const java: Tag = {
  text: 'Java',
  color: 'peach',
};

const javascript: Tag = {
  text: 'JavaScript',
  color: 'yellow',
};

const jest: Tag = {
  text: 'Jest',
  color: 'red',
};

const junit: Tag = {
  text: 'JUnit',
  color: 'green',
};

const nextjs: Tag = {
  text: 'Next.js',
  color: 'text',
};

const ngrx: Tag = {
  text: 'NgRx',
  color: 'mauve',
};

const nuxt: Tag = {
  text: 'Nuxt',
  color: 'green',
};

const react: Tag = {
  text: 'React',
  color: 'sky',
};

const reactnative: Tag = {
  text: 'React Native',
  color: 'sky',
};

const storybook: Tag = {
  text: 'Storybook',
  color: 'pink',
};

const typescript: Tag = {
  text: 'TypeScript',
  color: 'blue',
};

const vue: Tag = {
  text: 'Vue',
  color: 'green',
};

export const tags = {
  angular,
  angularjs,
  aws,
  expo,
  jasmine,
  java,
  javascript,
  jest,
  junit,
  nextjs,
  ngrx,
  nuxt,
  react,
  reactnative,
  storybook,
  typescript,
  vue,
};
