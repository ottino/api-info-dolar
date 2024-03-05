import axios from 'axios';
import cheerio from 'cheerio';

const URL = 'https://www.infobae.com/economia/divisas/dolar-hoy/';

export async function handler(event, context) {
    try {
        const dolarLibre = await getDolarLibre();
        return {
            statusCode: 200,
            body: JSON.stringify({ dolarLibre })
        };
    } catch (error) {
        console.error('Error al obtener el valor del dólar Libre:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener el valor del dólar Libre' })
        };
    }
}

async function getDolarLibre() {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const dolarLibreElement = $('.exchange-dolar-title').filter(function() {
            return $(this).text().trim() === 'Dólar Libre';
        });
        
        const dolarLibreAmount = dolarLibreElement.siblings('.exchange-dolar-amount').text().trim();
        
        return dolarLibreAmount;
    } catch (error) {
        console.error('Error al obtener el valor del dólar Libre:', error);
        throw error;
    }
}
