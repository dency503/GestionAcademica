/* Esta función recibe como parámetro la respuesta de error del backend
   y evalúa el estado y los errores */
   export function parsearErroresAPI(response: any): string[] {
    const resultado: string[] = [];

    // En caso de que el servidor esté dando problemas (error 500)
    if (response.status === 500) {
        resultado.push('Ha ocurrido un error en el servidor. Favor intentar más tarde');
        return resultado;
    }

    // Si hay un error en la respuesta
    if (response.error) {
        console.log(response.error)
        if (typeof response.error === 'string') { // Si solo se recibe un error
            resultado.push(response.error);
        } else { // Si hay más de un error
            const mapaErrores = response.error.errors;
            for (const campo in mapaErrores) {
                if (mapaErrores.hasOwnProperty(campo)) {
                    mapaErrores[campo].forEach((mensajeError: any) => {
                        resultado.push(`${campo}: ${mensajeError}`);
                    });
                }
            }
        }
    }
    return resultado;
}
