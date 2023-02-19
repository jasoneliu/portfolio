import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';
import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte';
import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte';

export interface Social {
  name: string;
  href: string;
  icon: typeof IoIosMail;
}

export const socials: Social[] = [
  { name: 'Email', href: 'mailto:jasoneliu03@gmail.com', icon: IoIosMail },
  { name: 'GitHub', href: 'https://github.com/jasoneliu', icon: IoLogoGithub },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jasoneliu',
    icon: IoLogoLinkedin,
  },
];
