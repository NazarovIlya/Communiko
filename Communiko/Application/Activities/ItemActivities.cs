using Application.AppConfig;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BusinessDomain.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class ItemActivities
  {
    public class Query : IRequest<ValidationResult<ActivenessDto>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, ValidationResult<ActivenessDto>>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        this.context = context;
        this.mapper = mapper;
      }

      public async Task<ValidationResult<ActivenessDto>> Handle(Query request,
       CancellationToken cancellationToken)
      {
        var activeness = await context.Activities
        .ProjectTo<ActivenessDto>(mapper.ConfigurationProvider)
        .FirstOrDefaultAsync(item => item.Id == request.Id);
        return ValidationResult<ActivenessDto>
                .Success(activeness);
      }
    }
  }
}