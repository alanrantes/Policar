using System.ComponentModel.DataAnnotations;

namespace Policar.Api.Models;

public class Agendamento
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome do cliente é obrigatório.")]
    [StringLength(100)]
    public string NomeCliente { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [StringLength(20)]
    public string Telefone { get; set; } = string.Empty;

    [Required(ErrorMessage = "O veículo é obrigatório.")]
    [StringLength(100)]
    public string Veiculo { get; set; } = string.Empty;

    [StringLength(50)]
    public string Cor { get; set; } = string.Empty;

    [Required(ErrorMessage = "O serviço é obrigatório.")]
    [StringLength(100)]
    public string Servico { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data é obrigatória.")]
    public DateOnly Data { get; set; }

    [Required(ErrorMessage = "O horário é obrigatório.")]
    [StringLength(10)]
    public string Horario { get; set; } = string.Empty;

    public string Status { get; set; } = "Pendente";
}