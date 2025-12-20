import React from 'react';
import { useWallet } from './hooks/useWallet';
import { useBalance } from './hooks/useBalance';
import { useTokens } from './hooks/useTokens';
import { ConnectButton } from './components/ConnectButton';
import { WalletInfo } from './components/WalletInfo';
import { BalanceCards } from './components/BalanceCard';
import { TokenList} from './components/TokenList';


export default function App() {
  const { provider, address, network, connectWallet } = useWallet();
  const balance = useBalance(provider,address);
  const {tokens, loading} = useTokens(provider,address);

  return(
    <div className='min-h-screen p-6'>
      <div className='max-w-3xl mx-auto'>
        <header className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>Web3 Wallet Deshboard</h1>
          <ConnectButton connect={connectWallet} address={address}/>
        </header>

        <main className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2 space-y-4'>
            <WalletInfo address={address} network={network}/>
            <BalanceCards balance={balance}/>
          </div>

          <div>
            <TokenList tokens={tokens} loading={loading}/>
          </div>
        </main>
      </div>
    </div>
  );
}
