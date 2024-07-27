"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteOrder } from "../../_actions/orders";

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      className="stroke-destructive bg-destructive text-white cursor-pointer "
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(id);
          router.refresh();
        })
      }>
      Delete
    </DropdownMenuItem>
  );
}