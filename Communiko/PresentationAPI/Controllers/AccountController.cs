using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PresentationAPI.JwtService;
using PresentationAPI.ModelDto;
namespace PresentationAPI.Controllers
{
  [AllowAnonymous]
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> userManager;
    private readonly JwtTokenService jwtTokenService;

    public AccountController(UserManager<AppUser> userManager,
                             JwtTokenService jwtTokenService)
    {
      this.jwtTokenService = jwtTokenService;
      this.userManager = userManager;
    }

    [HttpPost("auth")]
    public async Task<ActionResult<AppUserDto>> Auth(AuthLoginInfoDto authLoginDto)
    {
      var user = await userManager.FindByEmailAsync(authLoginDto.Email);
      if (user == null) return Unauthorized();
      var authResult = await userManager.CheckPasswordAsync(user, authLoginDto.Password);
      if (authResult)
      {
        return new AppUserDto
        {
          NickName = user.NickName,
          Username = user.UserName,
          Token = jwtTokenService.CreateToken(user)
        };
      }
      return Unauthorized();
    }
  }
}