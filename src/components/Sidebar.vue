<template>
	<v-navigation-drawer
		expand-on-hover
		clipped
		app
		permanent
	>
		<v-list class="pb-2 mb-n4 pt-6" nav>
			
			<v-list-item-group v-model="selected">
				<v-list-item
					v-for="item in items"
					:key="item.title"
					:to="item.to"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

	</v-navigation-drawer>
</template>

<script>
export default {
	data: () => ({
		selected: 0,
		items: [
			{
				title: "Session Zero",
				icon: "mdi-numeric-0-circle",
				to: "/session-zero/"
			},
			{
				title: "Conditions",
				icon: "mdi-emoticon-sick",
				to: "/conditions/"
			},
			{
				title: "Character Generator",
				icon: "mdi-cards",
				to: "/tarot-character/"
			},
			{
				title: "Trigger Tracker",
				icon: "mdi-bomb",
				to: "/trigger-tracker/"
			},
			// {
			// 	title: "Post-Session Poll",
			// 	icon: "mdi-poll-box",
			// 	to: "/post-session/"
			// }
		]
	})
}
</script>

<style>

</style>