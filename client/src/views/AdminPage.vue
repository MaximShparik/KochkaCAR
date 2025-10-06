<template>
  <div class="wrap">
    <header class="top">
      <h1>Админка</h1>
      <div>
        <button @click="$router.push('/')">Сайт</button>
        <button @click="logout">Выход</button>
      </div>
    </header>

    <section class="panel">
      <h2>Создать админа</h2>
      <form @submit.prevent="createAdmin">
        <label>Username <input v-model="adminUsername" placeholder="newadmin" required /></label>
        <button type="submit">Создать</button>
      </form>
      <div v-if="newAdmin" class="note">
        Создан админ: <strong>{{ newAdmin.username }}</strong><br />
        Пароль (показывается один раз): <code>{{ newAdmin.password }}</code>
      </div>
      <div v-if="adminError" class="error">{{ adminError }}</div>
    </section>

    <section class="panel">
      <h2>Автомобили</h2>
      <CarForm :submitText="edited ? 'Обновить' : 'Создать'" :value="edited || {}" @submit="upsert" :onCancel="cancelEdit" />

      <table class="table">
        <thead>
          <tr>
            <th>Make/Model</th><th>Year</th><th>VIN</th><th>Invoice</th>
            <th>Condition</th><th>Location</th><th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in cars" :key="c._id">
            <td>{{ c.makeModel }}</td>
            <td>{{ c.year }}</td>
            <td>{{ c.vin }}</td>
            <td>{{ c.invoiceNumber }}</td>
            <td>{{ c.condition }}</td>
            <td>{{ c.location }}</td>
            <td>
              <button @click="edited = c">Редакт.</button>
              <button class="danger" @click="del(c._id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import api from '../api';
import CarForm from '../components/CarForm.vue';
export default {
  name: 'AdminPage',
  components: { CarForm },
  data() {
    return { cars: [], edited: null, adminUsername: '', newAdmin: null, adminError: '' };
  },
  created() { this.fetchCars(); },
  methods: {
    logout() { localStorage.removeItem('token'); this.$router.push('/admin/login'); },
    async fetchCars() { const { data } = await api.get('/cars'); this.cars = data; },
    async upsert(payload) {
      try {
        if (this.edited && this.edited._id) {
          const { data } = await api.put(`/cars/${this.edited._id}`, payload);
          const idx = this.cars.findIndex(x => x._id === data._id);
          this.$set(this.cars, idx, data); this.edited = null;
        } else {
          const { data } = await api.post('/cars', payload);
          this.cars.unshift(data);
        }
      } catch (e) { alert(e.response?.data?.message || 'Ошибка сохранения'); }
    },
    cancelEdit() { this.edited = null; },
    async del(id) {
      if (!confirm('Удалить запись?')) return;
      await api.delete(`/cars/${id}`);
      this.cars = this.cars.filter(x => x._id !== id);
    },
    async createAdmin() {
      this.adminError = ''; this.newAdmin = null;
      try {
        const { data } = await api.post('/admins', { username: this.adminUsername });
        this.newAdmin = data; this.adminUsername = '';
      } catch (e) { this.adminError = e.response?.data?.message || 'Ошибка создания админа'; }
    }
  }
};
</script>

<style scoped>
.wrap { max-width: 1100px; margin: 0 auto; padding: 0 16px; color: #eee; }
.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
button { padding: 8px 12px; border-radius: 8px; border: 0; cursor: pointer; background: #374151; color: #fff; }
button.danger { background: #ef4444; }
.panel { margin: 18px 0; padding: 16px; background: #0f0f0f; border: 1px solid #222; border-radius: 12px; }
.table { margin-top: 20px; width: 100%; border-collapse: collapse; }
.table th, .table td { border-bottom: 1px solid #222; padding: 8px; text-align: left; font-size: 14px; }
code { background: #111827; padding: 2px 6px; border-radius: 6px; }
</style>
