import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responses.interface';

@Injectable()

export class SeedService {
  // crear dependencia de axios
  private readonly axios: AxiosInstance = axios;

  async executeSeed(){

    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    
    data.results.map( ({name, url}) => { 
      const num = +url.at(-2);
      return { name, num }
    })
  }
}
