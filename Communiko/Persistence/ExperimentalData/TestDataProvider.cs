using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;

namespace Persistence.ExperimentalData
{
  public class TestDataProvider
  {
    public static async Task Provide(DataContext context, UserManager<AppUser> um, int count = 30)
    {
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

        activities.Add(
            new Activeness
            {
              Title = $"Тестовая активность #{i}",
              PointTime = date,
              Description = $"Описание #{month}",
              Category = $"Категория #{category}",
              City = $"Город #{city}",
              Location = $"Место проведения #{location}",
            }
        );
      }

      await context.Activities.AddRangeAsync(activities);
      await context.SaveChangesAsync();
    }
  }
}