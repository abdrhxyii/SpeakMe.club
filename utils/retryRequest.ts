import axios from "axios";

const retryRequest = async (url: string, payload: any, retries: number = 3, delay: number = 2000) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await axios.post(url, payload);
            return response;
        } catch (error) {
            attempts += 1;
            if (attempts === retries) {
                throw error; 
            }
            console.log(`Retry attempt ${attempts} failed. Retrying...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

export default retryRequest;