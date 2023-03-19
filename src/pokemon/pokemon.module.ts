import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [ConfigModule, 
    MongooseModule.forFeature([
    {
      // Este name no es el del entity, sino del extends Document
      name: Pokemon.name,
      schema: PokemonSchema,
    }
  ])],
  exports: [PokemonService]
})
export class PokemonModule {}
