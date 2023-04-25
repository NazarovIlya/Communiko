Структура

Примерные "слои" приложения 
- Presentation
- Business
- Persistence
- Database

Подготовка и структура проекта

```
dotnet new gitignore

mkdir Communiko
cd Communiko
dotnet new sln
dotnet new webapi -n PresentationAPI
dotnet new classlib -n Application
dotnet new classlib -n BusinessDomain
dotnet new classlib -n Persistence

```

```
dotnet sln add PresentationAPI/PresentationAPI.csproj
dotnet sln add Application/Application.csproj
dotnet sln add BusinessDomain/BusinessDomain.csproj
dotnet sln add Persistence/Persistence.csproj
```

```
cd PresentationAPI
dotnet add reference ../Application/Application.csproj
cd ../Application
dotnet add reference ../BusinessDomain/BusinessDomain.csproj
dotnet add reference ../Persistence/Persistence.csproj
cd ../Persistence
dotnet add reference ../BusinessDomain/BusinessDomain.csproj
cd ..
```

```
dotnet restore
```



# Проект Persistence

## Начало работы с базой

### Установить и настроить PostgreSQL или [развернуть Docker-контейнер](https://t.me/iksergeyru/176)

Библиотека EF для PostgreSQL:
- `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`


## Проект PresentationAPI

Библиотеки для миграций 
- `dotnet add package Microsoft.EntityFrameworkCore.Design`
- `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.Design`

Пример строки подключения: 
```
"PostgreSQLConnection": "Host=localhost:8888; Username=postgres; Password=12345678;Database=Communiko"
```

Конфигурация контекста:

```
builder.Services.AddDbContext<DataContext>(op =>
{
op.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
});
```

Для проверки инструментов EF в терминале выполнить `dotnet ef`

*у меня: `Entity Framework Core .NET Command-line Tools 7.0.4`

Если нет `dotnet-ef` нужно выполнить 
`dotnet tool install --global dotnet-ef`
если старая версия – выполнить `dotnet tool update --global dotnet-ef`

_!Будьте внимательны: версия EF должна соответствовать версии .NET_

Выполняем `dotnet restore` для обновления зависимостей 

Выполняем из корневого каталога с sln файлом для первой миграции

`dotnet ef migrations add initial-migration -s PresentationAPI -p Persistence`

И обновления базы данных:

`dotnet ef database update -s PresentationAPI`