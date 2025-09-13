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

    static async cancel(id, token){
        const offer = await fetchClient(`offers/card/${id}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const data = await fetchClient(`offers/cancel/${offer._id}`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });


    }
}


export default OfferService;