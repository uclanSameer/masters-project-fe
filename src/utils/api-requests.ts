import { PostCodeResult } from "@/model/post-code";
import { GET, POST } from "./requests";
import { Response } from "@/model/response";
import { ChefSearchRequest } from "@/model/search";
import { Business } from "@/model/business";
import { MenuItem } from "@/model/menu";

export default class ApiRequests {
    public static getAddressInfo(enteredPostalCode: string): Promise<Response<Array<PostCodeResult>>> {
        const url = `http://localhost:8080/api/v1/address?postCode=${enteredPostalCode}`;
        return GET<Array<PostCodeResult>>(url);
    }

    public static uploadProfileImage(image: string, token: string): Promise<any> {
        return POST<string>('http://localhost:8080/api/v1/details/update/picture', { image: image })
            .then((res) => {
                return res;
            });
    }

    public static getNearbyBusinesses(chefSearchRequest: ChefSearchRequest) {
        return POST<Array<Business>>('http://localhost:3001/search/cheif', chefSearchRequest)
    }

    public static getMenuItemsByEmail(email: string) {
        return POST<Array<MenuItem>>('http://localhost:3001/search/menu', {
            email: email
        });
    }

    public static getCuisines(){
        return GET<Array<String>>('http://localhost:3001/search/cuisines');
    }

}