using Application.Activities;
using BusinessDomain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  public class ActivenessController : BaseController
  {
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
      return base.HandleResult<ActivenessDto>(
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
    [Authorize(Policy = "IsActivenessAuthor")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Edit(Guid id, Activeness activeness)
    {
      activeness.Id = id;
      return base.HandleResult(await Mediator.Send(new EditActivities.Command
      {
        Item = activeness
      }));
    }
    [Authorize(Policy = "IsActivenessAuthor")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(Guid id)
    {
      return base.HandleResult(await Mediator.Send(new RemoveActivities.Command
      {
        Id = id
      }));
    }
    [HttpPost("{id}/update")]
    public async Task<IActionResult> Update(Guid id)
    {
      return HandleResult(await Mediator.Send(new UpdateAppUserActiveness.Command { Id = id }));
    }
  }
}