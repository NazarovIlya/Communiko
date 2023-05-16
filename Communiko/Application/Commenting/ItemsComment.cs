using Application.AppConfig;
using Application.ModelDto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commenting
{
  public class ItemsComment
  {
    public class Query : IRequest<ValidationResult<List<CommentDto>>>
    {
      public Guid ActivitiesId { get; set; }
    }

    public class Handler : IRequestHandler<Query, ValidationResult<List<CommentDto>>>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        this.mapper = mapper;
        this.context = context;
      }

      public async Task<ValidationResult<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var comments = await context.Comments
            .Where(x => x.Activity.Id == request.ActivitiesId)
            .OrderByDescending(x => x.Create)
            .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return ValidationResult<List<CommentDto>>.Success(comments);
      }
    }
  }
}