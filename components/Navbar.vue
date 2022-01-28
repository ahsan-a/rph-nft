<script setup lang="ts">
import { useMainStore } from '~/store/main';
import { getUser } from '~/composables/discord';

const mainStore = useMainStore();

const user = await getUser();
</script>

<template>
	<div class="bg-blurple flex flex-row justify-between py-1">
		<NuxtLink
			class="flex flex-row items-center rounded-lg ml-2 hover:backdrop-brightness-50 hover:bg-white hover:bg-opacity-15 p-2 transition-colors pr-3"
			to="/"
		>
			<img src="/icons/rph.webp" class="rounded-md shadow-lg h-12 w-12" />
			<h1 class="ml-3 text-white font-bold text-2xl">rph nft</h1>
		</NuxtLink>
		<div class="flex flex-row items-center mr-3">
			<div v-if="user">
				<img :src="user.avatar" class="w-13 h-13 rounded-full" />
			</div>
			<button
				class="text-white font-bold text-lg hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-colors"
				@click="useDiscordLogin"
				v-else
			>
				Sign In
			</button>
		</div>
	</div>
</template>
