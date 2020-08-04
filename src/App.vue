<template>
  <div id="app">
    <pm-nav-bar
      :user="user"
      :menu-expanded="menuExpanded"
      @sign-out-clicked="signOut"
      @menu-clicked="switchMenuState"
    ></pm-nav-bar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import pmNavBar from "@/components/NavBar";
import { authService } from "@/services/AuthService";
import { cacheService } from "@/services/CacheService";

export default {
  name: "app",
  components: { pmNavBar },
  data() {
    return {
      user: null,
      menuExpanded: false
    };
  },
  created() {
    cacheService.removeItem("users");
    authService.onStateChanged(user => {
      this.user = user;
    });
    this.$router.beforeEach((to, from, next) => {
      this.menuExpanded = false;
      next();
    });
  },
  methods: {
    async signOut() {
      await authService.signOut();
      this.$router.push({ name: "home" });
    },
    switchMenuState(currentState) {
      this.menuExpanded = !currentState;
    }
  }
};
</script>
