import * as jwt from 'jsonwebtoken';

export const signSession = async (session: Session) => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET not set");
	}
	if(!session.user) {
		throw new Error("Session user not set");
	}
	const token = jwt.sign(session, process.env.JWT_SECRET,{
		notBefore: 0,
		expiresIn: "1d",
		issuer: "sveltekit-trpc",
		subject: session.user.id.toString(),
	});
	return token;
}

export const verifySession = async (token: string) => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET not set");
	}
	return jwt.verify(token, process.env.JWT_SECRET) as JWTSession;
}

