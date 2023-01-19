async function getOnlinePlayer() {
    try {
      const response = await fetch(
        `http://hms12432.hostmyservers.me:5000/api/v1/serveur`
      );
      responses = await response.json()
      serveur = responses.serveur
      let result = [];
      for (let i = 0; i < serveur.length; i++) {
        let serveurinfo = await fetch(
          `http://hms12432.hostmyservers.me:5000/api/v1/players/` + serveur[i].name
        );
        data = await serveurinfo.json()
        result.push({
          label: data.name,
          data: await data.data.map(row => row.players),
          borderColor: 'rgb(94,88,229)',
          tension: 0.1
      })   
    }
    return result
    } catch (error) {
      console.error(error);
    }
  }
  async function getHours() {
    try {
        let serveurinfo = await fetch(
          `http://hms12432.hostmyservers.me:5000/api/v1/players/plutonium`
        );
        data = await serveurinfo.json()
        return data.data.map(row => row.hour)
    }
    catch (error) {
      console.error(error);
    }
  }
  async function build_chart_player_online(){
  
    //const data = [{hour:"12h",players:20},{hour:"12h",players:20},{hour:"12h",players:20}]
    const data = await getOnlinePlayer()
    const players = await document.getElementById("players");
    const playersChart = await new Chart(players,{
      type:"line",
      options: {
        scales: {
          y: {
            max:200,
            ticks: { color: 'rgb(184,184,189)'},
            beginAtZero: true,
            grid : {
              color : 'rgb(63,63,65)'
            }
          },
          x: {
            grid : {
              color : 'rgb(52,52,54)'
            }
          }
        },
        animation: true,
      },
      data:{
        labels: await getHours(),
        datasets:await getOnlinePlayer()
      }
    })
  }
  build_chart_player_online()
