import prisma from '../services/prismaService.js';

class LicenciasService {

    async getAll(){
        return await prisma.licencias.findMany();
    }

    async getOne(id){
        return await prisma.licencias.findOne({
            where: { id }
        });
    }

    async create(data){
        return await prisma.licencias.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.licencias.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.licencias.delete({
            where: { id }
        })
    }

    async autorizante(id){
        return await prisma.licencias.findOne({
            where: { id }
            
        })
    }

    async solicitante(id){
        return await prisma.licencias.findOne({
            where: { id }            
        })
    }


}

export default LicenciasService;