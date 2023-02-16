import { writable } from 'svelte/store';

// Url hash
// Svelte's $page store doesn't consistently update url hash
export const url = writable<{ hash: string }>();

// Home page loader
export const loading = writable<boolean>(true);

// Hash scrolling state (scrolling when positive)
export const hashScrolling = writable<number>(0);

// Navbar navigation anchors
export const projectsAnchor = writable<HTMLElement>();
export const skillsAnchor = writable<HTMLElement>();
