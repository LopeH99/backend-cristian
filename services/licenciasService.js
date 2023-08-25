import prisma from '../services/prismaService.js';

const selectOptions = {
    id:true,
    nombre:true,
    apellido:true,
    dni:true,
    sexo:true,
    fechaNacimiento:true,
    cargo:true,
    email:true,
    password: false,
    rol:true,
    created_at:true,
    updated_at:true,
};

class LicenciasService {

    async getAll(query){
        let whereClause = {};
        if (query) {
            if (query.id) {
              whereClause.id = +query.id; // Filter by ID if provided
            }

            if (query?.autorizada !== undefined) {
                const autorizada = query?.autorizada; 
                if (autorizada === 'false') {
                  whereClause.autorizanteId = null; // Filter by role if provided
                }else{
                  whereClause.autorizanteId = { not: null }; // Filter by role if provided
                }            
                  console.log(whereClause)
            }
        
          }
          return await prisma.licencia.findMany({
              where: whereClause,              
              include: {
                solicitante: {
                    select: selectOptions,
                },
                autorizante: {
                    select: selectOptions,
                }
              }
          });
    }

    async getOne(id){
        return await prisma.licencia.findUnique({
            where: { id }
        });
    }

    async create(data){
        return await prisma.licencia.create({
            data
        });
    }

    async update(id, data){
        return await prisma.licencia.update({
            where: { id },
            data
        });
    }

    async delete(id){
        return await prisma.licencia.delete({
            where: { id }
        })
    }

    async autorizante(id){
        return await prisma.licencia.findUnique({
            where: { id }
            
        })
    }

    async solicitante(id){
        return await prisma.licencia.findUnique({
            where: { id }            
        })
    }

    async autorizar(id, autorizanteId){
        return await prisma.licencia.update({
            where: { id },
            data: {
                autorizanteId
            }            
        })
    }


}

export default LicenciasService;