<template>
	<v-container>
		<AddEffectDialog 
			:dialog.sync="addDialog" 
			:characters="userCharacters" 
			:triggerTypes="triggerTypes"
			@addEffect="addEffect"
			:defaultTrigger="addDefaultTrigger"
		/>

		<v-row class="mb-2">
			<v-col cols="8">
				<v-btn 
					color="blue" 
					style="width: 100%;"
					@click="addDialog = !addDialog"
				>
					Add a Trigger
				</v-btn>
			</v-col>
			
			<v-col cols="4">
				<v-btn @click="addExamples" color="yellow" style="width: 100%;">Add Examples</v-btn>
			</v-col>
		</v-row>

		<v-expansion-panels focusable multiple>
			<TriggerExpand 
				v-for="triggerType of triggerTypes"
				:key="triggerType.title"
				:title="triggerType.title"
				@removeEffect="removeEffect(...arguments, triggerType)"
				@addEffect="popupDialog(triggerType)"
				:effects="userEffects.filter(t => t.triggers.includes(triggerType.title))"
				:disabled="!userEffects.filter(t => t.triggers.includes(triggerType.title)).length"
			/>
		</v-expansion-panels>
	</v-container>
</template>

<script>
const DEFAULT_CHARACTERS = [
	{
		name: "Bob",
		icon: "mdi-user-account",
		color: "black"
	},
	{
		name: "Aerith",
		icon: "mdi-chess-queen",
		color: "purple"
	}
]

const DEFAULT_EFFECTS = [
	{
		triggers: [ "round start", "turn start" ],
		title: "Crab Spawner",
		condition: "there are fewer than 3 crabs",
		result: "spawn 2d4+1 crabs.",
		color: '#D6EFFF'
	},
	{
		triggers: [ "turn start" ],
		title: "Healing Salve",
		result: "heals for 1d6 at the beginning of their turn.",
		limit: 3,
		characters: [ 
			DEFAULT_CHARACTERS[0],
			DEFAULT_CHARACTERS[1]
		],
		color: '#D6EFFF'
	},
	{
		triggers: [ "round end" ],
		title: "Burning Sands",
		result: "Everyone takes 8 damage at the end of the round.",
		color: '#D6EFFF'
	}
]

export default {
	components: {
		TriggerExpand: () => import("@/components/trigger/TriggerExpand.vue"),
		AddEffectDialog: () => import("@/components/trigger/AddEffectDialog.vue"),
	},
	data: () => ({
		addDialog: false,
		addDefaultTrigger: null,
	
		triggerTypes: [
			{ title: "round start", description: null },
			{ title: "turn start", description: null },
			{ title: "your Movement", description: null },
			{ title: "your Action", description: null },
			{ title: "your Bonus Action", description: null },
			{ title: "damage dealt", description: null },
			{ title: "turn end", description: null },
			{ title: "your Reaction", description: null },
			{ title: "damage taken", description: null },
			{ title: "round end", description: null },
		],
		userEffects: [],
		userCharacters: []
	}),
	methods: {
		addEffect(effect) {
			this.userEffects.push(effect);
			if (effect.characters) {
				for (let character of effect.characters) {
					if (!this.userCharacters.includes(character)) {
						this.userCharacters.push(character);
					}
				}
			}
		},
		popupDialog(triggerType) {
			this.addDefaultTrigger = triggerType;
			this.addDialog = true;
		},
		removeEffect(effect, triggerType) {
			if (effect.triggers.length <= 1) {
				this.userEffects = this.userEffects.filter(e => e != effect);
			} else {
				effect.triggers = effect.triggers.filter(t => t != triggerType.title);
			}
		},
		addExamples() {
			for (let effect of DEFAULT_EFFECTS) {
				this.addEffect(effect);
			}
		}
	}
}
</script>

<style>

</style>