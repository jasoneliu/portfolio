<script lang="ts">
  import { onMount } from 'svelte';
  import InView from '$lib/components/InView.svelte';
  import { skillsAnchor } from '$lib/store';

  const skills = [
    {
      title: 'Software Dev',
      body: 'Experienced in working with the entire software development life cycle, including solution design, implementation, testing, and deployment.',
      slug: 'software',
    },
    {
      title: 'Frontend',
      body: 'Passionate about developing elegant and intuitive UIs. Proficient in HTML/CSS/JS and frontend frameworks such as React, Vue, Angular, and Svelte.',
      slug: 'frontend',
    },
    {
      title: 'Backend',
      body: 'Skilled at building Node.js backends involving SQL and NoSQL databases, REST APIs, and serverless architectures using cloud-computing platforms such as AWS and Google Cloud.',
      slug: 'backend',
    },
  ];

  // Set skills section anchor for navigation
  let skillsSection: HTMLElement;
  onMount(() => {
    skillsAnchor.set(skillsSection);
  });
</script>

<section class="skills" bind:this={skillsSection}>
  <InView overflowHidden>
    <h2>Skills</h2>
  </InView>
  <div class="skills__container">
    {#each skills as skill, skillIndex}
      <InView delay={skillIndex * 200}>
        <div class="skills__item">
          <div class="skills__heading">
            <div
              class="skills__icon {skill.slug}"
              style:mask-image={`url('src/lib/assets/icons/${skill.slug}.svg')`}
            />
            <h3
              class="skills__heading-text {skill.slug}"
              style="--animation-delay-ms: {skillIndex * 200}"
            >
              {skill.title}
            </h3>
          </div>
          <p>
            {skill.body}
          </p>
        </div>
      </InView>
    {/each}
  </div>
</section>

<style lang="scss">
  .skills {
    &__container {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3rem;
      max-width: 100rem;
      padding: 2rem 8vw;

      @media screen and (max-width: $breakpoint-lg) {
        grid-template-rows: auto;
        grid-template-columns: 1fr;
      }
    }

    &__heading {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    &__heading-text {
      display: flex;
      flex-direction: column;
      text-shadow: 0 0.25rem 0.5rem rgba($crust, 0.75);

      &::after {
        content: '';
        z-index: -1;
        margin-top: -0.85rem;
        width: 0%;
        height: 0.5rem;
        animation: 0.7s $ease-out-cubic underlineHeading;
        animation-delay: calc(0.5s + var(--animation-delay-ms) * 0.001s);
        animation-fill-mode: forwards;

        @media screen and (max-width: $breakpoint-md) {
          animation-delay: 0.5s;
        }
      }

      &.software::after {
        background-color: $red;
      }

      &.frontend::after {
        background-color: $blue;
      }

      &.backend::after {
        background-color: $green;
      }
    }

    &__icon {
      width: 4rem;
      height: 4rem;
      mask-position: center;
      mask-size: contain;
      mask-repeat: no-repeat;

      &.software {
        background-image: linear-gradient(135deg, $red, 80%, $yellow);
      }

      &.frontend {
        transform: translate3d(0, -0.125rem, 0);
        background-image: linear-gradient(135deg, $blue, 65%, $mauve);
      }

      &.backend {
        background-image: linear-gradient(135deg, $green, 65%, $sapphire);
      }
    }
  }

  @keyframes underlineHeading {
    0% {
      width: 0%;
    }

    100% {
      width: 100%;
    }
  }
</style>
