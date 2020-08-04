<template>
  <span class="icon">
    <i :class="classes"></i>
  </span>
</template>

<script>
export default {
  name: "pm-icon",
  props: {
    name: String,
    mode: {
      type: String,
      validator(val) {
        return ["fas", "far", "fab"].includes(val);
      },
      default: "fas"
    }
  },
  computed: {
    classes() {
      return [this.mode, `fa-${this.name}`];
    }
  }
};
</script>
