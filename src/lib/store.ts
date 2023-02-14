import { writable } from 'svelte/store';

// Navigation anchors
export const projectsAnchor = writable<HTMLElement>();
export const skillsAnchor = writable<HTMLElement>();

// Home page loader
export const loading = writable<boolean>(true);
