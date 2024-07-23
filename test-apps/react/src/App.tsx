import { IssuanceButton, VerificationButton } from 'waltid-react-components'

function App() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <p style={{ fontSize: '24px', marginBottom: "10px" }}>Hello, React!</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <IssuanceButton credentials={[{ "type": "eID" }]} />
          <VerificationButton credentialTypes={["eID"]} />
        </div>
      </div>
    </>
  )
}

export default App
