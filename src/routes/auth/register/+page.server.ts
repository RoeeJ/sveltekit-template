import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (evt) => {
		evt.locals.setSession({
			user: {
				id: "1234",
				fname: "Admin",
				lname: "Adminson",
				email: "admin@admin.com",
				password: "123456",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			expiresAt: new Date()
		});
	},
}
