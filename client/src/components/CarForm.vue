<template>
  <form @submit.prevent="submit">
    <div class="grid">
      <label>Make Model <input v-model="form.makeModel" required /></label>
      <!-- <label>Model <input v-model="form.model" required /></label> -->
      <label>Year <input v-model.number="form.year" type="number" min="1900" required /></label>
      <label>VIN <input v-model="form.vin" required /></label>
      <label>Invoice # <input v-model="form.invoiceNumber" required /></label>
      <label>
        Condition
        <select v-model="form.condition" required>
          <option value="in_transit">in transit</option>
          <option value="registration">registration</option>
        </select>
      </label>
      <label>
        Location
        <select v-model="form.location" required>
          <option value="warehouse">warehouse</option>
          <option value="Khorgos">Khorgos</option>
          <option value="Kazakhstan terminal">Kazakhstan terminal</option>
          <option value="Kazakhstan-Russian Federation customs post">Kazakhstan-Russian Federation customs post</option>
          <option value="Minsk">Minsk</option>
        </select>
      </label>
      <!-- <label>Latitude (optional) <input v-model.number="form.lat" type="number" step="0.000001" /></label>
      <label>Longitude (optional) <input v-model.number="form.lng" type="number" step="0.000001" /></label> -->
    </div>
    <div class="actions">
      <button type="submit">{{ submitText }}</button>
      <button v-if="onCancel" type="button" @click="onCancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CarForm',
  props: { value: { type: Object, default: () => ({}) }, onCancel: { type: Function }, submitText: { type: String, default: 'Save' } },
  data() { return { form: { ...this.value } }; },
  watch: { value: { deep: true, handler(v) { this.form = { ...v }; } } },
  methods: { submit() { this.$emit('submit', { ...this.form }); } }
};
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
input, select { padding: 8px; border-radius: 8px; border: 1px solid #333; background: #1a1a1a; color: #eee; }
.actions { margin-top: 20px; display: flex; gap: 8px; }
button { padding: 10px 14px; border-radius: 10px; border: 0; background: #4f46e5; color: white; cursor: pointer; }
button[type="button"] { background: #374151; }
</style>
