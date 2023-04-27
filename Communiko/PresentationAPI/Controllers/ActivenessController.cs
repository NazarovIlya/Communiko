using Application.Activities;
using BusinessDomain.Model;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ActivenessController : ControllerBase
  {
    private readonly IMediator mediator;
    public ActivenessController(IMediator mediator)
    {
      this.mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activeness>> Get(Guid id)
    {
      return await mediator.Send(new ItemActivities.Query() { Id = id });
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activeness>>> Get()
    {
      return await mediator.Send(new ItemsActivities.Query());
    }
  }
}