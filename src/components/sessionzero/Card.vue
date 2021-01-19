<template>
	<v-card min-height="290" class="d-flex flex-column justify-space-between">
		<v-card-title class="pb-0">{{ card.title }}</v-card-title>
		<v-row class="ma-0 d-flex flex-column">
			<v-col class="px-0">
				<v-card-subtitle class="pt-0">{{ card.subtitle }}</v-card-subtitle>
			</v-col>
			<v-col class="mb-0 pb-0 d-flex align-start" :class="[card.dragIcons ? 'pt-6' : '']">
				<v-slider
					:thumb-size="34"
					:thumb-label="card.dragIcons ? 'always' : false"
					:min="0"
					:max="max"
					:track-color="lineColor"
					:thumb-color="dotColor"
					:track-fill-color="filledLineColor"
					v-model="value"
					@change="changed = true; $emit('changed')"
					ticks
					:tick-size="4"
				>
					<template v-slot:prepend>
						<v-btn icon @click="value -= 1; changed = true" class="mt-n2">
							<v-icon :color="prependIconColor">
								{{ card.icons[0] }}
							</v-icon>
						</v-btn>
					</template>
					<template v-slot:append>
						<v-btn icon @click="value += 1; changed = true" class="mt-n2">
							<v-icon
								:color="appendIconColor"
							>
								{{ card.icons[1] }}
							</v-icon>
						</v-btn>
					</template>
					<!-- <template v-slot:thumb-label="value">
						{{ value }}
					</template> -->
				</v-slider>
			</v-col>
			<v-col>
				<v-card-text 
					class="pt-0 px-0 text-center" 
					v-if="card.descriptions" 
					style="font-style: italic;"
				>
					{{ card.descriptions[value] }}
				</v-card-text>
			</v-col>
			<v-row v-if="card.toggles" class="ma-0">
				<v-col cols="6" v-for="toggle in card.toggles" :key="toggle.title">
					<v-btn 
						style="width: 100%;"
						:color="toggle.clicked ? card.onColor : card.offColor"
						@click="toggle.clicked = !toggle.clicked; $emit('changed')"
						small
					>
						<v-icon left>
							{{ toggle.icon }}
						</v-icon>
						{{ toggle.title }}
					</v-btn>
				</v-col>
			</v-row>
		</v-row>
	</v-card>
</template>

<script>
export default {
	props: [ 
		"card",
		"changedColor"
	],
	data: () => ({
		value: 2,
		changed: false
	}),
	computed: {
		max() {
			if ("max" in this.card) return this.card.max;
			return 4;
		},
		dotColor() {
			let color = "hsl(0, 0%, 50%)";
			if (this.changed) color = this.changedColor;
			return color;
		},
		filledLineColor() {
			let color = "hsl(0, 0%, 50%)";
			if (this.changed) color = this.changedColor;
			return color;
		},
		lineColor() {
			let color = "hsl(0, 0%, 50%, .5)";
			if (this.changed) color = this.changedColor;
			return color.split(".")[0] + ".5)";
		},
		prependIconColor() {
			let opacity = 1 - 1 * ((this.value) / (this.max + 1));
			let color = "hsl(0, 0%, 50%)";
			if (this.changed) color = this.changedColor;
			return this.arrayToHSLA(this.hslToArray(color), opacity);
		},
		appendIconColor() {
			let opacity = 1 * ((this.value + 1) / (this.max + 1));
			let color = "hsl(0, 0%, 50%)";
			if (this.changed) color = this.changedColor;
			return this.arrayToHSLA(this.hslToArray(color), opacity)
		},
		color() {
			let color1 = this.hslToArray(this.card.colors[0]);
			let color2 = this.hslToArray(this.card.colors[1]);
			let differences = [
				color2[0] - color1[0],
				color2[1] - color1[1],
				color2[2] - color1[2]
			]
			let steps = [
				differences[0] / this.max,
				differences[1] / this.max,
				differences[2] / this.max
			]
			return [
				Number(color1[0]) + Number(steps[0] * this.value),
				Number(color1[1]) + Number(steps[1] * this.value),
				Number(color1[2]) + Number(steps[2] * this.value),
			];
		}
	},
	methods: {
		hslToArray(color) {
			return color
				.replace("hsl(", "")
				.replaceAll("%", "")
				.replace(")", "")
				.split(", ")
		},
		arrayToHSLA(array, opacity=1) {
			return `hsl(${array[0]}, ${array[1]}%, ${array[2]}%, ${opacity})`;
		}
	},
	watch: {
		value(v) {
			this.changed = true;
			this.card.value = v;
		}
	},
	beforeMount() {
		this.value = this.card.value;
	}
}
</script>

<style>

</style>