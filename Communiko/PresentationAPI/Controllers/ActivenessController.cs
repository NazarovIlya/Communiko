using System.Diagnostics;
using Application.Activities;
using BusinessDomain.Model;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  public class ActivenessController : BaseController
  {
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
      return base.HandleResult<Activeness>(
        await Mediator.Send(new ItemActivities.Query() { Id = id })
      );
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      return base.HandleResult(
        await Mediator.Send(new ItemsActivities.Query())
      );
    }
    [HttpPost]
    public async Task<IActionResult> Create(Activeness activeness)
    {
      return base.HandleResult(
        await Mediator.Send(new CreateActivities.Command() { Item = activeness })
      );
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Edit(Guid id, Activeness activeness)
    {
      activeness.Id = id;
      return Ok(await Mediator.Send(new EditActivities.Command
      {
        Item = activeness
      }));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(Guid id)
    {
      return base.HandleResult(await Mediator.Send(new RemoveActivities.Command
      {
        Id = id
      }));
    }
  }
}