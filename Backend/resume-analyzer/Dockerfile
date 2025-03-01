# Use an official OpenJDK 18 base image
FROM eclipse-temurin:18-jdk-alpine

# Set working directory
WORKDIR /app

# Copy build files
COPY target/resume-analyzer-*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
