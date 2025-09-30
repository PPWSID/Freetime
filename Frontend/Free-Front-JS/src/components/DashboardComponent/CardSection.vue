<template>
    <div class="border-dashed rounded-lg bd-color">
      <slot></slot>
    </div>
  </template>
  
  <style scoped>
  .bd-color {
    position: relative;
    border-color: rgb(var(--v-theme-headerTable));
    border-width: 1px !important;
  }
  </style>
  