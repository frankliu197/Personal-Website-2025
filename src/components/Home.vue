<template>
  <main class="main">

    <!-- Hero Section -->
    <section id="hero" class="hero section dark-background">
      <div class="container">
        <div class="row gy-4 justify-content-center">
          <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            <h2>I'm <span>Alex Smith</span> a Professional Web Designer</h2>
            <p class="hero-subtitle">Crafting beautiful and responsive web experiences</p>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <a href="#about" class="btn-get-started">Get Started</a>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img">
            <img src="@/assets/img/hero-img.png" class="img-fluid" alt="">
          </div>
        </div>
      </div>
    </section>

    <!-- About, Services, Portfolio etc. replicate sections from index.html -->
    <section id="about" class="about section">
      <div class="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>

    <section id="services" class="services section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Professional services I provide.</p>
      </div>
    </section>

    <section id="portfolio" class="portfolio section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Some of my recent work.</p>
      </div>
    </section>

  </main>
</template>

<script>
export default { name: "Home" };
</script>
