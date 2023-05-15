namespace Application.ModelDto
{
  public class ActivenessDto
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public string City { get; set; }
    public DateOnly PointTime { get; set; }
    public string Location { get; set; }
    public string AuthorName { get; set; }
    public bool IsActual { get; set; }
    public ICollection<UserDto> Users { get; set; }
  }
}