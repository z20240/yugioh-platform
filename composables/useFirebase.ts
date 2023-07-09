// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  Auth,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { RuntimeConfig } from "nuxt/schema";

const createSignWithGoogle =
  ({ auth }: { config: RuntimeConfig; auth: Auth }) =>
  async () => {
    const providerGoogle = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(
        "🚀 ~ file: useFirebase.ts:34 ~ signWithGoogle ~ token:",
        token
      );
      console.log(
        "🚀 ~ file: useFirebase.ts:35 ~ signWithGoogle ~ user:",
        user
      );
      return { token, user };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        `Error: ${errorCode} ${errorMessage} ${email} ${credential}`
      );
    }
  };

const createSignWithEmail =
  ({ config, auth }: { config: RuntimeConfig; auth: Auth }) =>
  async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: config.public.baseUrl,
        // This must be true.
        handleCodeInApp: true,
      });

      window.localStorage.setItem("emailForSignIn", email);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.error(`Error: ${errorCode} ${errorMessage} ${email}`);
    }
  };

export function useFirebaseClient() {
  const config = useRuntimeConfig();

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
    measurementId: config.public.firebase.measurementId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // try to add analytics
  const analytics =
    app.name && typeof window !== "undefined" ? getAnalytics(app) : null;

  // create the sign in functions with google auth provider
  const signWithGoogle = createSignWithGoogle({ auth, config });

  // create the sign in functions with email auth provider
  const signWithEmail = createSignWithEmail({ auth, config });

  return { app, auth, analytics, signWithGoogle, signWithEmail };
}
