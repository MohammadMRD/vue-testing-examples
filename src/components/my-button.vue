<template functional>
  <button :class="[data.staticClass, 'c-button', `c-button--${props.variant}`]" v-bind="data.attrs" v-on="listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
      validation: (value) => ['primary', 'secondary'].includes(value),
    },
  },
}
</script>

<style scoped lang="scss">
.c-button {
  background: #fff;
  padding: 0.9rem 1.5rem;
  line-height: 2rem;
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;

  &--primary {
    background: #50a485;
    color: #efefef;

    &:hover {
      background: darken($color: #50a485, $amount: 5);
      color: #efefef;
    }
  }

  &--secondary {
    background: #d58033;
    color: #efefef;

    &:hover {
      background: darken($color: #d58033, $amount: 5);
      color: #efefef;
    }
  }
}
</style>
