// Charts
const ctx1 = document.getElementById("chart_12").getContext("2d");

function createGradient(ctx, colors) {
  var gradient = ctx.createLinearGradient(20, 20, 10, 350);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
}
var myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [14, 25, 60, 35, 42, 30, 44, 39, 38, 55, 38, 22],
        fill: true,
        backgroundColor: createGradient(ctx1, ["#312453", "#262A55"]),
        borderColor: "#A95FCB",
        borderWidth: 4,
        lineTension: 0.4,
      },
    ],
  },
  options: {
    animation: {
      easing: "easeInOutQuad",
      duration: 1200,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      easing: "easeInOutQuad",
      duration: 1200,
    },
    scales: {
      y: {
        ticks: {
          color: "#ffffff",
          callback: function (value, index, values) {
            return value + "K"; // add a percent sign to each label
          },
        },
        grid: {
          color: "#242F40",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#242F40",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
  },
});