<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
			clipped-left
    >
		
			<v-spacer />

			<v-btn x-large text>
				D20
				<v-icon x-large>mdi-dice-d20</v-icon>
				Tools
			</v-btn>

			<v-spacer />

    </v-app-bar>

		<Sidebar />

    <v-main>
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
