using Application.AppConfig;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.ExperimentalData;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(typeof(ItemsActivities.Handler));
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddDbContext<DataContext>(op =>
{
  op.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("CorsAccessControlAllowOriginPolicy", policy =>
  {
    policy.AllowAnyMethod()
          .AllowAnyHeader()
          .WithOrigins(builder.Configuration["Client-host"]);
  });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("CorsAccessControlAllowOriginPolicy");

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