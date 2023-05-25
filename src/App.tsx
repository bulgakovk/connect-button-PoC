import './App.css';

import { useConnect } from 'wagmi'
import { useAccount } from 'wagmi';

function App() {
  const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
  const { isConnected } = useAccount();

  return (
    <div className={"App"}>
      {connectors.map((connector) => (
          <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
          >
            {connector.name}
            {isConnected &&
                connector.id === pendingConnector?.id &&
                ': Connected!'}
          </button>
      ))}
    </div>
  );
}

export default App;
