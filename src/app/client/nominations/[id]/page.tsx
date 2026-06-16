type NominationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NominationDetailPage({
  params,
}: NominationDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-950">
        Nomination Detail
      </h1>
      <p className="mt-3 text-slate-600">Nomination ID: {id}</p>
    </main>
  );
}