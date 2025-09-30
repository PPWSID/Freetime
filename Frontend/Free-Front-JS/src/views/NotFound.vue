// ไฟล์: src/views/NotFound.vue
<template>
  <div class="notfound-container">
    <h1>404</h1>
    <p>ขอโทษ — หน้านี้ไม่พบ</p>
    <router-link to="/">กลับไปหน้าหลัก</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

.notfound-container h1 {
  font-size: 6rem;
  margin: 0;
}

.notfound-container p {
  font-size: 1.25rem;
  margin: 0;
}

.notfound-container a {
  margin-top: 8px;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
}
</style>