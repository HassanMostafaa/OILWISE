import { NumbersForm } from "@/components/numbers-form/NumbersForm";
import { NumbersList } from "@/components/numbers-list/NumbersList";

import { Show } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function NextjsPage() {
  await auth.protect();

  return (
    <div className="p-2 w-2xl flex-1 space-y-5 md:p-10">
      <Show when="signed-in">
        <NumbersForm />
        <NumbersList initialNumItems={5} />
      </Show>
    </div>
  );
}
