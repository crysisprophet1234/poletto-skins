# Etapa de build
FROM node:18.20.3-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install --frozen-lockfile --prefer-offline

# Copie o restante do código-fonte
COPY . .

# Defina a variável de ambiente
ENV NODE_ENV=production

# Faça o build da aplicação
RUN yarn build && yarn cache clean --all

# Etapa final
FROM nginx:1.21.0-alpine

# Copie os arquivos de build para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf  

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]