using AutoMapper;
using BusinessDomain.Model;

namespace Application.AppConfig
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<Activeness, Activeness>();

      CreateMap<Activeness, ActivenessDto>()
          .ForMember(d => d.AuthorName,
            o => o.MapFrom(s => s.Participants
                                 .FirstOrDefault(x => x.IsAuthor).AppUser.UserName))
          .ForMember(e => e.Users, o => o.MapFrom(s => s.Participants))
          ;

      CreateMap<AppUserActiveness, UserDto>()
          .ForMember(d => d.FullName, o => o.MapFrom(s => s.AppUser.FullName))
          .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
          .ForMember(d => d.NickName, o => o.MapFrom(s => s.AppUser.NickName))
          ;
    }
  }
}