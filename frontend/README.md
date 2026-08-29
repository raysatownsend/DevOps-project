## Nome: `Raysa Townsend Carraro`

Para executar este projeto:

1. Entre pasta bookstore no terminal:
```
cd bookstore/frontend
```

2. Rode npm install para instalar as dependências do projeto:

```
npm install
```

3. E em seguida, npm start, para iniciar a execução do projeto.

```
npm start
```

4. Em uma nova janela do VS Code (ou o que estiver usando) acesse a pasta do backEnd.

```
cd backend/readingJournal-api
```

5. Inicie o backend para poder rodar o projeto com os dados e fazer simulações.

```
npm start
```

## Introdução

Este projeto foi desenvolvido para a disciplina de Desenvolvimento de Sistemas Frontend na qual utilizamos o framework React para exercitar os conteúdos aprendidos em aula. Durante o desenvolvimento dos componentes foi utilizado o props, setState, useNavigate e useEffect para controlar o estado dos componentes, capturar mudanças no estado dos componentes ou mesmo passar a lista de livros ao componente BookList.

## Componentes

Os componentes estão no diretório `./src/componentes` e eles possuem as seguintes características:

- BookForm:
    - Este componente é um formulário que gerencia o cadastro de novos livros e também a edição de um livro específico, ao mostrar em tela os dados do livro preenchidos nos campos do formulário de cadastro, permitimos que o mesmo seja editado.
    - `props` - o livro a ser editado é passado por props para o componente de formulário.

- BookList:
  - Descrição: este componente renderiza e mostra em tela para o usuário a lista com os livros disponíveis. Essa lista é recebida pelo App.js por meio de `props`. Os livros da lista podem ser editados ou excluídos. Durante a edição, as informações do livro são enviadas por `props` ao componente BookForm. 

- Navbar:
  - Descrição: este componente utiliza o useNavigate para direcionar o usuário a página que o usuário deseja acessar. O navbar também passa as informaçòes relativas ao path da página para o App.js, para que o título e conteúdo das páginas sejam atualizados dinamicamente.

## Testes

Testes unitários e de integração foram adicionados ao projeto. Eles estão dentro do diretório src/__tests__. Para rodar os testes, basta digitar `npm test` no console. 

**IMPORTANTE** : Antes de rodar, certifique-se de ter rodado o `npm install` para que as dependências dos projetos de frontEnd e backEnd tenham sido instaladas corretamente. Após, entre na pasta de componentes/BookForm do projeto Bookstore e vá até o arquivo BookForm.js e comente o a importação do arquivo css, pois o teste não renderiza esses arquivos.

## Backend

Para rodar o backend corretamente, certifique-se de que a porta setada é a 8081 (http://localhost:8081/books), caso não esteja, faça a modificação necessária.

## Demonstração

<a href='./demo/demo.gif'>Clique aqui</a> para ver uma pequena demostração da solução desenvolvida.

## Conclusão

Este projeto foi desenvolvido com o objetivo de apresentar minimamente uma aplicação web para armanzenar informações de livros. Apesar da estilização apresentada e dos testes criados, ainda precisaria de mais tempo para melhorar o layout e gerar testes mais completos que pudessem refletir a realidade do mercado. De toda forma, espero que gostem do projeto!