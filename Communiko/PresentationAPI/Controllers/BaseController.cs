using System.Diagnostics;
using Application.Activities;
using BusinessDomain.Model;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BaseController : ControllerBase
  {
    private IMediator mediator;
    protected IMediator Mediator
    {
      get
      {
        return mediator ??= HttpContext.RequestServices
                                       .GetService<IMediator>();
      }
    }
  }
}