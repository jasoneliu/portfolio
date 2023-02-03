<script lang="ts">
  import backendIcon from '$lib/assets/icons/backend.svg';
  import frontendIcon from '$lib/assets/icons/frontend.svg';
  import softwareIcon from '$lib/assets/icons/software.svg';

  const skills = [
    {
      title: 'Software Dev',
      body: 'Experienced in working with the entire software development life cycle, including solution design, implementation, testing, and deployment.',
      icon: softwareIcon,
      slug: 'software-dev',
    },
    {
      title: 'Frontend',
      body: 'Passionate about developing elegant and intuitive UIs. Proficient in HTML/CSS/JS and frontend frameworks such as React, Vue, Angular, and Svelte.',
      icon: frontendIcon,
      slug: 'frontend',
    },
    {
      title: 'Backend',
      body: 'Skilled at building Node.js backends involving SQL and NoSQL databases, REST APIs, and serverless architectures using cloud-computing platforms such as AWS and Google Cloud.',
      icon: backendIcon,
      slug: 'backend',
    },
  ];
</script>

<section id="skills">
  <h2>Skills</h2>
  <div class="skills__container">
    {#each skills as skill}
      <div class="skills__item">
        <div class="skills__heading">
          <img
            class={`skills__icon ${skill.slug}`}
            src={skill.icon}
            alt={`${skill.title} Icon`}
          />
          <h3 class={`skills__heading-text ${skill.slug}`}>{skill.title}</h3>
        </div>
        <p>
          {skill.body}
        </p>
      </div>
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
        grid-templat-rows: 1fr 1fr 1fr;
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

      &::after {
        content: '';
        opacity: 0.8;
        z-index: -1;
        margin-top: -0.85rem;
        width: 100%;
        height: 0.5rem;
      }

      &.software-dev::after {
        background-color: darken($red, 10%);
      }

      &.frontend::after {
        background-color: darken($blue, 10%);
      }

      &.backend::after {
        background-color: darken($green, 15%);
      }
    }

    &__icon {
      width: 4rem;
      height: 4rem;

      &.frontend {
        transform: translate3d(0, -0.125rem, 0);
      }
    }
  }
</style>
