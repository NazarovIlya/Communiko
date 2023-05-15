namespace Application.AppConfig
{
  public class AppException
  {
    public AppException(int statusCode, string message, string details = null)
    {
      StatusCode = statusCode;
      Message = message;
      Details = details;
    }

    public int StatusCode { get; init; }
    public string Message { get; init; }
    public string Details { get; init; }
  }
}