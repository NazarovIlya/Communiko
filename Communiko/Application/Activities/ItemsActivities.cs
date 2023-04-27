using BusinessDomain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class ItemsActivities
{
  public class Query : IRequest<List<Activeness>> { }

  public class Handler : IRequestHandler<Query, List<Activeness>>
  {
    private readonly DataContext context;

    public Handler(DataContext context)
    {
      this.context = context;
    }

    public async Task<List<Activeness>> Handle(Query request, CancellationToken token)
    {
      return await context.Activities.ToListAsync();
    }
  }
}