import { redirect } from "next/navigation";

/** Portfolio sections live at /#home — redirect stray /home visits. */
export default function HomeAliasPage() {
  redirect("/");
}
