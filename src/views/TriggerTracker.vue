<template>
	<v-container>
		<v-dialog
      v-model="addDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 mb-4 header grey lighten-2">
          Add Trigger
        </v-card-title>

				<v-row class="ma-0">
					<v-col cols="12">
						<v-autocomplete
							v-model="addEffects"
							:items="triggerTypes"
							item-text="title"
							label="Trigger(s)"
							multiple
						/>
					</v-col>

					<v-col cols="8">
						<v-text-field v-model="addTitle" label="Title" />
					</v-col>
						
					<v-col cols="4">
						<v-select 
							v-model="addLimit" 
							:items="addLimits" 
							label="Limit" 
						/>
					</v-col>

					<v-col cols="12">
						<v-textarea 
							rows="3" 
							v-model="addEffect" 
							label="Effect" 
						/>
					</v-col>
				</v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addEffect"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

		<v-row class="mb-2">
			<v-col cols="8">
				<v-btn color="blue" style="width: 100%;">Add a Trigger</v-btn>
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
				:effects="userEffects.filter(t => t.triggers.includes(triggerType.title))"
				:disabled="!userEffects.filter(t => t.triggers.includes(triggerType.title)).length"
			/>
			<!-- <v-expansion-panel 
				v-for="triggerType of triggerTypes" 
				:key="triggerType.title"
			>
				<v-expansion-panel-header>
					<v-btn 
						icon 
						class="flex-grow-0" 
						@click.stop="addDialog = true; addEffects = [ triggerType ];"
					>
						<v-icon>mdi-plus-box</v-icon>
					</v-btn>
					{{ triggerType.title.toUpperCase() }}
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-card 
						v-for="trigger of userEffects.filter(t => t.triggers.includes(triggerType.title))" 
						:key="trigger.title"
					>
						<v-card-title>{{ trigger.title }}</v-card-title>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel> -->
		</v-expansion-panels>
	</v-container>
</template>

<script>
const DEFAULT_EFFECT = {
	addEffects: [],
	addTitle: "",
	addCondition: "",
	addEffect: "",
	addSource: "",
	addALimit: false,
	addLimit: 1,
	addCharacters: []
}

const DEFAULT_EFFECTS = [
	{
		triggers: [ "round start", "turn start" ],
		title: "Crab Spawner",
		condition: "there are fewer than 3 crabs",
		result: "spawn 2d4+1 crabs.",
	},
	{
		triggers: [ "turn start" ],
		title: "Healing Salve",
		result: "heals for 1d6 at the beginning of his turn.",
		limit: 3,
		characters: [ "Ben" ]
	},
	{
		triggers: [ "round end" ],
		title: "Burning Sands",
		result: "heals for 8 at the beginning of his turn.",
		characters: [ "Ben" ]
	}
]

export default {
	components: {
		TriggerExpand: () => import("@/components/trigger/TriggerExpand.vue"),
	},
	data: () => ({
		...DEFAULT_EFFECT,

		addDialog: false,
		addLimits: [
			1, 2, 3, 4, 5, 6, 7, 8, 9
		],
	
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
		userEffects: []
	}),
	methods: {
		resetAddition() {
			for (let key in DEFAULT_EFFECT) this[key] = DEFAULT_EFFECT[key];
		},
		addUserEffect() {
			let effect = {
				// triggers: [ triggerType.title ],
				title: this.addTitle,
				effect: this.addEffect,
				limit: this.addLimit
			}
			this.userEffects.push(effect);
		},
		addExamples() {
			for (let effect of DEFAULT_EFFECTS) {
				this.userEffects.push(effect);
			}
		}
	}
}
</script>

<style>

</style>