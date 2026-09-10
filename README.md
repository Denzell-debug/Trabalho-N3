# VAROO — Catálogo de Moda Fast Fashion

> Site de catálogo de moda unissex e acessível, desenvolvido como projeto final (N3) da disciplina de Desenvolvimento Web.

---

## 1. Escopo Fechado

### Objetivo
A VAROO é um site de catálogo de moda fast fashion com foco em acessibilidade de preço e inclusão. O objetivo é apresentar produtos e looks editoriais de forma profissional, permitindo que o usuário explore o catálogo, filtre produtos e entre em contato com a marca.

### Público-alvo
Jovens adultos de 18 a 35 anos, de todos os gêneros, que buscam moda acessível e tendências do dia a dia sem gastar muito.

**Psicologia das cores:** O preto confere seriedade e elegância ao fundo, enquanto o rosa magenta como acento cria pontos de atenção estratégicos (CTAs, badges, destaques), transmitindo energia e jovialidade — alinhado ao público fast fashion.

### Tipografia
- **Montserrat** — títulos e UI (font-display): geométrica, moderna, impacto visual nos headings
- **Inter** — corpo de texto: excelente legibilidade em telas, neutro e clean

### Framework utilizado
**Bootstrap 5.3** — utilizado para o sistema de grid responsivo como base, reset CSS e componentes utilitários. Toda a estilização visual, identidade da marca e componentes customizados foram feitos em CSS puro (`style.css`), evitando dependência excessiva do framework e garantindo autoria do design.

---

## 2. Detalhamento do Site

### Páginas

#### Home (`index.html`)
- **Hero section** com headline de impacto, estatísticas da marca e CTAs para catálogo e looks
- **Promo strip** animado (marquee CSS) com informações de frete e promoções
- **Seção "Mais vendidos"** com 4 cards de produto e filtro por categoria (pills interativas via JS)
- **Galeria de Looks** editorial com grid assimétrico (look em destaque)
- **Newsletter** com validação de e-mail via Regex

#### Catálogo (`catalogo.html`)
- **Layout com sidebar de filtros** (categoria, tamanho, cor, faixa de preço)
- **12 produtos** distribuídos em grid responsivo (2 → 3 → 4 colunas)
- **Filtro rápido** por categoria com pills (filtragem via JS, sem banco de dados)
- **Ordenação** por relevância, preço e novidades
- **Contagem de resultados** atualizada dinamicamente ao filtrar

#### Looks (`looks.html`)
- **7 looks editoriais** em grid assimétrico (look featured ocupa 2 colunas/linhas)
- **Filtro por estilo** (Casual, Streetwear, Romântico, Sport, Trabalho)
- **Modal de detalhes** ao clicar em cada look (manipulação de DOM)
- CTA direcionando para o catálogo

#### Sobre (`sobre.html`)
- **Mosaico de imagens** com layout assimétrico da marca
- **Cards de valores** da empresa (Inclusão, Acessibilidade, Estilo, Responsabilidade)
- **Números da VAROO** em grid de stats
- **Seção do time** com cards de membros

#### 📬 Contato (`contato.html`)
- **Formulário completo** com validação JavaScript:
  - Nome: mínimo 3 caracteres
  - E-mail: validação via Regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
  - Assunto: mínimo 5 caracteres
  - Mensagem: mínimo 20 caracteres
  - Feedback visual por campo (erro em vermelho, sucesso em verde)
  - Mensagem de sucesso exibida na interface após envio (sem banco de dados)
- **Informações de contato** (e-mail, WhatsApp, endereço, horário)
- **FAQ rápido** com accordion nativo HTML (`<details>/<summary>`)


Todas as páginas se interligam pela navbar fixa e pelo footer. O link ativo é destacado visualmente (underline rosa) via JavaScript.

---

## 3. Requisitos Atendidos

### HTML5 & Acessibilidade
- Tags semânticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Skip link ("Ir para o conteúdo principal") para leitores de tela
- `aria-label`, `aria-labelledby`, `aria-live`, `aria-expanded`, `aria-current`, `aria-describedby` em todos os elementos interativos
- `role` attributes (list, listitem, tab, dialog, alert, status, marquee, banner, contentinfo)
- `alt` descritivo em todas as imagens
- `for`/`id` em todos os labels de formulário

### CSS & Responsividade (Mobile First)
- CSS Custom Properties para todo o design system
- Breakpoints: base mobile → 576px → 768px → 992px → 1024px → 1200px
- Grid responsivo com `clamp()` na tipografia
- `aspect-ratio`, `min-height`, `clamp()` para dimensionamentos fluidos
- Sem rolagem horizontal em nenhum viewport
- `@media (prefers-reduced-motion)` para acessibilidade de animações

### UI/UX e Heurísticas de Nielsen
- **Feedback do sistema:** toasts de notificação para adição ao carrinho e lista de desejos; estados de botão que mudam visualmente ao adicionar produto
- **Prevenção de erros (H9):** validação campo a campo no `blur` + mensagens claras por campo (não `alert()` genérico)
- **Consistência:** navbar e footer idênticos em todas as páginas; padrão visual unificado
- **Reconhecimento em vez de lembrança:** breadcrumbs, link ativo na nav, pills de categoria com estado ativo
- **Padrão F de leitura:** conteúdo mais importante à esquerda e no topo; headlines grandes seguidos de desc + CTA

### JavaScript — Interatividade
- Hamburger menu com animação (mobile)
- Navbar com efeito de scroll (backdrop-filter + padding reduzido)
- Filtro de produtos por categoria com pills (sem banco de dados)
- Sistema de wishlist com toggle e feedback
- Carrinho com badge animado e contador
- Validação de formulário de contato com Regex (e-mail) e tamanho mínimo
- Validação da newsletter com Regex
- Modal de look com abertura/fechamento + fechar ao clicar fora / pressionar Esc
- Toasts de notificação dinâmicos (criados via DOM)
- Scroll reveal com IntersectionObserver (animação de entrada dos cards)
- Botão "voltar ao topo" com visibilidade condicional

---
| [Denzell Evangelista do Nascimento] | Estrutura HTML, CSS completo e design system, JavaScript, README, testes 

---

*VAROO ©2025 — Trabalho N3 · Desenvolvimento Web*
