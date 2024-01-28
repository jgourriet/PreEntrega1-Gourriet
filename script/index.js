//! SIMULADOR DE COMPRA DE PRODUCTOS, CON LA CONDICION DE COMPRA CON DESCUENTO
//! SI LA CANTIDAD INSERTADA ES MAYOR O IGUAL QUE 3, EN ESTE CASO APLICA UN DESCUENTO
//! DEL 20%, SI ESTO NO SE CUMPLE NO APLICA NINGUN DESCUENTO

const MARCA = "TIENDA JS";
const BIENVENIDA = `¡Bienvenido a la ${MARCA}!`;

console.log(MARCA);

alert(MARCA);
let nombre = prompt("Ingrese su Nombre").toUpperCase();
let apellido = prompt("Ingrese su Apellido").toUpperCase();

const productos = [
    { nombre: 'Producto 1', precio: 25.99 },
    { nombre: 'Producto 2', precio: 19.99 },
    { nombre: 'Producto 3', precio: 30.49 }
];

function simularCompra() {
    let carrito = {};
    let total = 0;

    while (true) {
        const seleccion = prompt(`
  Productos disponibles:
  1. ${productos[0].nombre}: $${productos[0].precio.toFixed(2)}
  2. ${productos[1].nombre}: $${productos[1].precio.toFixed(2)}
  3. ${productos[2].nombre}: $${productos[2].precio.toFixed(2)}
  
  Ingrese el número del producto que desea comprar (o escriba "fin" para salir):`);

        if (seleccion.toLowerCase() === 'fin') {
            break;
        }

        const seleccionIndex = parseInt(seleccion) - 1;

        if (!isNaN(seleccionIndex) && seleccionIndex >= 0 && seleccionIndex < productos.length) {
            const cantidad = parseInt(prompt('Ingrese la cantidad de unidades:'));

            if (cantidad > 0) {
                const productoSeleccionado = productos[seleccionIndex].nombre;
                carrito[productoSeleccionado] = cantidad;
                total += productos[seleccionIndex].precio * cantidad;

                if (cantidad < 3) {
                    const respuestaDescuento = prompt(`¡Comprando 3 o más unidades de ${productoSeleccionado} obtiene un descuento del 20%! ¿Desea agregar más cantidad? (Sí/No):`);
                    if (respuestaDescuento.toLowerCase() === 'sí' || respuestaDescuento.toLowerCase() === 'si') {
                        const nuevaCantidad = parseInt(prompt(`Ingrese una cantidad adicional de ${productoSeleccionado}:`));
                        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                            carrito[productoSeleccionado] += nuevaCantidad;
                            total += productos[seleccionIndex].precio * nuevaCantidad;
                        } else {
                            alert('Cantidad no válida. No se ha agregado más cantidad.');
                        }
                    }
                }
            } else {
                alert('La cantidad ingresada no es válida. Inténtelo de nuevo.');
            }
        } else {
            alert('Número de producto no válido. Inténtelo de nuevo.');
        }
    }

    console.log('Resumen de la compra:');
    for (const producto in carrito) {
        console.log(`${producto}: ${carrito[producto]} unidades`);
    }

    if (total > 0) {
        let descuentoAplicado = total;
        if (Object.values(carrito).reduce((acc, curr) => acc + curr, 0) >= 3) {
            descuentoAplicado *= 0.8;
            console.log('Se aplica un descuento del 20% debido a la compra de 3 o más unidades.');
        } else {
            console.log('No aplica descuento.');
        }

        console.log(`Total a pagar: $${descuentoAplicado.toFixed(2)}`);
    } else {
        console.log('No se ha realizado ninguna compra.');
    }
}

simularCompra();
