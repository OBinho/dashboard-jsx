import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function PrevisaoGreen(props) {
  const theme = useTheme();
  
  var predictions = {"predictions": {
    "sellUnitPrice": 12.23,
    "labels": [
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Feb",
      "10 Feb"
    ],
    "series": [
      {
        "name": "Kg",
        "data": [
          4412,
          4345,
          4541,
          4677,
          4322,
          4123
        ]
      }
    ]
  }};

  const { series, labels, sellUnitPrice } = predictions.predictions;

  const totals = series[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'area',
      sparkline: {
        enabled: true,
      },
    },
    colors: [theme.palette.error.main],
    fill: {
      colors: [theme.palette.error.light],
      opacity: 0.5,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
    },
    xaxis: {
      type: 'category',
      categories: labels,
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Previsão Pessimista
        </Typography>
        <div className="ml-8">
          <Chip size="small" className="font-medium text-sm" label= {series[0].data.length+" dias"} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center mx-24 mt-12">
        <Typography className="text-7xl font-bold tracking-tighter leading-tight">
          {totals.toLocaleString('pt-BR')}
        </Typography>
        <Typography className="text-3xl tracking-tighter leading-tight">
          &nbsp;{series[0].name}
        </Typography>
        <div className="flex lg:flex-col lg:ml-12">
          <FuseSvgIcon size={20} className="text-green-500">
            heroicons-solid:trending-up
          </FuseSvgIcon>
          <Typography
            className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md font-medium leading-none whitespace-nowrap text-green-500"
          >
            {(totals*sellUnitPrice).toLocaleString('pt-BR',{style:"currency", currency:"BRL"})}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col flex-auto h-80">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Paper>
  );
}

export default PrevisaoGreen;
