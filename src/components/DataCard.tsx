import React, { ReactElement } from "react";
import { formatKey } from "../utilities/data.utils";
import { MetaData, TimeSeriesData } from "../App";

export interface DataCardProps {
  heading?: string;
  subHeading: string;
  data: TimeSeriesData | MetaData;
}

const DataCard: React.FC<DataCardProps> = ({
  heading,
  subHeading,
  data,
}): ReactElement => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {heading && <h2 className="text-xl font-bold mb-2">{heading}</h2>}
      <h3 className="font-bold mb-2">{subHeading}</h3>
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
