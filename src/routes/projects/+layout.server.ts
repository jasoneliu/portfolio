import { redirect } from '@sveltejs/kit';
import { projects, type ProjectSlug } from '$lib/projects';
import type { LayoutServerLoad } from './$types';

/** Return the url's slug. */
function getSlug(url: URL) {
  const pathSegments = url.pathname.split('/');
  const slug = pathSegments[pathSegments.length - 1];
  return slug;
}

export const load = (({ url }: { url: URL }) => {
  const slug = getSlug(url);

  // Redirect /projects to /#projects
  if (slug === 'projects') {
    throw redirect(307, '/#projects');
  }

  // Return project for current route slug
  return {
    project: projects[slug as ProjectSlug],
  };
}) satisfies LayoutServerLoad;
