<template>
  <div class="wrap">
    <h1>Check auto by VIN</h1>
    <div class="vin-box">
      <input v-model="vin" @keyup.enter="find" placeholder="Enter VIN" />
      <button @click="find">Find</button>
    </div>

    <div v-if="loading" class="hint">Wait...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="car" class="result">
      <CarCard :item="car" />
      <div class="map">
        <YandexMap :location="car.location" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import CarCard from "../components/CarCard.vue";
import YandexMap from "../components/YandexMap.vue";
export default {
  name: "UserPage",
  components: { CarCard, YandexMap },
  data() {
    return { vin: "", car: null, loading: false, error: "" };
  },
  computed: {
    // coords() {
    //   if (!this.car) return null;
    //   if (this.car.lat && this.car.lng) return { lat: this.car.lat, lng: this.car.lng };
    //   return null;
    // }
  },
  methods: {
    async find() {
      this.error = "";
      this.car = null;
      const v = (this.vin || "").trim();
      if (!v) {
        this.error = "Enter VIN";
        return;
      }
      this.loading = true;
      try {
        const { data } = await api.get("/public/car", { params: { vin: v } });
        this.car = data;
      } catch (e) {
        this.error = e.response?.data?.message || "Not found";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #0f172a !important;
}
.wrap {
  max-width: 840px;
  margin: 40px auto;
  padding: 0 16px;
  color: #eee;
}
.hint {
  margin-top: 8px;
  color: #bbb;
}
.error {
  margin-top: 8px;
  color: #f87171;
}
.vin-box {
  display: flex;
  gap: 8px;
}
input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #333;
  color: #0f172a !important;
}
button {
  padding: 12px 16px;
  border-radius: 10px;
  background: #22c55e;
  color: #08110a;
  border: 0;
  cursor: pointer;
}
.result {
  margin-top: 20px;
  display: grid;
  gap: 16px;
}
.map {
  margin-top: 6px;
}
body {
  background: #0b0b0b;
}
</style>
