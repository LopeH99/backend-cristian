import prisma from './prismaService.js';

class MenusService {

    async getAll(){
        return await prisma.menu.findMany();
    }

    async getOne(id){
        return await prisma.menu.findUnique({
            where: { id }
        });
    }

    async create(data){
        return await prisma.menu.create({
            data
        });
    }

    async update(data){
        const { id } = data;
        return await prisma.menu.update({
            where: { id },
            body: { ...data }
        });
    }

    async delete(id){
        return await prisma.menu.delete({
            where: { id }
        })
    }


}

export default MenusService;