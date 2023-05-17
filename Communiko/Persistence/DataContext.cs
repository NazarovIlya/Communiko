using BusinessDomain.Commenting;
using BusinessDomain.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Activeness> Activities { get; set; }
    public DbSet<AppUserActiveness> AUParticipants { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<AppUserActiveness> AppUserActivities { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<AppUserActiveness>(
        x => x.HasKey(
          userActiveness =>
            new { userActiveness.AppUserId, userActiveness.ActivenessId }
          )
      );

      builder.Entity<AppUserActiveness>()
          .HasOne(userActiveness => userActiveness.AppUser)
          .WithMany(user => user.Activities)
          .HasForeignKey(userActiveness => userActiveness.AppUserId);

      builder.Entity<AppUserActiveness>()
          .HasOne(userActiveness => userActiveness.Activity)
          .WithMany(activeness => activeness.Participants)
          .HasForeignKey(userActiveness => userActiveness.ActivenessId);

      builder.Entity<Comment>()
      .HasOne(e => e.Activity)
      .WithMany(e => e.Comments)
      .OnDelete(DeleteBehavior.Cascade);
    }
  }
}