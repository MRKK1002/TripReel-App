import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Configure Google Sign-In — must be called once before any sign-in attempt
GoogleSignin.configure({
  webClientId:
    '439454658068-rcaqvvrodh44la69ua8pvri9lblkjn7k.apps.googleusercontent.com',
  offlineAccess: false,
});

/**
 * Opens the Google Sign-In dialog and returns the ID token.
 * @returns {Promise<{idToken: string, user: object}>}
 */
export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    const idToken = response?.data?.idToken || response?.idToken;
    if (!idToken) {
      throw new Error('No ID token received from Google');
    }
    return { idToken, user: response?.data?.user || response?.user };
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return { cancelled: true };
    }
    if (error.code === statusCodes.IN_PROGRESS) {
      return { cancelled: true };
    }
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services not available');
    }
    throw error;
  }
}

export async function signOutGoogle() {
  try {
    await GoogleSignin.signOut();
  } catch {}
}
