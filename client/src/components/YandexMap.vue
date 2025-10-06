<template>
  <div class="map-wrap">
    <!-- Легенда и прогресс -->
    <div class="legend">
      <div class="legend-top">
        <div class="progress">
          <div class="bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="steps">
          <div v-for="(s, idx) in steps" :key="s.key" class="step">
            <div class="dot" :class="{ passed: idx <= currentIdx }">
              {{ idx + 1 }}
            </div>
            <div class="label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Карта -->
    <div ref="map" class="ymap"></div>
  </div>
</template>

<script>
export default {
  name: "YandexMap",
  props: {
    location: { type: String, default: "" }, // warehouse / Khorgos / Kazakhstan terminal / Kazakhstan-Russian Federation customs post / Minsk
  },
  data() {
    return {
      map: null,
      ymapsReady: false,
      objects: [],
      steps: [
        { key: "warehouse", label: "Warehouse", coord: [43.25667, 76.92861] },
        { key: "Khorgos", label: "Khorgos", coord: [44.212, 80.414] },
        {
          key: "Kazakhstan terminal",
          label: "KZ terminal (Astana)",
          coord: [51.16939, 71.44907],
        },
        {
          key: "Kazakhstan-Russian Federation customs post",
          label: "KZ-RF customs",
          coord: [54.87578, 69.16299],
        },
        { key: "Minsk", label: "Minsk", coord: [53.90228, 27.56188] },
      ],
    };
  },
  computed: {
    currentIdx() {
      const i = this.steps.findIndex((s) => s.key === this.location);
      return i < 0 ? -1 : i;
    },
    progressPercent() {
      if (this.currentIdx < 0) return 0;
      const max = this.steps.length - 1;
      return Math.min(100, Math.round((this.currentIdx / max) * 100));
    },
  },
  mounted() {
    this.initMap();
  },
  watch: {
    location() {
      this.drawRoute();
    },
  },
  methods: {
    async initMap() {
      await this.ensureScript();
      window.ymaps.ready(() => {
        this.ymapsReady = true;
        this.map = new window.ymaps.Map(this.$refs.map, {
          center: [53.9, 27.56],
          zoom: 5,
          controls: ["zoomControl"],
        });
        this.drawRoute();
      });
    },
    ensureScript() {
      return new Promise((resolve, reject) => {
        if (window.ymaps) return resolve();
        const key = process.env.VUE_APP_YANDEX_API_KEY;
        // console.log(key)
        // ★ грузим полный пакет, чтобы точно был multiRouter
        const url = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${key}&load=package.full`;
        const s = document.createElement("script");
        s.src = url;
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    },
    clearObjects() {
      if (!this.map) return;
      this.objects.forEach((obj) => this.map.geoObjects.remove(obj));
      this.objects = [];
    },
    // ★ моментально вписать карту по всем 5 точкам (ещё до маршрута)
    fitToAllPoints(coords) {
      if (!coords?.length) return;
      let minLat = coords[0][0],
        maxLat = coords[0][0];
      let minLng = coords[0][1],
        maxLng = coords[0][1];
      coords.forEach(([lat, lng]) => {
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      });
      try {
        this.map.setBounds(
          [
            [minLat, minLng],
            [maxLat, maxLng],
          ],
          {
            checkZoomRange: true,
            duration: 300,
            zoomMargin: 40,
          }
        );
      } catch (e) {}
    },
    // ★ резервная линия (если маршрутизация не сработает)
    drawFallbackLine(coords, color, width, dashed = false) {
      const line = new window.ymaps.Polyline(
        coords,
        {},
        {
          strokeColor: color,
          strokeWidth: width,
          strokeStyle: dashed ? "dash" : "solid",
        }
      );
      this.map.geoObjects.add(line);
      this.objects.push(line);
      return line;
    },
    drawRoute() {
      if (!this.map || !this.ymapsReady) return;
      const ymaps = window.ymaps;
      this.clearObjects();

      const coords = this.steps.map((s) => s.coord);

      // ★ сразу показать все точки в кадре
      this.fitToAllPoints(coords);

      // Кастомный пронумерованный пин
      const NumberPin = ymaps.templateLayoutFactory.createClass(
        `<div style="
          width:28px;height:28px;border-radius:14px;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;color:#08110a;
          background:$[properties.bgColor];
          border:1px solid rgba(0,0,0,0.35);
          box-shadow:0 0 0 3px $[properties.ringColor];
        ">$[properties.num]</div>`
      );

      // Полный серый маршрут (дороги)
      let fullRoute;
      if (ymaps.multiRouter?.MultiRoute) {
        fullRoute = new ymaps.multiRouter.MultiRoute(
          { referencePoints: coords, params: { routingMode: "auto" } }, // ★ по дорогам
          {
            boundsAutoApply: false,
            viaPointVisible: false,
            wayPointVisible: false,
            routeActiveStrokeColor: "#6b7280",
            routeActiveStrokeWidth: 6,
            routeStrokeColor: "#6b7280",
            routeStrokeWidth: 6,
          }
        );
        this.map.geoObjects.add(fullRoute);
        this.objects.push(fullRoute);
      } else {
        // если по какой-то причине нет роутера — рисуем серую ломаную
        this.drawFallbackLine(coords, "#6b7280", 4, true);
      }

      // Зелёная пройденная часть
      if (this.currentIdx >= 1) {
        const passedCoords = coords.slice(0, this.currentIdx + 1);
        if (ymaps.multiRouter?.MultiRoute) {
          const passedRoute = new ymaps.multiRouter.MultiRoute(
            { referencePoints: passedCoords, params: { routingMode: "auto" } },
            {
              boundsAutoApply: false,
              viaPointVisible: false,
              wayPointVisible: false,
              routeActiveStrokeColor: "#22c55e",
              routeActiveStrokeWidth: 7,
              routeStrokeColor: "#22c55e",
              routeStrokeWidth: 7,
            }
          );
          this.map.geoObjects.add(passedRoute);
          this.objects.push(passedRoute);
        } else {
          this.drawFallbackLine(passedCoords, "#22c55e", 5, false);
        }
      }

      // Точки с нумерацией
      this.steps.forEach((s, idx) => {
        const passed = this.currentIdx >= 0 && idx <= this.currentIdx;
        const pin = new ymaps.Placemark(
          s.coord,
          {
            num: String(idx + 1),
            bgColor: passed ? "#22c55e" : "#6b7280",
            ringColor: passed
              ? "rgba(34,197,94,0.35)"
              : "rgba(107,114,128,0.25)",
            hintContent: `${idx + 1}. ${s.label}`,
          },
          {
            iconLayout: NumberPin,
            iconShape: { type: "Circle", coordinates: [14, 14], radius: 14 },
          }
        );
        this.map.geoObjects.add(pin);
        this.objects.push(pin);
      });

      // ★ когда роутер построит путь — аккуратно подогнать карту по его границам
      if (fullRoute?.model) {
        const fitToRoute = () => {
          try {
            const b = fullRoute.getBounds();
            if (b) {
              this.map.setBounds(b, {
                checkZoomRange: true,
                duration: 300,
                zoomMargin: 40,
              });
            }
          } catch (e) {}
        };
        fullRoute.model.events.once("requestsuccess", fitToRoute);
        fullRoute.model.events.once("requestfail", () => {
          // если не получилось проложить по дорогам — оставим уже отрисованные точки/резервную линию
        });
        // на всякий случай — повторная попытка подогнать
        setTimeout(fitToRoute, 800);
      }
    },
  },
};
</script>

<style scoped>
.map-wrap {
  display: grid;
  gap: 10px;
}
.ymap {
  width: 100%;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
}
.legend {
  background: #0f0f0f;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 10px;
  color: #e5e7eb;
}
.progress {
  position: relative;
  height: 6px;
  background: #1f2937;
  border-radius: 999px;
  overflow: hidden;
}
.progress .bar {
  height: 100%;
  background: #22c55e;
  width: 0%;
  transition: width 0.3s ease;
}
.steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}
.step {
  display: grid;
  justify-items: center;
  gap: 6px;
  text-align: center;
  font-size: 12px;
}
.dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #6b7280;
  color: #08110a;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.35);
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.25);
}
.dot.passed {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
}
.label {
  color: #cbd5e1;
}
</style>
