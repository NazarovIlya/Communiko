# chmod +x
dotnet new gitignore

mkdir Communiko
cd Communiko
dotnet new sln
dotnet new webapi -n PresentationAPI
dotnet new classlib -n Application
dotnet new classlib -n BusinessDomain
dotnet new classlib -n Persistence

dotnet sln add PresentationAPI/PresentationAPI.csproj
dotnet sln add Application/Application.csproj
dotnet sln add BusinessDomain/BusinessDomain.csproj
dotnet sln add Persistence/Persistence.csproj

cd PresentationAPI
dotnet add reference ../Application/Application.csproj
cd ../Application
dotnet add reference ../BusinessDomain/BusinessDomain.csproj
dotnet add reference ../Persistence/Persistence.csproj
cd ../Persistence
dotnet add reference ../BusinessDomain/BusinessDomain.csproj
cd ..

dotnet restore