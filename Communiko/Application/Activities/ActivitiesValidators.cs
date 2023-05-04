using BusinessDomain.Model;
using FluentValidation;

namespace Application.Activities
{
  public class ActivitiesValidators : AbstractValidator<Activeness>
  {
    public ActivitiesValidators()
    {
      RuleFor(x => x.Category).NotEmpty();
      RuleFor(x => x.City).NotEmpty();
      RuleFor(x => x.Description).NotEmpty();
      RuleFor(x => x.Location).NotEmpty();
      RuleFor(x => x.PointTime).NotEmpty();
      RuleFor(x => x.Title).NotEmpty();
    }
  }
}