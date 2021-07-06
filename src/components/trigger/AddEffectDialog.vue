<template>
	<v-dialog
		v-model="computedDialog"
		width="500"
	>
		<v-card>
			<v-card-title class="text-h5 mb-4 header grey lighten-2">
				Add an Effect
			</v-card-title>

			<v-card-subtitle class="ml-n2 mt-n2 mb-n4">
				Fill out the following form to add a new effect.
			</v-card-subtitle>

			<v-row class="ma-0">

				<v-col cols="8">
					<v-text-field 
						v-model="effect.title" 
						label="What's this effect called?" 
					/>
				</v-col>
					
				<v-col cols="4">
					<v-select 
						v-model="effect.limit" 
						:items="limits" 
						label="Only happens X times." 
					/>
				</v-col>

				<v-col cols="12">
					<v-autocomplete
						v-model="effect.triggers"
						:items="triggerTypes"
						item-text="title"
						label="What events trigger this to happen?"
						multiple
					/>
				</v-col>

				<v-col cols="12">
					<v-text-field 
						v-model="effect.condition" 
						name="false"
						label="Any restrictions we should look out for?" 
					/>
				</v-col>

				<v-col cols="12" class="mb-n4">
					<v-combobox
						v-model="effect.characters" 
						:items="characters"
						item-text="name"
						label="Does this only affect some people?" 
						multiple
					/>
				</v-col>

				<v-col cols="12" class="mb-n4">
					<v-textarea 
						rows="2" 
						v-model="effect.result" 
						label="What happens?" 
					/>
				</v-col>
				
				<v-col cols="12" class="ml-n2 mt-n12">
					<v-card-subtitle style="font-size: x-small;">
						Feel free to insert rolls like "12d6" and "18d4+1"!
					</v-card-subtitle>
				</v-col>
			</v-row>

			<v-divider></v-divider>

			<v-card-actions>
				<v-btn text @click="fillWithExample">Fill with examples</v-btn>

				<v-spacer />

				<v-btn
					color="primary"
					@click="saveEffect"
					:disabled="!effect.result || effect.triggers.length < 1"
				>
					Add This Effect
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
const DEFAULT_EFFECT = {
	triggers: [],
	title: "",
	condition: "",
	result: "",
	source: "",
	limit: 1,
	characters: []
}

const DEFAULT_CHARACTER = {
	name: "Bob",
	icon: "mdi-chess-queen",
	color: "purple"
}

const EXAMPLE_EFFECT = {
	triggers: [ "round start", "turn start" ],
	title: "Burning Sands",
	condition: "the players have been on the beach for at least 1 round",
	result: "takes 2d6+1 damage, then 1d2 more",
	source: "Fiery Sands",
	limit: 4,
	characters: [ "Bob" ]
}

export default {
	props: [ "dialog", "characters", "triggerTypes", "defaultTrigger" ],
	data: () => ({
		effect: {
			...DEFAULT_EFFECT
		},
		limits: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, "unlimited" ],
	}),
	watch: {
		defaultTrigger(val) {
			this.effect.triggers = [ val ];
		}
	},
	computed: {
		computedDialog: {
			get() { return this.dialog },
			set(val) { this.$emit('update:dialog', val) }
		}
	},
	methods: {
		saveEffect() {
			for (let i=0; i<this.effect.characters.length; i++) {
				let character = this.effect.characters[i];
				if (typeof character != 'string') continue;
				let newCharacter = { ...DEFAULT_CHARACTER, ...{ name: character } };
				this.effect.characters[i] = newCharacter;
			}
			this.$emit('addEffect', this.effect);
			this.resetEffect();
		},
		fillWithExample() {
			this.effect = { ...this.effect, ...EXAMPLE_EFFECT };
		},
		resetEffect() {
			this.effect = { ...DEFAULT_EFFECT };
		}
	}
}
</script>

<style>

</style>