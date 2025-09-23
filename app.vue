<template>
  <div class="scroll-smooth overflow-x-hidden">
    <Home v-if="Object.keys(infos).length > 0" :name="infos.name" :title="infos.title" :description="infos.description"/>
    <About :about="infos.about"/>
    <Projects :projects="projects" :projectButtons="projectButtons"/>
    <Skills :skills="skills"/>
    <Experiences :experiences="experiences"/>
    <Contacts :contacts="contacts"/>
  </div>
</template>

<script>
import Contact from "@/components/Contact.vue";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Projects from "@/components/Projects.vue";
import Skills from "@/components/Skills.vue";
import Experiences from "@/components/Experiences.vue";
import Contacts from "@/components/Contacts.vue";
import config from "@/config.json";

export default {
  components: {
    Contacts,
    Experiences,
    Skills,
    Projects,
    About,
    Home,
    Contact
  },
  data() {
    return {
      infos: config.infos,
      projects: config.projects,
      skills: config.skills,
      experiences: config.experiences,
      projectButtons: config.projectButtons,
      contacts: config.contacts,
      // pour appliquer l’état dès le chargement
      animationsEnabled: true,
    };
  },
  mounted() {
    // 1) Respecter le choix sauvegardé AVANT que Home.vue monte
    const saved = localStorage.getItem('animationsEnabled');
    if (saved !== null) {
      this.animationsEnabled = saved === 'true';
    }
    document.documentElement.classList.toggle('no-animations', !this.animationsEnabled);

    // 2) Ton observer d’animations existant
    this.createObserver();
  },
  methods: {
    createObserver() {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('start-animation');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animatable').forEach(el => {
        observer.observe(el);
      });
    }
  },
}
</script>

<script setup>
useHead({
  title: config.infos.name,
  meta: [
    {
      name: "description",
      content: `${config.infos.description.firstPart} ${config.infos.description.linkText} ${config.infos.description.secondPart}`,
    },
    {
      name: "author",
      content: "Jonathan PONT",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
    }
  ]
})
</script>

<!-- IMPORTANT : style global NON scoped -->
<style>
/* Bouton OFF => coupe toutes les animations/transitions et le scroll fluide */
.no-animations * {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* Garantit que tes éléments animés ne restent pas invisibles quand on coupe */
.no-animations .animatable {
  opacity: 1 !important;
  transform: none !important;
}

/* (Optionnel) Si tu veux aussi respecter la préférence système */
@media (prefers-reduced-motion: reduce) {
  :root:not(.force-animations) * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
  :root:not(.force-animations) .animatable {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
