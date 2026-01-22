<template>
  <!-- Mobile : colonne | Desktop : 2 colonnes -->
  <div class="m-4 md:m-16 md:mt-48 flex flex-col md:flex-row items-start gap-6 md:gap-12">
    <!-- Colonne texte -->
    <div class="flex-1 min-w-0 md:max-w-[680px]">
      <span class="category-text">
        {{ category.join(' • ') }}
      </span>

      <span class="title-text block mt-2">
        {{ title }}
      </span>

      <div class="description-box mt-4">
        <p class="description-text">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Colonne média (largeur bornée sur desktop) -->
    <div class="w-full md:basis-[560px] md:flex-shrink-0">
      <img v-if="isImage" :src="image" alt="project"
           class="media w-full h-auto md:max-h-96 object-cover" />
      <video v-else autoplay loop :src="image" muted
             class="media w-full h-auto md:max-h-96 object-cover"></video>
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
  },
  computed: {
    isImage() {
      return /\.(jpg|jpeg|png|gif)$/i.test(this.image);
    }
  },
}
</script>

<style scoped>
.category-text { @apply text-cyan-400 text-xl; }
.title-text { @apply text-white text-3xl; }

.description-box {
  @apply bg-slate-900 shadow-[0_0_64px_rgba(0,0,0,0.4)] hover:shadow-[0_0_64px_rgba(0,0,0,0.6)]
         rounded-3xl p-4 transition duration-300 ease-in-out;
}

.description-text { @apply text-slate-300 text-xl; }

.media {
  @apply rounded-3xl transition duration-300 ease-in-out transform hover:scale-[1.01];
  box-shadow: 0 0 64px rgba(0,0,0,0.4);
}
.media:hover { box-shadow: 0 0 64px rgba(0,0,0,0.8); }
</style>
