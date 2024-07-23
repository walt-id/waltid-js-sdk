<script setup>
import { IssuanceButton, VerificationButton } from 'waltid-vue-components';
</script>

<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
    <p style="font-size: 24px; margin-bottom: 10px;">Hello, Vue!</p>
    <div style="display: flex; gap: 10px;">
      <IssuanceButton :credentials='[{ "type": "eID" }]' />
      <VerificationButton :credentialTypes='["eID"]' />
    </div>
  </div>
</template>