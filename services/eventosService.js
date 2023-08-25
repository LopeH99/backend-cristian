import prisma from "./prismaService.js";

class EventosService {
  async getAll(query) {
    let whereClause = {}; // Initialize an empty where clause

    if (query) {
      if (query.id) {
        whereClause.id = query.id; // Filter by ID if provided
      }

      if (query?.novedad !== undefined) {
        const esNovedad = query?.novedad;
        if (esNovedad === "false") {
          whereClause.novedad = false; // Filter by role if provided
        } else {
          whereClause.novedad = true; // Filter by role if provided
        }
      }

      if (query?.incidencia !== undefined) {
        const esIncidencia = query?.incidencia;
        if (esIncidencia === "false") {
          whereClause.incidencia = false; // Filter by role if provided
        } else {
          whereClause.incidencia = true; // Filter by role if provided
        }
      }
    }
    return await prisma.evento.findMany({
      where: whereClause,
    });
  }

  async getOne(id) {
    return await prisma.evento.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.evento.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.evento.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id) {
    return await prisma.evento.delete({
      where: { id },
    });
  }
}

export default EventosService;
