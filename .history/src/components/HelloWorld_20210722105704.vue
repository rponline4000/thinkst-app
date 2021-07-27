<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in data" :key="i">
      <v-expansion-panel-header>
        {{ item.description }}
        <template v-slot:actions>
          <div v-if="data[i].device_live === 'True'">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">               
                  <v-icon color="success" v-bind="attrs" v-on="on"> mdi-alert-circle </v-icon>              
              </template>
              <span>Tooltip</span>
            </v-tooltip>
          </div>
          <div v-else-if="type === 'B'">B</div>
          <div v-else-if="type === 'C'">C</div>
          <div v-else>Not A/B/C</div>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content> </v-expansion-panel-content>
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
        .then((data) => (this.data = data.device_list));
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
