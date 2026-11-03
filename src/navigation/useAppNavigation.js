import { useRouter } from "expo-router";
import { ROUTES } from "./routes";

export function useAppNavigation() {
  const router = useRouter();

  return {
    goToRegister: () => router.push(ROUTES.Register),
    goToLogin: () => router.push(ROUTES.Login),
    goToHome: () => router.replace(ROUTES.Home),
    goBack: () => (router.canGoBack() ? router.back() : router.replace(ROUTES.Home)),
  };
}