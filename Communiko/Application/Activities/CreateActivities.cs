using BusinessDomain.Model;
using FluentValidation;
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

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Item).SetValidator(new ActivitiesValidators());
      }
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
