<template>
  <div>
    <pm-page-title title="サインアップ"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field
          type="email"
          placeholder="メールアドレス"
          icon="envelope"
          v-model="email"
        ></pm-text-field>
        <pm-text-field
          type="password"
          placeholder="パスワード"
          icon="lock"
          v-model="password"
        ></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="signUp">
              サインアップ
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import pmPageTitle from "@/components/PageTitle";
import pmTextField from "@/components/TextField";
import { authService } from "@/services/AuthService";
import { userService } from "@/services/UserService";

export default {
  name: "sign_up",
  components: { pmPageTitle, pmTextField },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signUp() {
      authService
        .signUp(this.email, this.password)
        .then(credential => {
          return userService.createUser(credential.user);
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
