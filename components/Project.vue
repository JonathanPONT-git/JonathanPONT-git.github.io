<template>
  <!-- Mobile: colonne | Desktop: rangée avec alternance gauche/droite -->
  <div class="m-4 sm:m-16 sm:mt-48 flex flex-col sm:flex-row items-stretch gap-4 sm:gap-8">
    <!-- Média (toujours en 1er sur mobile ; à gauche/droite sur desktop) -->
    <div :class="[ right ? 'sm:order-2' : 'sm:order-1', 'w-full sm:w-auto' ]">
      <img
        v-if="isImage"
        :src="image"
        alt="project"
        class="media w-full sm:w-auto sm:max-w-md max-h-64 sm:max-h-96 object-cover"
      />
      <video
        v-else
        autoplay
        loop
        :src="image"
        muted
        class="media w-full sm:w-auto sm:max-w-md max-h-64 sm:max-h-96 object-cover"
      ></video>
    </div>

    <!-- Infos -->
    <div
      :class="[
        'project-info animatable flex-1',
        right ? 'sm:order-1 sm:mr-16' : 'sm:order-2 sm:ml-16'
      ]"
    >
      <!-- Mobile: tjs à gauche ; Desktop: gauche/droite comme avant -->
      <span :class="['project-category text-left', right ? 'sm:text-left sm:ml-4' : 'sm:text-right sm:mr-4']">
        {{ category.join(' • ') }}
      </span>

      <span :class="['project-title text-left', right ? 'sm:text-left sm:ml-4' : 'sm:text-right sm:mr-4']">
        {{ title }}
      </span>

      <div class="project-description">
        <p :class="['text-left', right ? 'sm:text-left sm:ml-4' : 'sm:text-right sm:mr-4']">
          {{ description }}
        </p>
      </div>

      <!-- Outils + GitHub -->
      <div
        :class="[
          'project-tools',
          right ? 'justify-start sm:justify-start' : 'justify-end sm:justify-end'
        ]"
      >
        <template v-if="!right">
          <a :href="github" class="w-8 mx-4" v-if="github">
            <img src="/images/others/github.png" alt="GitHub" class="w-8" />
          </a>
          {{ tools.join(' • ') }}
        </template>
        <template v-else>
          {{ tools.join(' • ') }}
          <a :href="github" class="w-8 mx-4" v-if="github">
            <img src="/images/others/github.png" alt="GitHub" class="w-8" />
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    category: Array,
    tools: Array,
    right: Boolean,
    github: String
  },
  computed: {
    isImage() {
      return /\.(jpg|jpeg|png|gif)$/i.test(this.image);
    }
  }
};
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

.media {
  @apply rounded-3xl shadow-media transition duration-300 ease-in-out transform hover:scale-[1.01];
  animation: fadeIn 1s ease-in-out forwards;
}

.shadow-media { box-shadow: 0 0 64px rgba(0,0,0,0.4); }
.shadow-media:hover { box-shadow: 0 0 64px rgba(0,0,0,0.8); }

.project-info { @apply flex flex-col m-2 sm:m-8 mt-2 sm:mt-4; opacity: 0; }
.project-info.left { transform: translateX(-20px); }
.project-info.right { transform: translateX(20px); }

.project-info.start-animation { animation: fadeIn 1s ease-in-out forwards, slideInLeft 1s ease-in-out forwards; }
.project-info.right.start-animation { animation-name: fadeIn, slideInRight; }

.project-category { @apply text-cyan-400 text-base sm:text-xl; }
.project-title { @apply text-white text-2xl sm:text-3xl mt-2 sm:mt-4; }
.project-description { @apply bg-slate-900 shadow-media rounded-3xl p-3 sm:p-4 mt-3 sm:mt-4 z-10 text-slate-300 text-base sm:text-xl transition duration-300 ease-in-out; }
.project-tools { @apply flex items-center text-cyan-400 text-base sm:text-xl m-3 sm:m-4; }
</style>
