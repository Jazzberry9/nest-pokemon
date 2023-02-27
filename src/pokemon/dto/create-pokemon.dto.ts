import { IsPositive, IsInt, MinLength, IsString, Min} from "class-validator";

export class CreatePokemonDto {
    
    // entero, positivo, y el minimo es 1
    @IsPositive()
    @IsInt()
    @Min(1)
    no: number;

    // string y lenght minimo de 1
    @IsString()
    @MinLength(1)
    nombre: string;
}
