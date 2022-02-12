<script setup lang="ts">
import { discordLogin } from '~/composables/discord';
import { Ref } from 'vue';

const user = await getUser();
const hourly = new Date(user.hourly_claim);
const daily = new Date(user.daily_claim);
const weekly = new Date(user.weekly_claim);

const now: Ref<Date> = ref(new Date());
setInterval(() => (now.value = new Date()), 1000);

async function claimCoin(claimType: number) {
	await $fetch('/api/user/claim', {
		params: {
			claimType: claimType.toString(),
		},
	}).catch(console.log);

	window.location.reload();
}

useMeta({
	title: `pepeggcoin | r/ph nft`,
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
			content: 'pepeggcoin | r/ph nft',
		},
		{
			property: 'og:description',
			content: `buy pepeggcoin on r/ph nft`,
		},
	],
});
</script>

<template>
	<div>
		<Navbar />

		<div class="p-10 mx-auto w-full xl:w-2/3 mt-6 text-white" v-if="user">
			<h1 class="text-7xl mx-auto text-center font-bold">pepeggcoin hub</h1>
			<h1 class="text-3xl mx-auto text-center font-bold mt-5 mb-10">you have {{ user.balance }} pepeggcoin in your account</h1>

			<div class="bg-lightbg p-5 rounded-4xl shadow-lg mt-3 w-full md:w-3/4 mx-auto grid grid-cols-3 grid-rows-1">
				<div class="col-span-1 flex flex-col justify-center mx-3">
					<h1 class="font-semibold text-4xl text-center">hourly +5</h1>
					<div class="text-lg font-medium my-5">
						{{
							now.getTime() < hourly.getTime()
								? `claim in ${Math.floor((hourly.getTime() - now.getTime()) / 1000)} seconds`
								: 'claim now!!11!'
						}}
					</div>
					<button
						:disabled="now.getTime() < hourly.getTime()"
						class="py-2 text-white font-bold text-xl hover:bg-newBlurple transition-all rounded-lg mt-2 px-4 bg-blurple disabled:bg-newBlurple disabled:hover:cursor-not-allowed"
						@click="claimCoin(0)"
						>claim</button
					>
				</div>
				<div class="col-span-1 flex flex-col justify-center mx-3">
					<h1 class="font-semibold text-4xl text-center">daily +20</h1>
					<div class="text-lg font-medium my-5">
						{{
							now.getTime() < daily.getTime()
								? `claim in ${Math.floor((daily.getTime() - now.getTime()) / 1000)} seconds`
								: 'claim now!!11!'
						}}
					</div>
					<button
						:disabled="now.getTime() < daily.getTime()"
						class="py-2 text-white font-bold text-xl hover:bg-newBlurple transition-all rounded-lg mt-2 px-4 bg-blurple disabled:bg-newBlurple disabled:hover:cursor-not-allowed"
						@click="claimCoin(1)"
						>claim</button
					>
				</div>
				<div class="col-span-1 flex flex-col justify-center mx-3">
					<h1 class="font-semibold text-4xl text-center">weekly +100</h1>
					<div class="text-lg font-medium my-5">
						{{
							now.getTime() < weekly.getTime()
								? `claim in ${Math.floor((weekly.getTime() - now.getTime()) / 1000)} seconds`
								: 'claim now!!11!'
						}}
					</div>
					<button
						:disabled="now.getTime() < weekly.getTime()"
						class="py-2 text-white font-bold text-xl hover:bg-newBlurple transition-all rounded-lg mt-2 px-4 bg-blurple disabled:bg-newBlurple disabled:hover:cursor-not-allowed"
						@click="claimCoin(2)"
						>claim</button
					>
				</div>
			</div>
		</div>
		<div class="p-10 mx-auto w-full xl:w-2/3 mt-6 text-white" v-else>
			<button class="text-7xl mx-auto text-center font-bold text-blurple underline" @click="discordLogin"
				>You must be logged in to use this page.</button
			>
		</div>
	</div>
</template>
