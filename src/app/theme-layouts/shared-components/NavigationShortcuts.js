import { useDispatch, useSelector } from 'react-redux';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'src/app/stores/fuse/navigationSlice';
import { selectUserShortcuts, updateUserShortcuts } from 'src/app/stores/userSlice';

function NavigationShortcuts(props) {
  const { variant, className } = props;
  const dispatch = useDispatch();
  const shortcuts = useSelector(selectUserShortcuts) || [];
  const navigation = useSelector(selectFlatNavigation);

  function handleShortcutsChange(newShortcuts) {
    dispatch(updateUserShortcuts(newShortcuts));
  }

  return (
    <FuseShortcuts
      className={className}
      variant={variant}
      navigation={navigation}
      shortcuts={shortcuts}
      onChange={handleShortcutsChange}
    />
  );
}

export default NavigationShortcuts;