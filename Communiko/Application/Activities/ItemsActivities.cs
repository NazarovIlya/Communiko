using Application.AppConfig;
using BusinessDomain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class ItemsActivities
{
  public class Query : IRequest<ValidationResult<List<Activeness>>> { }

  public class Handler : IRequestHandler<Query, ValidationResult<List<Activeness>>>
  {
    private readonly DataContext context;

    public Handler(DataContext context)
    {
      this.context = context;
    }

    public async Task<ValidationResult<List<Activeness>>> Handle(Query request, CancellationToken token)
    {
      var items = await context.Activities
                               .Include(activeness => activeness.Participants)
                               .ThenInclude(user => user.AppUser)
                               .ToListAsync();
      return ValidationResult<List<Activeness>>.Success(items);
    }
  }
}