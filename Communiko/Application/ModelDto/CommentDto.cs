namespace Application.ModelDto
{
  public class CommentDto
  {
    public int Id { get; set; }
    public string Text { get; set; }
    public string UserName { get; set; }
    public string NickName { get; set; }
    public string FullName { get; set; }
    public DateTime Create { get; set; }
  }
}