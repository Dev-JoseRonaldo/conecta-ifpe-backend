FROM node:16

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de package e package-lock
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
