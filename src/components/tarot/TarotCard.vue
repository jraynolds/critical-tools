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
							{{ cardBack }}
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
						<v-row 
							class="justify-center" 
							:style="isReversed ? { transform: 'rotate(180deg)' } : {}"
						>
							<v-col 
								cols="4" 
								v-for="i in iconNumber" 
								:key="i"
								class="d-flex align-middle justify-center"
								:style="isMajorArcana ? { transform: 'scale(3)' } : {}"
							>
								<v-icon x-large>
									{{ icon }}
								</v-icon>
							</v-col>
						</v-row>
						<v-card dark :style="{backgroundColor: textBackColor}">
							<v-card-title style="font-style: italic; word-break: break-word;">
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
		"arcana",
		"cardBack",
		"prepend",
		"append",
		"reversible",
		"small"
	],
	components: {
		VueFlip
	},
	data: () => ({
		heights: [ 500, 450 ],
		widths: [ 350, 300 ],
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
		},
		majorToIcon: {
			"The Fool": "mdi-emoticon-excited",
			"The Magician": "mdi-auto-fix",
			"The High Priestess": "mdi-snake",
			"The Empress": "mdi-mother-heart",
			"The Emperor": "mdi-human-male",
			"The Hierophant": "mdi-book-cross",
			"The Lovers": "mdi-human-male-female",
			"The Chariot": "mdi-horse-human",
			"Strength": "mdi-weight-lifter",
			"The Hermit": "mdi-school",
			"Wheel of Fortune": "mdi-ship-wheel",
			"Justice": "mdi-scale-balance",
			"The Hanged Man": "mdi-lasso",
			"Death": "mdi-skull",
			"Temperance": "mdi-yin-yang",
			"The Devil": "mdi-emoticon-devil",
			"The Tower": "mdi-chess-rook",
			"The Star": "mdi-star-shooting",
			"The Moon": "mdi-weather-night",
			"The Sun": "mdi-white-balance-sunny",
			"Judgment": "mdi-gavel",
			"The World": "mdi-earth"
		},
		random: 0
	}),
	watch: {
		card() {
			this.random = Math.random();
		}
	},
	computed: {
		isMajorArcana() {
			return this.card.title;
		},
		title() {
			let s = this.card.title;
			if (!s) s = `${this.numberToWord[this.card.number]} of ${this.card.suit}`;
			if (this.isReversed) s += " (Reversed)"

			return s;
		},
		height() {
			if (this.small) return this.heights[1];
			return this.heights[0];
		},
		width() {
			if (this.small) return this.widths[1];
			return this.widths[0];
		},
		isReversed() {
			if (!this.reversible) return false;
			return this.random >= .5;
		},
		description() {
			let s = this.card.description;
			if (!s && !this.isReversed) s = this.card.temperaments.join(", ");
			if (!s && this.isReversed) s = this.card.reversedTemperaments.join(", ");

			if (this.prepend) s = this.prepend + s;
			if (this.append) s = s + this.append;
			
			return s;
		},
		icon() {
			if (this.card.title) return this.majorToIcon[this.card.title];
			return this.suitToIcon[this.card.suit];
		},
		iconNumber() {
			if (this.card.title) return 1; 
			return this.card.number;
		}
	}
}
</script>

<style>

</style>