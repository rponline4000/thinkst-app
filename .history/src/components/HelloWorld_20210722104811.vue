<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in data" :key="i">
      <v-expansion-panel-header>
        Item
        <template v-slot:actions>
          <v-icon color="error"> mdi-alert-circle </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      data: null,
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const headers = { "Content-Type": "application/json" };
      fetch(
        "https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json",
        { headers }
      )
        .then((response) => response.json())
        .then((data) => (this.data = data.devices));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
