<section class="home" id="home">
  <h1 class="home__name">Jason Liu</h1>
  <h4 class="home__headline mono">
    <span>Software Engineer,</span>
    <span>Full Stack Developer</span>
  </h4>
  <div class="home__about">
    <p>
      Hello! I’m a junior studying Computer Science and Mathematics at the
      University of Maryland.
    </p>
    <p>I work primarily with Node.js, TypeScript, React, and AWS.</p>
  </div>
</section>

<style lang="scss">
  .home {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    justify-content: center;
    padding: 0 2rem;
    text-align: center;

    &__name {
      margin-bottom: 0.5rem;
    }

    &__headline {
      column-gap: 0.75rem;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    &__about {
      display: flex;
      flex-flow: column nowrap;
      gap: 0.5rem;
      margin-top: 3rem;
      max-width: 30rem;
    }
  }
</style>
