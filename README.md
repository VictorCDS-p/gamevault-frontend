# GameVault Frontend

O **GameVault Frontend** é a interface web do GameVault, permitindo que os usuários gerenciem suas bibliotecas de jogos, coleções e perfis. Ele se comunica com o backend do GameVault para fornecer dados em tempo real.

## 📂 Estrutura do Projeto

```bash
src
 ├── components
 │   ├── ui
 │   │   ├── Button.jsx
 │   │   ├── Input.jsx
 │   │   ├── Select.jsx
 │   │   ├── Modal.jsx
 │   │   ├── Pagination.jsx
 │   │   └── Card.jsx
 │   │
 │   ├── layout
 │   │   ├── Navbar.jsx
 │   │   ├── Sidebar.jsx
 │   │   └── Container.jsx
 │   │
 │   ├── games
 │   │   ├── GameCard.jsx
 │   │   ├── GameList.jsx
 │   │   └── GameFilters.jsx
 │   │
 │   ├── library
 │   │   ├── LibraryCard.jsx
 │   │   ├── LibraryList.jsx
 │   │   └── StatusSelector.jsx
 │   │
 │   ├── profile
 │   │   ├── EditProfileModal.jsx
 │   │   ├── ProfileHeader.jsx
 │   │   ├── ProfileStatCard.jsx
 │   │   └── ProfileStats.jsx
 │   │
 │   └── collections
 │       ├── CollectionCard.jsx
 │       ├── CollectionList.jsx
 │       └── CollectionForm.jsx
 │
 ├── pages
 │   ├── Login.jsx
 │   ├── Register.jsx
 │   ├── Profile.jsx
 │   ├── Games.jsx
 │   ├── Library.jsx
 │   └── Collections.jsx
 │
 ├── services
 │   ├── api.js
 │   ├── authService.js
 │   ├── categoryService.js
 │   ├── gameService.js
 │   ├── libraryService.js
 │   └── collectionService.js
 │   └── userService.js
 │
 ├── hooks
 │   ├── useAuth.js
 │   ├── useGames.js
 │   └── useLibrary.js
 │
 ├── context
 │   └── AuthContext.jsx
 │
 ├── utils
 │   └── formatStatus.js
 │   └── statusColors.js
 │
 ├── routes
 │   └── AppRoutes.jsx
 │
 ├── App.jsx
 └── main.jsx
```

## ⚡ Tecnologias

* [React 19](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Axios](https://axios-http.com/)
* [React Router Dom](https://reactrouter.com/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [React Avatar](https://github.com/Sitebase/react-avatar)

## 🚀 Começando

### 1. Clone o repositório

```bash
git clone https://github.com/VictorCDS-p/gamevault-frontend.git
cd gamevault-frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Configure a URL do backend

No arquivo `src/services/api.js`, configure a URL base da API do backend do GameVault:

```javascript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000', // <- substitua pelo endereço do backend
});
```

> O backend já possui documentação no repositório correspondente.

### 4. Rode o projeto em desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O app estará disponível em `http://localhost:5173` (ou porta exibida no terminal).

### 5. Build para produção

```bash
npm run build
# ou
yarn build
```

### 6. Preview do build

```bash
npm run preview
# ou
yarn preview
```

## 🛠 Estrutura de Componentes

* **UI**: Componentes genéricos (Botões, Inputs, Cards, Modals, etc.)
* **Layout**: Navbar, Sidebar e Container
* **Games**: Listagem, filtros e cards de jogos
* **Library**: Biblioteca do usuário e gerenciamento de status
* **Profile**: Estatísticas do perfil e edição de informações
* **Collections**: Gerenciamento de coleções de jogos

## 📌 Scripts Úteis

| Script            | Descrição                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Roda o projeto em modo desenvolvimento |
| `npm run build`   | Cria o build de produção               |
| `npm run preview` | Visualiza o build de produção          |
| `npm run lint`    | Verifica problemas de lint             |

## 📖 Documentação do Backend

O frontend depende do backend para autenticação, jogos, biblioteca e coleções. Consulte o repositório do backend para instruções detalhadas:

[Link para o Backend](https://github.com/VictorCDS-p/gamevault-api)

---
