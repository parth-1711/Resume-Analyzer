# Use JDK 18 for building the application
FROM eclipse-temurin:18-jdk AS build

# Set working directory
WORKDIR /app

# Copy the Maven files first (to leverage caching)
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn

# Download dependencies first
RUN sudo ./mvnw dependency:go-offline

# Copy the entire project
COPY . .

RUN touch env

# Build the application
RUN ./mvnw clean package -DskipTests

# Use a lightweight JRE for running the application
FROM eclipse-temurin:18-jre

# Set working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
