import prisma from './prismaService.js';

class SugerenciasService {

    async getAll(){
        return await prisma.sugerencias.findMany();
    }

    async getOne(id){
        return await prisma.sugerencias.findOne({
            where: { id }
        });
    }

    async create(data){
        return await prisma.sugerencias.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.sugerencias.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.sugerencias.delete({
            where: { id }
        })
    }


}

export default SugerenciasService;