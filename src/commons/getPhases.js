import { ENDPOINT } from './api/phase';

const moonConfig = {
    lang: 'en',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: "100%",
    lightColor: "rgb(255,255,230)",
    texturize: true,
}

export const loadMoonPhases = async () => {
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