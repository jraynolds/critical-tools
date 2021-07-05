<template>
	<v-dialog
		v-model="dialog"
		width="225"
		hide-overlay
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				:color="userColor"
				v-bind="attrs"
				v-on="on"
				width="10"
				min-width="10"
			>
				<v-icon>
					mdi-palette
				</v-icon>
			</v-btn>
		</template>

		<Chrome v-model="userColor" />
	</v-dialog>
</template>

<script>
import { Chrome } from "vue-color"

export default {
	props: [ "color" ],
	components: {
		Chrome
	},
	data: () => ({
		dialog: false
	}),
	computed: {
		userColor: {
			get() {
				return this.color;
			},
			set(val) {
				console.log(val);
				this.$emit('update:color', val.hex);
			}
		}
	}
}
</script>

<style>

</style>