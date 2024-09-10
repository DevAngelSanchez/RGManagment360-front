import LayoutSelector from "@/components/custom/LayoutSelector";

export default async function loading() {
  return (
    <main>
      <LayoutSelector layout="default">
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-row justify-between pr-8">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          </div>
        </section>
      </LayoutSelector>
    </main>
  )
}