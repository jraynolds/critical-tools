<template>
	<v-dialog
		v-model="dialog"
		width="225"
		hide-overlay
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				:color="computedColor"
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

		<Chrome v-model="computedColor" />
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
		computedColor: {
			get() {
				return this.color;
			},
			set(val) {
				this.$emit('update:color', val);
			}
		}
	}
}
</script>

<style>

</style>