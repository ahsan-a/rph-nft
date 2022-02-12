<script setup lang="ts">
import { HomeNfts } from '~/typings';

useMeta({
	title: 'home | r/ph nft',
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/icons/rph.webp',
		},
	],
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			property: 'og:title',
			content: 'home | r/ph nft',
		},
		{
			property: 'og:description',
			content: 'buy and sell nfts here',
		},
		{
			property: 'og:image',
			content: 'https://rphnft.vercel.app/icons/rph.webp',
		},
	],
});

const nfts: HomeNfts = await $fetch('/api/nft/getHomepage');
</script>

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
				<div class="md:mx-5 mx-auto">
					<div v-if="nfts.user?.length" class="mt-8">
						<h1 class="font-semibold text-center mb-2 text-white text-2xl">your nfts</h1>
						<div class="flex flex-row flex-wrap mx-auto justify-center">
							<div v-for="nft in nfts.user" class="mx-4 h-106 mt-none mb-6">
								<div class="mt-none group hover:pt-6 transition-all">
									<Nft :nft="nft" />
								</div>
							</div>
						</div>
					</div>
					<div v-if="nfts.orphan.length" class="mt-8">
						<h1 class="font-semibold text-center mb-2 text-white text-2xl">unowned</h1>
						<div class="flex flex-row flex-wrap mx-auto justify-center">
							<div v-for="nft in nfts.orphan" class="mx-4 h-106 mt-none mb-6">
								<div class="mt-none group hover:pt-6 transition-all">
									<Nft :nft="nft" />
								</div>
							</div>
						</div>
					</div>
					<div v-if="nfts.sale.length" class="mt-8">
						<h1 class="font-semibold text-center mb-2 text-white text-2xl">on for sale</h1>
						<div class="flex flex-row flex-wrap mx-auto justify-center">
							<div v-for="nft in nfts.sale" class="mx-4 h-106 mt-none mb-6">
								<div class="mt-none group hover:pt-6 transition-all">
									<Nft :nft="nft" />
								</div>
							</div>
						</div>
					</div>
					<div v-if="nfts.other.length" class="mt-8">
						<h1 class="font-semibold text-center mb-2 text-white text-2xl">owned</h1>
						<div class="flex flex-row flex-wrap mx-auto justify-center">
							<div v-for="nft in nfts.other" class="mx-4 h-106 mt-none mb-6">
								<div class="mt-none group hover:pt-6 transition-all">
									<Nft :nft="nft" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template #fallback>loading...</template>
		</Suspense>
	</div>
</template>

<style>
html {
	background-color: #23272a;
	font-family: 'Comic Sans MS';
}

.comicSans {
	font-family: 'Comic Sans MS';
}
</style>
