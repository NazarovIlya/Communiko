using System.Diagnostics;
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
    [HttpPost]
    public async Task<IActionResult> Create(Activeness activeness)
    {
      Debug.WriteLine(activeness);
      return Ok(await mediator.Send(new CreateActivities.Command()
      {
        Item = activeness
      }));
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Edit(Guid id, Activeness activeness)
    {
      activeness.Id = id;
      return Ok(await mediator.Send(new EditActivities.Command
      {
        Item = activeness
      }));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(Guid id)
    {
      return Ok(await mediator.Send(new RemoveActivities.Command
      {
        Id = id
      }));
    }
  }
}