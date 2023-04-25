using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessDomain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace PresentationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ActivenessController : ControllerBase
  {
    private readonly DataContext dataContext;

    public ActivenessController(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activeness>> Get(Guid id)
    {
      return await dataContext.Activities
                              .FindAsync(id);
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activeness>>> Get()
    {
      return await dataContext.Activities
                              .ToListAsync();
    }
  }
}