<template>
	<v-container class="fill-height d-flex justify-space-between">
		<v-row class="text-center align-center justify-center">
			Archetype/Pattern
			<v-switch style="transform: scale(1.5);" v-model="mode" class="mx-8" />
			Archetype/Personality/Cycle
		</v-row>

		<v-col v-if="!mode">
			<v-row class="text-center">
				<v-col 
					cols="6" 
					class="d-flex justify-center align-center flex-column"
				>
					<TarotCard 
						:card="archetype" 
						arcana="major"
						cardBack="ARCHETYPE"
						append="..."
					/>
					<v-btn color="secondary" @click="redrawArchetype()">
						<v-icon>mdi-refresh</v-icon>
					</v-btn>
				</v-col>
				<v-col 
					cols="6" 
					class="d-flex justify-center align-center flex-column"
				>
					<TarotCard 
						:card="pattern" 
						arcana="minor"
						cardBack="PATTERN"
						prepend="..."
						append="."
					/>
					<v-btn color="secondary" @click="redrawPattern()">
						<v-icon>mdi-refresh</v-icon>
					</v-btn>
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
				<v-col 
					cols="4" 
					class="d-flex justify-center align-center flex-column"
				>
					<TarotCard 
						:card="archetype" 
						arcana="major"
						cardBack="ARCHETYPE"
						append="..."
						:small="true"
					/>
					<v-btn color="secondary" @click="redrawArchetype()">
						<v-icon>mdi-refresh</v-icon>
					</v-btn>
				</v-col>
				<v-col 
					cols="4" 
					class="d-flex justify-center align-center flex-column"
				>
					<TarotCard 
						:card="personality" 
						arcana="all"
						cardBack="PERSONALITY"
						prepend="..."
						append="..."
						:reversible="true"
						:small="true"
					/>
					<v-btn color="secondary" @click="redrawPersonality()">
						<v-icon>mdi-refresh</v-icon>
					</v-btn>
				</v-col>
				<v-col 
					cols="4" 
					class="d-flex justify-center align-center flex-column"
				>
					<TarotCard 
						:card="cycle" 
						arcana="all"
						cardBack="CYCLE"
						prepend="...Forever "
						append="."
						:small="true"
					/>
					<v-btn color="secondary" @click="redrawCycle()">
						<v-icon>mdi-refresh</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row class="justify-center mt-12">
				<v-col cols="8">
					<v-btn 
						color="primary" 
						large 
						style="font-size: large; width: 100%;"
						@click="redrawAll()"
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
		redrawAll() {
			this.redrawPattern();
			this.redrawArchetype();
			this.redrawPersonality();
			this.redrawCycle();
		},
		redrawPattern() { this.pattern = this.getRandomCard("minorPersonality") },
		redrawArchetype() { this.archetype = this.getRandomCard("majorArchetype") },
		redrawPersonality() { this.personality = this.getRandomCard("allPersonality") },
		redrawCycle() { this.cycle = this.getRandomCard("allCycle") },
	},
	beforeMount() {
		this.redrawAll();
	}
}
</script>

<style>

</style>