<script setup lang="ts">
import { Nft } from '~/typings';
const props = defineProps<{
	nft: Nft;
}>();

const { SUPABASE_URL } = useRuntimeConfig();

const date = new Date(props.nft.created_at);
const timeAgo = useTimeAgo(date);
</script>

<template>
	<NuxtLink
		class="bg-lightbg w-68 h-100 my-4 shadow-lg pt-7 px-6 pb-2 rounded-5xl border-2 border-midbg flex flex-col transition-all group-hover:bg-lighterbg"
		:to="`/nft/${nft.id}`"
	>
		<img :src="`${SUPABASE_URL}/storage/v1/object/public/nfts/${nft.id}`" class="h-45 w-45 self-center rounded-4xl object-cover" />
		<h1 class="text-white font-bold text-2xl mt-2">{{ nft.name }}</h1>
		<h1 class="text-white text-sm font-semibold">{{ nft.price }} pepeggcoin</h1>
		<h2 class="text-light-400 mt-1 max-h-min overflow-hidden">{{ nft.description }}</h2>

		<div class="justify-self-end mt-auto text-xs text-center text-gray-300"
			>{{ date.toDateString() === new Date().toDateString() ? date.toLocaleTimeString() : date.toLocaleDateString() }} ({{ timeAgo }})</div
		>
	</NuxtLink>
</template>
