import { RegisterForm } from "@/app/auth/register/sections/registerform";
import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";

export default function RegisterPage() {
  return (
    <main>
      <Header />
      <RegisterForm />
      <Footer />
    </main>
  );
}
