using BusinessDomain.Model;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class ItemActivities
  {
    public class Query : IRequest<Activeness>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Activeness>
    {
      private readonly DataContext context;

      public Handler(DataContext context)
      {
        this.context = context;
      }

      public async Task<Activeness> Handle(Query request,
       CancellationToken cancellationToken)
      {
        return await context.Activities.FindAsync(request.Id);
      }
    }
  }
}