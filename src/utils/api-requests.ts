import { PostCodeResult } from "@/model/post-code";
import { GET, GetWithToken, POST, PUT, PostWithToken } from "./requests";
import { Response, Transaction } from "@/model/response";
import { ChefSearchRequest } from "@/model/search";
import { Business } from "@/model/business";
import { MenuItem } from "@/model/menu";
import { UserProfile } from "@/model/user";
import { Delivery } from "@/model/delivery";
import { UpdateDeliveryRequest } from "@/model/types";

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

    public static getCuisines() {
        return GET<Array<String>>('http://localhost:3001/search/cuisines');
    }

    public static registerDeliveryPerson(deliveryPerson: UserProfile) {
        return POST<any>('http://localhost:8080/api/v1/delivery/register', deliveryPerson);
    }

    public static getAllTransactions(token: string) {
        return GetWithToken<Array<Transaction>>('http://localhost:8080/api/v1/transactions/all', token);
    }

    public static getAllUsers(token: string) {
        return GetWithToken<Array<UserProfile>>('http://localhost:8080/api/v1/details/users/all', token);
    }

    public static getAllUsersByRole(role: string, token: string) {
        return GetWithToken<Array<UserProfile>>(`http://localhost:8080/api/v1/details/users/role?role=${role}`, token);
    }

    public static getUnassignedDeliveries(token: string) {
        return GetWithToken<Array<Delivery>>('http://localhost:8080/api/v1/delivery/unassigned', token);
    }


    public static getNotDelivered(token: string) {
        return GetWithToken<Array<Delivery>>('http://localhost:8080/api/v1/delivery/notDelivered', token);
    }

    public static getDelivered(token: string) {
        return GetWithToken<Array<Delivery>>('http://localhost:8080/api/v1/delivery/delivered', token);
    }


    public static updateDeliveryRequest(updateRequest: UpdateDeliveryRequest) {
        return POST('http://localhost:8080/api/v1/delivery/assign', updateRequest);
    }


    public static getAllToDeliverItems(token: string) {
        return GetWithToken<Array<Delivery>>('http://localhost:8080/api/v1/delivery/toDeliver', token);
    }

    public static updateDeliveryStatus(orderNumber: string) {
        return PUT(`http://localhost:8080/api/v1/delivery/delivered/${orderNumber}`, {

        });
    }
}