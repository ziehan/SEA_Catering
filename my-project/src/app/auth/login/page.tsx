import { LoginForm } from "@/app/auth/login/sections/loginform";
import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";

export default function LoginPage() {
  return (
    <main>
      <Header />
      <LoginForm />
      <Footer />
    </main>
  );
}
