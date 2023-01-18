async function getOnlinePlayer() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/players`
      );
      responses = await response.json()
      return responses.dataa
    } catch (error) {
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
            ticks: { color: 'rgb(184,184,189)'},
            beginAtZero: true,
            grid : {
              color : 'rgb(63,63,65)'
            }
          },
          x: {
            ticks: { color: 'rgba(184,184,189,0)'},
            grid : {
              color : 'rgb(52,52,54)'
            }
          }
        },
        animation: true,
        plugins: {
          legend: {
            display: false
          },
        }
      },
      data:{
        labels: await data.map(row => row.hour),
        datasets:[{
          data: await data.map(row => row.players),
          borderColor: 'rgb(94,88,229)',
          tension: 0.1,
          pointBackgroundColor : 'rgba(94,88,229,0)',
          pointBorderColor : 'rgba(94,88,229,0)',
          pointHoverBorderColor : 'rgb(94,88,229)',
          spanGaps :true
        }]
      }
    })
  }
  build_chart_player_online()