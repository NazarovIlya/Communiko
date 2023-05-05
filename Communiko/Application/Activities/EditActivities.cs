using Application.AppConfig;
using AutoMapper;
using BusinessDomain.Model;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class EditActivities
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
      private readonly IMapper mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        this.context = context;
        this.mapper = mapper;
      }

      public async Task<ValidationResult<Unit>> Handle(Command request,
        CancellationToken cancellationToken)
      {
        var activeness = await context.Activities.FindAsync(request.Item.Id);
        if (activeness == null) return null;
        mapper.Map(request.Item, activeness);
        var result = await context.SaveChangesAsync() > 0;
        if (!result) return ValidationResult<Unit>.Failure("Ошибка обновления активности");
        return ValidationResult<Unit>.Success(Unit.Value);
      }
    }
  }
}
