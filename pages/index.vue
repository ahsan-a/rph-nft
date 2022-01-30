<template>
	<div>
		<Navbar />
		<div class="flex flex-row justify-center">
			<div class="my-10 flex flex-col items-center">
				<h1 class="text-white font-bold text-6xl"> hello. trade nfts here </h1>
				<h1 class="text-white font-semibold text-xl mt-5"> cryptograficaly secured by the cockchain® </h1>
			</div>
		</div>
		<Suspense>
			<template #default>
				<div class="md:mx-5 mx-auto mt-2">
					<h1 class="font-semibold text-center mb-4 text-white text-2xl">unowned</h1>
					<div class="flex flex-row flex-wrap mx-auto justify-center">
						<div v-for="nft in nfts.orphan" class="mx-4 h-106 mt-none mb-6">
							<div class="mt-none group hover:pt-6 transition-all">
								<Nft :nft="nft" />
							</div>
						</div>
					</div>
				</div>
			</template>
			<template #fallback>loading...</template>
		</Suspense>
	</div>
</template>

<script setup lang="ts">
import { HomeNfts } from '~/typings';

useMeta({
	title: 'home | r/ph nft',
});

const nfts: HomeNfts = await $fetch('/api/nft/getHomepage');
</script>

<style>
html {
	background-color: #23272a;
	font-family: 'Comic Sans MS';
}
</style>
