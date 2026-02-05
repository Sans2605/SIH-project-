import { account } from "./config";

/* =====================[LOGIN]===================== */
export async function signInAccount(user) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    console.log(session);

    return session;
  } catch (error) {
    console.log(error);
  }
}
