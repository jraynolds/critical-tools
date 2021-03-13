<template>
	<v-container class="fill-height d-flex justify-space-between">
		<v-row class="text-center">
			<v-col cols="6" class="d-flex justify-center align-center">
				<TarotCard 
					:card="major" 
					arcana="major" 
				/>
			</v-col>
			<v-col cols="6">
				<TarotCard 
					:card="minor" 
					arcana="minor" 
				/>
			</v-col>
		</v-row>
		<v-row class="justify-center" >
			<v-col cols="8">
				<v-btn 
					color="primary" 
					large 
					style="font-size: large; width: 100%;"
					@click="redraw()"
				>
					<v-icon large left>mdi-refresh</v-icon>
					Refresh
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import TarotCard from "@/components/tarot/TarotCard.vue"

export default {
	components: {
		TarotCard
	},
	data: () => ({
		cards: require("@/assets/tarot/cards.json"),
		major: null,
		minor: null
	}),
	methods: {
		getRandomCard(arcana) {
			return this.cards[arcana][
				Math.floor(Math.random() * this.cards[arcana].length)
			]
		},
		redraw() {
			this.minor = this.getRandomCard("minor");
			this.major = this.getRandomCard("major");
		}
	},
	beforeMount() {
		this.redraw();
	}
}
</script>

<style>

</style>