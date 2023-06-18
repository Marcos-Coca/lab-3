using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using webapi.DB;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Solicitud : ControllerBase
    {
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ok>> PostSolicitud(Solicitude newSolicitud)
        {

            using var db = new VisaContext();
            var solicitud = new Solicitude
            {
                Apellidos = newSolicitud.Apellidos,
                Direccion = newSolicitud.Direccion,
                Nombres = newSolicitud.Nombres,
                Sexo = newSolicitud.Sexo,
                Telefono = newSolicitud.Telefono,
                Foto = newSolicitud.Foto
            };
            db.Solicitudes.Add(solicitud);
            await db.SaveChangesAsync();

            return Ok();
        }


    }
}
