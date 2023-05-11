using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PresentationAPI.JwtService;
using PresentationAPI.ModelDto;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

    [HttpPost("registration")]
    public async Task<ActionResult<AppUserDto>> Registration(RegisterInfoDto registrationDto)
    {
      if (await userManager.Users.AnyAsync(x => x.UserName == registrationDto.Username))
      {
        return BadRequest("Такой пользователь уже зарегистрирован");
      }

      if (await userManager.Users.AnyAsync(x => x.Email == registrationDto.Email))
      {
        return BadRequest("Такой Email уже зарегистрирован");
      }

      var user = new AppUser
      {
        NickName = registrationDto.NickName,
        Email = registrationDto.Email,
        UserName = registrationDto.Username
      };

      var result = await userManager.CreateAsync(user, registrationDto.Password);

      if (result.Succeeded)
      {
        return new AppUserDto
        {
          NickName = user.NickName,
          Token = jwtTokenService.CreateToken(user),
          Username = user.UserName
        };
      }

      return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet("current")]
    public async Task<ActionResult<AppUserDto>> Current()
    {
      var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

      return new AppUserDto
      {
        NickName = user.NickName,
        Username = user.UserName,
        Token = jwtTokenService.CreateToken(user)
      };
    }
  }
}