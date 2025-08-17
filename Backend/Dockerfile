FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY eventhub.restapi/pom.xml .
COPY eventhub.restapi/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
WORKDIR /opt/app
COPY --from=build /app/target/eventhub.restapi-0.0.1-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "app.jar"]