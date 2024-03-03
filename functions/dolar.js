
import { default as axios } from 'axios';
import { default as cheerio } from 'cheerio';



const URL = 'https://www.infobae.com/economia/divisas/dolar-hoy/';

export async function handler(event, context) {
    try {
        const dolarBancoNacion = await getDolarBancoNacion();
        const dolarTurista = await getDolarTurista();
        const dolarMEP = await getDolarMEP();
        const dolarLibre = await getDolarLibre();

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                dolarBancoNacion,
                dolarTurista,
                dolarMEP,
                dolarLibre
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener los valores del dólar' })
        };
    }
}

async function getDolarBancoNacion() {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const dolarBancoNacionElement = $('.exchange-dolar-title').filter(function() {
            return $(this).text().trim() === 'Dólar Banco Nación';
        });
        
        const dolarBancoNacionAmount = dolarBancoNacionElement.siblings('.exchange-dolar-amount').text().trim();
        
        return dolarBancoNacionAmount;
    } catch (error) {
        console.error('Error al obtener el valor del dólar Banco Nación:', error);
        return null;
    }
}

async function getDolarTurista() {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const dolarTuristaElement = $('.exchange-dolar-title').filter(function() {
            return $(this).text().trim() === 'Dólar Turista';
        });
        
        const dolarTuristaAmount = dolarTuristaElement.siblings('.exchange-dolar-amount').text().trim();
        
        return dolarTuristaAmount;
    } catch (error) {
        console.error('Error al obtener el valor del dólar Turista:', error);
        return null;
    }
}

async function getDolarMEP() {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const dolarMEPElement = $('.exchange-dolar-title').filter(function() {
            return $(this).text().trim() === 'Dólar MEP';
        });
        
        const dolarMEPAmount = dolarMEPElement.siblings('.exchange-dolar-amount').text().trim();
        
        return dolarMEPAmount;
    } catch (error) {
        console.error('Error al obtener el valor del dólar MEP:', error);
        return null;
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
        return null;
    }
}

