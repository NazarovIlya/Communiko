using Application.AppConfig;
using BusinessDomain.Model;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class ItemActivities
  {
    public class Query : IRequest<ValidationResult<Activeness>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, ValidationResult<Activeness>>
    {
      private readonly DataContext context;

      public Handler(DataContext context)
      {
        this.context = context;
      }

      public async Task<ValidationResult<Activeness>> Handle(Query request,
       CancellationToken cancellationToken)
      {
        return ValidationResult<Activeness>
                .Success(await context.Activities.FindAsync(request.Id));
      }
    }
  }
}