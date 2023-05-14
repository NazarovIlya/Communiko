using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;

namespace Persistence.ExperimentalData
{
  public class TestDataProvider
  {
    public static async Task Provide(DataContext context, UserManager<AppUser> um, int count = 30)
    {
      // перед обновлением удалить бд
      List<AppUser> users = new();
      if (!um.Users.Any())
      {
        for (int i = 0; i < 5; i++)
        {
          AppUser user = new AppUser()
          {
            NickName = $"nick_{i}",
            UserName = $"user_{i}",
            Email = $"user_{i}@ksergei.tech",
            FullName = $"Full Name {i}"
          };
          var r = await um.CreateAsync(user, $"QWErt%^&${i}!");
          users.Add(user);
        }
      }

      if (context.Activities.Any()) return;

      List<Activeness> activities = new List<Activeness>();

      for (int i = 1; i <= count; i++)
      {
        int month = Random.Shared.Next(1, 6);
        int category = Random.Shared.Next(1, 10);
        int city = Random.Shared.Next(1, 10);
        int location = Random.Shared.Next(1, 10);
        DateOnly date = DateOnly.FromDateTime(DateTime.Now).AddMonths(month);

        int indexUser1 = Random.Shared.Next(3);
        int indexUser2 = indexUser1 + Random.Shared.Next(3);

        var list = new List<AppUserActiveness>()
        {
          new AppUserActiveness()
          {
              AppUser =users[indexUser1],
              IsAuthor = true
          },
          new AppUserActiveness()
          {
              AppUser =users[indexUser2],
              IsAuthor = false
          }
        };
        activities.Add(
            new Activeness
            {
              Title = $"Тестовая активность #{i}",
              PointTime = date,
              Description = $"Описание #{month}",
              Category = $"Категория #{category}",
              City = $"Город #{city}",
              Location = $"Место проведения #{location}",
              IsActual = true,
              Participants = list
            }
        );
      }

      await context.Activities.AddRangeAsync(activities);
      await context.SaveChangesAsync();
    }
  }
}