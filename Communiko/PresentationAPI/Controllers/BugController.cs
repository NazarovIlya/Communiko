
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  public class BugController : BaseController
  {
    [HttpGet("status400")]
    public ActionResult GetBadRequest()
    {
      return BadRequest("400 Bad Request");
    }

    [HttpGet("status404")]
    public ActionResult GetNotFound()
    {
      return NotFound("404 Not Found");
    }

    [HttpGet("status500")]
    public ActionResult GetServerError()
    {
      throw new Exception("500 Internal Server Error");
    }
  }
}