import img01d from "../icons/01d@2x.png";
import img02d from "../icons/02d@2x.png";
import img03d from "../icons/03d@2x.png";
import img09d from "../icons/09d@2x.png";
import img11d from "../icons/11d@2x.png";
import img13d from "../icons/13d@2x.png";
import img50d from "../icons/50d@2x.png";
import img01n from "../icons/01n@2x.png";
import img02n from "../icons/02n@2x.png";
import img10n from "../icons/10n@2x.png";

const getIcon = (iconName) => {
  let icon;

  if (iconName === "01d") icon = img01d;
  else if (iconName === "01n") icon = img01n;
  else if (iconName === "02d") icon = img02d;
  else if (iconName === "02n") icon = img02n;
  else if (
    iconName === "03d" ||
    iconName === "04d" ||
    iconName === "03n" ||
    iconName === "04n"
  )
    icon = img03d;
  else if (iconName === "09d" || iconName === "10d") icon = img09d;
  else if (iconName === "09n" || iconName === "10n") icon = img10n;
  else if (iconName === "11d" || iconName === "11n") icon = img11d;
  else if (iconName === "13d" || iconName === "13n") icon = img13d;
  else if (iconName === "50d" || iconName === "50n") icon = img50d;

  return icon;
};

export default getIcon;
