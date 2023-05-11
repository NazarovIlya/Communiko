using System.Diagnostics;
using Application.AppConfig;
using Application.Interface;
using BusinessDomain.Model;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class CreateActivities
  {
    public class Command : IRequest<ValidationResult<Unit>>
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

    public class Handler : IRequestHandler<Command, ValidationResult<Unit>>
    {
      private readonly DataContext context;
      public readonly IAppUserAccessor appUserAccessor;

      public Handler(DataContext context, IAppUserAccessor appUserAccessor)
      {
        this.appUserAccessor = appUserAccessor;
        this.context = context;
      }

      public async Task<ValidationResult<Unit>> Handle(Command request,
        CancellationToken cancellationToken)
      {

        var user = await context.Users.FirstOrDefaultAsync(appUser =>
                    appUser.UserName == appUserAccessor.GetUserName());

        var newParticipant = new AppUserActiveness
        {
          AppUser = user,
          Activity = request.Item,
          IsAuthor = true
        };
        request.Item.Participants.Add(newParticipant);

        var missing = await context.Activities.FindAsync(request.Item.Id) == null;
        if (!missing) return ValidationResult<Unit>.Failure("Такая запись есть");

        context.Activities.Add(request.Item);
        var res = await context.SaveChangesAsync() > 0;
        return res ? ValidationResult<Unit>.Success(Unit.Value)
                      : ValidationResult<Unit>.Failure("Ошибка данных");
      }
    }
  }
}
