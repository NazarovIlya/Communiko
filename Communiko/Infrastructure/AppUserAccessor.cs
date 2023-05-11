using System.Security.Claims;
using Application.Interface;
using Microsoft.AspNetCore.Http;

namespace Infrastructure
{
  public class AppUserAccessor : IAppUserAccessor
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    public AppUserAccessor(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public string GetUserName()
    {
      return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    }
  }
}