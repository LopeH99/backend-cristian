import prisma from './prismaService.js';
import bcrypt from 'bcrypt';


const selectOptions = {
    id:true,
    nombre:true,
    apellido:true,
    dni:true,
    sexo:true,
    fechaNacimiento:true,
    cargo:true,
    telefono:true,
    revista:true,
    antiguedadDocente:true,
    antiguedadInstitucion:true,
    observaciones:true,
    legajo:true,
    gradoEscolar:true,
    seccion:true,
    telefonoTutor:true,
    fechaIngreso:true,
    pagoSeguroEscolar:true,
    fechaEgreso:true,
    email:true,
    password: false,
    rol:true,
    created_at:true,
    updated_at:true,
};
class UsuariosService {

    async getAll(query){
       
        let whereClause = {}; // Initialize an empty where clause

        if (query) {
          if (query.id) {
            whereClause.id = query.id; // Filter by ID if provided
          }
      
          if (query.rol) {
            whereClause.rol = query.rol.toUpperCase(); // Filter by role if provided
          }

          if (query?.egresado !== undefined) {
              whereClause.rol = 'ALUMNO';
              const egresado = query?.egresado; 
              if (egresado === 'false') {
                whereClause.fechaEgreso = null; // Filter by role if provided
              }else{
                whereClause.fechaEgreso = { not: null }; // Filter by role if provided
              }            
                console.log(whereClause)
          }
      
        }
        return await prisma.usuario.findMany({
            select: selectOptions,
            where: whereClause
        });
    }

    async getOne(id){
        return await prisma.usuario.findUnique({
            where: { id },
            select: {
                id:true,
                nombre:true,
                apellido:true,
                dni:true,
                sexo:true,
                fechaNacimiento:true,
                cargo:true,
                telefono:true,
                revista:true,
                antiguedadDocente:true,
                antiguedadInstitucion:true,
                observaciones:true,
                legajo:true,
                gradoEscolar:true,
                seccion:true,
                telefonoTutor:true,
                fechaIngreso:true,
                pagoSeguroEscolar:true,
                fechaEgreso:true,
                email:true,
                password: false,
                rol:true,
                created_at:true,
                updated_at:true,
            }
        });
    }

    async create(data){
        const existingUserWithEmail = await prisma.usuario.findFirst({
            where: {
              email: data.email
            }
          });
      
          // Check if a user with the same dni exists
          const existingUserWithDni = await prisma.usuario.findFirst({
            where: {
              dni: data.dni
            }
          });
      
          if (existingUserWithEmail) {
            throw new Error('La dirección de email ya se encuentra en uso');
          }
      
          if (existingUserWithDni) {
            throw new Error('El dni ya se encuentra en uso');
          }
      
          // Hash the password
          if (data?.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
          }else{
            const hashedPassword = await bcrypt.hash('1234', 10);
            data.password = hashedPassword;
          }
          
        return await prisma.usuario.create({
            data
        });
    }

    async update(id, data){
        try {
            // Fetch the current user to validate dni uniqueness
            const currentUser = await prisma.usuario.findUnique({
                where: { id },
                select: { dni: true }
            });
    
            if (!currentUser) {
                throw new Error('User not found');
            }
    
            // Check if the provided dni is different from the current dni
            if (data.dni !== currentUser.dni) {
                // Check if another user already has the provided dni
                const existingUserWithDni = await prisma.usuario.findFirst({
                    where: { dni: data.dni }
                });
    
                if (existingUserWithDni) {
                    throw new Error('Otro usuario ya posee ese dni');
                }
            }

            if (data.email !== currentUser.email) {
                // Check if another user already has the provided dni
                const existingUserWithEmail = await prisma.usuario.findFirst({
                    where: { email: data.email }
                });
    
                if (existingUserWithEmail && existingUserWithEmail?.id !== id) {
                    throw new Error('Otro usuario ya posee esa dirección de email');
                }
            }
    
            return await prisma.usuario.update({
                where: { id },
                data,
                select: selectOptions
            });
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    async delete(id){
        await prisma.licencia.deleteMany({
            where: { solicitanteId: id }
        })
        return await prisma.usuario.delete({
            where: { id }
        })
    }

    async licencias(usuarioId){
        return await prisma.licencia.finMany({
            where: {
                solicitanteId: usuarioId
            }
        });
    }

    async egresados(){
        return await prisma.usuario.findMany({
            //not eq to null
            where: { fechaEgreso: { neq: null}},
            select: selectOptions
        });
    }


}

export default UsuariosService;