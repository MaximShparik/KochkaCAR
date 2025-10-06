<template>
  <div class="card">
    <div class="row"><strong>Make/Model:</strong> {{ item.makeModel }}</div>
    <div class="row"><strong>Year:</strong> {{ item.year }}</div>
    <div class="row"><strong>VIN:</strong> {{ item.vin }}</div>
    <div class="row"><strong>Invoice #:</strong> {{ item.invoiceNumber }}</div>
    <div class="row"><strong>Condition:</strong> {{ prettyCondition(item.condition) }}</div>
    <div class="row"><strong>Location:</strong> {{ item.location }}</div>
  </div>
</template>

<script>
export default {
  name: 'CarCard',
  props: { item: { type: Object, required: true } },
  methods: {
    prettyCondition(c) { return c === 'in_transit' ? 'in transit' : 'registration'; }
  }
};
</script>

<style scoped>
.card { border: 1px solid #2e2e2e; border-radius: 12px; padding: 16px; background: #111; color: #eee; }
.row { margin: 6px 0; }
</style>
