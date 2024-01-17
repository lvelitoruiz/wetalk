<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import { defineProps } from 'vue'

defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  slideQty: {
    type: Number,
    default: 1,
  },
})
</script>
<template>
  <div class="content_destacados">
    <ClientOnly>
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :slides-per-view="1"
        :loop="true"
        :breakpoints="{
          1024: {
            slidesPerView: slideQty,
          },
        }"
        :speed="1000"
        :space-between="50"
        :navigation="{
          prevEl: '#prev',
          nextEl: '#next',
        }"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide
          v-for="page in dataList"
          :key="page.id"
        >
          <slot :item="page" />
        </SwiperSlide>
        <div class="c-navigation_destacados">
          <div
            class="swiper-button-prev"
            id="prev"
            :class="dataList?.length > 5 ? 'hide-mobile' : ''"
          />
          <div class="swiper-pagination" />
          <div
            class="swiper-button-next"
            id="next"
            :class="dataList?.length > 5 ? 'hide-mobile' : ''"
          />
        </div>
      </Swiper>
    </ClientOnly>
  </div>
</template>
<style lang="postcss">
.content_destacados {
  width: 200px;
  min-width: 100%;
  max-width: 100%;
}
.content_destacados .c-navigation_destacados {
  @apply relative flex justify-center items-center mt-5;
}
.content_destacados .c-navigation_destacados .swiper-button-next,
.content_destacados .c-navigation_destacados .swiper-button-prev,
.content_destacados .c-navigation_destacados .swiper-pagination {
  position: inherit;
  width: inherit;
  margin-top: 0;
  margin: 0 4px;
  color: var(--primary);
}
.content_destacados .c-navigation_destacados .swiper-pagination {
  @apply mt-1;
}
.content_destacados .c-navigation_destacados .swiper-button-next,
.content_destacados .c-navigation_destacados .swiper-button-prev {
  @apply h-[36px] w-[36px];
}
.content_destacados .swiper-button-next:after,
.content_destacados .swiper-button-prev:after {
  font-size: 12px;
  font-weight: bold;
}
.content_destacados .swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 2px;
}
.content_destacados .swiper-pagination-bullet {
  background: transparent;
  border: 1px solid var(--primary);
  opacity: inherit;
}
.content_destacados .swiper-pagination {
  @apply flex;
}
.content_destacados
  .swiper-pagination-horizontal.swiper-pagination-bullets
  .swiper-pagination-bullet {
  @apply border-none w-[36px] h-[36px] lg:w-[15px] lg:h-[15px] relative flex justify-center items-center;
}
.content_destacados .swiper-pagination-bullet::after {
  @apply content-[''] absolute w-[10px] h-[10px] border-primary border-[1px] rounded-full;
}
.content_destacados .swiper-pagination-bullet-active::after {
  @apply bg-primary;
}

@media screen and (max-width: 700px) {
  .hide-mobile {
    display: none;
  }
}
</style>
