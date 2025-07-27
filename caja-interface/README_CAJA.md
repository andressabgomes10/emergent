# Sistema Cajá Atendimento - Interface

## 📋 Visão Geral

Este projeto implementa a interface do sistema Cajá Atendimento, seguindo as diretrizes de design corporativo moderno, acessível, limpo e funcional, com forte identidade visual baseada nos tons de laranja da marca Cajá.

## 🎨 Design System

### Paleta de Cores
- **Laranja Cajá**: `#FF6B35` (cor primária)
- **Laranja Escuro**: `#E55A2B` (hover states)
- **Fundo Branco**: `#FFFFFF`
- **Cinza Claro**: `#F8F9FA` (fundo secundário)
- **Cinza Escuro**: `#343A40` (textos principais)
- **Cinza Médio**: `#6C757D` (textos secundários)

### Cores de Estado
- **Sucesso**: `#28A745`
- **Erro**: `#DC3545`
- **Aviso**: `#FFC107`
- **Informação**: `#17A2B8`

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 🏗️ Estrutura de Layout

### 1. Sidebar (64px de largura)
- Ícones empilhados verticalmente
- Tooltips ao passar o mouse
- Destaque visual no ícone ativo (borda esquerda laranja)
- Logo da Cajá no topo
- Área do usuário na parte inferior

### 2. Header (60px de altura)
- Título "Cajá Atendimento"
- Informações institucionais (endereço + CNPJ)
- Ícones de notificação e perfil no canto direito
- Botão de menu para mobile

### 3. Área Principal
- Conteúdo com cards, formulários e tabelas
- Títulos hierárquicos (H1, H2, etc.)
- Cards com borda leve, sombra sutil e espaçamento adequado

## 🧩 Componentes

### Botões
- **Primário**: Fundo laranja, texto branco
- **Secundário**: Borda laranja, texto laranja
- **Terciário**: Texto laranja, sem borda
- **Tamanhos**: Small (32px), Medium (40px), Large (48px)
- **Estados**: Hover com scale (1.05x) e mudança de cor

### Cards
- Fundo branco com borda cinza claro
- Border radius: 8px
- Sombra sutil
- Hover com scale (1.02x) e sombra mais pronunciada

### Inputs
- Altura: 40px
- Border radius: 6px
- Borda cinza claro
- Foco com borda laranja e glow sutil
- Labels obrigatórios marcados com asterisco vermelho
- Textos de ajuda em cinza médio

### Tooltips
- Fundo cinza escuro, texto branco
- Posicionamento dinâmico (top, bottom, left, right)
- Animação suave de fade in/out
- Seta indicativa

## 📱 Responsividade

### Desktop (≥768px)
- Layout em grid com sidebar fixa
- Header fixo no topo
- Área principal com margem para sidebar e header

### Mobile (<768px)
- Sidebar colapsa em overlay
- Header se adapta mantendo altura
- Botão de menu hambúrguer
- Layout mobile-first

## ♿ Acessibilidade

### Conformidade WCAG
- Contraste mínimo 4.5:1 para textos
- Suporte completo a navegação por teclado
- ARIA labels em elementos interativos
- Roles semânticos apropriados

### Recursos Implementados
- Tooltips com `role="tooltip"`
- Botões com `aria-label`
- Navegação por Tab e Enter/Space
- Estados de foco visíveis
- Textos alternativos para ícones

## 🚀 Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **shadcn/ui**: Componentes base
- **Inter Font**: Tipografia do Google Fonts

## 📦 Estrutura de Arquivos

```
src/
├── components/
│   ├── caja/
│   │   ├── Button.jsx      # Componente de botão customizado
│   │   ├── Card.jsx        # Componentes de card
│   │   ├── Input.jsx       # Componentes de input/form
│   │   ├── Tooltip.jsx     # Componente de tooltip
│   │   └── index.js        # Exportações dos componentes
│   └── ui/                 # Componentes shadcn/ui
├── assets/                 # Recursos estáticos
├── App.jsx                 # Componente principal
├── App.css                 # Estilos customizados
└── main.jsx               # Ponto de entrada
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## 🎯 Funcionalidades Implementadas

### Dashboard Principal
- Cards de métricas (Atendimentos, Clientes, Agendamentos)
- Botões de ação rápida
- Formulário de busca de cliente
- Navegação por sidebar

### Componentes Interativos
- Hover states em todos os elementos clicáveis
- Transições suaves (200ms ease-in-out)
- Feedback visual em ações
- Estados de loading e erro

### Sistema de Navegação
- Sidebar com ícones e tooltips
- Indicador visual de página ativa
- Navegação responsiva para mobile
- Breadcrumbs implícitos no header

## 🔧 Customização

### Cores
As cores podem ser facilmente alteradas no arquivo `App.css` nas variáveis CSS customizadas:

```css
:root {
  --caja-orange: #FF6B35;
  --caja-orange-dark: #E55A2B;
  /* ... outras variáveis */
}
```

### Componentes
Todos os componentes são modulares e podem ser facilmente customizados através de props e classes CSS.

## 📋 Checklist de Implementação

- ✅ Paleta de cores da marca Cajá
- ✅ Layout responsivo (sidebar + header + main)
- ✅ Componentes customizados (Button, Card, Input, Tooltip)
- ✅ Transições e animações suaves
- ✅ Acessibilidade (WCAG, ARIA, navegação por teclado)
- ✅ Tipografia Inter
- ✅ Estados de hover e foco
- ✅ Responsividade mobile-first
- ✅ Build otimizada para produção

## 🚀 Deploy

A aplicação está pronta para deploy em qualquer plataforma que suporte aplicações React estáticas:

1. **Vercel**: `vercel --prod`
2. **Netlify**: Arraste a pasta `dist/` para o dashboard
3. **GitHub Pages**: Configure o workflow de deploy
4. **Servidor próprio**: Sirva os arquivos da pasta `dist/`

## 📞 Suporte

Para dúvidas ou sugestões sobre a interface, consulte a documentação dos componentes ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para o Sistema Cajá Atendimento**

