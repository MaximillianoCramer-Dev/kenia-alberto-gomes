# Kenia Alberto Gomes — Site institucional

Site institucional responsivo em HTML, CSS e JavaScript puro, com foco em acessibilidade, performance e manutenção simples.

## Como visualizar

Abra `index.html` em um navegador. Para testar o comportamento em ambiente local, recomenda-se usar a extensão Live Server no VS Code.

## Estrutura

- `index.html`: conteúdo semântico e metadados.
- `css/global.css`: variáveis, estilos globais e tipografia.
- `css/components.css`: cabeçalho, seções, cards e rodapé.
- `css/responsive.css`: adaptações para tablets e celulares.
- `js/main.js`: menu responsivo, navegação ativa e ano do rodapé.
- `js/animations.js`: animações progressivas com suporte a movimento reduzido.
- `assets/images/`: fotografia fornecida para o projeto.

## Dados a confirmar antes da publicação

1. Número profissional de WhatsApp e autorização para exibi-lo.
2. Instagram profissional e autorização para vinculá-lo.
3. Horários, duração, valores e plataforma dos atendimentos online.
4. Revisão e aprovação final dos textos, especialmente os que descrevem as abordagens.
5. Domínio definitivo e imagem OG com URL absoluta, se desejado.

**Importante:** o site não promete eficácia clínica de Constelação Sistêmica nem a apresenta como substituta de tratamento de saúde. Não há backend, coleta de dados ou formulário de envio.

## Observação sobre a imagem de referência

A captura de tela enviada foi usada apenas como inspiração visual; não foi incorporada como imagem do site. A fotografia da profissional foi utilizada com base no material fornecido.

## Alterações da V2
- Home em verde profundo/oliva com texto claro e detalhes dourados.
- Nova imagem de ambientação na home (assets/images/ambiente-acolhedor.webp).
- Fotografia original de Kenia mantida somente na seção Sobre mim.

### Versão 3 — degradê da home
A home recebeu um degradê multicamadas em verde profundo e oliva, inspirado na referência visual aprovada. As regras estão no final de `css/components.css`, facilitando ajustes futuros. A fotografia da Kenia permanece apenas em Sobre mim.


## Versão 4
Home com fotografia de ambientação ao fundo no lado direito, degradê verde à esquerda e cabeçalho compacto. Menu colapsa em telas abaixo de 1180px para evitar cortes.


## Atualização V5
Imagem de ambientação sem textos integrada ao fundo da home, com degradê verde à esquerda.


V6: Ajuste de enquadramento e espaçamento responsivo em css/layout-fixes.css. Seções de conteúdo longo mantêm altura automática, sem cortes.

## V7 — tipografia da citação
Apenas a citação utiliza Inter (Google Fonts), com tamanho e entrelinha responsivos. O restante do site permanece como na V6.


V8: removida a seção exclusiva de citação; mensagem integrada ao final de Sobre mim, com fonte Inter e detalhe dourado.


V9: botão Voltar ao topo corrigido com scrollTo, suporte a movimento reduzido e limpeza do hash.


## V10 — ajustes de navegação
- Menu reúne Psicanálise e Constelação sob **Abordagens**.
- Âncoras são enquadradas abaixo do cabeçalho: centralização quando couber e início visível quando a seção for longa.
- Footer com altura flexível e quebra responsiva para evitar cortes.
- Mantidos o degradê, fotografias e conteúdo.


## V12 — Refinamento visual e interações
- Novo arquivo `css/experience.css` com mudanças visíveis de composição e animações.
- Formação em destaque na seção Sobre mim; cartões de abordagens com nova profundidade; navegação ativa sublinhada; contato com fundo renovado.
- Respeita `prefers-reduced-motion`; contatos continuam pendentes.


## V13 — Estabilidade
CSS `stability.css` carregado por último: correções de enquadramento, biografia, âncoras e rodapé. Testar em navegador desktop e mobile antes da publicação.


## V14 — Auditoria técnica
Consulte `AUDITORIA-TECNICA.md` para correções realizadas e pendências de publicação.
