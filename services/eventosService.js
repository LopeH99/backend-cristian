import prisma from './prismaService.js';

class EventosService {

    async getAll(){
        return await prisma.envetos.findMany();
    }

    async getOne(id){
        return await prisma.envetos.findOne({
            where: { id }
        });
    }

    async create(data){
        return await prisma.envetos.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.envetos.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.eventos.delete({
            where: { id }
        })
    }


}

export default EventosService;