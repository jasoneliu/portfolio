import { redirect } from '@sveltejs/kit';

// Redirect /resume to resume link
export function load() {
  throw redirect(
    307,
    'https://drive.google.com/file/d/1839WZa3DpYe1a5eQLdNsCkZ9U_Qb7Xe9/view?usp=sharing'
  );
}