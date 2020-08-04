import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import BookmarkNew from "./views/BookmarkNew";
import BookmarkDetail from "./views/BookmarkDetail";
import Profile from "./views/Profile";
import Thanks from "./views/Thanks";
import AuthEdit from "./views/AuthEdit";
import Error401 from "./views/Error401";
import Error404 from "./views/Error404";

import { authService } from "./services/AuthService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: SignUp
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: SignIn
    },
    {
      path: "/bookmarks/new",
      name: "bookmark_new",
      component: BookmarkNew,
      meta: { private: true }
    },
    {
      path: "/bookmarks/:id",
      name: "bookmark_detail",
      component: BookmarkDetail
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { private: true }
    },
    {
      path: "/auth/edit",
      name: "auth_edit",
      component: AuthEdit,
      meta: { private: true }
    },
    {
      path: "/thanks",
      name: "thanks",
      component: Thanks
    },
    {
      path: "/unauthoerized",
      name: "error_unauthorized",
      component: Error401
    },
    {
      path: "/not_found",
      name: "error_not_found",
      component: Error404
    },
    {
      path: "*",
      name: "error_unknown_path",
      component: Error404
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.private)) {
    authService.onStateChanged(user => {
      if (user) {
        next();
      } else {
        next({ name: "error_unauthorized" });
      }
    });
  } else {
    next();
  }
});

export default router;
