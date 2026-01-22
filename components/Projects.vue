<template>
  <div id="projects" class="projects"></div>
  <div class="projects-container">
    <span class="projects-title">Plusieurs de mes projets</span>

      <!-- Dropdown mobile (affiché < 640px) -->
      <div class="sm:hidden mt-4 w-full flex justify-center relative z-40">
        <label for="project-filter" class="sr-only">Filtrer les projets</label>
        <select
          id="project-filter"
          v-model="mode"
          class="w-11/12 max-w-xs rounded-full border-2 border-cyan-400
                bg-slate-900 text-cyan-300
                px-4 py-2 text-base
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                relative z-40 pointer-events-auto"
        >
          <option
            v-for="btn in projectButtons"
            :key="btn.mode"
            :value="btn.mode"
            class="text-slate-900"
          >
            {{ btn.label }}
          </option>
        </select>
      </div>


    <!-- Rangée de boutons (tablette/desktop uniquement) -->
    <div class="hidden sm:flex flex-wrap items-center justify-center gap-3">
      <ProjectCategoryButton
        v-for="(category, index) in projectButtons"
        :key="index"
        :label="category.label"
        :mode="mode"
        @click="mode = category.mode"
      />
    </div>

    <div class="z-10 w-full sm:w-3/4 px-4">
      <div v-for="(project, index) in filteredProjects" :key="`${mode}-${index}`">
        <Project
          :title="project.title"
          :description="project.description"
          :right="index % 2 === 0"
          :category="project.category"
          :tools="project.tools"
          :image="project.image"
          :github="project.github"
        />
        <!-- Séparateur (pas après le dernier projet) -->
        <hr v-if="index < filteredProjects.length - 1" class="my-8 border-gray-600/30 w-11/12 mx-auto">
      </div>
    </div>

    <div class="w-full p-32"></div>
  </div>
  <div class="transition-block"></div>
</template>

<script>
import Project from "@/components/Project.vue";
import ProjectCategoryButton from "@/components/ProjectCategoryButton.vue";

export default {
  components: { ProjectCategoryButton, Project },
  props: {
    projects: Array,
    projectButtons: Array,
  },
  data() {
    return {
      mode: "All",
    };
  },
  computed: {
    filteredProjects() {
      if (this.mode === "All") {
        return this.projects;
      } else {
        return this.projects.filter((project) =>
          project.category.includes(this.mode)
        );
      }
    },
  },
  mounted() {
    this.createObserver();
  },
  methods: {
    createObserver() {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("start-animation");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".animatable").forEach((el) => {
        observer.observe(el);
      });
    },
    resetAnimations() {
      const animatables = document.querySelectorAll(".animatable");
      animatables.forEach((el) => {
        el.classList.remove("start-animation");
      });
      this.$nextTick(() => {
        this.createObserver();
      });
    },
  },
  watch: {
    mode(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetAnimations();
      }
    },
  },
};
</script>

<style scoped>
.projects {
  @apply w-full p-32 bg-slate-900;
}

.projects-container {
  @apply flex flex-col text-center items-center bg-slate-900;
}

.projects-title {
  @apply z-10 text-white text-5xl font-bold text-center;
}

.transition-block {
  @apply -rotate-3 p-32 w-full ml-8 scale-150 bg-white;
}
</style>
