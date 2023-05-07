using System.Net;
using System.Text.Json;
using Application.AppConfig;

namespace PresentationAPI.Middleware
{
  public class MiddlewareExceptions
  {
    private readonly RequestDelegate next;
    private readonly ILogger<MiddlewareExceptions> logger;
    private readonly IHostEnvironment env;

    public MiddlewareExceptions(RequestDelegate next,
                                ILogger<MiddlewareExceptions> logger,
                                IHostEnvironment env)
    {
      this.env = env;
      this.logger = logger;
      this.next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await next(context);
      }
      catch (Exception e)
      {
        logger.LogError(e, e.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        AppException response;

        if (env.IsDevelopment())
        {
          response = new AppException(context.Response.StatusCode,
                                      e.Message,
                                      e.StackTrace?.ToString()
                                      );
        }
        else
        {
          response = new AppException(context.Response.StatusCode,
                                      "Ошибка сервера"
                                      );
        }

        JsonSerializerOptions options = new JsonSerializerOptions
        {
          PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        string json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
      }
    }
  }
}