'use client'
import CustomLayout from '@/components/CustomLayout/CustomLayout';
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function TermosDeServico() {
    const searchParams = useSearchParams();
    const isApp = searchParams.get('app');
    
    return (
        <CustomLayout>
            {
                !isApp && <Navbar />
            }
            <div className='flex flex-wrap-reverse justify-center mx-6 md:mx-0'>
                <div className='container rounded flex flex-wrap text-white flex-col py-6'>
                    <h1 className='text-3xl font-bold'>Termos de Serviço</h1>
                    <br />

                    <p>
                        Bem-vindo à nossa biblioteca digital de livros gratuitos! Nosso compromisso é fornecer acesso irrestrito a obras de domínio público para amantes da literatura de todas as idades. Os seguintes Termos de Serviço regem o uso de nossa plataforma e serviços associados. Por favor, leia-os atentamente.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>1. Acesso e Uso da Plataforma</h3>
                    <br />

                    <p>
                        1.1. Elegibilidade: Ao concordar com estes termos, você afirma ter pelo menos 18 anos de idade ou ter a idade de maioridade em sua jurisdição e capacidade legal para entrar em contratos.
                    </p>
                    <br />

                    <p>
                        1.2. Licença Limitada: Concedemos a você uma licença limitada, revogável, não exclusiva e não transferível para acessar e usar nossa plataforma e conteúdos para fins pessoais, não comerciais, em conformidade com estes Termos.
                    </p>
                    <br />

                    <p>
                        1.3. Conta de Usuário: Embora o acesso à nossa coleção possa não exigir uma conta, certas funcionalidades podem necessitar de registro. Você é responsável por manter a confidencialidade das informações da sua conta.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>2. Conteúdo da Plataforma</h3>
                    <br />

                    <p>
                        2.1. Obras de Domínio Público: Todos os livros disponíveis em nossa plataforma estão em domínio público ou foram licenciados de maneira que permita sua livre distribuição.
                    </p>
                    <br />

                    <p>
                        2.2. Uso do Conteúdo: Você pode baixar, copiar e distribuir as obras disponibilizadas em nossa plataforma, desde que tal uso não infrinja os termos desta licença ou leis aplicáveis.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>3. Restrições de Uso</h3>
                    <br />

                    <p>
                        3.1. Você concorda em não utilizar a plataforma para quaisquer fins ilegais, para promover atividades ilícitas ou para violar direitos de terceiros.
                    </p>
                    <br />

                    <p>
                        3.2. Proibição de Revenda: É vedada a comercialização do conteúdo acessado através de nossa plataforma.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>4. Modificações e Interrupção do Serviço</h3>
                    <br />

                    <p>
                        Reservamos o direito de modificar, suspender ou descontinuar, temporária ou permanentemente, a plataforma ou qualquer serviço a ela associado, com ou sem aviso prévio.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>5. Isenção de Responsabilidade</h3>
                    <br />

                    <p>
                        A plataforma e seu conteúdo são fornecidos como estão. Não garantimos a precisão, completude ou utilidade das informações e materiais disponibilizados.
                    </p>

                    <br />
                    <h3 className='text-start text-lg font-semibold'>6. Lei Aplicável e Jurisdição</h3>
                    <br />

                    <p>
                        Estes Termos de Serviço são regidos e interpretados de acordo com as leis do Brasil, sem dar efeito a quaisquer princípios de conflitos de leis. Qualquer disputa decorrente destes Termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
                    </p>

                    <br />
                    <p>
                        Agradecemos por escolher nossa plataforma de livros gratuitos. Caso tenha dúvidas sobre estes Termos de Serviço, entre em contato conosco pelo e-mail: contato@livrosgratuitos.com.
                    </p>
                </div>
            </div>
            
            {
                !isApp &&  <Footer />
            }
            
        </CustomLayout>
    )
}

export default TermosDeServico