import fetchClient from "../api/fetchClient";

class OfferService{
    static async create(formData, token){
        try {
            const data = await fetchClient('offers', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return data;
        } catch (error) {
            console.error(error);
        }
        
    }

    static async getByCard(id){
        try {
            const offer = await fetchClient(`open/offers/card/${id}`, {
                method: 'get',
            });

            return offer;
        } catch (error) {
            console.error(error);
        }
        
    }

    static async cancel(id, token){

        try {
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
            return data;

        } catch (error) {
            console.error(error);
        }

        
        
    }

    static async execute(offer, token){

        try {
            const data = await fetchClient(`offers/${offer._id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

        } catch (error) {
            console.error(error)
        }

        
    }
}


export default OfferService;