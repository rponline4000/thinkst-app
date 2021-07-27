<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in device_list" :key="i">
      <v-expansion-panel-header>
        <v-row align="center" class="spacer" no-gutters>
          {{ item.description }}
          <v-col cols="4" sm="2" md="1"></v-col>
          <v-col class="hidden-xs-only" sm="5" md="3"></v-col>
          <v-col class="text-no-wrap" cols="5" sm="3"></v-col>
          <v-col class="grey--text text-truncate hidden-sm-and-down"> </v-col>
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
        <v-card> </v-card>

        <v-timeline dense>
          <v-slide-x-reverse-transition group hide-on-leave>
            <v-timeline-item
              v-for="(item, i) in device_list[i]"
              :key="i"
              :color="green"
              small
              fill-dot
            >
              <v-row class="pt-1">
                <v-col cols="1">
                  <strong>{{ item.local_time }}</strong>
                </v-col>
                <v-col>
                  
                  <v-simple-table>
                    <template v-slot:default>
                      <thead v-if="i === 0"> 
                        <tr>
                          <th class="text-left">key</th>
                          <th class="text-left">description</th>
                          <th class="text-left">dst_host</th>                         
                          <th class="text-left">created</th>                       
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-left">{{ item.key }}</td>
                          <td class="text-left">{{ item.description }}</td>
                          <td class="text-left">{{ item.dst_host }}</td>                         
                          <td class="text-left">{{ item.created }}</td>
                        
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
               
                </v-col>
              </v-row>
            
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "Devices",
  components: {},
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
        )
        .then(() => {
           this.filterByNodeId();
        });
    },

    filterByNodeId() {
      for (let index = 0; index < this.device_list.length; index++) {
        this.device_list[index]["alerts"] = [];
        this.alerts.forEach((item) => {
          if (item.node_id === this.device_list[index].node_id) {
            this.device_list[index]["alerts"].push(item);          
          }
        });
      }
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

.v-data-table>.v-data-table__wrapper>table {
    width: 28%!important;
    border-spacing: 0;
}
</style>
