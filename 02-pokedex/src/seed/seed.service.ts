import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response-interfaces';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: FetchAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const { results } = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10000',
    );
    const pokemons = results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });
    const populate = await this.pokemonModel.create(pokemons);
    return populate;
  }
}
