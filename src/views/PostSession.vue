<template>
	<v-container class="mt-4">
		<v-row class="d-flex justify-center">
			<v-card>
				<v-card-title v-if="isResponse" style="font-style: italic;">
					You're currently answering a poll request.
				</v-card-title>
				<v-card-title v-else style="font-style: italic;">
					You're currently making a poll.
				</v-card-title>
			</v-card>
		</v-row>
		<v-row class="ma-0 d-flex justify-center">
			<v-col cols="10">
				<v-row class="ma-0 justify-center d-flex flex-wrap">
					<v-col
						v-for="category in categories"
						:key="category.title"
						xl="4"
						lg="4"
						md="6"
						sm="10"
						xs="12"
						cols="12"
					>
						<v-card :color="category.color">
							<v-card-title>
								{{ category.title }}
							</v-card-title>
							<v-col
								v-for="card in category.cards"
								:key="card.title"
							>
								<Card
									:card="card"
									:compact="true"
									class="mb-2"
									:changedColor="category.cardColor"
									:checkbox="true"
									@changed="changeUrl(); hasChanged = true"
								/>
							</v-col>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-center mb-12">
			<v-col cols="6">
				<v-btn 
					v-if="isResponse"
					style="width: 100%; height: 50px;" 
					color="primary" 
					@click="submit()"
				>
					Submit
				</v-btn>
				<v-btn 
					v-else
					style="width: 100%; height: 50px;" 
					color="primary" 
					@click="save()"
				>
					Save & Share
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Card from "@/components/Card.vue"

export default {
	components: {
		Card
	},
	data: () => ({
		isResponse: false,
		categories: require("@/assets/postsession/cards.json")
	}),
	methods: {
		submit() {
			// todo
		},
		save() {
			// todo
		}
	},
	beforeMount() {
		let selections = "";
		if (this.$route.params.selections) selections = this.$route.params.selections;

		for (let category of this.categories) {
			for (let card of category.cards) {
				let value = 2;
				let selected = true;
				if (selections.length && !isNaN(selections.slice(0, 1))) {
					value = parseInt(selections.slice(0, 1));
					selections = selections.slice(1);
				}
				card.value = value;
				card.selected = selected;
				if ("toggles" in card) for (let toggle of card.toggles) {
					let clicked = false;
					if (selections.length) {
						let s = selections.slice(0, 1);
						selections = selections.slice(1);
						if (s == "t") clicked = true;
					}
					toggle.clicked = clicked;
				}
			}
		}
	},
}
</script>

<style>

</style>