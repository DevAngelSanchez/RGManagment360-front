import LayoutSelector from "@/components/custom/LayoutSelector";

import ServicesUI from "./serviceUI";

export default async function Page() {
  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <ServicesUI />
        </section>
      </main>
    </LayoutSelector>
  );
}
