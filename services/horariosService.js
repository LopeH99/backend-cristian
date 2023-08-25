import prisma from '../services/prismaService.js';

const horasModulo = {
    'Modulo1': '8:00hs a 8:40hs',
    'Modulo2': '8:40hs a 9:20hs',
    'Modulo3': '9:30hs a 10:10hs',
    'Modulo4': '10:10hs a 10:50hs',
    'Modulo5': '11:00hs a 11:40hs',
    'Modulo6': '11:40hs a 12:15hs',
    'jornadaSimpleExtendida': '12:20hs a 13:00hs',
  };

class HorariosService {

    async getAll(){
        return await prisma.horario.findMany();
    }

    async getOne(id){
        return await prisma.horario.findUnique({
            where: { id }
        });
    }

    async create(data){
        const { modulo } = data
        const moduloCapitalizado = modulo.charAt(0).toUpperCase() + modulo.slice(1);
        const moduloValidado = moduloCapitalizado.replace(' ', '');
        const rangoHorario = horasModulo[moduloValidado];
        data.rangoHorario = rangoHorario
        return await prisma.horario.create({
            data
        });
    }

    async update(id, data){
        const { modulo } = data
        const moduloCapitalizado = modulo?.charAt(0).toUpperCase() + modulo.slice(1);
        const moduloValidado = moduloCapitalizado.replace(' ', '');
        const rangoHorario = horasModulo[moduloValidado];
        data.rangoHorario = rangoHorario
        return await prisma.horario.update({
            where: { id },
            data
        });
    }

    async delete(id){
        return await prisma.horario.delete({
            where: { id }
        })
    }

}

export default HorariosService;