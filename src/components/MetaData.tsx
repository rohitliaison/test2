import React, { ReactElement } from "react";
import { formatKey } from "../utility/data.utils";

export interface MetaDataProps {
  heading: string;
  metaData: {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
  };
}

const MetaData: React.FC<MetaDataProps> = ({
  heading,
  metaData,
}): ReactElement => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold mb-2">{heading}</h3>
      <div className="text-sm text-gray-700">
        {Object.entries(metaData).map(([key, value]: [string, string]) => (
          <p key={key}>
            <strong>{formatKey(key)}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MetaData;
