<template>
	<v-card :color="color" class="mt-2">
		<v-card-title class="d-flex">

			<ColorPicker :color.sync="color"/>

			<span class="ml-2">{{ effect.title }}</span>
		</v-card-title>

		<v-row class="mb-0">
			<v-col class="justify-end">

				<v-card-text v-if="effect.condition" class="pt-0 pb-0">
					IF {{ effect.condition }}...
				</v-card-text>

				<v-card-text class="d-flex align-center pt-0 pb-0">
					... 
					<span v-for="(piece, index) of resultPieces" :key="index">

						<span 
							v-if="typeof piece == 'string' && true" 
							style="width: 100%;"
						>
							{{ piece }}
						</span>

						<v-tooltip bottom v-else>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									text
									min-width="0"
									class="px-2"
									style="font-size: 20px;"
									color="primary"
									@click="rollResults"
								>
									{{ piece.total }}
								</v-btn>
							</template>
							<div class="text-center">
								<span>{{ piece.statement }}</span>
								<br />
								<span>{{ piece.toString() }}</span>
							</div>
						</v-tooltip>
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
	props: [ "effect" ],
	components: {
		ColorPicker: () => import("@/components/trigger/ColorPicker.vue"),
	},
	data: () => ({
		limitsReduced: 0,
		resultPieces: [],
		color: '#D6EFFF'
	}),
	computed: {
		limit() {
			if (!this.effect.limit) return 1;
			return this.effect.limit - this.limitsReduced;
		},
		characters() {
			return this.effect.characters;
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