<template>
	<v-card :color="computedColor" class="mt-2" :dark="isDark">
		<v-card-title class="d-flex">

			<ColorPicker :color.sync="computedColor"/>

			<span class="ml-2">{{ effect.title }}</span>

			<v-spacer />

			<v-btn icon @click="$emit('delete')" class="mr-n4 mt-n8">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-card-title>

		<v-row class="mb-0">
			<v-col class="justify-end">

				<v-card-text v-if="effect.condition" class="pt-0 pb-0">
					IF {{ effect.condition }}...
				</v-card-text>

				<v-card-text class="d-flex align-center pt-0 pb-0">
					<CharacterPicker 
						v-for="character of effect.characters"
						:key="character.name"
						:character="character"
						:color.sync="character.color"
					/>

					... 
					<span v-for="(piece, index) of resultPieces" :key="index">

						<span 
							v-if="typeof piece == 'string' && true" 
							style="width: 100%;"
						>
							{{ piece }}
						</span>

						<RollResult 
							v-else 
							:drollObject="piece" 
							@click="rollResults"
							:dark="isDark" 
						/>
					</span>
				</v-card-text>

				<v-card-subtitle v-if="effect.source">
					From {{ effect.source }}
				</v-card-subtitle>

			</v-col>
			<v-col 
				class="d-flex flex-grow-0 align-end justify-end" 
				style="min-width: 200px; width: 200px;"
			>
				<div v-if="effect.limit">
					<v-btn icon @click="limitsReduced++">
						<v-icon>mdi-minus</v-icon>
					</v-btn>
					<v-chip color="red">{{ limit }}</v-chip>
					<v-btn icon @click="limitsReduced--">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</div>
			</v-col>
		</v-row>

	</v-card>
</template>

<script>
import { roll } from "droll"

export default {
	props: [ "effect", "color" ],
	components: {
		ColorPicker: () => import("@/components/trigger/ColorPicker.vue"),
		CharacterPicker: () => import("@/components/trigger/CharacterPicker.vue"),
		RollResult: () => import("@/components/trigger/RollResult.vue"),
	},
	data: () => ({
		limitsReduced: 0,
		resultPieces: [],
		isDark: false
	}),
	computed: {
		limit() {
			if (!this.effect.limit) return 1;
			let result = this.effect.limit - this.limitsReduced;
			if (result <= 0) this.$emit('delete');
			return result;
		},
		characters() {
			return this.effect.characters;
		},
		computedColor: {
			get() { return this.effect.color },
			set(val) {
				this.isDark = val.hsl.l < .5; 
				this.$emit('update:color', val.hex) 
			}
		}
	},
	methods: {
		rollResults() {
			let regex = /(\d+d\d+[+-]*\d*)/
			let results = [];
			let result = this.effect.result + "";

			while(result.match(regex)) {
				let match = result.match(regex);
				results.push(result.split(match[0])[0]);
				let droll = roll(match[0]);
				droll.statement = match[0];
				results.push(droll);
				result = result.split(match[0])[1];
			}

			results.push(result);
			this.resultPieces = results;
		},
	},
	mounted() {
		this.rollResults();
	}
}
</script>

<style>

</style>