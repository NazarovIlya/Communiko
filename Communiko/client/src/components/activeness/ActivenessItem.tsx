import { Activeness } from "../../model/Activeness";

interface PropsActiveness {
  activenessItem: Activeness;
}

export function ActivenessItem({ activenessItem }: PropsActiveness) {
  return (
    <ul>
      <li>{activenessItem.id}</li>
      <li>{activenessItem.title}</li>
      <li>{activenessItem.category}</li>
      <li>{activenessItem.description}</li>
      <li>{activenessItem.city}</li>
      <li>{activenessItem.pointTime}</li>
      <li>{activenessItem.location}</li>
    </ul>
  );
}