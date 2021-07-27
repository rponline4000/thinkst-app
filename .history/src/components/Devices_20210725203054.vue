<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in device_list" :key="i">
      <v-expansion-panel-header>
        <v-row align="center" class="spacer" no-gutters>
          {{ item.description }}
          <v-col cols="4" sm="2" md="1"> 1 </v-col>
          <v-col class="hidden-xs-only" sm="5" md="3"> 2 </v-col>
          <v-col class="text-no-wrap" cols="5" sm="3"> 3 </v-col>
          <v-col class="grey--text text-truncate hidden-sm-and-down">
            &mdash;
          </v-col>
        </v-row>

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
        <v-card>
          <sparkline></sparkline>
        </v-card>

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
                  <strong>{{ item.local_time }}</strong>
                </v-col>
                <v-col>
                  <strong>
                    <v-icon color="error" v-bind="attrs" v-on="on">
                      mdi-alert-circle
                    </v-icon></strong
                  >
                  <div class="text-caption">{{ item.key }}</div>
                  <div class="text-caption">{{ item.description }}</div>
                  <div class="text-caption">{{ item.dst_host }}</div>
                  <div class="text-caption">{{ item.src_host }}</div>
                  <div class="text-caption">{{ item.created }}</div>
                  <div class="text-caption">{{ item.node_id }}</div>
                </v-col>
              </v-row>
              <v-alert
                :value="true"
                :color="success"
                :icon="mdi - alert - circle"
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
import api from '../methods/api';
import sparkline from "@/components/sparkline";

export default {
  name: "Devices",
  components: {
    sparkline,
  },
  data() {
    return {
      device_list: null,
      alerts: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    getDevices : api.getDevices(),
    getAlerts : api.getAlerts()     
  }
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
