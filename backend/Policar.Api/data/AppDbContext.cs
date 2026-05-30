using Microsoft.EntityFrameworkCore;
using Policar.Api.Models;

namespace Policar.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Agendamento> Agendamentos { get; set; }
}