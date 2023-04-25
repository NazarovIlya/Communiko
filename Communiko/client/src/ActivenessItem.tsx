export interface Activeness {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  pointTime: string;
  location: string;
}

interface Props {
  activenessItem: Activeness;
}

export function ActivenessItem({ activenessItem }: Props) {
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