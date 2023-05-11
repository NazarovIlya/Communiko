using Microsoft.AspNetCore.Identity;

namespace BusinessDomain.Model
{
  public class AppUser : IdentityUser
  {
    public string NickName { get; set; }
    public string FullName { get; set; }
    public ICollection<AppUserActiveness> Activities { get; set; }
    public AppUser() => Activities = new List<AppUserActiveness>();
  }
}