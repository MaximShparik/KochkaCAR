<template>
  <div class="wrap">
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <label>Username <input v-model="username" required /></label>
      <label>Password <input v-model="password" type="password" required /></label>
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import api from '../api';
export default {
  name: 'AdminLogin',
  data() { return { username: '', password: '', error: '' }; },
  methods: {
    async login() {
      this.error = '';
      try {
        const { data } = await api.post('/auth/login', { username: this.username, password: this.password });
        localStorage.setItem('token', data.token);
        this.$router.push('/admin');
      } catch (e) {
        this.error = e.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.wrap { max-width: 420px; margin: 80px auto; padding: 0 16px; color: #eee; }
label { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
input { padding: 10px; border-radius: 8px; border: 1px solid #333; background: #1a1a1a; color: #eee; }
button { margin-top: 12px; padding: 12px 16px; border-radius: 10px; background: #4f46e5; color: #fff; border: 0; cursor: pointer; }
.error { margin-top: 8px; color: #f87171; }
</style>
