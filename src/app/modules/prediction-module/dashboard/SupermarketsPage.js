import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PrevisaoGreen from './widgets/PrevGreenWidget';
import PrevPesGreen from './widgets/PrevPesWidget';
import { motion } from 'framer-motion';
import PrevOptGreen from './widgets/PrevOptWidget';
import VisitorsVsPageViewsWidget from './widgets/VisitorsVsPageViewsWidget';
import { useDispatch, useSelector } from 'react-redux';
import { getSkus, selectSku } from './store/projectsSlice';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function SupermarketsPage(props) {

  const dispatch = useDispatch();
  const [skus, setSkus] = useState([]);
  const [selectedSkuData, setSkuData] = useState([]);

  useEffect(() => {
    dispatch(getSkus()).then(response => setSkus(response.payload))
  }, []);

  

  const [selectedSku, setSelectedSku] = useState({
    id: 1,
    menuEl: null,
  });

  const { t } = useTranslation('SupermarketsPage');
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  function handleOpenProjectMenu(event) {
    setSelectedSku({
      id: selectedSku.id,
      menuEl: event.currentTarget,
    });
  }
  
  function handleCloseProjectMenu() {
    setSelectedSku({
      id: selectedSku.id,
      menuEl: null,
    });
  }

  function handleChangeSku(id) {
    console.log(id);

    dispatch(selectSku()).then(response => setSkuData(response.payload));
    //change widgets
    setSelectedSku({
      id,
      menuEl: null,
    });
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };
  return (
    <Root
      header={
        <div className="mx-auto px-32">
          <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 md:py-32 pb-0 md:pb-0">
            <div className="flex flex-col flex-auto">
              <Typography className="text-2xl md:text-4xl mb-14 font-semibold tracking-tight leading-7 md:leading-snug truncate">
                {t('Gerenciar Supermercados')}
              </Typography>
            </div>
            <div className="flex items-center mt-24 sm:mt-0 space-x-12">
              <Button
                className="whitespace-nowrap"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>}
              >
                Exportar
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={handleOpenProjectMenu}
              className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
              variant="default"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                borderColor: (theme) => theme.palette.divider,
              }}
              endIcon={
                <FuseSvgIcon size={20} color="action">
                  heroicons-solid:chevron-down
                </FuseSvgIcon>
              }
            >              
              {_.find(skus, ['id', selectedSku.id])?.description}
            </Button>
            <Menu
              id="project-menu"
              anchorEl={selectedSku.menuEl}
              open={Boolean(selectedSku.menuEl)}
              onClose={handleCloseProjectMenu}
            >
              {skus &&
                skus.map((sku) => (
                  <MenuItem
                    key={sku.id}
                    onClick={(ev) => {
                      handleChangeSku(sku.id);
                    }}
                  >
                    {sku.description}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>

      }
      content={
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
            <PrevisaoGreen />
          </motion.div>

          <motion.div variants={item} className="sm:col-span-2 lg:col-span-1">
            <PrevPesGreen />
          </motion.div>

          <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
            <PrevOptGreen />
          </motion.div>

          <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
            <VisitorsVsPageViewsWidget />
          </motion.div>
        </motion.div>
      }
      scroll="content"
    />
  );
}

export default SupermarketsPage;
