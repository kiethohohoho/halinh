// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
// assets
//
import { useAuthContext } from 'src/auth/hooks';
import { getAllItems } from 'src/layouts/_common/searchbar/utils';
import { useNavData } from 'src/layouts/dashboard/config-navigation';
import { useRouter } from 'src/routes/hook';
import AppWelcome from '../app-welcome';

// ----------------------------------------------------------------------

export default function LHMobileAppView() {
  const router = useRouter();
  const navData = useNavData();
  const manuData = getAllItems({ data: navData });

  const { user } = useAuthContext();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title="HỆ THỐNG QUẢN LÝ MASSAGE LINH HÀ"
            description={<span>Xin chào <b>{user?.fullname}</b> 👋</span>}
          />
        </Grid>
        <Grid
          xs={12}
          md={8}
          display={{
            display: 'flex',
            justifyContent: 'center',
            gap: "16px",
            flexWrap: 'wrap',
          }}>
          {manuData.map((item) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                router.push(item.path);
              }}
              sx={{ flexBasis: 'calc(calc(100% - 32px) / 3)' }}
            >
              {item.title}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
