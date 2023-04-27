using BusinessDomain.Model;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class EditActivities
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
        var activity = await context.Activities
                                    .FindAsync(request.Item.Id);

        activity.Title = request.Item.Title ?? activity.Title;
        activity.Category = request.Item.Category ?? activity.Category;
        activity.Description = request.Item.Description ?? activity.Description;
        activity.City = request.Item.City ?? activity.City;
        activity.PointTime = request.Item.PointTime;
        activity.Location = request.Item.Location ?? activity.Location;
        await context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}
