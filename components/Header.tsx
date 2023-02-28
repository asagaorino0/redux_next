import { useState } from 'react';
// import '../styles/header.css';
import { useDispatch, useSelector } from 'react-redux';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import 'firebase/compat/firestore';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import router from 'next/router';
// import { addMenu } from '../features/menuSlice';
// import { addFormatDate, selectFormatDate } from '../features/formatDateSlice';
// import { addChat } from '../features/chatSlice';
// import { OkiniStateType } from '../types/OkiniStateType';
// import { fetchFollower, fetchUser } from '../lib/firebaseFetch';
// import { Login, Logout } from './Login';
// import { addUser, selectUser } from '../features/userSlice';
// import { addNext } from '../features/nextSlice';
// import { addPage, selectPage } from '../features/pageSlice';
// import { CalendarSub, CalendarAdd } from './CalendarItems';
// import { addMenu0 } from '../features/menu0Slice';
// import { UserStateType } from '../types/UserStateType';
// import { selectTargetUid } from '../features/targetUidSlice';


const drawerWidth = 200;
const Header = () => {
  const dispatch = useDispatch();
  const [follow, setFollow] = useState<any>([]);
  const [mobileOpen, setMobileOpen] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>([]);

  const handleDrawerToggle = () => {
    // fetchUserData()
    // fetchFollowerData()
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar onClick={handleDrawerToggle} sx={{ padding: '8px', zIndex: 999, height: '24px' }}>
        <ArrowBackIosIcon onClick={handleDrawerToggle}>
          <MenuIcon />
        </ArrowBackIosIcon>
      </Toolbar>
      <Divider />

      <List>
        {/* {targetUid.uid !== '' ? ( */}
        <>
          <ListItem button
            onClick={() => {
              // dispatch(addMenu({
              //   yoyakuMenu: '',
              //   menu: ''
              // }));
              // dispatch(addPage({
              //   pageMenu: '',
              //   menu: '',
              //   page: '',
              //   uid: user.uid,
              //   tomareId: ''
              // }));
              // dispatch(addFormatDate({
              //   editMode: true,
              //   formatDate: "",
              //   template: true,
              //   // yoyakuMenu: ""
              // }
              // ));
              // dispatch(
              //   addNext({
              //     next: false,
              //     nextGappi: '',
              //     nextZikan: '',
              //     uid: '',
              //     zikoku: '',
              //     yoyakuUid: '',
              //   })
              // )
              router.push('../PageSetting');
            }}
          >
            <ListItemText primary='予約設定と確認' />
          </ListItem>

          <ListItem button
            onClick={() => {
              // dispatch(addPage({
              //   yoyakuMenu: 'Shop情報の設定',
              //   menu: '',
              //   page: '../PageProfShop'
              // }));
              router.push('../PageProfShop');
            }}
          >
            <ListItemText primary='Shop情報の設定' />
          </ListItem>

          <ListItem button
          >
            <ListItemText primary='施術履歴' />
          </ListItem>

          <ListItem>
            <ListItemText primary='お気に入り' />
          </ListItem>
          {/* <span>
              {follow
                .filter((okini: OkiniStateType) => okini.okini === true)
                .map((okini: OkiniStateType) => {
                  return (
                    <ListItem
                      key={okini.uid}
                      onClick={() => {
                        handleDrawerToggle()
                        // navigate('/')
                        dispatch(
                          addPage({
                            pageMenu: okini.namae,
                            menu: okini.uid,
                            page: '../PageYoCaEntry'
                          })
                        );
                        dispatch(addMenu({
                          yoyakuMenu: okini.namae,
                          menu: ''
                        }));
                        dispatch(
                          addFormatDate({
                            formatDate: "",
                          })
                        );
                        dispatch(
                          addNext({
                            next: false,
                            nextGappi: '',
                            nextZikan: '',
                            uid: okini.uid,
                            zikoku: '',
                            yoyakuUid: user.uid,
                          })
                        )
                        navigate('../PageFunYoyaku')
                      }}
                    >
                      <img src={okini.icon} alt="shopIcon" className="IconM" />
                      <ListItemText primary={`　${okini.namae}`} />
                    </ListItem>
                  );
                })}
            </span> */}
          <ListItem>
            {/* <Logout /> */}
          </ListItem>
        </>
        {/* ) : (
          // <Login />
        )} */}
      </List>
    </div>
  );

  return (
    <Box
      // className='.md:table-header-group'
      sx={{ flexGrow: 1 }}
    >
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#e3d7e3', padding: '4px' }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            size="large"
            edge="start"
            // color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'black' }}
          >
          </Typography>
          {/* <Login /> */}
        </Toolbar>
        {!mobileOpen === true && (
          <Box
            component="main"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'block', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  // width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;


