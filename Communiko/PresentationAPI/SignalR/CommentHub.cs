using Application.Commenting;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace PresentationAPI.SignalR
{
  public class CommentHub : Hub
  {
    private readonly IMediator mediator;

    public CommentHub(IMediator mediator)
    {
      this.mediator = mediator;
    }

    public async Task SendComment(CreateComment.Command command)
    {
      var comment = await mediator.Send(command);

      await Clients.Group(command.ActivitiesId.ToString())
          .SendAsync("GetComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
      var httpContext = Context.GetHttpContext();
      var activityId = httpContext.Request.Query["activitiesId"];
      await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
      var result = await mediator.Send(
        new ItemsComment.Query
        {
          ActivitiesId = Guid.Parse(activityId)
        });
      await Clients.Caller.SendAsync("WaitComments", result.Value);
    }
  }
}

