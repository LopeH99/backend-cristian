import prisma from './prismaService.js';
import bcrypt from 'bcrypt';

class UsuariosService {

    async getAll(query){
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
          }
        return await prisma.usuario.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.usuario.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.usuario.delete({
            where: { id }
        })
    }

    async licencias(usuarioId){
        return await prisma.licencias.finMany({
            where: {
                solicitanteId: usuarioId
            }
        });
    }

    async egresados(){
        return await prisma.usuarios.findMany({
            //not eq to null
            where: { fechaEgreso: { neq: null}},
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


}

export default UsuariosService;