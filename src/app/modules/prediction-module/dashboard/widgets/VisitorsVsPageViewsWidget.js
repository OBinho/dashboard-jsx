import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Tooltip } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { addDays } from 'date-fns';
// import { selectWidgets } from '../store/widgetsSlice';

function VisitorsVsPageViewsWidget(props) {
  const theme = useTheme();

  const conversions = {
    "visitorsVsPageViews": {
      "overallScore": 472,
      "averageRatio": 45,
      "predictedRatio": 1200,
      "series": [
        {
          "name": "Previsão Otimista",
          "data": [
            {
              "x": "2021-12-17T09:21:32.665Z",
              "y": 4769
            },
            {
              "x": "2021-12-18T09:21:32.665Z",
              "y": 4769
            },
            {
              "x": "2021-12-19T09:21:32.665Z",
              "y": 4901
            },
            {
              "x": "2021-12-20T09:21:32.665Z",
              "y": 4640
            },
            {
              "x": "2021-12-21T09:21:32.665Z",
              "y": 5128
            },
            {
              "x": "2021-12-22T09:21:32.665Z",
              "y": 5015
            },
            {
              "x": "2021-12-23T09:21:32.665Z",
              "y": 5360
            },
            {
              "x": "2021-12-24T09:21:32.665Z",
              "y": 5608
            }
          ]
        },
        {
          "name": "Previsão Greenmotor",
          "data": [
            {
              "x": "2021-12-17T09:21:32.665Z",
              "y": 2300
            },
            {
              "x": "2021-12-18T09:21:32.665Z",
              "y": 2300
            },
            {
              "x": "2021-12-19T09:21:32.665Z",
              "y": 3200
            },
            {
              "x": "2021-12-20T09:21:32.665Z",
              "y": 3300
            },
            {
              "x": "2021-12-21T09:21:32.665Z",
              "y": 4125
            },
            {
              "x": "2021-12-22T09:21:32.665Z",
              "y": 4000
            },
            {
              "x": "2021-12-23T09:21:32.665Z",
              "y": 4324
            },
            {
              "x": "2021-12-24T09:21:32.665Z",
              "y": 4512
            }
          ]
        },
        {
          "name": "Previsão Pessimista",
          "data": [
            {
              "x": "2021-12-17T09:21:32.665Z",
              "y": 1654
            },
            {
              "x": "2021-12-18T09:21:32.665Z",
              "y": 1654
            },
            {
              "x": "2021-12-19T09:21:32.665Z",
              "y": 1900
            },
            {
              "x": "2021-12-20T09:21:32.665Z",
              "y": 1647
            },
            {
              "x": "2021-12-21T09:21:32.665Z",
              "y": 1315
            },
            {
              "x": "2021-12-22T09:21:32.665Z",
              "y": 1807
            },
            {
              "x": "2021-12-23T09:21:32.665Z",
              "y": 1793
            },
            {
              "x": "2021-12-24T09:21:32.665Z",
              "y": 1892
            }
          ]
        }
      ]
    }
  };

  // calc min date
  var minDate = new Date(conversions.visitorsVsPageViews.series[0].data[1].x);
  var hourTimeOffset = (60*60*1000)
  minDate.setTime(minDate.getTime()-2*hourTimeOffset);
  

  const { series, averageRatio, predictedRatio, overallScore, labels } =
    conversions.visitorsVsPageViews;

  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'area',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    colors: [theme.palette.success.dark, theme.palette.secondary.dark, theme.palette.error.dark],
    dataLabels: {
      enabled: true,
    },
    fill: {
      colors: [theme.palette.success.light, theme.palette.secondary.dark, theme.palette.error.light],
    },
    grid: {
      show: false,
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy',
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: 20,
        rotate: 0,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      tickAmount: 1,
      tooltip: {
        enabled: false,
      },
      type: 'datetime',
      min: minDate.getTime()
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      max: (max) => max + 500,
      min: (min) => min - 500,
      show: false,
      tickAmount: 5,
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Projeções
        </Typography>
        <div className="ml-8">
          <Chip size="small" className="font-medium text-sm" label=" 7 dias" />
        </div>
      </div>
      <div className="flex items-start mt-24 mx-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-42 sm:gap-48">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="font-medium text-secondary leading-5">Média de Vendas Diárias</div>
              <Tooltip title="A porcentagem é em relação a previsão da semana anterior.">
                <FuseSvgIcon className="ml-6" size={16} color="disabled">
                  heroicons-solid:information-circle
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="flex items-start mt-8">
              <div className="text-4xl font-bold tracking-tight leading-none">{overallScore}</div>
              <div className="flex items-center ml-8">
                <FuseSvgIcon className="text-green-500" size={20}>
                  heroicons-solid:arrow-circle-up
                </FuseSvgIcon>
                <Typography className="ml-4 text-md font-medium text-green-500">42.9%</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="font-medium text-secondary leading-5">Pior dia de vendas</div>
              <Tooltip title="Baseado na projeção média.">
                <FuseSvgIcon className="ml-6" size={16} color="disabled">
                  heroicons-solid:information-circle
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="flex items-start mt-8">
              <div className="text-4xl font-bold tracking-tight leading-none">{averageRatio.toLocaleString('pt-BR')}</div>
              <div className="flex items-center ml-8">
                <FuseSvgIcon className="text-red-500" size={20}>
                  heroicons-solid:arrow-circle-up
                </FuseSvgIcon>
                <Typography className="ml-4 text-md font-medium text-red-500">13.1%</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="font-medium text-secondary leading-5">Melhor dia de vendas</div>
              <Tooltip title="Baseado na projeção média.">
                <FuseSvgIcon className="ml-6" size={16} color="disabled">
                  heroicons-solid:information-circle
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="flex items-start mt-8">
              <div className="text-4xl font-bold tracking-tight leading-none">
                {predictedRatio.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center ml-8">
                <FuseSvgIcon className="text-green-500" size={20}>
                  heroicons-solid:arrow-circle-up
                </FuseSvgIcon>
                <Typography className="ml-4 text-md font-medium text-green-500">22.2%</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto h-320 mt-12">
        <ReactApexChart
          className="flex-auto w-full h-full"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Paper>
  );
}

export default VisitorsVsPageViewsWidget;
