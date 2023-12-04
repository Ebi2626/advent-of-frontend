export interface Lokalizacja {
    x: number;
    y: number;
    z: number;
    czas: number;
}

interface NajlepszaLokalizacja {
    lokalizacja: Lokalizacja | null;
    wartosc: number
};

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number;

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
    let najlepszaLokalizacja: NajlepszaLokalizacja = {
        lokalizacja: null,
        wartosc: 0,
    };

    lokalizacje.forEach(({x, y, z, czas}) => {
            const result = mapa(x, y, z, czas);
            if(result > najlepszaLokalizacja.wartosc) {
                najlepszaLokalizacja = {
                    lokalizacja: {x, y, z, czas},
                    wartosc: result,
                };
            }
    });

    return najlepszaLokalizacja.lokalizacja;
}