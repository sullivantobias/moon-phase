import { ENDPOINT } from './api/phase';

export const loadMoonPhases = async (monthIndex = 1) => {
    const moonConfig = {
        lang: 'en',
        month: monthIndex,
        year: new Date().getFullYear(),
        size: "100%",
        lightColor: "rgb(255,255,230)",
        texturize: true,
    }

    const gets = []

    for (const i in moonConfig) {
        gets.push(i + "=" + encodeURIComponent(moonConfig[i]))
    }

    try {
        const datas = await fetch(`${ENDPOINT}/?${gets.join("&")}`);

        return datas.json()
    } catch (error) {
        throw error;
    }
}