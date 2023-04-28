using AutoMapper;
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
      private readonly IMapper mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        this.context = context;
        this.mapper = mapper;
      }

      public async Task<Unit> Handle(Command request,
        CancellationToken cancellationToken)
      {
        var activity = await context.Activities
                                    .FindAsync(request.Item.Id);

        mapper.Map(request.Item, activity);
        await context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}
