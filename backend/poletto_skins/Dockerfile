# Etapa 1: Build da aplicação
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo pom.xml e quaisquer outros arquivos de configuração necessários
COPY pom.xml ./

# Baixe as dependências necessárias
RUN mvn dependency:go-offline -B

# Copie o código-fonte
COPY src ./src

# Compile a aplicação
RUN mvn package -DskipTests

# Etapa 2: Construção da imagem final
FROM eclipse-temurin:17-jre-alpine

# Defina o diretório de trabalho
WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=prod

# Copie o jar compilado da etapa de build
COPY --from=build /app/target/*.jar app.jar

# Exponha a porta que a aplicação usa (por exemplo, 8080)
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java","-jar","app.jar"]