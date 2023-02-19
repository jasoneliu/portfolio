import { writable } from 'svelte/store';

// Window bindings and mobile layout
export const innerWidth = writable<number>();
export const scrollY = writable<number>();
export const mobileLayout = writable<boolean>();

// Home page loader
export const loading = writable<boolean>(true);

// Url hash
// Svelte's $page store doesn't consistently update url hash
export const url = writable<{ hash: string }>();

// Hash scrolling state (positive when scrolling)
export const hashScrolling = writable<number>(0);

// Navbar navigation anchors
export const projectsAnchor = writable<HTMLElement>();
export const skillsAnchor = writable<HTMLElement>();
