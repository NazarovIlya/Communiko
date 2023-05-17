using Application.AppConfig;
using Application.Interface;
using Application.ModelDto;
using AutoMapper;
using BusinessDomain.Commenting;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commenting
{
  public class CreateComment
  {
    public class Command : IRequest<ValidationResult<CommentDto>>
    {
      public Guid ActivitiesId { get; set; }
      public string Text { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(e => e.Text).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Command, ValidationResult<CommentDto>>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;
      private readonly IAppUserAccessor userAccessor;

      public Handler(DataContext context, IMapper mapper, IAppUserAccessor userAccessor)
      {
        this.userAccessor = userAccessor;
        this.context = context;
        this.mapper = mapper;
      }

      public async Task<ValidationResult<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activeness = await context.Activities
            .Include(x => x.Comments)
            .ThenInclude(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == request.ActivitiesId);


        if (activeness == null) return null;

        var user = await context.Users
            .SingleOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

        var comment = new Comment
        {
          Author = user,
          Activity = activeness,
          Text = request.Text
        };

        activeness.Comments.Add(comment);

        var success = await context.SaveChangesAsync() > 0;

        if (success) return ValidationResult<CommentDto>.Success(mapper.Map<CommentDto>(comment));

        return ValidationResult<CommentDto>.Failure("Ошибка отправки комментария");
      }
    }
  }
}