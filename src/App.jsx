import { FireFilled, GiftFilled, TrophyFilled } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import 'antd/dist/antd.less';
import DEX from 'components/DEX';
import ERC20Balance from 'components/ERC20Balance';
import ERC20Transfers from 'components/ERC20Transfers';
import Gamify from 'components/Gamify';
import MainFooter from 'components/MainFooter';
import MainHeader from 'components/MainHeader';
import NFTBalance from 'components/NFTBalance';
// import NFTTokenIds from 'components/NFTTokenIds';
import Ramper from 'components/Ramper';
import Wallet from 'components/Wallet';
import NativeTransactions from 'components/NativeTransactions';
import Collection from 'components/Collection';
import MyCollection from 'components/MyCollection';
import Provider from 'react-redux/es/components/Provider';
import { useEffect, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import  Profile  from 'components/Profile'
// import DarkModeToggle from "react-dark-mode-toggle";
import { DarkThemeContext } from "./components/DarkMode";
// import Account from "components/Account/Account";
import MysteryBox from 'components/MysteryBox'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './style.less';
import Game from 'components/Game';
import store from './store'
import NFTCreate from 'components/NFTCreate';
import WatchList from 'components/WatchList';

const App = () => {
  const { mainColor } = useContext(DarkThemeContext);
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  // const { Moralis } = useMoralis();
  // const [inputValue, setInputValue] = useState('explore');
  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    //  Moralis.enableWeb3();
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout
      style={{
        height: '100vh',
        minHeight: '100vh',
        overflow: 'auto',
        background: mainColor.bg,
        color: mainColor.txt // will be define
      }}
    >
      <Router>
        <Provider store={store}>
        <MainHeader />
        <div>
          <Switch>
            <Route exact path="/gamify">
              <Tabs defaultActiveKey="1" tabPosition="left">
                <Tabs.TabPane
                  tab={
                    <span>
                      <FireFilled />
                      My Runes
                    </span>
                  }
                  key="1"
                >
                  <Gamify tab="runes" />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <span>
                      <TrophyFilled /> Leaderboard
                    </span>
                  }
                  key="2"
                >
                  <Gamify tab="leaderboard" />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <span>
                      <GiftFilled /> Rewards
                    </span>
                  }
                  key="3"
                >
                  <Gamify tab="rewards" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: 'center' }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            {/* <Route path="/nftMarket">
              <NFTTokenIds
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </Route> */}
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/transaction">
              <NativeTransactions />
            </Route>
            <Route path="/explore">
              <Collection />
            </Route>
            <Route path="/collection">
              <Collection />
            </Route>
            <Route path="/my-collection">
              <MyCollection />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/nftCreate">
              <NFTCreate />
            </Route>
            <Route path="/my-watchlist">
              <WatchList />
            </Route>
            <Route path="/mystery-box">
              <MysteryBox/>
            </Route>
            {/* <Route path="/contract">
              <Contract />
            </Route> */}
            <Route path="/game/:type">
              <Game />
            </Route>

            <Route path="/game">
              <Redirect to="/game/buy-properties" />
            </Route>
            <Route path="/">
              <Collection />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/gamify" />
            </Route>


            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>

        <MainFooter />
        </Provider>
      </Router>
    </Layout>
  );
};

export default App;
