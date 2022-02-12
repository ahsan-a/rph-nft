<script setup lang="ts">
import { getUser, discordLogin, discordLogout } from '~/composables/discord';
import { ref } from 'vue';

const user = await getUser();
const pfpEnabled = ref(false);

function blurPfp() {
	setTimeout(() => {
		pfpEnabled.value = false;
	}, 500);
}
</script>

<template>
	<div class="w-40 mt-16 py-1 px-0.5 bg-lightbg outline-midbg absolute rounded-md right-1 flex flex-col justify-center" v-if="pfpEnabled">
		<NuxtLink class="text-white px-2 text-sm py-1 hover:bg-lighterbg transition-all w-full block text-center" :to="`/user/${user.id}`"
			>your nfts</NuxtLink
		>
		<button class="text-white px-2 text-sm py-1 hover:bg-lighterbg transition-all w-full" @click="discordLogout">logout</button>
	</div>
	<div class="w-full">
		<div class="bg-blurple flex flex-row justify-between py-1">
			<NuxtLink
				class="flex flex-row items-center rounded-lg ml-2 hover:backdrop-brightness-50 hover:bg-white hover:bg-opacity-15 p-2 transition-colors pr-3"
				to="/"
			>
				<img src="/icons/rph.webp" class="rounded-md shadow-lg h-12 w-12" />
				<h1 class="ml-3 text-white font-bold text-2xl">rph nft</h1>
			</NuxtLink>
			<div class="flex flex-row items-center mr-3">
				<div v-if="user" class="flex flex-row items-center">
					<NuxtLink class="font-semibold text-white mr-3 underline" to="/pepeggcoin">{{ user.balance }} pepeggcoin</NuxtLink>
					<button
						@click="pfpEnabled = !pfpEnabled"
						@blur="blurPfp"
						class="flex flex-row items-center px-3 transition-colors py-1 rounded-lg hover:bg-white hover:bg-opacity-15 bg-opacity-15"
						:class="{ 'bg-white': pfpEnabled }"
					>
						<img :src="user.avatar" class="w-10 h-10 rounded-full object-cover" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="text-gray-100 fill-current w-3 h-auto ml-2"
							viewBox="0 0 24 24"
						>
							<path d="M12 21l-12-18h24z" />
						</svg>
					</button>
				</div>
				<button
					class="text-white font-bold text-lg hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-colors"
					@click="discordLogin"
					v-else
				>
					Sign In
				</button>
			</div>
		</div>
	</div>
</template>
