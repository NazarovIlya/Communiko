namespace BusinessDomain.Model
{
  public class AppUserActiveness
  {
    public Guid ActivenessId { get; set; }
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Activeness Activity { get; set; }
    public bool IsAuthor { get; set; }
  }
}