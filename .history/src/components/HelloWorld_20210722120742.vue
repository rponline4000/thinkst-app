<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in device_list" :key="i">
      <v-expansion-panel-header>
        {{ item.description }}
        <template v-slot:actions>
          <div v-if="device_list[i].device_live === 'True'">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="success" v-bind="attrs" v-on="on">
                  mdi-check-circle
                </v-icon>
              </template>
              <span>Live : {{ device_list[i].device_live }}</span>
            </v-tooltip>
          </div>
          <div v-if="device_list[i].device_live === 'False'">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="error" v-bind="attrs" v-on="on">
                  mdi-alert-circle
                </v-icon>
              </template>
              <span>Live : {{ device_list[i].device_live }}</span>
            </v-tooltip>
          </div>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-timeline dense>
          <v-slide-x-reverse-transition group hide-on-leave>
            <v-timeline-item
              v-for="item in alerts"
              :key="item.local_time"
              :color="green"
              small
              fill-dot
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>5pm</strong>
                </v-col>
                <v-col>
                  <strong>New Icon</strong>
                  <div class="text-caption"> {{ item.description }}</div>
                </v-col>
              </v-row>
              <v-alert
                :value="true"
                :color="green"
                :icon="mdi-alert-circle"
                class="black--text"
              >
               
              </v-alert>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      device_list: null,
      alerts: null,
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
        .then(
          (data) => (
            (this.device_list = data.device_list), (this.alerts = data.alerts)
          )
        );
    },
    filter(arr, search, query) {
      return arr.find((search) => search.includes(query));
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
