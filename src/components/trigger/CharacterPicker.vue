<template>
	<v-dialog 
		v-model="dialog"
		width="225"
		hide-overlay
	>
		<template #activator="{ on: dialog }">
			<v-tooltip bottom>
				<template #activator="{ on: tooltip }">
					<v-btn
						:color="computedColor"
						v-bind="attrs"
						v-on="{ ...tooltip, ...dialog }"
						fab
						width="25"
						max-width="25"
						height="25"
						max-height="25"
						depressed
						dark
						class="mr-2"
					>
						<v-icon small>
							mdi-account
						</v-icon>
					</v-btn>
				</template>
				<span>{{ character.name }}</span>
			</v-tooltip>
		</template>

		<Chrome v-model="computedColor" />
	</v-dialog>
</template>

<script>
import { Chrome } from "vue-color"

export default {
	props: [ "character", "color" ],
	components: {
		Chrome
	},
	data: () => ({
		dialog: false
	}),
	watch: {
		async dialog(val) {
			if (!val) {
				await new Promise(r => setTimeout(r, 100));
				document.activeElement.blur();
			}
		}
	},
	computed: {
		computedColor: {
			get() {
				return this.color;
			},
			set(val) {
				let hslString = this.colorObjToHSLA(val);
				this.$emit('update:color', hslString);
			}
		}
	},
	methods: {
		colorObjToHSLA(color) {
			return `hsla(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%, ${color.hsl.a})`
		}
	}
}
</script>

<style>

</style>