import LayoutSelector from "@/components/custom/LayoutSelector";

export default async function loading() {

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">
          <h1>Loading...</h1>
        </section>
      </main>
    </LayoutSelector>
  )
}
