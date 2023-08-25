import prisma from './prismaService.js';

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
class SugerenciasService {

    async getAll(query){
        let whereClause = {};
        if (query) {
            if (query.id) {
              whereClause.id = +query.id; // Filter by ID if provided
            }

            if (query?.anonima !== undefined) {
                const anonima = query?.anonima; 
                if (anonima === 'false') {
                  whereClause.anonima = false; // Filter by role if provided
                }else{
                  whereClause.anonima = true; // Filter by role if provided
                }            
                  console.log(whereClause)
            }
        
          }
          return await prisma.sugerencia.findMany({
              where: whereClause,              
              include: {
                usuario: {
                    select: selectOptions,
                }
              }
          });
    }

    async getOne(id){
        return await prisma.sugerencia.findUnique({
            where: { id }
        });
    }

    async create(req){
        const data = req.body;
        console.log("usuario", req.authUser)
        const usuarioId = req?.authUser?.id;
        if (data?.anonima == false) {
            data.usuarioId = usuarioId;
        }
        return await prisma.sugerencia.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.sugerencia.update({
            where: { id },
            data
        });
    }

    async delete(id){
        return await prisma.sugerencia.delete({
            where: { id }
        })
    }


}

export default SugerenciasService;