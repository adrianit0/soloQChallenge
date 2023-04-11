

const lolVersion = '13.7.1';

export function getImgUrl (profileIconId) {
    return "https://ddragon.leagueoflegends.com/cdn/" + lolVersion + "/img/profileicon/" + profileIconId + ".png";
}