import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-responses.interface';

@Injectable()

export class SeedService {
  // // crear dependencia de axios
  // private readonly axios: AxiosInstance = axios;
  
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ){}

  async executeSeed(){

    await this.pokemonService.deleteManyPoke({});

    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)

    const arrayToBeFilled: { nombre: string, no: number }[] = [];

    
    data.results.forEach(({name:nombre, url}) => { 

      const segments = url.split('/');
      const no = +segments[ segments.length - 2]

      arrayToBeFilled.push({nombre, no});

      
      // const datos: CreatePokemonDto = {...CreatePokemonDto, ...result}
      // await this.pokemonService.createControl(datos)
    });
    
    await this.pokemonService.insertManyPoke( arrayToBeFilled );

    return `Seed executed`
    
  }
}
