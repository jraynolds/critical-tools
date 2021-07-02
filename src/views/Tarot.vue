<template>
	<v-container class="fill-height d-flex justify-space-between">
		<v-row class="text-center align-center justify-center">
			Archetype/Pattern
			<v-switch style="transform: scale(1.5);" v-model="mode" class="mx-8" />
			Archetype/Personality/Cycle
		</v-row>

		<v-col v-if="!mode">
			<v-row class="text-center">
				<v-col cols="6" class="d-flex justify-center align-center">
					<TarotCard 
						:card="archetype" 
						arcana="major"
						cardBack="ARCHETYPE"
						append="..."
					/>
				</v-col>
				<v-col cols="6">
					<TarotCard 
						:card="pattern" 
						arcana="minor"
						cardBack="PATTERN"
						prepend="..."
						append="."
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
		</v-col>

		<v-col v-else>
			<v-row class="text-center">
				<v-col cols="4" class="d-flex justify-center align-center">
					<TarotCard 
						:card="archetype" 
						arcana="major"
						cardBack="ARCHETYPE"
						append="..."
						:small="true"
					/>
				</v-col>
				<v-col cols="4">
					<TarotCard 
						:card="personality" 
						arcana="all"
						cardBack="PERSONALITY"
						prepend="..."
						append="..."
						:reversible="true"
						:small="true"
					/>
				</v-col>
				<v-col cols="4">
					<TarotCard 
						:card="cycle" 
						arcana="all"
						cardBack="CYCLE"
						prepend="...Forever "
						append="."
						:small="true"
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
		</v-col>

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
		archetype: null,
		pattern: null,

		personality: null,
		cycle: null,

		mode: false
	}),
	methods: {
		getRandomCard(arcana) {
			return this.cards[arcana][
				Math.floor(Math.random() * this.cards[arcana].length)
			]
		},
		redraw() {
			this.pattern = this.getRandomCard("minorPersonality");

			this.archetype = this.getRandomCard("majorArchetype");

			this.personality = this.getRandomCard("allPersonality");
			this.cycle = this.getRandomCard("allCycle");
		}
	},
	beforeMount() {
		this.redraw();
	}
}
</script>

<style>

</style>