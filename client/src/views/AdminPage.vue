<template>
  <div class="wrap">
    <header class="top">
      <h1>Админка</h1>
      <div class="top-actions">
        <button class="ghost" @click="$router.push('/')">Сайт</button>
        <button @click="logout">Выход</button>
      </div>
    </header>

    <section class="panel add-admin">
      <div class="panel-header">
        <h2>Добавить администратора</h2>
        <p class="muted">
          Введите логин — система сгенерирует случайный пароль. Допустимы
          буквы/цифры/._- (3–32 символа).
        </p>
      </div>

      <form class="input-row" @submit.prevent="createAdmin">
        <label class="sr-only" for="admin-username">Username</label>
        <input
          id="admin-username"
          v-model="adminUsername"
          placeholder="newadmin"
          required
          autocomplete="off"
          inputmode="text"
          maxlength="32"
        />
        <button class="primary" type="submit" :disabled="adminLoading">
          {{ adminLoading ? "Создание…" : "Создать" }}
        </button>
      </form>

      <div
        v-if="newAdmin"
        class="success-card"
        role="status"
        aria-live="polite"
      >
        <div class="success-title">Админ создан</div>
        <div class="success-body">
          <div class="kv">
            <span>Логин:</span><code>{{ newAdmin.username }}</code>
          </div>
          <div class="kv">
            <span>Пароль:</span><code>{{ newAdmin.password }}</code>
            <button class="ghost sm" @click="copy(newAdmin.password)">
              {{ copied ? "Скопировано!" : "Скопировать" }}
            </button>
          </div>
          <p class="muted small">
            Сохраните пароль — он показывается только один раз.
          </p>
        </div>
      </div>

      <div v-if="adminError" class="error">{{ adminError }}</div>
    </section>

    <section class="panel">
      <h2>Автомобили</h2>
      <CarForm
        :submitText="edited ? 'Обновить' : 'Создать'"
        :value="edited || {}"
        @submit="upsert"
        :onCancel="cancelEdit"
      />

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Make/Model</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Invoice</th>
              <th>Condition</th>
              <th>Location</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in cars" :key="c._id">
              <td data-label="Make/Model">{{ c.makeModel }}</td>
              <td data-label="Year">{{ c.year }}</td>
              <td data-label="VIN">{{ c.vin }}</td>
              <td data-label="Invoice">{{ c.invoiceNumber }}</td>
              <td data-label="Condition">{{ c.condition }}</td>
              <td data-label="Location">{{ c.location }}</td>
              <td data-label="Действия">
                <div class="row-actions">
                  <button @click="edited = c">Редакт.</button>
                  <button class="danger" @click="del(c._id)">Удалить</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>


<script>
import api from "../api";
import CarForm from "../components/CarForm.vue";
export default {
  name: "AdminPage",
  components: { CarForm },
  data() {
    return {
      cars: [],
      edited: null,
      adminUsername: "",
      newAdmin: null,
      adminError: "",
      adminLoading: false, // +++
      copied: false, // +++
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/admin/login");
    },
    async fetchCars() {
      const { data } = await api.get("/cars");
      this.cars = data;
    },
    async upsert(payload) {
      try {
        if (this.edited && this.edited._id) {
          const { data } = await api.put(`/cars/${this.edited._id}`, payload);
          const idx = this.cars.findIndex((x) => x._id === data._id);
          this.$set(this.cars, idx, data);
          this.edited = null;
        } else {
          const { data } = await api.post("/cars", payload);
          this.cars.unshift(data);
        }
      } catch (e) {
        alert(e.response?.data?.message || "Ошибка сохранения");
      }
    },
    cancelEdit() {
      this.edited = null;
    },
    async del(id) {
      if (!confirm("Удалить запись?")) return;
      await api.delete(`/cars/${id}`);
      this.cars = this.cars.filter((x) => x._id !== id);
    },
    async createAdmin() {
      this.adminError = "";
      this.newAdmin = null;
      this.copied = false;
      this.adminLoading = true; // +++
      try {
        const { data } = await api.post("/admins", {
          username: this.adminUsername,
        });
        this.newAdmin = data;
        this.adminUsername = "";
      } catch (e) {
        this.adminError = e.response?.data?.message || "Ошибка создания админа";
      } finally {
        this.adminLoading = false; // +++
      }
    },
    copy(text) {
      // +++
      if (!text) return;
      navigator.clipboard?.writeText(text).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #0f172a !important;
}
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  color: #eee;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  background: #374151;
  color: #fff;
}
button.danger {
  background: #ef4444;
}
.panel {
  margin: 18px 0;
  padding: 16px;
  background: #0f0f0f;
  border: 1px solid #222;
  border-radius: 12px;
}
.table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border-bottom: 1px solid #222;
  padding: 8px;
  text-align: left;
  font-size: 14px;
}
code {
  background: #111827;
  padding: 2px 6px;
  border-radius: 6px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.top-actions {
  display: flex;
  gap: 8px;
}
button.ghost {
  background: transparent;
  border: 1px solid #4b5563;
  color: #0f172a !important;
}
button.ghost:hover {
  background: #7d8289;
}

.table-wrap {
  width: 100%;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border-bottom: 1px solid #222;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}
.row-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .wrap {
    padding: 0 10px;
  }
  .top {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .panel {
    padding: 12px;
  }

  /* Таблица → карточки */
  .table {
    border: 0;
  }
  .table thead {
    display: none;
  }
  .table tbody {
    display: grid;
    gap: 12px;
  }
  .table tr {
    display: block;
    border: 1px solid #222;
    border-radius: 12px;
    padding: 12px;
  }
  .table td {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    border: 0;
    padding: 6px 0;
  }
  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #9ca3af;
  }
  .row-actions {
    justify-content: flex-start;
  }
  .top-actions button {
    width: 100%;
  }
}

/* --- PATCH: ровные контролы "Добавить администратора" --- */
:root { --control-h: 48px; }           /* целевая высота */

.add-admin .input-row {                /* строка с инпутом и кнопкой */
  display: flex;
  align-items: center;
  gap: 12px;                           /* отступ между инпутом и кнопкой */
}

.add-admin .input-row input,
.add-admin form label input {          /* на случай старой разметки с <label> */
  box-sizing: border-box;
  height: var(--control-h);            /* такая же высота, как у кнопки */
  padding: 10px 14px;                     /* внутренние отступы у поля */
  font-size: 16px;
  line-height: 1.2;
  border-radius: 12px;
}

.add-admin .input-row .primary,
.add-admin form button {               /* кнопка "Создать" */
  height: var(--control-h);
  padding: 10px 14px;                     /* горизонтальные отступы у кнопки */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

/* мобилка: складываем в столбик, сохраняем одинаковую высоту */
@media (max-width: 768px) {
  .add-admin .input-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .add-admin .input-row .primary,
  .add-admin form button {
    width: 100%;
  }
}

</style>
