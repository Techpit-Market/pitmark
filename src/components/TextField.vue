<template>
  <div class="field">
    <label class="label" v-if="label">{{ label }}</label>
    <p class="control" :class="{ 'has-icons-left': icon }">
      <input
        class="input"
        :class="{ 'is-danger': error }"
        :type="type"
        :placeholder="placeholder"
        @change="onChanged"
        v-model="innerValue"
      />
      <pm-icon v-if="icon" class="is-small is-left" :name="icon"></pm-icon>
    </p>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import pmIcon from "./Icon";

export default {
  name: "pm-text-field",
  components: { pmIcon },
  props: {
    type: {
      type: String,
      validator(val) {
        return ["text", "email", "password", "search", "url"].includes(val);
      }
    },
    label: String,
    placeholder: String,
    value: String,
    icon: String,
    error: String
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    onChanged(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
