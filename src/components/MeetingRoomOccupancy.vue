<template>
  <div>
    <loading v-model:active="isLoading"
     :is-full-page="fullPage"/>
    <div>
        <h1>
            Meeting room occupancy
        </h1>
        <div class="select">
            Select a sensor
            <select v-model="selectedSensor" @change="occupancy=null">
              <option class="option" disabled value="">Please select one</option>
              <option class="option"  v-for="sensor in sensors" :key="sensor" :value="sensor">Sensor {{sensor}}</option>
            </select>
        </div>
        <div class="select">
            Select date
            <VueDatePicker v-model="date"></VueDatePicker>
        </div>
        <div class="select">
              <button @click="getOccupancy()">Show occupancy</button>
        </div>
        <div class="select report" v-if="occupancy">
             Sensor {{selectedSensor}} reports from room occupancy of {{occupancy}} people
        </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'MeetingRoomOccupancy',
  components: {
    Loading,
    VueDatePicker
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      sensors: [],
      url: 'http://127.0.0.1:5000/',
      selectedSensor: null,
      occupancy: null,
      date: null
    }
  },
  mounted() {
    this.isLoading = true;
    axios.get(this.url + 'api/sensors')
      .then(response => {
        console.log(response);
        this.sensors = response.data['sensors'];
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
        this.sensors = [];
      });
  },
  methods: {
    getOccupancy() {
      if(this.selectedSensor) {
        this.isLoading = true
        let url = this.url + 'api/occupancy?sensor=' + this.selectedSensor;
        url += this.date ? '&atInstant=' + this.date.toISOString().split('.')[0]+'Z' : '';
        this.occupancy = null;
        axios.get(url)
          .then(response => {
            console.log(response);
            this.occupancy = response.data['inside'];
            this.isLoading = false;
          })
          .catch(error => {
            console.log(error);
            this.isLoading = false;
            this.occupancy = null;
          });
      }
    }
  }
}
</script>

<style scoped>
.select {
  margin-top: 50px;
  font-size: 20px;
}
.option {
  font-family: Avenir, Helvetica, Arial, sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}
button {
  padding: 10px 20px;
  border: 1px solid #000;
  color: #2c3e50;
  background-color:#fff;
  border-radius: 4px;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif!important;
  cursor: pointer;
}

.report {
  padding: 50px 100px;
  margin-top: 50px;
  font-size: 20px;
  color: #2c3e50;
  background-color:#D3D3D3;
  border-radius: 4px;
}

</style>
