<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app  mini-variant
          mini-variant-width="56"
          permanent>
        <!-- -->
        <v-list-item class="px-2">
          <v-list-item-avatar style="border-radius: none">
            <img height="auto" width="auto" src="./assets/logo.png" />
          </v-list-item-avatar>

          <v-list-item-title></v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      </v-navigation-drawer>

      <v-app-bar app>
        <!-- -->
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-avatar.v-list-item__avatar {
  border-radius: 0%;
}

.v-avatar.v-list-item__avatar {
  min-width: 0% !important;
}

.v-data-table {
    width: 70%!important;
    border-spacing: 0;
}

td.text-left {
    width: 50%;
}

.v-avatar.v-list-item__avatar {
    border-radius: 100%;
    border: 1px solid #9494944f;
}

@media screen and (min-width: 1665px) {
  table {
   width: 100%;
  }
}
</style>
