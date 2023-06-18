using System;
using System.Collections.Generic;

namespace webapi.DB;

public partial class Solicitude
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Sexo { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Foto { get; set; } = null!;
}
