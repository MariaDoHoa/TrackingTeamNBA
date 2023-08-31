const apiKey = {
    headers: {
        'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }
}
function getPast12Days() {
    var dates = [];
    for (var i = 0; i < 12; i++) {
        var date = new Date("2022-12-06");
        date.setDate(date.getDate() - i);
        var formattedDate = date.toISOString().split('T')[0];
        dates.push("dates[]=" + formattedDate);
    }
    return dates.join('&');
}
export const GetData = () => {
    return fetch("https://free-nba.p.rapidapi.com/teams", apiKey)
        .then(res => res.json())
}

export const GetTeamTracking = (id) => {
    const dataQuery = getPast12Days()
    return fetch(`https://free-nba.p.rapidapi.com/games?page=0&per_page=12&team_ids[]=${id}&${dataQuery}`, apiKey)
        .then(res => res.json())
}