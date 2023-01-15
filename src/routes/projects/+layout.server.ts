import { redirect } from '@sveltejs/kit';

interface Route<RouteId extends string | null = string | null> {
  id: RouteId;
}

// Redirects to /#projects
export function load({ route }: { route: Route }) {
  if (route.id && route.id.endsWith('/projects')) {
    throw redirect(307, '/#projects');
  }
}
