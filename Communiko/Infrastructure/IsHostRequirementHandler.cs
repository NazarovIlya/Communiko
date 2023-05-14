using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure
{
  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext dataContext;
    private readonly IHttpContextAccessor httpContextAccessor;
    public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
      this.httpContextAccessor = httpContextAccessor;
      this.dataContext = dbContext;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   IsHostRequirement requirement)
    {
      var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (userId == null) return Task.CompletedTask;

      var id = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues
          .SingleOrDefault(x => x.Key == "id").Value?.ToString());

      var attendee = dataContext.AppUserActivities
          .AsNoTracking()
          .FirstOrDefaultAsync(x => x.AppUserId == userId && x.ActivenessId == id)
          .Result;

      if (attendee == null) return Task.CompletedTask;

      if (attendee.IsAuthor) context.Succeed(requirement);

      return Task.CompletedTask;
    }
  }
}