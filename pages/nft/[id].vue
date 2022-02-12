<script setup lang="ts">
import { Nft } from '~/typings';
import { ref } from 'vue';

const route = useRoute();
const { SUPABASE_URL } = useRuntimeConfig();

const nft: Nft = await $fetch('/api/nft/get', { params: { id: route.params.id } });

const date = new Date(nft.created_at);
const timeAgo = useTimeAgo(date);
const token = useCookie('discord_token').value;

const loading = ref(false);

const canTrade: { canTrade: boolean; text: string } = token
	? await $fetch('/api/nft/canTrade', { params: { id: nft.id, token } })
	: { canTrade: false, text: 'Sign in to trade' };

const user = await getUser();

async function buyNft() {
	if (!token || !canTrade.canTrade) return;

	loading.value = true;
	await $fetch('/api/nft/buy', {
		params: { id: nft.id },
	});
	loading.value = false;
	window.location.reload();
}

async function saveOptions() {
	const [sale, price] = [document.getElementById('saleInput') as HTMLInputElement, document.getElementById('priceInput') as HTMLInputElement];
	if (!sale?.value || !price?.value) return;

	await $fetch('/api/nft/edit', {
		method: 'POST',
		params: { id: nft.id },
		body: {
			sale: Boolean(sale.value),
			price: Number(price.value),
		},
	});

	window.location.reload();
}
</script>

<template>
	<div>
		<Navbar />
		<div class="p-10 mx-auto w-full xl:w-2/3 mt-8">
			<Suspense>
				<template #default>
					<div class="mt-8 grid grid-cols-10 grid-rows-1 justify-between">
						<img
							:src="`${SUPABASE_URL}/storage/v1/object/public/nfts/${nft.id}`"
							class="col-span-3 h-auto w-full rounded-4xl shadow-lg"
						/>
						<div class="col-span-7 w-full ml-4">
							<div class="bg-lightbg px-10 pt-10 pb-5 rounded-4xl shadow-lg">
								<h1 class="text-white font-bold text-6xl mb-6">{{ nft.name }} (#{{ nft.id }})</h1>
								<div class="text-gray-300 flex flex-row justify-between items-center">
									<h1 class="font-semibold text-2xl"> {{ nft.price }} pepeggcoin </h1>
									<h2 class="text-sm"
										>{{
											date.toDateString() === new Date().toDateString() ? date.toLocaleTimeString() : date.toLocaleString()
										}}
										({{ timeAgo }})</h2
									>
								</div>
								<pre class="mt-8 text-gray-200 comicSans text-lg">{{ nft.description.trim() }}</pre>

								<div class="text-gray-200 mt-3" v-if="nft.owner_id && nft.users">
									Owned by
									<NuxtLink :to="`/user/${nft.users.id}`" class="inline underline"
										>{{ nft.users.username }}#{{ nft.users.discriminator }}</NuxtLink
									>
								</div>

								<div v-if="user?.id !== nft.owner_id">
									<button
										class="w-full bg-blurple mt-8 rounded-md py-2 text-lg text-white font-bold hover:bg-newBlurple transition-colors disabled:bg-newBlurple disabled:text-gray-200 disabled:cursor-not-allowed"
										:disabled="!canTrade.canTrade"
										@click="buyNft"
										v-if="(nft.sale || !nft.owner_id) && !loading"
										>{{ canTrade.text }}</button
									>
									<button
										class="w-full bg-blurple mt-8 rounded-md py-4 text-lg text-white font-bold hover:bg-newBlurple transition-colors disabled:bg-newBlurple disabled:text-gray-200 disabled:cursor-not-allowed"
										:disabled="true"
										v-else-if="(nft.sale || !nft.owner_id) && loading"
										><img
											src="https://samherbert.net/svg-loaders/svg-loaders/three-dots.svg"
											alt="Loading..."
											class="mx-auto h-3"
									/></button>
								</div>
								<div class="flex flex-row items-center justify-between mt-4" v-if="!canTrade.canTrade">
									<a href="https://discord.gg/rph" class="text-blurple underline" target="_blank">Join the r/ph discord server</a>
									<NuxtLink to="/pepeggcoin" class="text-blurple underline" target="_blank">get more shidcoin</NuxtLink>
								</div>

								<div v-if="user?.id === nft.owner_id">
									<h1 class="text-white font-semibold text-3xl mt-10">Owner Options</h1>
									<form @submit.prevent="saveOptions">
										<h1 class="text-white inline-block mr-2">For Sale</h1>
										<input type="checkbox" v-model="nft.sale" class="inline-block mt-3" id="saleInput" />
										<br />
										<input
											type="number"
											class="inline-block w-30"
											min="0"
											max="9999999"
											maxlength="7"
											:value="nft.price"
											id="priceInput"
										/>
										<h1 class="text-white inline-block ml-2">Price</h1>
										<br />

										<button
											type="submit"
											class="py-1 text-white font-medium text-lg hover:bg-newBlurple transition-all rounded-lg mt-2 px-4 bg-blurple"
											>Save</button
										>
									</form>
								</div>
							</div>
						</div>
					</div>
				</template>
				<template #fallback>
					<h1>Loading...</h1>
				</template>
			</Suspense>
		</div>
	</div>
</template>
