// agrega los metodos de mongoose, para trabajar mas facil
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Los schemas son los responsables de crear y leer los documentos de MongoDb
@Schema()
export class Pokemon extends Document {
    // no necesito especificar el id en esta caso porque mongodb lo genera

    // prop de propiedades y el index es el indice que identificara el name para buscarlo
    @Prop({
        unique: true,
        index: true
    })
    nombre: string;
    
    @Prop({
        unique: true,
        index: true
    })
    no: number;
    
}
// entities: son el modelo para la collecion y los definen para mongo en este caso


export const PokemonSchema = SchemaFactory.createForClass( Pokemon )