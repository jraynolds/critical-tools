<template>
	<v-expansion-panel :readonly="disabled">
		<v-expansion-panel-header :expand-icon="disabled ? '' : 'mdi-menu-down'">
			<v-btn 
				icon 
				class="flex-grow-0" 
				@click="$emit('addTrigger')"
			>
				<v-icon>mdi-plus-box</v-icon>
			</v-btn>
			<span :style="disabled ? { color: 'rgba(0, 0, 0, .5)' } : ''">
				{{ title.toUpperCase() }}
			</span>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<Effect 
				v-for="effect of effects" 
				:key="effect.title"
				:effect="effect"
				@removeEffect="$emit('removeEffect', effect)"
			/>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
export default {
	props: [ "title", "effects", "disabled" ],
	components: {
		Effect: () => import("@/components/trigger/Effect.vue"),
	},
}
</script>

<style>

</style>