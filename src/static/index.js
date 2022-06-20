import qs from "qs";

export const nivelesEscolares = [
  { nombre: "PRIMARIA" },
  { nombre: "SECUNDARIA" },
  { nombre: "MEDIA SUPERIOR" },
  { nombre: "SUPERIOR" },
];

// http://localhost:1337/api/escuelas?filters[nivel][$contains]=PRIMARIA
// const filters = `filters[nivel][$eq]=${'PRIMARIA'}`;

export function getFiltros(opciones) {
  // Dependencia para filtros en strapi
  return qs.stringify({
    filters: {
      nivel: {
        $in: opciones,
      },
      $and: [
        {
          latitud: {
            $ne: 0,
          },
        },
        {
          longitud: {
            $ne: 0,
          },
        },
      ],
    },
  });
}

//ICON MARKER
// {
//                     url: "https://cdn-icons.flaticon.com/png/512/4902/premium/4902082.png?token=exp=1653450651~hmac=bfa186e7cb962262a754fcbaf8b141a7",

//                     scaledSize: new google.maps.Size(34, 34),
//                   }
