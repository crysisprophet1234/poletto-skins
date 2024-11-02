# Use a imagem oficial do Node Alpine
FROM node:lts-alpine AS build

# Configurações de ambiente
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn

# Passa as variáveis de ambiente para o build
ARG VITE_POLETTO_SKINS_API_URL
ARG VITE_POLETTO_SKINS_API_PORT

ENV VITE_POLETTO_SKINS_API_URL=${VITE_POLETTO_SKINS_API_URL}
ENV VITE_POLETTO_SKINS_API_PORT=${VITE_POLETTO_SKINS_API_PORT}

# Cria e acessa o diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY package.json yarn.lock ./

# Instala as dependências usando o Yarn
RUN yarn install --frozen-lockfile

# Copia o restante do código para o container
COPY . ./

# Compila a aplicação com as variáveis de ambiente
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