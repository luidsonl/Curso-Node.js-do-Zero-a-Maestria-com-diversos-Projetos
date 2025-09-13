import fetchClient from "../api/fetchClient";

class OfferService{
    static async create(formData, token){
        const data = await fetchClient('offers', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return data;
    }
}


export default OfferService;