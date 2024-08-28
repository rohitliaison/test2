import React, { useEffect, useState } from "react";
import DataCard from "./components/DataCard";
import MetaData, { MetaDataProps } from "./components/MetaData";

interface Data {
  [key: string]: {
    [key: string]: any;
  };
}
const App: React.FC = () => {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch data ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return Object.keys(data)?.length ? (
    <div className="p-4">
      {
        <MetaData
          heading={Object.keys(data)[0]}
          metaData={Object.values(data)[0] as MetaDataProps["metaData"]}
        />
      }
      <h2 className="text-xl font-bold mb-2">{Object.keys(data)[1]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.entries(data[Object.keys(data)[1]]).map(([time, values]) => (
          <DataCard key={time} time={time} data={values} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center mt-4 font-bold">No Data</div>
  );
};

export default App;
