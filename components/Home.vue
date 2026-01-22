<template>
  <div id="home" class="background">
    <NuxtParticles id="particles" url="particles.json" />

    <nav class="nav-style">
      <!-- Bouton Animations ON/OFF en haut-gauche -->
      <div class="absolute left-2 top-2 sm:left-4 sm:top-3 z-[60]">
        <button
          @click="toggleAnimations"
          class="group flex items-center gap-2 rounded-full p-2 sm:p-2.5 bg-white/5 border border-white/10
                 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          :title="animationsEnabled ? 'Désactiver les animations' : 'Activer les animations'"
          aria-label="Basculer les animations"
        >
          <img
            :src="animationsEnabled ? '/images/others/anim-on.png' : '/images/others/anim-off.png'"
            :alt="animationsEnabled ? 'Animations activées' : 'Animations désactivées'"
            class="h-6 w-6 sm:h-7 sm:w-7 pointer-events-none select-none"
          />
          <!-- Texte discret : visible seulement ≥ sm -->
          <span class="hidden sm:inline text-xs text-white/80 group-hover:text-white transition-colors">
            {{ animationsEnabled ? 'Animations activées' : 'Animations désactivées' }}
          </span>
        </button>
      </div>

      <ul class="flex items-center">
        <li class="ml-12">
          <a @click="scrollTo('home')" class="menu-item">Home</a>
        </li>
        <li class="ml-12">
          <a @click="scrollTo('about')" class="menu-item">About</a>
        </li>
        <li class="ml-12">
          <a @click="scrollTo('projects')" class="menu-item">Projets</a>
        </li>
        <li class="ml-12">
          <a @click="scrollTo('skills')" class="menu-item">Compétences</a>
        </li>
        <li class="ml-12">
          <a @click="scrollTo('experience')" class="menu-item">Experiences</a>
        </li>
        <li class="ml-12">
          <button @click="scrollTo('contact')" class="contact-button">
            Contact >
          </button>
        </li>
      </ul>
    </nav>

    <div class="flex flex-col justify-center h-screen ml-96">
      <span class="text-cyan-400 mb-6 text-xl text-left">Salut, Je m'appelle</span>
      <span class="name-title">
        {{ name }}
      </span>
      <span class="role-title">
        {{ title }}
      </span>
      <p class="intro-description">
        {{ description.firstPart }}
        <a class="text-cyan-400" :href="description.link">
          {{ description.linkText }}
        </a>
        {{ description.secondPart }}
      </p>
      <button @click="scrollTo('about')" class="get-started-button">
        C'est Parti ⌵
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    title: String,
    description: {}
  },
  data() {
    return {
      animationsEnabled: true
    }
  },
  mounted() {
    // Restaure le choix utilisateur s'il existe
    const saved = localStorage.getItem('animationsEnabled');
    if (saved !== null) {
      this.animationsEnabled = saved === 'true';
    }
    document.documentElement.classList.toggle('no-animations', !this.animationsEnabled);
  },
  watch: {
    animationsEnabled(val) {
      localStorage.setItem('animationsEnabled', String(val));
    }
  },
  methods: {
    scrollTo(target) {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    toggleAnimations() {
      this.animationsEnabled = !this.animationsEnabled;
      document.documentElement.classList.toggle('no-animations', !this.animationsEnabled);
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.background {
  @apply relative;
  background: radial-gradient(circle at center bottom, #0f172a, #000000);
}

.nav-style {
  /* 'relative' pour positionner le bouton absolu à l'intérieur */
  @apply fixed top-0 right-0 left-0 z-50 flex items-center justify-end px-8 py-4 bg-cyan-950 bg-opacity-25
  drop-shadow-[0_0_32px_rgb(0,0,0,0.5)] relative;
}

.menu-item {
  @apply text-white text-xl font-bold transition duration-300 ease-in-out hover:text-cyan-400;
}

.contact-button {
  @apply z-10 bg-transparent p-2 text-xl text-cyan-400 hover:text-white py-2 px-6 border-2 border-cyan-400 rounded-full
  max-w-fit transition duration-300 ease-in-out transform hover:scale-105;
}

.name-title {
  @apply z-10 text-white text-7xl font-bold text-left mb-8 max-w-fit;
}

.role-title {
  @apply z-10 text-slate-400 font-bold text-7xl text-left;
}

.name-title, .role-title {
  animation: fadeIn 1s ease-in-out;
}

.intro-description {
  @apply z-10 text-slate-400 text-2xl max-w-2xl text-left mt-8 opacity-0;
  animation: fadeIn 1.5s ease-in-out forwards;
  animation-delay: 0.5s;
}

.get-started-button {
  @apply bg-transparent z-10 mt-12 p-2 text-xl text-cyan-400 hover:text-white py-4 px-10 border-2 border-cyan-400
  rounded-full max-w-fit transition duration-300 ease-in-out transform hover:bg-cyan-400 hover:bg-opacity-10
  hover:scale-105;
}
</style>
