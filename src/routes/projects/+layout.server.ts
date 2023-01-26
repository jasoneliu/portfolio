import { redirect } from '@sveltejs/kit';
import { projects, type ProjectSlug } from '$lib/projects';
import type { LayoutServerLoad } from './$types';

interface Route<RouteId extends string | null = string | null> {
  id: RouteId;
}

// Return the route's slug
function getSlug(route: Route) {
  if (!route.id) {
    return null;
  }

  const pathSegments = route.id.split('/');
  const slug = pathSegments[pathSegments.length - 1];
  return slug;
}

export const load = (({ route }: { route: Route }) => {
  const slug = getSlug(route);

  // Redirect /projects to /#projects
  if (slug === 'projects') {
    throw redirect(307, '/#projects');
  }

  // Return project for current route slug
  return {
    project: projects[slug as ProjectSlug],
  };
}) satisfies LayoutServerLoad;
