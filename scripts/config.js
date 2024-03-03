

const lolVersion = '14.4.1';

export function getImgUrl (profileIconId) {
    return "https://ddragon.leagueoflegends.com/cdn/" + lolVersion + "/img/profileicon/" + profileIconId + ".png";
}