using Microsoft.EntityFrameworkCore;
using Policar.Api.Data;
using Policar.Api.Models;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

var servicosPermitidos = new[]
{
    "Polimento automotivo",
    "Cristalização",
    "Higienização interna",
    "Restauração de faróis"
};

var horariosPermitidos = new[]
{
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
};

var statusPermitidos = new[]
{
    "Pendente",
    "Confirmado",
    "Concluído",
    "Cancelado"
};

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.MapGet("/", () => "API Policar rodando!");

app.MapGet("/api/agendamentos", async (AppDbContext db) =>
{
    var agendamentos = await db.Agendamentos
        .OrderBy(a => a.Data)
        .ThenBy(a => a.Horario)
        .ToListAsync();

    return Results.Ok(agendamentos);
});

app.MapGet("/api/agendamentos/{id}", async (int id, AppDbContext db) =>
{
    if (id <= 0)
        return Results.BadRequest("Id inválido.");

    var agendamento = await db.Agendamentos.FindAsync(id);

    return agendamento is null
        ? Results.NotFound("Agendamento não encontrado.")
        : Results.Ok(agendamento);
});

app.MapPost("/api/agendamentos", async (Agendamento agendamento, AppDbContext db) =>
{
    agendamento.NomeCliente = agendamento.NomeCliente.Trim();
    agendamento.Telefone = agendamento.Telefone.Trim();
    agendamento.Veiculo = agendamento.Veiculo.Trim();
    agendamento.Cor = agendamento.Cor.Trim();
    agendamento.Servico = agendamento.Servico.Trim();
    agendamento.Horario = agendamento.Horario.Trim();

    if (string.IsNullOrWhiteSpace(agendamento.NomeCliente))
        return Results.BadRequest("Nome do cliente é obrigatório.");

    if (agendamento.NomeCliente.Length < 3)
        return Results.BadRequest("Nome do cliente deve ter pelo menos 3 caracteres.");

    if (string.IsNullOrWhiteSpace(agendamento.Telefone))
        return Results.BadRequest("Telefone é obrigatório.");

    var telefoneSomenteNumeros = Regex.Replace(agendamento.Telefone, @"\D", "");

    if (telefoneSomenteNumeros.Length is < 10 or > 11)
        return Results.BadRequest("Telefone inválido. Informe DDD + número.");

    if (string.IsNullOrWhiteSpace(agendamento.Veiculo))
        return Results.BadRequest("Veículo é obrigatório.");

    if (agendamento.Veiculo.Length < 2)
        return Results.BadRequest("Veículo deve ter pelo menos 2 caracteres.");

    if (string.IsNullOrWhiteSpace(agendamento.Cor))
        return Results.BadRequest("Cor do veículo é obrigatória.");

    if (string.IsNullOrWhiteSpace(agendamento.Servico))
        return Results.BadRequest("Serviço é obrigatório.");

    if (!servicosPermitidos.Contains(agendamento.Servico))
        return Results.BadRequest("Serviço inválido.");

    if (string.IsNullOrWhiteSpace(agendamento.Horario))
        return Results.BadRequest("Horário é obrigatório.");

    if (!horariosPermitidos.Contains(agendamento.Horario))
        return Results.BadRequest("Horário inválido.");

    if (agendamento.Data < DateOnly.FromDateTime(DateTime.Today))
        return Results.BadRequest("Não é permitido agendar datas anteriores.");

    if (agendamento.Data.DayOfWeek == DayOfWeek.Sunday)
        return Results.BadRequest("Não é permitido agendar aos domingos.");

    if (agendamento.Data == DateOnly.FromDateTime(DateTime.Today))
    {
        var horarioSelecionado = TimeOnly.Parse(agendamento.Horario);

        if (horarioSelecionado < TimeOnly.FromDateTime(DateTime.Now))
            return Results.BadRequest("Não é permitido agendar horários que já passaram.");
    }

    if (string.IsNullOrWhiteSpace(agendamento.Status))
        agendamento.Status = "Pendente";

    if (!statusPermitidos.Contains(agendamento.Status))
        return Results.BadRequest("Status inválido.");

    var horarioJaConfirmado = await db.Agendamentos.AnyAsync(a =>
        a.Data == agendamento.Data &&
        a.Horario == agendamento.Horario &&
        a.Status == "Confirmado"
    );

    if (horarioJaConfirmado)
        return Results.BadRequest("Já existe um agendamento confirmado para essa data e horário.");

    db.Agendamentos.Add(agendamento);

    await db.SaveChangesAsync();

    return Results.Created(
        $"/api/agendamentos/{agendamento.Id}",
        agendamento
    );
});

app.MapPut("/api/agendamentos/{id}/status", async (int id, string status, AppDbContext db) =>
{
    if (id <= 0)
        return Results.BadRequest("Id inválido.");

    if (string.IsNullOrWhiteSpace(status))
        return Results.BadRequest("Status é obrigatório.");

    status = status.Trim();

    if (!statusPermitidos.Contains(status))
        return Results.BadRequest("Status inválido.");

    var agendamento = await db.Agendamentos.FindAsync(id);

    if (agendamento is null)
        return Results.NotFound("Agendamento não encontrado.");

    if (agendamento.Status == "Concluído")
        return Results.BadRequest("Não é possível alterar um agendamento já concluído.");

    if (agendamento.Status == "Cancelado" && status == "Concluído")
        return Results.BadRequest("Não é possível concluir um agendamento cancelado.");

    if (status == "Confirmado")
    {
        var horarioJaConfirmado = await db.Agendamentos.AnyAsync(a =>
            a.Id != id &&
            a.Data == agendamento.Data &&
            a.Horario == agendamento.Horario &&
            a.Status == "Confirmado"
        );

        if (horarioJaConfirmado)
            return Results.BadRequest("Já existe outro agendamento confirmado para essa data e horário.");
    }

    agendamento.Status = status;

    await db.SaveChangesAsync();

    return Results.Ok(agendamento);
});

app.MapDelete("/api/agendamentos/{id}", async (int id, AppDbContext db) =>
{
    if (id <= 0)
        return Results.BadRequest("Id inválido.");

    var agendamento = await db.Agendamentos.FindAsync(id);

    if (agendamento is null)
        return Results.NotFound("Agendamento não encontrado.");

    db.Agendamentos.Remove(agendamento);

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();