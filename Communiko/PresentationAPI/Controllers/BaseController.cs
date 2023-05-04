using System.Diagnostics;
using Application.Activities;
using Application.AppConfig;
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

    protected IActionResult HandleResult<T>(ValidationResult<T> obj)
    {
      if (obj.IsSuccess && obj.Value != null)
        return Ok(obj.Value);
      if (obj.IsSuccess && obj.Value == null)
        return NotFound();
      return BadRequest(obj.Error);
    }
  }
}