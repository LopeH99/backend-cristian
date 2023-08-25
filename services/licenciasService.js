import prisma from '../services/prismaService.js';

class LicenciasService {

    async getAll(){
        return await prisma.licencia.findMany();
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

    async update(data){
        const { id } = data;
        return await prisma.licencia.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.licencia.delete({
            where: { id }
        })
    }

    async autorizante(id){
        return await prisma.licencia.findOne({
            where: { id }
            
        })
    }

    async solicitante(id){
        return await prisma.licencia.findOne({
            where: { id }            
        })
    }


}

export default LicenciasService;