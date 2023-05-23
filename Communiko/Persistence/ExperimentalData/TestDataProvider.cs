using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity;

namespace Persistence.ExperimentalData
{
  public class TestDataProvider
  {
    public static async Task Provide(DataContext context, UserManager<AppUser> um)
    {
      if (um.Users.Any() && context.Activities.Any()) return;

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
          users.Add(user);
        }
      }

      foreach (var user in users)
      {
        await um.CreateAsync(user, $"QWEqwe123$!");
      }

      List<Activeness> activities = new List<Activeness>()
      {
        new Activeness
        {
          Title = $"Тестовая активность #{1}",
          PointTime = DateOnly.FromDateTime(DateTime.Now).AddMonths(1),
          Description = $"Описание #{1}",
          Category = $"Категория #{1}",
          City = $"Город #{1}",
          Location = $"Место проведения #{1}",
          IsActual = true,
          Participants = new List<AppUserActiveness>()
          {
            new AppUserActiveness()
            {
                AppUser =users[0],
                IsAuthor = true
            },
            new AppUserActiveness()
            {
                AppUser =users[1],
                IsAuthor = false
            }
          }
        },

        new Activeness
        {
          Title = $"Тестовая активность #{2}",
          PointTime = DateOnly.FromDateTime(DateTime.Now).AddMonths(2),
          Description = $"Описание #{2}",
          Category = $"Категория #{2}",
          City = $"Город #{2}",
          Location = $"Место проведения #{2}",
          IsActual = true,
          Participants = new List<AppUserActiveness>()
          {
            new AppUserActiveness()
            {
                AppUser =users[1],
                IsAuthor = true
            },
            new AppUserActiveness()
            {
                AppUser =users[2],
                IsAuthor = false
            }
          }
        },

        new Activeness
        {
          Title = $"Тестовая активность #{3}",
          PointTime = DateOnly.FromDateTime(DateTime.Now).AddMonths(3),
          Description = $"Описание #{3}",
          Category = $"Категория #{3}",
          City = $"Город #{1}",
          Location = $"Место проведения #{3}",
          IsActual = true,
          Participants = new List<AppUserActiveness>()
          {
            new AppUserActiveness()
            {
                AppUser =users[2],
                IsAuthor = true
            },
            new AppUserActiveness()
            {
                AppUser =users[3],
                IsAuthor = false
            }
          }
        },

        new Activeness
        {
          Title = $"Тестовая активность #{4}",
          PointTime = DateOnly.FromDateTime(DateTime.Now).AddMonths(4),
          Description = $"Описание #{4}",
          Category = $"Категория #{4}",
          City = $"Город #{4}",
          Location = $"Место проведения #{4}",
          IsActual = true,
          Participants = new List<AppUserActiveness>()
          {
            new AppUserActiveness()
            {
                AppUser =users[3],
                IsAuthor = true
            },
            new AppUserActiveness()
            {
                AppUser =users[4],
                IsAuthor = false
            }
          }
        },

        new Activeness
        {
          Title = $"Тестовая активность #{5}",
          PointTime = DateOnly.FromDateTime(DateTime.Now).AddMonths(5),
          Description = $"Описание #{5}",
          Category = $"Категория #{5}",
          City = $"Город #{5}",
          Location = $"Место проведения #{5}",
          IsActual = true,
          Participants = new List<AppUserActiveness>()
          {
            new AppUserActiveness()
            {
                AppUser =users[4],
                IsAuthor = true
            },
            new AppUserActiveness()
            {
                AppUser =users[0],
                IsAuthor = false
            }
          }
        },
      };

      foreach (var activity in activities)
      {
        await context.Activities.AddAsync(activity);
      }

      await context.SaveChangesAsync();
    }
  }
}