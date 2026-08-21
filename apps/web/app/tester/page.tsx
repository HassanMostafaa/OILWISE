import { LoginForm } from "@/components/login-form/LoginForm";
import { NumbersForm } from "@/components/numbers-form/NumbersForm";
import { NumbersList } from "@/components/numbers-list/NumbersList";
import { RegisterForm } from "@/components/register-form/RegisterForm";

export default function NextjsPage() {
  return (
    <div className="p-2 w-full items-start justify-between flex gap-5 md:p-10">
      <div className="flex-1 space-y-5 max-w-2xl">
        <RegisterForm />

        <LoginForm />

        <NumbersForm />
      </div>

      {/* NumbersList */}
      <NumbersList initialNumItems={5} />
    </div>
  );
}
