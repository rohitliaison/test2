import React, { useEffect, useState } from "react";
import DataCard from "./components/DataCard";

export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
}

export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface ApiResponse {
  "Meta Data": MetaData;
  "Time Series (5min)": {
    [timestamp: string]: TimeSeriesData;
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse>({
    "Meta Data": {
      "1. Information": "",
      "2. Symbol": "",
      "3. Last Refreshed": "",
      "4. Interval": "",
      "5. Output Size": "",
      "6. Time Zone": "",
    },
    "Time Series (5min)": {
      timestamp: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": "",
      },
    },
  });
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
      <DataCard
        heading={Object.keys(data)[0]}
        data={Object.values(data)[0] as MetaData}
      />
      <h2 className="text-xl font-bold mb-2">{Object.keys(data)[1]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.entries(data[Object.keys(data)[1] as keyof ApiResponse]).map(
          ([time, values]) => (
            <DataCard
              key={time}
              heading={time}
              data={values as TimeSeriesData}
            />
          )
        )}
      </div>
    </div>
  ) : (
    <div className="text-center mt-4 font-bold">No Data</div>
  );
};

export default App;
