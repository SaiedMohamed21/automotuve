# ── Stage 1: Build React Frontend ──
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy package manifests and install node dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source files
COPY index.html vite.config.ts tsconfig*.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY imports/ ./imports/
COPY .figma/ ./.figma/

# Build frontend production bundle into /app/dist
RUN npm run build

# ── Stage 2: Build & Publish ASP.NET Core Backend ──
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-builder
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Engineer Job Order.csproj", "./"]
RUN dotnet restore "Engineer Job Order.csproj"

# Copy full repository source
COPY . .

# Publish ASP.NET Core application
RUN dotnet publish "Engineer Job Order.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Copy React production build (dist) into ASP.NET Core wwwroot
COPY --from=frontend-builder /app/dist /app/publish/wwwroot

# ── Stage 3: Final Production Container ──
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Ensure uploads directory structure exists
RUN mkdir -p /app/wwwroot/uploads/branding

# Copy published application from backend-builder
COPY --from=backend-builder /app/publish .

# Railway dynamic PORT configuration (defaults to 8080 if PORT environment variable is not supplied)
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Engineer Job Order.dll"]
