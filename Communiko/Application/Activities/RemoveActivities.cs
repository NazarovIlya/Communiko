using System.Diagnostics;
using Application.AppConfig;
using BusinessDomain.Model;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class RemoveActivities
  {
    public class Command : IRequest<ValidationResult<Unit>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, ValidationResult<Unit>>
    {
      private readonly DataContext context;

      public Handler(DataContext context)
      {
        this.context = context;
      }

      public async Task<ValidationResult<Unit>> Handle(Command request,
        CancellationToken cancellationToken)
      {
        var activeness = await context.Activities
                                    .FindAsync(request.Id);
        if (activeness == null) return null;
        context.Remove(activeness);
        var result = await context.SaveChangesAsync() > 0;
        if (!result) return ValidationResult<Unit>.Failure("Ошибка удаления");
        return ValidationResult<Unit>.Success(Unit.Value);
      }
    }
  }
}
