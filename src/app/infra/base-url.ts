import {Injectable} from "@angular/core";

@Injectable()
export abstract class BaseUrl{

    getBaseUrl(){
        return "http://localhost:5000/api/";
    }

}