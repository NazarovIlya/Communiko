using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusinessDomain.Model;
using Microsoft.IdentityModel.Tokens;

namespace PresentationAPI.JwtService
{
  public class JwtTokenService
  {
    private readonly IConfiguration config;

    public JwtTokenService(IConfiguration config)
    {
      this.config = config;
    }

    public string CreateToken(AppUser user)
    {
      var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
        };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Secret-key"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddMinutes(20),
        SigningCredentials = creds
      };

      var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}