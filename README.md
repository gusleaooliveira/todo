Para rodar o projeto

Caso não tenha feito o download baixe
`git clone https://github.com/gusleaooliveira/todo.git`

Dentro da pasta todo, baixe os arquivos:

```bash
cd todo
npm install
yarn install
```

> Caso não tenha baixe o yarn `npm install --global yarn`

Baixe o json server

`npm install -g json-server`

Em um terminal dentro da pasta **todo** rode:

`json-server -p 5656 db.json`

Em outro rode:

`yarn start`


Abra o **https://localhost:3000/**