export default function PrivacyPage() {
  const updatedAt = "25 de março de 2026";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-10">
          <span className="mb-4 inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-300">
            Política de Privacidade
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sua privacidade é importante para nós
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Esta Política de Privacidade explica como o aplicativo de placar
            coleta, usa e protege informações ao utilizar recursos como placar
            simples, vôlei, basquete, futebol, placar para 4 times e sorteador
            de times.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Última atualização: {updatedAt}
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              1. Informações coletadas
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Atualmente, o app não exige criação de conta para uso das funções
              principais. Algumas informações podem ser armazenadas localmente
              no seu dispositivo para permitir uma melhor experiência de uso.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              <li>Registros de partidas salvos no dispositivo</li>
              <li>Preferências e configurações do app</li>
              <li>Dados relacionados ao uso local de funções do placar</li>
              <li>Informações técnicas fornecidas por serviços de anúncios</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              2. Armazenamento local
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app pode salvar dados localmente no dispositivo, como registros
              de partidas e preferências do usuário, para permitir acesso rápido
              às informações e continuidade da experiência sem depender de conta
              online.
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Esses dados ficam armazenados no próprio aparelho do usuário e
              podem ser removidos ao limpar os dados do aplicativo ou
              desinstalá-lo.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              3. Publicidade
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app utiliza anúncios do Google AdMob. O AdMob pode coletar dados
              limitados para exibir anúncios, medir desempenho e melhorar a
              relevância da publicidade.
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Esses dados podem incluir identificadores do dispositivo,
              informações de interação com anúncios e dados técnicos necessários
              para funcionamento da plataforma de publicidade, de acordo com as
              políticas do Google.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              4. Futuro plano premium
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              No momento, o app não possui plano premium ativo. No entanto, essa
              funcionalidade poderá ser adicionada futuramente.
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Caso recursos pagos sejam lançados, esta política poderá ser
              atualizada para incluir informações sobre assinatura, pagamentos,
              benefícios e eventual tratamento de dados relacionados à compra.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              5. Compartilhamento de dados
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Não vendemos dados pessoais dos usuários. Algumas informações
              técnicas podem ser processadas por parceiros necessários para o
              funcionamento do app, como provedores de anúncios e serviços de
              infraestrutura.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              6. Segurança
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Buscamos adotar medidas razoáveis para proteger as informações
              tratadas pelo app. Ainda assim, nenhum sistema é totalmente imune
              a falhas ou vulnerabilidades.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              7. Uso por menores
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app pode ser utilizado por diferentes públicos. Recomendamos que
              responsáveis acompanhem o uso por menores de idade, especialmente
              em dispositivos compartilhados.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              8. Alterações nesta política
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Esta Política de Privacidade pode ser atualizada periodicamente
              para refletir melhorias no app, mudanças legais ou novos recursos.
              Recomendamos revisão ocasional desta página.
            </p>
          </section>

          <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-semibold text-white">9. Contato</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Em caso de dúvidas sobre esta Política de Privacidade, você pode
              entrar em contato pelo canal oficial informado no site ou na loja
              do aplicativo.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}