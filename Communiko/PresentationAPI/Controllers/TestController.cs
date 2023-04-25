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
    public string[] Get()
    {
      return new string[] { "hello", "world" };
    }
  }
}