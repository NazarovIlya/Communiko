using AutoMapper;
using BusinessDomain.Model;

namespace Application.AppConfig
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<Activeness, Activeness>();
    }
  }
}