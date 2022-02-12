<script setup lang="ts">
import { User } from '~/typings';
const route = useRoute();

const user: User = await $fetch('/api/user/nfts', { params: { id: route.params.id } });
</script>
<template>
	<div>
		<Navbar />
		<div class="md:mx-5 mx-auto">
			<h1 class="text-7xl mx-auto text-center font-bold text-white mt-20 mb-10">{{ user.username }}#{{ user.discriminator }}'s nfts</h1>
			<div class="text-white text-center mb-10 text-2xl font-medium">has {{ user.balance }} pepeggcoin</div>
			<div class="flex flex-row flex-wrap mx-auto justify-center">
				<div v-for="nft in user.nfts" class="mx-4 h-106 mt-none mb-6">
					<div class="mt-none group hover:pt-6 transition-all">
						<Nft :nft="nft" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
