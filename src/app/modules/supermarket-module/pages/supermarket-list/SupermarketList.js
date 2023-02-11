import SupermarketCard from "../../components/SupermarketCard/SupermarketCard";

function SupermarketList(props) {

  return (
    <SupermarketCard
      smTitle='UniSuper'
      smShopSum='43'
      smRegions={['Sul,', 'Sudeste']}
      smTags={['Varejo,', 'Atacado']}
      smEmailSum='43'
      smPhoneSum='67'
    />
  );
}

export default SupermarketList;
