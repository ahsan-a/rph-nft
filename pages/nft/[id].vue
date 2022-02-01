<script setup lang="ts">
import { Nft } from '~/typings';
import { ref } from 'vue';

const route = useRoute();
const { SUPABASE_URL } = useRuntimeConfig();

const nft: Nft = await $fetch('/api/nft/get', { params: { id: route.params.id } });
console.log(nft);

const date = new Date(nft.created_at);
const timeAgo = useTimeAgo(date);
const token = useCookie('discord_token').value;

const loading = ref(false);

const canTrade: { canTrade: boolean; text: string } = token
	? await $fetch('/api/nft/canTrade', { params: { id: nft.id, token } })
	: { canTrade: false, text: 'Sign in to trade' };

async function buyNft() {
	if (!token || !canTrade.canTrade) return;

	loading.value = true;
	await $fetch('/api/nft/buy', {
		params: { id: nft.id },
	});
	loading.value = false;
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
									<h1 class="font-semibold text-2xl"> {{ nft.price }} shitcoin </h1>
									<h2 class="text-sm"
										>{{
											date.toDateString() === new Date().toDateString() ? date.toLocaleTimeString() : date.toLocaleString()
										}}
										({{ timeAgo }})</h2
									>
								</div>
								<h2 class="mt-8 text-gray-200">{{ nft.description }}</h2>
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
									><img src="https://samherbert.net/svg-loaders/svg-loaders/three-dots.svg" alt="Loading..." class="mx-auto h-3"
								/></button>
								<a v-if="!canTrade.canTrade" href="https://discord.gg/rph" class="mt-4 text-blurple underline"
									>Join the r/PH discord server</a
								>
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
