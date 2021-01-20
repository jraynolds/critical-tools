<template>
	<v-container class="fill-height align-center" style="height: 100%;">
		<v-row class="fill-height align-center">
			<v-col 
				xl="4"
				lg="4"
				md="6"
				sm="10"
				xs="12"
				cols="12"
				v-for="card in cards" 
				:key="card.title"
			>
				<v-card style="min-height: 470px;" class="d-flex flex-column align-center" :to="card.to">
					<v-card-title class="">{{ card.title }}</v-card-title>
					<v-spacer />
					<v-col class="pa-0 d-flex justify-center align-center">
						<v-img v-if="card.img" :src="card.img"></v-img>
					</v-col>
					<v-spacer />
					<v-card-text>
						{{ card.description }}
						<v-btn
							small
							color="primary"
							href="https://twitter.com/jasper_raynolds"
							target="_blank"
							icon 
							v-if="card.description.includes('twitter')"
						>
							<v-icon>mdi-twitter</v-icon>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
		cards: [
			{ 
				title: "Session 0 Tools",
				img: require("@/assets/SessionZeroPromo.png"),
				to: "/session-zero/",
				description: "Choose your preferences for your type of game: deadly? Safe? Full of intrigue? And share your results to learn how well you fit with a given game."
			},
			{ 
				title: "Conditions Tracker",
				img: require("@/assets/ConditionsPromo.png"),
				to: "/conditions/",
				description: "Not sure what blindness does? The difference between restrained and paralyzed? Keep track of your character's status and what actions they can take."
			},
			{ 
				title: "???",
				img: require("@/assets/UnknownPromo.png"),
				to: "",
				description: "A new utility is coming soon! Check back or follow the creator's twitter for details."
			}
		]
	})
}
</script>
