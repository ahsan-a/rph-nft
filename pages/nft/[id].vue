<template>
	<Navbar />
	<div> id: {{ route.params.id }} </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
