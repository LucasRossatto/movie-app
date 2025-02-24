# My Movie List

My Movie List é um aplicativo inspirado no My Anime List, desenvolvido em React Native com TypeScript. Ele utiliza a API do TMDB para fornecer informações detalhadas sobre filmes, incluindo pesquisa, visualização dinâmica de detalhes, trailers, descrições, imagens, gêneros, coleções e filmes recomendados.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Sobre o Projeto

O **My Movie List** é um aplicativo móvel que permite aos usuários explorar filmes, ver detalhes como trailers, descrições, imagens, gêneros, coleções e filmes recomendados. Inspirado no My Anime List, o app foi desenvolvido para ser uma ferramenta simples e eficiente para amantes de cinema.

## Funcionalidades

- **Pesquisa de Filmes**: Busque filmes por título.
- **Detalhes do Filme**: Visualize informações detalhadas, incluindo:
  - Trailer
  - Descrição
  - Imagens (pôsteres e wallpapers)
  - Gêneros
  - Coleções (se aplicável)
  - Filmes recomendados
- **Interface Dinâmica**: Design responsivo e interativo para uma melhor experiência do usuário.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **TypeScript**: Adiciona tipagem estática ao JavaScript para maior segurança e produtividade.
- **Axios**: Cliente HTTP para fazer requisições à API do TMDB.
- **Expo**: Plataforma para facilitar o desenvolvimento e teste de aplicativos React Native.
- **expo-constants**: Utilizado para acessar configurações do aplicativo, como variáveis de ambiente. (semelhante ao dotenv)
- **API do TMDB**: Fonte de dados para informações sobre filmes.

## Instalação

Siga esses passos para configurar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/LucasRossatto/movie-app.git
   ```
2. **Navegue até o diretório do projeto**:
   ```bash
   cd movie-app
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```
4. **Configure a API do TMDB**:
   - O aplicativo utiliza `expo-constants` para acessar a chave da API do TMDB configurada no `app.json`. Certifique-se de que seu arquivo `app.json` contém a seguinte estrutura:
     ```json
     {
       "expo": {
         "extra": {
           "TMDB_API_KEY": "sua_chave_aqui"
         }
       }
     }
     ```
   - Nota: Obtenha uma chave de API gratuita no site do TMDB.
5. **Inicie o servidor de desenvolvimento**:
   ```bash
   expo start
   ```
6. **Execute o aplicativo**:
   - Escaneie o QR code com o aplicativo Expo Go (disponível na App Store ou Google Play).
   - Ou execute em um emulador Android/iOS.

## Como Usar

### Pesquisar Filmes:

- Na tela inicial, digite o nome do filme na barra de pesquisa e pressione "Enter".
- Os resultados serão exibidos em uma lista.

### Ver Detalhes do Filme:

- Toque em um filme na lista para abrir sua página de detalhes.
- Na página de detalhes, você verá:
  - Trailer do filme.
  - Descrição completa.
  - Imagens.
  - Gêneros.
  - Status (lançado, em breve, etc)
  - Coleções (se o filme fizer parte de uma).
  - Filmes recomendados.

### Explorar Filmes Recomendados:

- Na página de detalhes, role até a seção "Filmes Recomendados" para descobrir filmes semelhantes.

### Explorar Coleção de Filmes:

- Na página de detalhes, role até a seção  "Coleção de Filmes" para descobrir coleções.

### Voltar para a Tela Inicial:

- Use o botão de voltar do aplicativo ou o gesto de deslizar (dependendo do dispositivo) para retornar à tela inicial.

## Contribuição

Contribuições são bem-vindas! Siga esses passos para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/NovaFeature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adicionando NovaFeature'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/NovaFeature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Se tiver dúvidas ou sugestões, entre em contato:

- **LinkedIn**:
Siga-me no [LinkedIn](https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=lucasrossatto).

- **UI/Protótipo**:
[Figma](https://www.figma.com/design/jfRc9kOXkYqylBtoQu3csR/mymovielist-ui-app-mobile?m=auto&t=Hd83E006IpoxmhXO-6)

