import qs from "qs";

export const nivelesEscolares = [
  { nombre: "PRIMARIA" },
  { nombre: "SECUNDARIA" },
  { nombre: "MEDIA SUPERIOR" },
  { nombre: "SUPERIOR" },
];

// const filters = `filters[nivel][$eq]=${opcion}`;

export function getFiltros(opciones) {
  // let filtros = "";
  // opciones.forEach((nivel, indice) => {
  //   const filtro = `filters[nivel][$in][${indice}]=${nivel}&`;
  //   filtros += filtro;
  // });
  // return filtros;

  return qs.stringify({
    filters: {
      nivel: {
        $in: opciones,
      },
      latitud: {
        $ne: 0
      },
      longitud: {
        $ne: 0
      }
    },
  });
}

//ICON MARKER
// {
//                     url: "https://cdn-icons.flaticon.com/png/512/4902/premium/4902082.png?token=exp=1653450651~hmac=bfa186e7cb962262a754fcbaf8b141a7",

//                     scaledSize: new google.maps.Size(34, 34),
//                   }
