import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    /*
    Para hacer la inserccion a BD, se tiene que
    injectar dependecia del modelo creado en entity
    Lo que se inyecta en injectModel es lo que esta en el modulo...
    ... el Model es de mongoose nomas pero el generico es el export de entity
    */
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  // el create es de mongoose
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.nombre = createPokemonDto.nombre.toLowerCase();
    
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto ) 
      return pokemon

    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // con Id
    if( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({no: term})
    }
    
    //con MongoID
    if ( !pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById( term )
    }

    // con Nombre
    if (!pokemon){
      pokemon = await this.pokemonModel.findOne({ nombre : term.toLowerCase().trim()})
    }


    if(!pokemon)
      throw new NotFoundException(`Pokemon con el term ${term} no encontrado`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne( term );

    
    try {

      await pokemon.updateOne( updatePokemonDto )
      return { ...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {
        this.handleException(error);
    }
  }

  async remove(term: string) {
    // const pokemon = await this.findOne( term );
    // await pokemon.deleteOne();
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne( {_id: term} )

    if( deletedCount === 0)
      throw new BadRequestException(`The MongoId #${term} doesn't exist`)

    return;
  }

  private handleException( error: any){
    if( error.code === 11000){
      throw new BadRequestException(`Pokemon already exist in the DB`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create pokemon -- Check Server Logs`)
  }
}
