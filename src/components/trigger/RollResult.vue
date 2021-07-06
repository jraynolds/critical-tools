<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				v-bind="attrs"
				v-on="on"
				text
				min-width="0"
				class="px-2"
				style="font-size: 20px;"
				:color="dark ? 'accent' : 'primary'"
				@click="$emit('click')"
			>
				{{ drollObject.total }}
			</v-btn>
		</template>
		<div class="text-center">
			<span>{{ drollObject.statement }}</span>
			<br />
			<span>{{ drollObject.toString() }}</span>
		</div>
	</v-tooltip>
</template>

<script>
export default {
	props: [ "drollObject", "dark" ]
}
</script>

<style>

</style>