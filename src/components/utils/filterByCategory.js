export const filtrarPorCategoria = (articulos, categoria, busqueda = "") => {
  return articulos
    .filter((art) => art.category.toLowerCase() === categoria.toLowerCase())
    .filter((art) =>
      art.title.toLowerCase().includes(busqueda.toLowerCase())
    );
};
