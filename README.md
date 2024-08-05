<h1>Sistema que gera uma URL encurtada</h1>
<p>Uma API para gerar uma URL encurtada, com banco de dados MySql.</p>

<h2>Pré-requisitos</h2>
<p>
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas e realizar suas configurações: <a href="https://git-scm.com">Git</a>, <a href="https://nodejs.org/en/">Node.js</a>. 
Além disto é bom ter um editor para trabalhar com o código como <a href="https://code.visualstudio.com/">VSCode</a>
</p>

<h2>Depois de clonar o projeto em sua maquina, acesse a pasta do projeto no terminal/cmd</h2>

<h3>Vá até "backend"</h3>
$ cd .\backend\

<h3>Instale as dependências</h3>
$ npm install

<h3>Crie o arquivo .env em API_encurtador_url/Backend/, onde será necessário incluir as seguintes informações:<h3>
<p>
    
    PORT_SERVER = 3030                              # porta que será utilizada para subir a aplicação; *Recomedo copiar essa linha
    BASEURL = http://localhost:3030                 # url base para utilização das urls criadas; *Recomedo copiar essa linha

    #db_configuration
    DB_USER=XXXXXX                                  # usuario do db
    DB_PASS=XXXXXX                                  # senha do db 
    DB_HOST=XXXXXX                                  # host do db
    DB_NAME=XXXXXX                                  # nome do db

    #auth
    JWT_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   # Para obter o seu JWT_SECRET, execute o seguinte comando no terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
<p>

<h3>Ainda na pasta "backend", execute o seguinte comando e a API estará disponível em "http://localhost:3030"</h3>
$ node config/server/Server.js

<h3>Importe o esquema do banco de dados para o MySQL Workbench de API_encurtador_url/Backend/migrations<h3>

<p>*Exemplo abaixo:<p>
<p>https://www.youtube.com/watch?v=q0EBUXTQQRY&t=9s<p>

<h3>🛠 Tecnologias e bibliotecas</h3>
<p>Este projeto utiliza várias tecnologias e bibliotecas para fornecer funcionalidades robustas e seguras. Abaixo está uma breve descrição de cada uma:</p>
<br>

<p>Toda a aplicação foi construída na versão estavel mais atual: v20.16.0 LTS (04/08/2024);<p>

- [Node.js](https://nodejs.org/en)
<p>Node.js é um ambiente de execução JavaScript baseado no motor V8 do Chrome. Ele permite que você execute código JavaScript no lado do servidor, oferecendo uma arquitetura assíncrona e orientada a eventos, ideal para aplicações escaláveis.<p>
<br>

- [bcrypt](https://www.npmjs.com/package/bcrypt)
<p>Bcrypt é uma biblioteca para hashing de senhas, usada para criptografar senhas de forma segura antes de armazená-las no banco de dados. Ela utiliza um algoritmo de hashing adaptativo que torna mais difícil para atacantes realizarem ataques de força bruta.<p>
<br>

- [Express](https://expressjs.com/)
<p>Express é um framework de aplicativo web para Node.js, projetado para simplificar o desenvolvimento de aplicativos web e APIs. Ele fornece uma estrutura robusta para o gerenciamento de rotas, middleware e muito mais.<p>
<br>

- [JWT](https://www.npmjs.com/package/jsonwebtoken)
<p>Jsonwebtoken (JWT) é uma biblioteca para criação e verificação de tokens JWT. Os tokens JWT são usados para autenticação e autorização, permitindo a troca segura de informações entre partes, como cliente e servidor.<p>
<br>

- [MySQL](https://www.npmjs.com/package/jsonwebtoken)
<p>MySQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Ele é amplamente utilizado para armazenar, recuperar e gerenciar dados em uma ampla variedade de aplicações, desde pequenas aplicações até grandes sistemas de gerenciamento de dados corporativos.<p>
<br>

<P>Para mais informações sobre a API, acesse o arquivo API_encurtador_url/Backend/docs.<P>

<P>
    
    Em API_encurtador_url/Backend/docs/Arquitetura/Descrição do projeto e pastas.txt temos a explicação da arquitetura utilizada.

    Em API_encurtador_url/Backend/docs/DB/Download do mysql......txt temos um link para o youtube onde realizo o download e instalação do mysql workbench. O vídeo autoral, foi criado para ajudar alguns amigos meus que há alguns meses estavam iniciando na área de programação.
    Em API_encurtador_url/Backend/docs/DB/Relacionamentos.txt temos as estruturas das tabelas que utilizei.
    
    Em API_encurtador_url/Backend/docs/Endpoints/Rotas.txt temos as rotas que serão necessárias para testar a aplicação, assim como suas regras para consumo da API.
    Em API_encurtador_url/Backend/docs/Endpoints/ temos um arquivo com extensão .json que tem as estruturas das rotas prontas para teste. *Para a aplicação postman.

    Em API_encurtador_url/Backend/docs/Requisitos/Requisitos.txt temos as regras que segui para desenvolver essa API.
<P>


<br>

<br>

<h3>Pontos de melhorias<h3>
<p>
    
    - Utilização de um ORM para mitigar SQL-injection;
    - Utilizar Bearer tokens expiráveis;
    - Uso do Typescript para maior segurança ao definir as variaveis, parâmetros de entrada e saída;
    - Redis para otimizar busca no servidor;
<p>

<h3>Pontos abordados<h3>
<p>

    -   API estar documentada;
    -   Ter validação de entrada em todos os lugares necessários;
    -   Deixar no README pontos de melhoria para caso o sistema necessite escalar horizontalmente e quais serão os maiores desafios;
    -   Utilizar changelog com a realidade do seu desenvolvimento;
    -   Git tags definindo versões de release, por exemplo release 0.1.0 como encurtador criado, 0.2.0 como autenticação, 0.3.0 como operações de usuário no encurtador, 0.4.0 como contabilização de acessos;
    -   Código tolerante a falhas;
<p>


<P>Muito obrigado, até mais.<P>
