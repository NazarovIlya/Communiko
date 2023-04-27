using BusinessDomain.Model;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class CreateActivities
  {
    public class Command : IRequest
    {
      public Activeness Item { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext context;

      public Handler(DataContext context)
      {
        this.context = context;
      }

      public async Task<Unit> Handle(Command request,
        CancellationToken cancellationToken)
      {
        context.Activities.Add(request.Item);
        await context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}
