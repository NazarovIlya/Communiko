using BusinessDomain.Model;

namespace BusinessDomain.Commenting
{
  public class Comment
  {
    public int Id { get; set; }
    public string Text { get; set; }
    public AppUser Author { get; set; }
    public DateTime Create { get; set; }
    public Activeness Activity { get; set; }

    public Comment()
    {
      Create = DateTime.UtcNow;
    }
  }
}