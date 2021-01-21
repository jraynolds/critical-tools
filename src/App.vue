<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
			clipped-left
    >
			<v-col cols="4">
			</v-col>

			<v-col cols="4" class="text-center">
				<v-btn x-large text to="/">
					Critical
					<v-icon x-large>mdi-dice-d20</v-icon>
					Tools
				</v-btn>
			</v-col>

			<v-col cols="4" class="text-right">
				<v-btn
					href="https://twitter.com/jasper_raynolds"
					target="_blank"
					icon
					title="Creator's twitter"
				>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
			</v-col>

    </v-app-bar>

		<Sidebar />

    <v-main class="ml-n6">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue"

export default {
  name: 'App',

  components: {
		Sidebar
  },

  data: () => ({
    //
  }),
};
</script>
