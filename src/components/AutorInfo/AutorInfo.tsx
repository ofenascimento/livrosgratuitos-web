import React from 'react'

const AutorInfo = () => {
    return (
        <>
            <div className="p-6">
                “<em>Memórias Póstumas de Brás Cubas</em>”, de <strong>Machado de Assis</strong>.
                Fonte: <a href="https://www.projeto-adamastor.org/obra/exemplo" rel="noopener" className="text-[#7B66FF] underline decoration-[#7B66FF]/40 underline-offset-2 hover:decoration-[#7B66FF]">Projeto Adamastor</a>.
                Licença: <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt_BR" rel="license noopener" className="text-[#7B66FF] underline decoration-[#7B66FF]/40 underline-offset-2 hover:decoration-[#7B66FF]">CC BY-SA 4.0</a>.
                <span className="opacity-80 ml-2">Sem alterações. Mantidos os avisos editoriais originais.</span>
                <span>Alterações: nova capa criada pela equipe Livros Gratuitos; ajustes de formatação; revisões menores no texto.</span>
                <p className="mt-4">Solicitações de remoção: se você é autor(a), herdeiro(a), representante legal ou proprietário(a) do arquivo/EPUB e deseja a retirada desta obra, escreva para felipematheusdev@gmail.com</p>
            </div>
        </>
    )
}

export default AutorInfo