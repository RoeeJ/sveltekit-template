import { sessionTable} from '$lib/db/auth/schema';
import { dbClient } from '$lib/db/client';
import { eq } from 'drizzle-orm';
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
	let currentSession = jwt.verify(token, process.env.JWT_SECRET) as JWTSession;
	if(!currentSession.user || !currentSession.sessionId) {
		throw new Error("Invalid session");
	}
	let dbSession = await dbClient.select().from(sessionTable).where(eq(sessionTable.id, currentSession.sessionId)).limit(1);
	if(dbSession.length == 0) {
		throw new Error("Session not found");
	}
	if(dbSession[0].userId != currentSession.user.id) {
		throw new Error("Session user mismatch");
	}
	if(dbSession[0].expiresAt < new Date()) {
		await dbClient.delete(sessionTable).where(eq(sessionTable.id, currentSession.sessionId));
		throw new Error("Session expired");
	}
	return currentSession;
}

