import React, { ReactElement } from "react";
import { formatKey } from "../utility/data.utils";

export interface DataCardProps {
  time: string;
  data: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

const DataCard: React.FC<DataCardProps> = ({ time, data }): ReactElement => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-2">{time}</h3>
      <div className="text-sm text-gray-700">
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{formatKey(key)}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DataCard;
