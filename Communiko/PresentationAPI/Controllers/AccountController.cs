using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PresentationAPI.ModelDto;

namespace PresentationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> um;

    public AccountController(UserManager<AppUser> userManager)
    {
      this.um = userManager;
    }

    [HttpPost("auth")]
    public async Task<ActionResult<AppUserDto>> Auth(AuthLoginInfoDto authLoginDto)
    {
      System.Console.WriteLine($" >>> {authLoginDto.Email}");
      System.Console.WriteLine($" >>> {authLoginDto.Password}");
      var user = await um.FindByEmailAsync(authLoginDto.Email);
      if (user == null) return Unauthorized();
      var authResult = await um.CheckPasswordAsync(user, authLoginDto.Password);
      if (authResult)
      {
        return new AppUserDto
        {
          NickName = user.NickName,
          Username = user.UserName,
          Token = "token"
        };
      }
      return Unauthorized();
    }
  }
}