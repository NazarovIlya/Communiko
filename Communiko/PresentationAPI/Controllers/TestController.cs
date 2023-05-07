using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PresentationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TestController : ControllerBase
  {
    [HttpPost]
    public string[] Get()
    {
      return new string[] { "hello", "world" };
    }
  }
}