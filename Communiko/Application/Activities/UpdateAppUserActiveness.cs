using Application.AppConfig;
using Application.Interface;
using BusinessDomain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class UpdateAppUserActiveness
  {
    public class Command : IRequest<ValidationResult<Unit>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, ValidationResult<Unit>>
    {
      private readonly DataContext context;
      private readonly IAppUserAccessor userAccessor;
      public Handler(DataContext context, IAppUserAccessor userAccessor)
      {
        this.userAccessor = userAccessor;
        this.context = context;
      }

      public async Task<ValidationResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var item = await context.Activities
            .Include(a => a.Participants).ThenInclude(u => u.AppUser)
            .SingleOrDefaultAsync(x => x.Id == request.Id);

        if (item == null) return null;

        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

        if (user == null) return null;

        var authorUsername = item.Participants.FirstOrDefault(x => x.IsAuthor)?.AppUser.UserName;

        var visit = item.Participants.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

        if (visit != null && authorUsername == user.UserName)
          item.IsActual = !item.IsActual;

        if (visit != null && authorUsername != user.UserName)
          item.Participants.Remove(visit);

        if (visit == null)
        {
          visit = new AppUserActiveness
          {
            AppUser = user,
            Activity = item,
            IsAuthor = false
          };

          item.Participants.Add(visit);
        }

        var result = await context.SaveChangesAsync() > 0;
        if (result)
        {
          return ValidationResult<Unit>.Success(Unit.Value);
        }
        else
        {
          return ValidationResult<Unit>.Failure("Проблема обновления");
        }
      }
    }
  }
}