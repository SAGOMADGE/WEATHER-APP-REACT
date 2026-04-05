import { Thermometer } from "lucide-react";
import type { Conditions } from "../../types/weather.types";
import type { Translations } from "../../i18n/translations";

type ConditionInfoProps = {
  condition: Conditions;
  feelsLike: number;
  t: Translations;
};

const ConditionInfo = ({ condition, feelsLike, t }: ConditionInfoProps) => {
  return (
    <div className="current-weather__details">
      <div className="current-weather__description">
        {t?.current?.conditions?.[condition] || condition}
      </div>

      <div className="current-weather__feels-like">
        <Thermometer className="icon-thermometer" />

        <p>
          {t.current.feelsLike}{" "}
          <span className="feels-like__value"> {Math.round(feelsLike)} °C</span>
        </p>
      </div>
    </div>
  );
};

export default ConditionInfo;
