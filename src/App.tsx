import React from "react";
import apiData from "./api";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import PersonInfo from "./PersonInfo";

type ReturnType<T> = T extends (...arg: any) => Promise<infer R> ? R : never;

type DataType = ReturnType<typeof apiData>;

function App() {
  const [data, setData] = React.useState<DataType>([]);
  const [selected, setSelected] = React.useState<Array<string>>([]);

  //  TODO fetch contacts using apiData function, handle loading and error states
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetch = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    apiData()
      .then((data) => {
        setData((prevData) => [...prevData, ...data]);
      })
      .catch((e) => {
        setError(`There was an error: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const handleSelect = React.useCallback(
    (id: string) => {
      setSelected(([...selected]) => {
        const index = selected.indexOf(id);
        if (index !== -1) {
          selected.splice(index, 1);
          return selected;
        }
        return [...selected, id];
      });
    },
    [setSelected]
  );

  const orderedData = React.useMemo(() => {
    const { selectedItems, unselectedItems } = data.reduce<{
      selectedItems: DataType;
      unselectedItems: DataType;
    }>(
      (acc, val) => {
        return {
          ...acc,
          ...(selected.includes(val.id)
            ? {
                selectedItems: [...acc.selectedItems, val],
              }
            : { unselectedItems: [...acc.unselectedItems, val] }),
        };
      },
      {
        selectedItems: [],
        unselectedItems: [],
      }
    );

    return [...selectedItems, ...unselectedItems];
  }, [data, selected]);

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div>
        <div data-testid="contact-list" className="list">
          {orderedData.map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              data={personInfo}
              isSelected={selected.includes(personInfo.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <ErrorMessage error={error} />
        <button
          data-testid="fetch-button"
          onClick={fetch}
          disabled={loading}
          style={loading ? { pointerEvents: "none" } : undefined}
        >
          {loading ? <Loading /> : error ? "Refetch" : "Fetch more"}
        </button>
      </div>
    </div>
  );
}

export default App;
