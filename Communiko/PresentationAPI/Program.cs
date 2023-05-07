using Application.AppConfig;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.ExperimentalData;
using FluentValidation;
using FluentValidation.AspNetCore;
using Application.Activities;
using PresentationAPI.Middleware;
using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;

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

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivities>();

builder.Services.AddAuthentication();

builder.Services.AddIdentityCore<AppUser>(op =>
{
  // op.Password.RequiredLength = 8;
  // op.Password.RequireUppercase = false;
}).AddEntityFrameworkStores<DataContext>();


var app = builder.Build();

app.UseMiddleware<MiddlewareExceptions>();

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
    var um = serviceProvider.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await TestDataProvider.Provide(context, um, 5);
  }
  catch (Exception e)
  {
    var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "Непредвиденная ошибка миграции");
  }
}

app.MapControllers();
app.Run();