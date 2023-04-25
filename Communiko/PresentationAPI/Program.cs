using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.ExperimentalData;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(op =>
{
  op.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

using (var serviceScope = app.Services.CreateScope())
{
  var serviceProvider = serviceScope.ServiceProvider;
  try
  {
    var context = serviceProvider.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await TestDataProvider.Provide(context, 100);
  }
  catch (Exception e)
  {
    var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "Непредвиденная ошибка миграции");
  }
}

app.MapControllers();
app.Run();