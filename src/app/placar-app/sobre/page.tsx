export default function AboutPage() {
  const updatedAt = "25 de março de 2026";

  const features = [
    "Placar simples",
    "Placar de vôlei",
    "Placar de basquete",
    "Placar de futebol",
    "Modo para 4 times",
    "Sorteador de times",
    "Salvamento de registros no dispositivo",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-10">
          <span className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
            Sobre o App
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Um app de placar simples, rápido e prático
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Este aplicativo foi criado para facilitar o acompanhamento de partidas
            e ajudar no controle de placares de forma prática, direta e fácil de usar.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Última atualização: {updatedAt}
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">O que é o app</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app é uma ferramenta para marcar pontos, acompanhar partidas e
              salvar registros diretamente no dispositivo. Ele foi pensado para
              quem quer abrir o aplicativo e usar sem complicação.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">Principais recursos</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">Como funciona</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O usuário pode utilizar os diferentes modos de placar disponíveis,
              registrar partidas e consultar resultados salvos localmente no
              aparelho. O app busca oferecer rapidez no uso e uma interface clara
              para momentos de jogo, treino ou organização de times.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">Armazenamento de registros</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Os registros e preferências do aplicativo são armazenados localmente
              no dispositivo, permitindo que o usuário mantenha seu histórico de
              partidas e configurações de uso sem depender de uma conta.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">Anúncios</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app pode exibir anúncios por meio do Google AdMob para ajudar na
              manutenção e evolução do produto.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">Recursos futuros</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              No futuro, o aplicativo poderá contar com recursos premium,
              melhorias de personalização e novas funções para deixar a experiência
              ainda mais completa.
            </p>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h2 className="text-xl font-semibold text-white">Contato</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Para dúvidas, sugestões ou suporte, utilize o canal oficial
              informado no seu site ou na página pública do aplicativo.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}