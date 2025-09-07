import fetchClient from "../api/fetchClient";

class OfferService{
    static async create(formData, token){
        const data = await fetchClient('offers', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        return data;
    }
}


export default OfferService;