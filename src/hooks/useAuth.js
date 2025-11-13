import { signInWithPassword, getCurrentUser } from "../api/auth";


export function useSignIn(email, password) {
    return signInWithPassword(email, password);
}

export function useGetCurrentUser() {
   return getCurrentUser();
}