<template>
  <div id="about" class="about-container">
    <!-- mobile: p-6  |  desktop: p-32 -->
    <div class="p-6 sm:p-32">
      <div class="m-8"></div>
      <span class="title animatable">Qui suis-je?</span>
      <div class="info-section animatable">
        <p class="about-text">
          {{ about }}
        </p>
        <img src="/images/others/picture.png" alt="picture" class="profile-picture animatable">
      </div>
        <button
          @click="scrollToProjects"
          class="bg-transparent mt-12 p-2 text-xl text-cyan-400 py-4 px-10 border-2 border-cyan-400 rounded-full max-w-fit
                transition duration-300 ease-in-out transform hover:bg-cyan-400 hover:bg-opacity-10 hover:scale-105
                mx-auto block sm:mx-0 sm:float-left sm:ml-32">
          Mes Projets ⌵
        </button>
    </div>
  </div>
  <div class="transition-block"></div>
</template>

<script>
export default {
  methods: {
    scrollToProjects() {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    }
  },
  props: {
    about: String,
  }
}
</script>

<style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .about-container {
    @apply bg-white flex flex-col text-center items-center z-10 relative;
  }

  /* Desktop par défaut ; on spécifie aussi le responsive ici */
  .title {
    /* mobile: text-3xl + pas de retour à la ligne  |  desktop: text-5xl */
    @apply z-10 text-cyan-900 font-bold text-center opacity-0 leading-tight
          text-3xl sm:text-5xl whitespace-nowrap;
  }
  .title.start-animation { animation: fadeIn 1.5s ease-in-out forwards; }

  .info-section { @apply flex justify-between items-center max-w-6xl mt-32 opacity-0; }
  .info-section.start-animation { animation: fadeIn 1.5s ease-in-out forwards; animation-delay: .3s; }

  .about-text { @apply z-10 text-cyan-900 text-2xl text-left mr-64; }

  .profile-picture {
    @apply ml-8 rounded-full shadow-[0_0_32px_rgba(0,0,0,0.6)] hover:shadow-[0_0_32px_rgba(0,0,0,0.8)] max-h-96
    transition duration-300 ease-in-out;
  }

  .projects-button {
    @apply float-left ml-32 bg-transparent mt-12 p-2 text-xl text-cyan-400 py-4 px-10 border-2
    border-cyan-400 rounded-full max-w-fit transition duration-300 ease-in-out transform hover:bg-cyan-400 hover:bg-opacity-10
    hover:scale-105;
  }

  .transition-block { @apply -rotate-3 p-32 w-full ml-8 scale-150 bg-white -mt-44 shadow-2xl; }

  /* ======= MOBILE (≤ 640px) ======= */
  @media (max-width: 640px) {
    /* empile le texte + photo */
    #about .info-section {
      flex-direction: column !important;
      align-items: center !important;
      gap: 1rem !important;
      margin-top: 2rem !important;
    }

    /* plus de largeur pour le texte, toujours centré */
    #about .about-text {
      margin-right: 0 !important;
      text-align: center !important;
      font-size: 1rem !important;          /* lisible sur mobile */
      max-width: none !important;           /* enlève la contrainte de largeur */
      padding: 0 1rem !important;           /* petite marge gauche/droite */
    }

    /* photo un peu plus petite et centrée */
    #about .profile-picture {
      max-height: 10rem !important;
      margin-left: 0 !important;
    }

    /* bouton centré en mobile (desktop inchangé) */
    .projects-button {
      float: none !important;
      margin-left: auto !important;
      margin-right: auto !important;
      display: block !important;
    }
  }

</style>