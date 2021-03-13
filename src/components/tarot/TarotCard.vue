<template>
	<v-container class="d-flex align-center justify-center">
		<VueFlip 
			:height="height + 'px'" 
			:width="width + 'px'" 
			active-click 
			:style="{width: `${width}px`}"
		>
			<template v-slot:front>
				<v-card 
					:height="height" 
					:width="width" 
					:style="{backgroundColor: edgeColor}"
					class="pa-2"
					dark
				>
					<v-col 
						cols="12"
						:style="{backgroundColor: backColor}"
						class="d-flex justify-center fill-height"
					>
						<v-card-title>
							{{ cardBackTitle }}
						</v-card-title>
					</v-col>
				</v-card>
			</template>
			<template v-slot:back>
				<v-card 
					:height="height" 
					:width="width" 
					:style="{backgroundColor: edgeColor}" 
					class="pa-2"
					dark
				>
					<v-col 
						cols="12" 
						class="fill-height d-flex flex-column"
						:style="{backgroundColor: backColor}"
					>
						<v-row class="justify-center">
							<v-col 
								cols="4" 
								v-for="i in iconNumber" 
								:key="i"
								class="d-flex align-middle justify-center"
							>
								<v-icon x-large>
									{{ icon }}
								</v-icon>
							</v-col>
						</v-row>
						<v-card dark :style="{backgroundColor: textBackColor}">
							<v-card-title style="font-style: italic;">
								{{ title }}
							</v-card-title>
							<v-card-text class="ml-3">
								{{ description }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-card>
			</template>
		</VueFlip>
	</v-container>
</template>

<script>
import VueFlip from "vue-flip"

export default {
	props: [
		"card",
		"arcana"
	],
	components: {
		VueFlip
	},
	data: () => ({
		height: 500,
		width: 350,
		edgeColor: "silver",
		backColor: "#152736",
		textBackColor: "#0e1a24",
		numberToWord: {
			1: "Ace",
			2: "Two",
			3: "Three",
			4: "Four",
			5: "Five",
			6: "Six",
			7: "Seven",
			8: "Eight",
			9: "Nine",
			10: "Ten",
			11: "Page",
			12: "Knight",
			13: "Queen",
			14: "King"
		},
		suitToIcon: {
			swords: "mdi-sword",
			cups: "mdi-glass-cocktail",
			pentacles: "mdi-star-circle",
			wands: "mdi-pencil",
		}
	}),
	computed: {
		cardBackTitle() {
			if (this.arcana == "major") return "ARCHETYPE";
			return "PATTERN";
		},
		title() {
			if (this.card.title) return this.card.title;

			let word = this.numberToWord[this.card.number];
			return `${word} of ${this.card.suit}`
		},
		description() {
			if (this.arcana == "major") return this.card.description + "...";
			return "..." + this.card.description;
		},
		icon() {
			if (this.card.icon) return this.card.icon;

			return this.suitToIcon[this.card.suit];
		},
		iconNumber() {
			if (this.arcana == "minor") return this.card.number;
			return 1; 
		}
	}
}
</script>

<style>

</style>