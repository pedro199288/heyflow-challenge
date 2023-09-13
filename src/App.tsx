import JsonExplorer from "./components/JSONExplorer";

function App() {
  return (
    <>
      <JsonExplorer
        data={{
          date: "2021-10-27T07:49:14.896Z",
          hasError: false,
          fields: [
            {
              id: "4c212130",
              prop: "iban",
              value: "DE81200505501265402568",
              hasError: false,
              nullValue: null,
            },
            {
              id: "4c212130",
              prop: "iban",
              value: "DE81200505501265402568",
              hasError: false,
              nested: {
                date: "2021-10-27T07:49:14.896Z",
              },
            },
            {
              id: "4c212130",
              prop: "iban",
              value: "DE81200505501265402568",
              hasError: false,
              nested: {
                date: "2021-10-27T07:49:14.896Z",
              },
            },
          ],
        }}
      ></JsonExplorer>
    </>
  );
}

export default App;
