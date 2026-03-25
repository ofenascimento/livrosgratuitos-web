export default function TermsPage() {
  const updatedAt = "25 de março de 2026";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-10">
          <span className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
            Termos de Uso
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Termos de Uso do aplicativo
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Estes Termos de Uso regulam o acesso e uso do aplicativo de placar,
            que oferece funções como placar simples, vôlei, basquete, futebol,
            placar para 4 times, sorteio de times e salvamento local de
            registros.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Última atualização: {updatedAt}
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              1. Aceitação dos termos
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Ao acessar ou utilizar o app, você concorda com estes Termos de
              Uso. Caso não concorde, recomendamos que não utilize o aplicativo.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              2. Funcionalidades do app
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O aplicativo foi desenvolvido para auxiliar usuários no controle e
              registro de placares e partidas esportivas, incluindo diferentes
              modos e formatos de jogo.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              <li>Placar simples</li>
              <li>Placar de vôlei</li>
              <li>Placar de basquete</li>
              <li>Placar de futebol</li>
              <li>Modo com 4 times</li>
              <li>Sorteador de times</li>
              <li>Salvamento de registros no dispositivo</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              3. Responsabilidade do usuário
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O usuário é responsável pelo uso adequado do app e pelas
              informações registradas localmente no dispositivo. O app não se
              responsabiliza por perdas de dados causadas por remoção do app,
              limpeza do armazenamento, falhas no dispositivo ou ações de
              terceiros.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              4. Disponibilidade
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Buscamos manter o aplicativo disponível e funcional, mas não
              garantimos funcionamento ininterrupto, livre de erros ou totalmente
              compatível com todos os dispositivos e versões de sistema.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              5. Publicidade no app
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O aplicativo pode exibir anúncios por meio do Google AdMob. A
              exibição de publicidade ajuda na manutenção e evolução do produto.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              6. Recursos premium futuros
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app poderá oferecer, futuramente, recursos premium ou planos
              pagos. Quando isso acontecer, condições específicas de assinatura,
              cobrança, renovação, cancelamento e benefícios poderão ser
              adicionadas ou complementadas nestes Termos.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              7. Propriedade intelectual
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O app, sua identidade visual, textos, estrutura, funcionalidades e
              demais elementos relacionados pertencem aos seus respectivos
              titulares e não podem ser copiados, reproduzidos ou explorados sem
              autorização, exceto nos limites permitidos por lei.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              8. Limitação de responsabilidade
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              O aplicativo é fornecido no estado em que se encontra. Na máxima
              medida permitida por lei, não nos responsabilizamos por danos
              indiretos, perda de dados, interrupções ou prejuízos decorrentes
              do uso ou da impossibilidade de uso do app.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/10">
            <h2 className="text-xl font-semibold text-white">
              9. Alterações nos termos
            </h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Estes Termos de Uso podem ser modificados a qualquer momento para
              refletir melhorias, mudanças legais ou novos recursos do produto.
              O uso continuado do app após atualizações representa aceitação da
              versão vigente.
            </p>
          </section>

          <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="text-xl font-semibold text-white">10. Contato</h2>
            <p className="mt-3 leading-7 text-zinc-300">
              Em caso de dúvidas, solicitações ou questões relacionadas a estes
              Termos de Uso, utilize o canal de contato oficial informado no seu
              site ou na página pública do aplicativo.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}