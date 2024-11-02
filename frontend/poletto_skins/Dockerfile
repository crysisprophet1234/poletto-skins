# Use a imagem oficial do Node Alpine
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Configurações de ambiente
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn

# Cria e acessa o diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY package.json yarn.lock ./

# Instala as dependências usando o Yarn
RUN yarn install --frozen-lockfile

# Copia o restante do código para o container
COPY . ./

# Compila a aplicação
RUN yarn build

# Usa a imagem do Caddy
FROM caddy:latest

# Cria e acessa o diretório da aplicação
WORKDIR /app

# Copia o Caddyfile para o container
COPY Caddyfile ./

# Formata o Caddyfile
RUN caddy fmt Caddyfile --overwrite

# Copia os arquivos construídos da etapa de build
COPY --from=build /app/dist ./dist

# Define o comando para rodar o Caddy e servir a aplicação
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]