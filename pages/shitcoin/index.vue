<script setup lang="ts">
import { discordLogin } from '~/composables/discord';

const user = await getUser();
</script>

<template>
	<div>
		<Navbar />

		<div class="p-10 mx-auto w-full xl:w-2/3 mt-6 text-white" v-if="user">
			<h1 class="text-7xl mx-auto text-center font-bold">Shitcoin Hub</h1>
			<h1 class="text-3xl mx-auto text-center font-bold mt-5">you have {{ user.balance }} shitcoin in your account.</h1>
		</div>
		<div class="p-10 mx-auto w-full xl:w-2/3 mt-6 text-white" v-else>
			<button class="text-7xl mx-auto text-center font-bold text-blurple underline" @click="discordLogin"
				>You must be logged in to use this page.</button
			>
		</div>
	</div>
</template>
