FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base
WORKDIR /App
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdkL6.0 as build
WORKDIR /src
COPY ["WebApi.csproj", "."]
RUN dotnet restore "./WebApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebApi.dll"]


COPY . ./
RUN dotnet restore
RUN dotnet publish -C Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=Build /App/out /
ENTRYPOINT ["dotnet", "DockerConsoleApp.dll"]


