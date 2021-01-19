<template>
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
								class="mb-2"
								:changedColor="category.cardColor"
								@changed="changeUrl()"
							/>
						</v-col>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import Card from "@/components/sessionzero/Card.vue"
import categories from "@/assets/sessionzero/cards.json"

export default {
  name: 'App',
  components: {
		Card
  },
  data: () => ({
		categories: categories,
		responses: null
	}),
	computed: {
		// url() {
		// 	let url = "";
		// 	for (let category of this.categories) {
		// 		for (let card of category.cards) {
		// 			url += card.value;
		// 			if ("toggles" in card) for (let toggle of card.toggles) {
		// 				if (toggle.clicked == false) url += "f";
		// 				else url += "t";
		// 			}
		// 		}
		// 	}
		// 	return url;
		// }
	},
	methods: {
		changeUrl() {
			let url = "/session-zero/" + this.getUrl();
			console.log(url);
			console.log(this.$route.path);
			if (url != this.$route.path) this.$router.push(url);
		},
		getUrl() {
			let url = "";
			for (let category of this.categories) {
				for (let card of category.cards) {
					url += card.value;
					if ("toggles" in card) for (let toggle of card.toggles) {
						if (toggle.clicked == false) url += "f";
						else url += "t";
					}
				}
			}
			return url;
		}
	},
	beforeMount() {
		console.log(this.$route);
		console.log(this.$route.params);
		console.log(this.$route.params.selections);
		let selections = "";
		if (this.$route.params.selections) selections = this.$route.params.selections;

		for (let category of this.categories) {
			for (let card of category.cards) {
				let value = 2;
				if (selections.length && !isNaN(selections.slice(0, 1))) {
					value = parseInt(selections.slice(0, 1));
					selections = selections.slice(1);
				}
				card.value = value;
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
	}
};
</script>

<style>

</style>