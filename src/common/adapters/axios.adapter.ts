import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { httpAdapter } from "../interfaces/http-adapter.interface";


@Injectable()
export class AxiosAdapter implements httpAdapter {
    
    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error(`Theres an error while consuming an API -- Check Logs`)
        }
    }

}

