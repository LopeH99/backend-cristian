import prisma from './prismaService.js';

class SugerenciasService {

    async getAll(){
        return await prisma.sugerencia.findMany();
    }

    async getOne(id){
        return await prisma.sugerencia.findUnique({
            where: { id }
        });
    }

    async create(data){
        return await prisma.sugerencia.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.sugerencia.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.sugerencia.delete({
            where: { id }
        })
    }


}

export default SugerenciasService;